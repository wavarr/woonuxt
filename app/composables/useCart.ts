import { ref, computed } from 'vue';

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: string;
  rawPrice: string;
  subtotal: string;
  total: string;
}

export interface Cart {
  contents: {
    nodes: CartItem[];
  };
  total: string;
  rawTotal: string;
  subtotal: string;
  sessionToken?: string;
}

// Create a reactive cart state
const cart = ref<Cart | null>(null);
const isPending = ref(false);

export function useCart() {
  // Function to refresh the cart data from the server
  const refreshCart = async () => {
    isPending.value = true;
    try {
      // This would typically be a GraphQL query to fetch the cart
      // For now, we'll just simulate it
      console.log('Refreshing cart data...');
      // Implementation would go here
    } catch (error) {
      console.error('Error refreshing cart:', error);
    } finally {
      isPending.value = false;
    }
  };

  // Function to empty the cart
  const emptyCart = async () => {
    isPending.value = true;
    try {
      // This would typically be a GraphQL mutation to empty the cart
      // For now, we'll just simulate it
      console.log('Emptying cart...');
      cart.value = {
        contents: { nodes: [] },
        total: '0',
        rawTotal: '0',
        subtotal: '0'
      };
    } catch (error) {
      console.error('Error emptying cart:', error);
    } finally {
      isPending.value = false;
    }
  };

  return {
    cart,
    isPending,
    refreshCart,
    emptyCart
  };
} 
