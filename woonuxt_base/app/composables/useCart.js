import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

export const useCart = () => {
  const config = useRuntimeConfig();
  const cart = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const CART_QUERY = `
    query GetCart {
      cart {
        contents {
          nodes {
            key
            product {
              node {
                id
                name
                price
              }
            }
            quantity
            total
          }
        }
        total
      }
    }
  `;

  const fetchCart = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(config.public.GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-WP-Guest-Access': 'true'
        },
        body: JSON.stringify({
          query: CART_QUERY
        })
      });

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      cart.value = result.data.cart;
    } catch (e) {
      error.value = e.message;
      console.error('Cart error:', e);
    } finally {
      loading.value = false;
    }
  };

  const updateQuantity = async (key, quantity) => {
    // Implementation for updating quantity
  };

  const removeItem = async (key) => {
    // Implementation for removing item
  };

  const clearCart = async () => {
    // Implementation for clearing cart
  };

  return {
    cart,
    loading,
    error,
    fetchCart,
    updateQuantity,
    removeItem,
    clearCart
  };
}; 
