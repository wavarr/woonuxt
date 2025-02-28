import { ref, watch } from 'vue';
import { useAsyncQuery } from './useAsyncQuery';

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

export function useCart() {
  const cart = ref(null);
  const isUpdatingCart = ref(false);
  const error = ref(null);

  const { result, loading, refetch } = useAsyncQuery(CART_QUERY);

  const refreshCart = async () => {
    try {
      await refetch();
      cart.value = result.value?.cart;
    } catch (e) {
      error.value = e.message;
      console.error('Error refreshing cart:', e);
    }
  };

  // Watch for result changes
  watch(() => result.value, (newResult) => {
    if (newResult?.cart) {
      cart.value = newResult.cart;
    }
  });

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
    isUpdatingCart,
    refreshCart,
    updateQuantity,
    removeItem,
    clearCart
  };
} 
