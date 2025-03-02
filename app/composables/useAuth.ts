const loginUser = async (credentials: CreateAccountInput): Promise<{ success: boolean; error: any }> => {
  console.group('🔐 Authentication attempt');
  console.log('Login credentials (redacted):', { 
    username: credentials.username, 
    password: '********' 
  });
  
  isPending.value = true;

  try {
    console.time('Login request time');
    const { login } = await GqlLogin(credentials);
    console.timeEnd('Login request time');
    
    console.log('Login response:', { 
      success: !!login?.authToken,
      hasUser: !!login?.user,
      tokenLength: login?.authToken?.length
    });
    
    if (login?.user && login?.authToken) {
      // Set the token in the GraphQL client
      useGqlToken(login.authToken);
      console.log('✅ Auth token set in GraphQL client');
      
      // Ensure we update the viewer state immediately
      if (login.user) {
        updateViewer(login.user);
        console.log('✅ Viewer state updated');
      }
      
      // Explicitly handle WooCommerce session
      if (customer.value?.sessionToken) {
        const wooSession = useCookie('woocommerce-session');
        const oldValue = wooSession.value;
        wooSession.value = `Session ${customer.value.sessionToken}`;
        console.log('WooCommerce session cookie:', { 
          oldValue, 
          newValue: wooSession.value 
        });
        
        useGqlHeaders({ 'woocommerce-session': wooSession.value });
        console.log('✅ WooCommerce session header set');
      } else {
        console.warn('⚠️ No customer session token available');
      }
      
      // Also handle WordPress auth token
      const wpAuthCookie = useCookie('wp_auth');
      const oldAuthValue = wpAuthCookie.value;
      wpAuthCookie.value = login.authToken;
      console.log('WordPress auth cookie:', { 
        oldValue: oldAuthValue ? '(existed)' : '(none)', 
        newValue: '(set)' 
      });
      
      // Refresh the cart and user data
      console.log('Refreshing cart data...');
      await refreshCart();
      console.log('✅ Cart refreshed');
    } else {
      console.error('❌ Login failed - missing user or token in response');
    }

    isPending.value = false;
    console.groupEnd();
    return {
      success: !!login?.authToken,
      error: null,
    };
  } catch (error: any) {
    console.error('❌ Login error:', error);
    if (error?.gqlErrors) {
      console.error('GraphQL errors:', error.gqlErrors);
    }
    if (error?.networkError) {
      console.error('Network error:', error.networkError);
    }
    console.trace('Login error stack:');
    
    logGQLError(error);
    isPending.value = false;
    
    console.groupEnd();
    return {
      success: false,
      error: error?.gqlErrors?.[0]?.message || 'Unknown login error',
    };
  }
};

const updateViewer = (payload: Viewer | null): void => {
  viewer.value = payload;
  isPending.value = false;
  
  // If logging out, make sure to clear any session cookies
  if (!payload) {
    const wooSession = useCookie('woocommerce-session');
    wooSession.value = null;
    const wpAuthCookie = useCookie('wp_auth');
    wpAuthCookie.value = null;
  }
}; 
