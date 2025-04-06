/**
 * Initialization plugin.
 * - Sets GQL headers based on cookies.
 * - Refreshes cart and user state.
 * - Handles session errors and potential reloads.
 */
export default defineNuxtPlugin(async (nuxtApp) => {
  // Run only on client-side
  if (import.meta.env.SSR) return;

  const { storeSettings } = useAppConfig();
  const { clearAllCookies, clearAllLocalStorage, getDomain, logGQLError } = useHelpers();
  const { refreshCart } = useCart();
  const { logoutUser } = useAuth();
  const route = useRoute(); // Access route information

  console.log('Plugin init: Running on client-side.');

  // Set initial GQL headers from cookies
  const domain = getDomain(window.location.href);
  const sessionToken = useCookie('woocommerce-session', { domain, path: '/', sameSite: 'lax' });
  const authToken = useCookie('auth-token', { domain, path: '/', sameSite: 'lax' }); // Auth token cookie

  // Initialize headers object
  const headers: Record<string, string> = {};
  if (sessionToken.value) {
    console.log('Plugin init: Found WC session token.');
    headers['woocommerce-session'] = `Session ${sessionToken.value}`;
  }
  if (authToken.value) {
     console.log('Plugin init: Found auth token.');
     // Set token for Gql Client (useGqlToken handles this)
     useGqlToken(authToken.value); // Assuming useGqlToken sets Authorization header automatically
  }
   // Apply WC session header if present using useGqlHeaders
   if (Object.keys(headers).length > 0) {
        useGqlHeaders(headers);
   }


  // Variable to track if initialization has run
  let initialised = false;
  const eventsToFireOn = ['mousedown', 'keydown', 'touchstart', 'scroll', 'wheel', 'click', 'resize', 'mousemove', 'mouseover'];

  // Function to perform the core initialization (refresh cart/user)
  async function initStore() {
    if (initialised) {
      // console.log('Plugin init: Already initialised, removing listeners.');
      // Clean up listeners if already initialized
      eventsToFireOn.forEach((event) => {
        window.removeEventListener(event, initStore);
      });
      return;
    }

    initialised = true;
    console.log('Plugin init: Initializing store...');

    // Remove event listeners now that initialization is triggered
    eventsToFireOn.forEach((event) => {
      window.removeEventListener(event, initStore);
    });

    const success: boolean = await refreshCart();

    // Global GQL Error Handler (Setup after initial refresh attempt)
    useGqlError((err: any) => {
        console.warn('Global GQL Error Handler Triggered:', err);
        logGQLError(err); // Log the detailed error

        const errorMessage = err?.gqlErrors?.[0]?.message || '';
        // Define errors that indicate an invalid session or auth token
        const authErrors = [
            'The iss do not match with this server',
            'Invalid session token',
            'Expired session token',
            'User is not logged in.',
            'invalid signature', // Common JWT error
            'jwt expired',
            // Add other potential auth-related error messages here
             'invalid_token', // Common WPGraphQL JWT Auth error key
             'invalid_auth_token'
        ];

        // Check if the error message *contains* any of the auth error substrings
        if (authErrors.some(authError => errorMessage.toLowerCase().includes(authError.toLowerCase()))) {
            console.error('Plugin init: Auth error detected, attempting logout and state clear.', errorMessage);
            // Only clear state if an auth error is detected
            clearAllCookies();
            clearAllLocalStorage();
            // Do not reload automatically, let logout handle redirection/state
            logoutUser(); // Attempt graceful logout
        } else {
            // Handle other GQL errors (e.g., network issues, server errors)
            // Maybe show a generic error notification
             // $notify({ group: 'toasts', type: 'error', title: 'Error', text: 'A server error occurred. Please try again later.' });
        }
    });


    if (!success && !navigator.onLine) {
       console.warn('Plugin init: Cart refresh failed, likely offline.');
       // Optionally notify user they might be offline
    } else if (!success) {
       console.warn('Plugin init: Initial cart refresh failed. User might be logged out or session expired.');
       // Potential issue here: If refreshCart fails due to auth, the GqlError handler above *should* catch it.
       // If it fails for other reasons, clearing cookies might be too aggressive.
       // Consider removing the cookie clear here unless specifically needed for non-auth failures.
       // clearAllCookies();
       // clearAllLocalStorage();

      // Avoid infinite reloads if something is fundamentally broken
       const reloadCountCookie = useCookie('reloadCount', { maxAge: 60 }); // Expires in 60 seconds
       let reloadCount = parseInt(reloadCountCookie.value || '0');

       if (reloadCount < 2) { // Allow max 2 reloads
           console.warn(`Plugin init: Refresh failed, reload attempt ${reloadCount + 1}.`);
           reloadCountCookie.value = String(reloadCount + 1);
           // Consider a small delay before reloading
           // setTimeout(() => window.location.reload(), 500);
       } else {
           console.error('Plugin init: Multiple reload attempts failed. Aborting reload.');
           // Notify user of persistent issue
            // alert('There seems to be a persistent issue loading your session. Please try clearing your browser cache or contact support.');
       }
    } else {
        console.log('Plugin init: Store initialized successfully.');
        // Clear reload count on success
        const reloadCountCookie = useCookie('reloadCount');
        reloadCountCookie.value = null;
    }
  }

  // Determine if initialization should happen immediately or on user interaction
  const isDev = process.env.NODE_ENV === 'development';
  const pagesToInitializeRightAway = ['/checkout', '/my-account', '/order-summary', '/order-received']; // Added order-received
  const isPathThatRequiresInit = pagesToInitializeRightAway.some((page) => route.path.includes(page));

  // Always init immediately if on essential pages, in dev mode, or if setting is disabled
  const shouldInitImmediately = isDev || isPathThatRequiresInit || !storeSettings.initStoreOnUserActionToReduceServerLoad;

  if (shouldInitImmediately) {
    console.log('Plugin init: Initializing immediately.');
    // Use requestIdleCallback or setTimeout to avoid blocking main thread if possible
    if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(initStore);
    } else {
        setTimeout(initStore, 50); // Short delay
    }
  } else {
    console.log('Plugin init: Initializing on user action.');
    // Add listeners for user interaction
    eventsToFireOn.forEach((event) => {
      window.addEventListener(event, initStore, { once: true, passive: true });
    });
  }
});