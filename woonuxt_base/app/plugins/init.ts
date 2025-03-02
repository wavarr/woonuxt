export default defineNuxtPlugin(async (nuxtApp) => {
  if (!import.meta.env.SSR) {
    console.log('Initializing WooNuxt plugin...');
    
    const { storeSettings } = useAppConfig();
    const { clearAllCookies, clearAllLocalStorage, getDomain } = useHelpers();
    const sessionToken = useCookie('woocommerce-session', { domain: getDomain(window.location.href) });
    
    if (sessionToken.value) {
      console.log('Session token found, setting GraphQL headers...');
      useGqlHeaders({ 'woocommerce-session': `Session ${sessionToken.value}` });
    } else {
      console.log('No session token found');
    }

    // Wait for the user to interact with the page before refreshing the cart, this is helpful to prevent excessive requests to the server
    let initialised = false;
    const eventsToFireOn = ['mousedown', 'keydown', 'touchstart', 'scroll', 'wheel', 'click', 'resize', 'mousemove', 'mouseover'];

    async function initStore() {
      if (initialised) {
        // We only want to execute this code block once, so we return if initialised is truthy and remove the event listeners
        eventsToFireOn.forEach((event) => {
          window.removeEventListener(event, initStore);
        });
        return;
      }

      initialised = true;
      console.log('Initializing store...');

      // Initialize cart with retry logic
      const { refreshCart } = useCart();
      console.log('Initializing cart...');
      
      // Try to initialize the cart up to 3 times
      let success = false;
      let retryCount = 0;
      const maxRetries = 3;
      
      while (!success && retryCount < maxRetries) {
        try {
          console.log(`Cart initialization attempt ${retryCount + 1}...`);
          success = await refreshCart();
          console.log(`Cart initialization attempt ${retryCount + 1}: ${success ? 'success' : 'failed'}`);
          
          if (!success) {
            retryCount++;
            console.log(`Retrying cart initialization in 500ms (attempt ${retryCount + 1}/${maxRetries})...`);
            // Wait a bit before retrying
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error(`Error initializing cart (attempt ${retryCount + 1}/${maxRetries}):`, error);
          retryCount++;
          console.log(`Retrying cart initialization in 500ms (attempt ${retryCount + 1}/${maxRetries})...`);
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      useGqlError((err: any) => {
        console.error('GraphQL error:', err);
        const serverErrors = ['The iss do not match with this server', 'Invalid session token'];
        if (serverErrors.includes(err?.gqlErrors?.[0]?.message)) {
          console.log('Server error detected, clearing cookies and local storage...');
          clearAllCookies();
          clearAllLocalStorage();
          window.location.reload();
        }
      });

      if (!success) {
        console.warn('Failed to initialize cart after multiple attempts');
        console.log('Clearing cookies and local storage...');
        clearAllCookies();
        clearAllLocalStorage();

        // Add a new cookie to prevent infinite reloads
        const reloadCount = useCookie('reloadCount');
        if (!reloadCount.value) {
          console.log('Setting reload count cookie to prevent infinite reloads...');
          reloadCount.value = '1';
        } else {
          console.log('Reload count cookie already set, not reloading...');
          return;
        }

        // Log out the user
        console.log('Logging out user...');
        const { logoutUser } = useAuth();
        await logoutUser();

        if (!reloadCount.value) {
          console.log('Reloading page...');
          window.location.reload();
        }
      } else {
        console.log('Store initialization completed successfully');
      }
    }

    // If we are in development mode, we want to initialise the store immediately
    const isDev = process.env.NODE_ENV === 'development';
    console.log(`Development mode: ${isDev ? 'yes' : 'no'}`);

    // Check if the current route path is one of the pages that need immediate initialization
    const pagesToInitializeRightAway = ['/checkout', '/my-account', '/order-summary', '/product/'];
    const route = useRoute();
    const isPathThatRequiresInit = pagesToInitializeRightAway.some((page) => route.path.includes(page));
    console.log(`Current route: ${route.path}, requires immediate initialization: ${isPathThatRequiresInit ? 'yes' : 'no'}`);

    const shouldInit = isDev || isPathThatRequiresInit || !storeSettings.initStoreOnUserActionToReduceServerLoad;
    console.log(`Should initialize immediately: ${shouldInit ? 'yes' : 'no'}`);

    if (shouldInit) {
      // Initialize immediately but don't block the page load
      // Use a shorter timeout for product pages to ensure cart is initialized before user interaction
      const timeout = route.path.includes('/product/') ? 0 : 100;
      console.log(`Initializing store with timeout: ${timeout}ms...`);
      setTimeout(initStore, timeout);
    } else {
      console.log('Waiting for user interaction to initialize store...');
      eventsToFireOn.forEach((event) => {
        window.addEventListener(event, initStore, { once: true });
      });
    }
    
    console.log('WooNuxt plugin initialization completed');
  }
});
