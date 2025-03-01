export default defineNuxtPlugin(async (nuxtApp) => {
  if (!import.meta.env.SSR) {
    const { storeSettings } = useAppConfig();
    const { clearAllCookies, clearAllLocalStorage, getDomain } = useHelpers();
    const sessionToken = useCookie('woocommerce-session', { domain: getDomain(window.location.href) });
    if (sessionToken.value) useGqlHeaders({ 'woocommerce-session': `Session ${sessionToken.value}` });

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

      // Initialize cart with retry logic
      const { refreshCart } = useCart();
      console.log('Initializing cart...');
      
      // Try to initialize the cart up to 3 times
      let success = false;
      let retryCount = 0;
      const maxRetries = 3;
      
      while (!success && retryCount < maxRetries) {
        try {
          success = await refreshCart();
          console.log(`Cart initialization attempt ${retryCount + 1}: ${success ? 'success' : 'failed'}`);
          
          if (!success) {
            retryCount++;
            // Wait a bit before retrying
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error('Error initializing cart:', error);
          retryCount++;
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      useGqlError((err: any) => {
        const serverErrors = ['The iss do not match with this server', 'Invalid session token'];
        if (serverErrors.includes(err?.gqlErrors?.[0]?.message)) {
          clearAllCookies();
          clearAllLocalStorage();
          window.location.reload();
        }
      });

      if (!success) {
        console.warn('Failed to initialize cart after multiple attempts');
        clearAllCookies();
        clearAllLocalStorage();

        // Add a new cookie to prevent infinite reloads
        const reloadCount = useCookie('reloadCount');
        if (!reloadCount.value) {
          reloadCount.value = '1';
        } else {
          return;
        }

        // Log out the user
        const { logoutUser } = useAuth();
        await logoutUser();

        if (!reloadCount.value) window.location.reload();
      }
    }

    // If we are in development mode, we want to initialise the store immediately
    const isDev = process.env.NODE_ENV === 'development';

    // Check if the current route path is one of the pages that need immediate initialization
    const pagesToInitializeRightAway = ['/checkout', '/my-account', '/order-summary', '/product/'];
    const route = useRoute();
    const isPathThatRequiresInit = pagesToInitializeRightAway.some((page) => route.path.includes(page));

    const shouldInit = isDev || isPathThatRequiresInit || !storeSettings.initStoreOnUserActionToReduceServerLoad;

    if (shouldInit) {
      // Initialize immediately but don't block the page load
      // Use a shorter timeout for product pages to ensure cart is initialized before user interaction
      const timeout = route.path.includes('/product/') ? 0 : 100;
      setTimeout(initStore, timeout);
    } else {
      eventsToFireOn.forEach((event) => {
        window.addEventListener(event, initStore, { once: true });
      });
    }
  }
});
