// Custom composable to handle cart initialization with fallbacks
export const useCartFallback = () => {
  const { $gql } = useNuxtApp();
  const cartData = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  
  // Basic cart structure for fallback
  const emptyCart = {
    contents: {
      nodes: []
    },
    subtotal: "$0.00",
    total: "$0.00",
    isEmpty: true
  };
  
  // Initialize cart with fallback mechanism
  const initializeCart = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      console.log('Initializing cart with fallback mechanism...');
      
      // Try to get cart from GraphQL
      const cartQuery = `
        query GET_CART {
          cart {
            contents {
              nodes {
                key
                product {
                  node {
                    id
                    name
                  }
                }
                quantity
                subtotal
              }
            }
            subtotal
            total
          }
        }
      `;
      
      // Use fetch directly instead of Apollo client
      const response = await fetch(process.env.GQL_HOST || 'https://modaprimeusa.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': process.env.APP_HOST || 'https://store.modaprimeusa.com',
          'Referer': process.env.APP_HOST || 'https://store.modaprimeusa.com',
          'X-WP-Guest-Access': 'true'
        },
        credentials: 'include',
        body: JSON.stringify({ query: cartQuery })
      });
      
      if (!response.ok) {
        throw new Error(`GraphQL request failed with status ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Unknown GraphQL error');
      }
      
      if (result.data && result.data.cart) {
        cartData.value = result.data.cart;
        console.log('Cart initialized successfully:', cartData.value);
      } else {
        console.warn('Cart data not found in response, using empty cart');
        cartData.value = emptyCart;
      }
    } catch (err) {
      console.error('Error initializing cart:', err);
      error.value = err;
      cartData.value = emptyCart; // Use empty cart as fallback
    } finally {
      isLoading.value = false;
    }
    
    return cartData.value;
  };
  
  return {
    cartData,
    isLoading,
    error,
    initializeCart
  };
}; 
