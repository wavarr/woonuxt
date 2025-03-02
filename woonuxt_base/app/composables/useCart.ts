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
      console.log('Refreshing cart...');
      
      // Use the newly added useAsyncQuery hook
      const { data: cartData, error: queryError } = await useAsyncQuery(
        'getCart',
        {},
        { fetchPolicy: 'network-only' } // Force fresh data
      );
      
      if (queryError) {
        console.error('Error refreshing cart:', queryError);
        error.value = queryError;
        return false;
      }
      
      if (!cartData.value?.cart) {
        console.warn('Cart data is empty or invalid:', cartData.value);
        return false;
      }
      
      cart.value = cartData.value.cart;
      console.log('Cart refreshed successfully:', cart.value);
      return true;
    } catch (e) {
      console.error('Exception refreshing cart:', e);
      error.value = e;
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
      console.log('Adding to cart with input:', input);
      
      const { data, error: queryError } = await useAsyncQuery('addToCart', { input });
      
      if (queryError) {
        console.error('Error adding to cart:', queryError);
        error.value = queryError;
        return { error: queryError.message || 'Error adding to cart' };
      }
      
      if (!data.value?.addToCart?.cart) {
        console.warn('Add to cart response is empty or invalid:', data.value);
        return { error: 'Invalid response from server' };
      }
      
      cart.value = data.value.addToCart.cart;
      console.log('Item added to cart successfully:', cart.value);
      
      // Show cart after adding item
      if (!isCartOpen.value) {
        isCartOpen.value = true;
      }
      
      return { success: true, cart: cart.value };
    } catch (err) {
      console.error('Exception adding to cart:', err);
      error.value = err;
      return { error: err.message || 'Failed to add to cart' };
    } finally {
      isUpdatingCart.value = false;
    }
  };

  // Update item quantity
  const updateItemQuantity = async (key, quantity) => {
    try {
      isUpdatingCart.value = true;
      console.log(`Updating item quantity: key=${key}, quantity=${quantity}`);
      
      const { data, error: queryError } = await useAsyncQuery('updateItemQuantities', {
        items: [{ key, quantity }]
      });
      
      if (queryError) {
        console.error('Error updating item quantity:', queryError);
        error.value = queryError;
        return null;
      }
      
      if (!data.value?.updateItemQuantities?.cart) {
        console.warn('Update item quantity response is empty or invalid:', data.value);
        return null;
      }
      
      cart.value = data.value.updateItemQuantities.cart;
      console.log('Item quantity updated successfully:', cart.value);
      return cart.value;
    } catch (err) {
      console.error('Exception updating item quantity:', err);
      error.value = err;
      return null;
    } finally {
      isUpdatingCart.value = false;
    }
  };

  // Empty cart
  const emptyCart = async () => {
    try {
      isUpdatingCart.value = true;
      console.log('Emptying cart...');
      
      const { data, error: queryError } = await useAsyncQuery('emptyCart');
      
      if (queryError) {
        console.error('Error emptying cart:', queryError);
        error.value = queryError;
        return null;
      }
      
      if (!data.value?.emptyCart?.cart) {
        console.warn('Empty cart response is empty or invalid:', data.value);
        return null;
      }
      
      cart.value = data.value.emptyCart.cart;
      console.log('Cart emptied successfully:', cart.value);
      return cart.value;
    } catch (err) {
      console.error('Exception emptying cart:', err);
      error.value = err;
      return null;
    } finally {
      isUpdatingCart.value = false;
    }
  };

  // Apply coupon
  const applyCoupon = async (code) => {
    try {
      isUpdatingCart.value = true;
      console.log(`Applying coupon: ${code}`);
      
      const { data, error: queryError } = await useAsyncQuery('applyCoupon', { code });
      
      if (queryError) {
        console.error('Error applying coupon:', queryError);
        error.value = queryError;
        return { message: queryError.message || 'Error applying coupon' };
      }
      
      if (!data.value?.applyCoupon?.cart) {
        console.warn('Apply coupon response is empty or invalid:', data.value);
        return { message: 'Could not apply coupon' };
      }
      
      cart.value = data.value.applyCoupon.cart;
      console.log('Coupon applied successfully:', cart.value);
      return { success: true };
    } catch (err) {
      console.error('Exception applying coupon:', err);
      error.value = err;
      return { message: err.message || 'Error applying coupon' };
    } finally {
      isUpdatingCart.value = false;
    }
  };

  // Remove coupon
  const removeCoupon = async (code) => {
    try {
      isUpdatingCart.value = true;
      console.log(`Removing coupon: ${code}`);
      
      const { data, error: queryError } = await useAsyncQuery('removeCoupon', { code });
      
      if (queryError) {
        console.error('Error removing coupon:', queryError);
        error.value = queryError;
        return null;
      }
      
      if (!data.value?.removeCoupon?.cart) {
        console.warn('Remove coupon response is empty or invalid:', data.value);
        return null;
      }
      
      cart.value = data.value.removeCoupon.cart;
      console.log('Coupon removed successfully:', cart.value);
      return cart.value;
    } catch (err) {
      console.error('Exception removing coupon:', err);
      error.value = err;
      return null;
    } finally {
      isUpdatingCart.value = false;
    }
  };

  // Update shipping method
  const updateShippingMethod = async (shippingMethod) => {
    try {
      isUpdatingCart.value = true;
      console.log(`Updating shipping method: ${shippingMethod}`);
      
      const { data, error: queryError } = await useAsyncQuery('updateShippingMethod', { shippingMethod });
      
      if (queryError) {
        console.error('Error updating shipping method:', queryError);
        error.value = queryError;
        return null;
      }
      
      if (!data.value?.updateShippingMethod?.cart) {
        console.warn('Update shipping method response is empty or invalid:', data.value);
        return null;
      }
      
      cart.value = data.value.updateShippingMethod.cart;
      console.log('Shipping method updated successfully:', cart.value);
      return cart.value;
    } catch (err) {
      console.error('Exception updating shipping method:', err);
      error.value = err;
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
    console.log(`Cart visibility toggled: ${isCartOpen.value ? 'open' : 'closed'}`);
  };

  // For checkout process
  const updateShippingLocation = async () => {
    console.log('Updating shipping location...');
    await refreshCart();
  };

  // Load cart on initialization if possible
  const initCart = async () => {
    console.log('Initializing cart...');
    return await refreshCart();
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
