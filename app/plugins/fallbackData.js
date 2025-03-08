import fallbackData from '../constants/fallbackData';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  
  // Check if we should use local data
  const useLocalData = config.public.useLocalData || false;
  
  // Create a composable to provide fallback data
  nuxtApp.provide('fallbackData', () => {
    return fallbackData;
  });
  
  // Override the GraphQL client to use fallback data
  if (useLocalData) {
    console.log('Using fallback data for WooNuxt');
    
    // Mock the GraphQL client methods
    nuxtApp.hook('app:created', () => {
      // Override the GQL client with fallback data
      nuxtApp.vueApp.config.globalProperties.$gql = {
        products: {
          nodes: fallbackData.products
        },
        categories: {
          nodes: fallbackData.categories
        },
        paymentGateways: {
          nodes: fallbackData.paymentGateways
        },
        shippingMethods: fallbackData.shippingMethods
      };
      
      // Create a mock GQL function that returns fallback data
      nuxtApp.vueApp.config.globalProperties.$graphql = async (query, variables) => {
        console.log('Using fallback GraphQL data for query:', query);
        
        // Return different data based on the query
        if (query.includes('products')) {
          return { 
            data: { 
              products: { 
                nodes: fallbackData.products 
              } 
            } 
          };
        }
        
        if (query.includes('categories')) {
          return { 
            data: { 
              categories: { 
                nodes: fallbackData.categories 
              } 
            } 
          };
        }
        
        if (query.includes('paymentGateways')) {
          return { 
            data: { 
              paymentGateways: { 
                nodes: fallbackData.paymentGateways 
              } 
            } 
          };
        }
        
        if (query.includes('shippingMethods')) {
          return { 
            data: { 
              shippingMethods: fallbackData.shippingMethods 
            } 
          };
        }
        
        // Default fallback
        return { data: {} };
      };
    });
  }
}); 
