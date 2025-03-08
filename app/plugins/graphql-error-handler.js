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
  
  // Override the GraphQL client to handle errors gracefully
  nuxtApp.hook('apollo:error', (error) => {
    console.warn('GraphQL error intercepted:', error.message);
    
    if (error.message.includes('403') || 
        error.message.includes('Forbidden') || 
        error.message.includes('Failed to fetch')) {
      console.warn('API connection error detected. Using fallback data...');
      loadFallbackData();
    }
  });
  
  // Also handle fetch errors that might not be caught by apollo:error
  if (process.client) {
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      try {
        const response = await originalFetch.apply(this, args);
        
        // If the request is to the GraphQL endpoint and returns a 403
        if (args[0].includes('graphql') && response.status === 403) {
          console.warn('403 Forbidden error detected in fetch. Using fallback data...');
          loadFallbackData();
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
  }
  
  // Log when we're using fallback data
  if (useLocalData) {
    console.log('Application is running in fallback data mode');
    // Ensure fallback data is loaded
    setTimeout(loadFallbackData, 100);
  }
}); 
