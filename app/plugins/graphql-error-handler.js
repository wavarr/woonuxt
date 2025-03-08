/**
 * GraphQL Error Handler Plugin
 * This plugin intercepts GraphQL errors and ensures the application
 * continues to function with fallback data.
 */

export default defineNuxtPlugin((nuxtApp) => {
  // Get the runtime config
  const config = useRuntimeConfig();
  const useLocalData = config.public.useLocalData || false;
  
  // Create a function to load fallback data
  const loadFallbackData = () => {
    console.warn('Loading fallback data...');
    
    // Force use of local data
    if (!useLocalData) {
      console.warn('Enabling fallback data mode...');
      config.public.useLocalData = true;
    }
    
    // If we have a useProducts composable, trigger fallback data
    if (typeof useProducts === 'function') {
      try {
        const { useFallbackData } = useProducts();
        useFallbackData();
      } catch (e) {
        console.error('Error loading fallback products:', e);
      }
    }
    
    // If we have a useCart composable, initialize it
    if (typeof useCart === 'function') {
      try {
        const cart = useCart();
        // Cart is already initialized with fallback data
      } catch (e) {
        console.error('Error initializing cart:', e);
      }
    }
  };
  
  // Function to handle WooCommerce session issues
  const handleWooCommerceSession = () => {
    // Check if we have any WooCommerce session cookies
    if (process.client) {
      const cookies = document.cookie.split(';');
      
      // Check for WooCommerce session cookie
      const wooSessionCookie = cookies.find(cookie => 
        cookie.trim().startsWith('wp_woocommerce_session_')
      );
      
      // Check for WordPress test cookie
      const wpTestCookie = cookies.find(cookie => 
        cookie.trim().startsWith('wordpress_test_cookie')
      );
      
      // Check for WordPress language cookie
      const wpLangCookie = cookies.find(cookie => 
        cookie.trim().startsWith('wp_lang')
      );
      
      // Log all cookies for debugging
      console.log('All cookies:', cookies.map(c => c.trim()).join(', '));
      
      if (!wooSessionCookie) {
        console.warn('No WooCommerce session cookie found. This may cause issues with the cart.');
        
        // Create a dummy session cookie for development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          console.log('Creating dummy WooCommerce session for development');
          const dummySessionId = 'dev_' + Math.random().toString(36).substring(2, 15);
          document.cookie = `wp_woocommerce_session_dev=${dummySessionId}; path=/; max-age=86400; SameSite=None; Secure`;
        }
      } else {
        console.log('WooCommerce session cookie found:', wooSessionCookie.trim());
      }
      
      // Check if we need to create other cookies
      if (!wpTestCookie && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        document.cookie = 'wordpress_test_cookie=WP Cookie check; path=/; max-age=86400; SameSite=None; Secure';
      }
      
      if (!wpLangCookie && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        document.cookie = 'wp_lang=en_US; path=/; max-age=86400; SameSite=None; Secure';
      }
    }
  };
  
  // Override the GraphQL client to handle errors gracefully
  nuxtApp.hook('apollo:error', (error) => {
    console.warn('GraphQL error intercepted:', error.message);
    
    if (error.message.includes('403') || 
        error.message.includes('Forbidden') || 
        error.message.includes('Failed to fetch')) {
      console.warn('API connection error detected. Using fallback data...');
      loadFallbackData();
    }
    
    // Check for WooCommerce session issues
    if (error.message.includes('session') || 
        error.message.includes('cookie') || 
        error.message.includes('unauthorized')) {
      console.warn('WooCommerce session issue detected');
      handleWooCommerceSession();
    }
  });
  
  // Also handle fetch errors that might not be caught by apollo:error
  if (process.client) {
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      try {
        // Add credentials to all requests
        if (typeof args[1] === 'object') {
          args[1] = {
            ...args[1],
            credentials: 'include'
          };
        } else {
          args[1] = { credentials: 'include' };
        }
        
        const response = await originalFetch.apply(this, args);
        
        // If the request is to the GraphQL endpoint and returns a 403
        if (args[0].includes('graphql') && response.status === 403) {
          console.warn('403 Forbidden error detected in fetch. Using fallback data...');
          loadFallbackData();
        }
        
        // Check for Set-Cookie headers and log them
        if (response.headers && response.headers.has('Set-Cookie')) {
          console.log('Set-Cookie header found:', response.headers.get('Set-Cookie'));
        }
        
        return response;
      } catch (error) {
        // If the request is to the GraphQL endpoint and fails
        if (args[0].includes('graphql')) {
          console.warn('Fetch error for GraphQL request:', error);
          loadFallbackData();
        }
        throw error;
      }
    };
    
    // Check WooCommerce session on page load
    handleWooCommerceSession();
    
    // Add event listener to check cookies after page load
    window.addEventListener('load', () => {
      setTimeout(handleWooCommerceSession, 1000);
    });
  }
  
  // Log when we're using fallback data
  if (useLocalData) {
    console.log('Application is running in fallback data mode');
    // Ensure fallback data is loaded
    setTimeout(loadFallbackData, 100);
  }
}); 
