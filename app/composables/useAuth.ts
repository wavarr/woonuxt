const loginUser = async (credentials: CreateAccountInput): Promise<{ success: boolean; error: any }> => {
  isPending.value = true;

  try {
    const { login } = await GqlLogin(credentials);
    if (login?.user && login?.authToken) {
      // Set the token in the GraphQL client
      useGqlToken(login.authToken);
      
      // Ensure we update the viewer state immediately
      if (login.user) {
        updateViewer(login.user);
      }
      
      // Explicitly handle WooCommerce session
      if (customer.value?.sessionToken) {
        const wooSession = useCookie('woocommerce-session');
        wooSession.value = `Session ${customer.value.sessionToken}`;
        useGqlHeaders({ 'woocommerce-session': wooSession.value });
      }
      
      // Also handle WordPress auth token
      const wpAuthCookie = useCookie('wp_auth');
      wpAuthCookie.value = login.authToken;
      
      // Refresh the cart and user data
      await refreshCart();
    }

    isPending.value = false;
    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    logGQLError(error);
    isPending.value = false;

    return {
      success: false,
      error: error?.gqlErrors?.[0]?.message,
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
