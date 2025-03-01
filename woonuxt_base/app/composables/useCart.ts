// composables/useCart.ts
import { ref, computed } from 'vue';
import { useAsyncQuery } from './useAsyncQuery';

// Cart state
const cart = ref(null);
const isCartOpen = ref(false);
const isUpdatingCart = ref(false);
const isBillingAddressEnabled = ref(true);
const loading = ref(false);
const error = ref(null);

export function useCart() {
  // Refresh the cart data
  const refreshCart = async () => {
    try {
      isUpdatingCart.value = true;
      
      // Use the newly added useAsyncQuery hook
      const { data: cartData, error } = await useAsyncQuery(
        'getCart',
        {},
        { fetchPolicy: 'network-only' } // Force fresh data
      );
      
      if (error) {
        console.error('Error refreshing cart:', error);
        return false;
      }
      
      cart.value = cartData.value?.cart;
      return true;
    } catch (e) {
      console.error('Error refreshing cart:', e);
      return false;
    } finally {
      isUpdatingCart.value = false;
    }
  };

  // Add to cart function
  const addToCart = async (input) => {
    try {
      // Check if cart is initialized, if not, initialize it first
      if (!cart.value) {
        console.log('Cart is not initialized, initializing now...');
        const success = await refreshCart();
        if (!success) {
          console.error('Failed to initialize cart');
          return { error: 'Failed to initialize cart' };
        }
      }
      
      isUpdatingCart.value = true;
      
      const { data, error } = await useAsyncQuery('addToCart', { input });
      
      if (error) {
        console.error('Error adding to cart:', error);
        return { error: error.message };
      }
      
      cart.value = data.value?.addToCart?.cart;
      
      // Show cart after adding item
      if (!isCartOpen.value) {
        isCartOpen.value = true;
      }
      
      return { success: true, cart: cart.value };
    } catch (err) {
      console.error('Error adding to cart:', err);
      return { error: err.message || 'Failed to add to cart' };
    } finally {
      isUpdatingCart.value = false;
    }
  };

  // Update item quantity
  const updateItemQuantity = async (key, quantity) => {
    try {
      isUpdatingCart.value = true;
      
      const { data, error } = await useAsyncQuery('updateItemQuantities', {
        items: [{ key, quantity }]
      });
      
      if (error) {
        console.error('Error updating item quantity:', error);
        return null;
      }
      
      cart.value = data.value?.updateItemQuantities?.cart;
      return cart.value;
    } catch (err) {
      console.error('Error updating item quantity:', err);
      return null;
    } finally {
      isUpdatingCart.value = false;
    }
  };

  // Empty cart
  const emptyCart = async () => {
    try {
      isUpdatingCart.value = true;
      
      const { data, error } = await useAsyncQuery('emptyCart');
      
      if (error) {
        console.error('Error emptying cart:', error);
        return null;
      }
      
      cart.value = data.value?.emptyCart?.cart;
      return cart.value;
    } catch (err) {
      console.error('Error emptying cart:', err);
      return null;
    } finally {
      isUpdatingCart.value = false;
    }
  };

  // Apply coupon
  const applyCoupon = async (code) => {
    try {
      isUpdatingCart.value = true;
      
      const { data, error } = await useAsyncQuery('applyCoupon', { code });
      
      if (error) {
        return { message: error.message };
      }
      
      if (data.value?.applyCoupon?.cart) {
        cart.value = data.value.applyCoupon.cart;
        return { success: true };
      }
      
      return { message: 'Could not apply coupon' };
    } catch (err) {
      console.error('Error applying coupon:', err);
      return { message: err.message || 'Error applying coupon' };
    } finally {
      isUpdatingCart.value = false;
    }
  };

  // Remove coupon
  const removeCoupon = async (code) => {
    try {
      isUpdatingCart.value = true;
      
      const { data, error } = await useAsyncQuery('removeCoupon', { code });
      
      if (error) {
        console.error('Error removing coupon:', error);
        return null;
      }
      
      cart.value = data.value?.removeCoupon?.cart;
      return cart.value;
    } catch (err) {
      console.error('Error removing coupon:', err);
      return null;
    } finally {
      isUpdatingCart.value = false;
    }
  };

  // Update shipping method
  const updateShippingMethod = async (shippingMethod) => {
    try {
      isUpdatingCart.value = true;
      
      const { data, error } = await useAsyncQuery('updateShippingMethod', { shippingMethod });
      
      if (error) {
        console.error('Error updating shipping method:', error);
        return null;
      }
      
      cart.value = data.value?.updateShippingMethod?.cart;
      return cart.value;
    } catch (err) {
      console.error('Error updating shipping method:', err);
      return null;
    } finally {
      isUpdatingCart.value = false;
    }
  };

  // Toggle cart visibility
  const toggleCart = (state = null) => {
    if (state !== null) {
      isCartOpen.value = state;
    } else {
      isCartOpen.value = !isCartOpen.value;
    }
  };

  // For checkout process
  const updateShippingLocation = async () => {
    await refreshCart();
  };

  // Load cart on initialization if possible
  const initCart = async () => {
    await refreshCart();
  };

  return {
    cart,
    isCartOpen,
    isUpdatingCart,
    isBillingAddressEnabled,
    loading,
    error,
    refreshCart,
    addToCart,
    updateItemQuantity,
    emptyCart,
    applyCoupon,
    removeCoupon,
    updateShippingMethod,
    toggleCart,
    updateShippingLocation,
    initCart
  };
}
