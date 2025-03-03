import type { AddToCartInput } from '#gql';
import { useState, watch, computed } from '#imports';

/**
 * @name useCart
 * @description A composable that handles the cart in local storage
 */
export function useCart() {
  const { storeSettings } = useAppConfig();

  const cart = useState<Cart | null>('cart', () => null);
  const isShowingCart = useState<boolean>('isShowingCart', () => false);
  const isUpdatingCart = useState<boolean>('isUpdatingCart', () => false);
  const isUpdatingCoupon = useState<boolean>('isUpdatingCoupon', () => false);
  const paymentGateways = useState<PaymentGateways | null>('paymentGateways', () => null);
  const { logGQLError, clearAllCookies } = useHelpers();

  /** Refresh the cart from the server
   * @returns {Promise<boolean>} - A promise that resolves
   * to true if the cart was successfully refreshed
   */
  async function refreshCart(): Promise<boolean> {
    try {
      isUpdatingCart.value = true;
      
      // Use try-catch to handle potential errors from GqlGetCart
      let cartData, customerData, viewerData, paymentGatewaysData, loginClientsData;
      
      try {
        const { cart: c, customer, viewer, paymentGateways: pg, loginClients } = await GqlGetCart();
        cartData = c;
        customerData = customer;
        viewerData = viewer;
        paymentGatewaysData = pg;
        loginClientsData = loginClients;
      } catch (fetchError) {
        console.error("Error fetching cart data:", fetchError);
        // Provide empty fallbacks
        cartData = null;
        customerData = null;
        viewerData = null;
        paymentGatewaysData = null;
        loginClientsData = null;
      }
      
      const { updateCustomer, updateViewer, updateLoginClients } = useAuth();

      if (cartData) updateCart(cartData);
      if (customerData) updateCustomer(customerData);
      if (viewerData) updateViewer(viewerData);
      if (paymentGatewaysData) updatePaymentGateways(paymentGatewaysData);
      
      // Add safety check for loginClients before filtering
      if (loginClientsData) {
        updateLoginClients(
          Array.isArray(loginClientsData) 
            ? loginClientsData.filter(client => client !== null) 
            : []
        );
      }

      return true; // Cart was successfully refreshed
    } catch (error: any) {
      logGQLError(error);
      clearAllCookies();
      resetInitialState();
      return false; // Cart was not successfully refreshed
    } finally {
      isUpdatingCart.value = false;
    }
  }

  function resetInitialState() {
    cart.value = null;
    paymentGateways.value = null;
  }

  function updateCart(payload?: Cart | null): void {
    cart.value = payload || null;
  }

  function updatePaymentGateways(payload: PaymentGateways): void {
    paymentGateways.value = payload;
  }

  // toggle the cart visibility
  function toggleCart(state: boolean | undefined = undefined): void {
    isShowingCart.value = state ?? !isShowingCart.value;
  }

  // add an item to the cart
  async function addToCart(input: AddToCartInput): Promise<void> {
    isUpdatingCart.value = true;

    try {
      const { addToCart } = await GqlAddToCart({ input });
      if (addToCart?.cart) cart.value = addToCart.cart;
      // Auto open the cart when an item is added to the cart if the setting is enabled
      const { storeSettings } = useAppConfig();
      if (storeSettings.autoOpenCart && !isShowingCart.value) toggleCart(true);
    } catch (error: any) {
      logGQLError(error);
    } finally {
      isUpdatingCart.value = false;
    }
  }

  // Remove an item from the cart
  async function removeItem(key: string): Promise<void> {
    isUpdatingCart.value = true;
    try {
      const { removeItemsFromCart } = await GqlRemoveItemsFromCart({ keys: [key] });
      if (removeItemsFromCart?.cart) updateCart(removeItemsFromCart.cart);
    } catch (error: any) {
      logGQLError(error);
    } finally {
      isUpdatingCart.value = false;
    }
  }

  // Update item quantity in the cart
  async function updateItemQuantity(key: string, quantity: number): Promise<void> {
    isUpdatingCart.value = true;
    try {
      const { updateItemQuantities } = await GqlUpdateItemQuantities({ 
        items: [{ key, quantity }] 
      });
      if (updateItemQuantities?.cart) updateCart(updateItemQuantities.cart);
    } catch (error: any) {
      logGQLError(error);
    } finally {
      isUpdatingCart.value = false;
    }
  }

  // Empty the cart
  async function emptyCart(): Promise<void> {
    isUpdatingCart.value = true;
    try {
      const { emptyCart } = await GqlEmptyCart();
      if (emptyCart?.cart) updateCart(emptyCart.cart);
    } catch (error: any) {
      logGQLError(error);
    } finally {
      isUpdatingCart.value = false;
    }
  }

  // Update shipping method
  async function updateShippingMethod(shippingMethods: string[]): Promise<void> {
    isUpdatingCart.value = true;
    try {
      const { updateShippingMethod } = await GqlUpdateShippingMethod({ shippingMethods });
      if (updateShippingMethod?.cart) updateCart(updateShippingMethod.cart);
    } catch (error: any) {
      logGQLError(error);
    } finally {
      isUpdatingCart.value = false;
    }
  }

  // Apply coupon to cart
  async function applyCoupon(code: string): Promise<void> {
    isUpdatingCoupon.value = true;
    try {
      const { applyCoupon } = await GqlApplyCoupon({ code });
      if (applyCoupon?.cart) updateCart(applyCoupon.cart);
    } catch (error: any) {
      logGQLError(error);
    } finally {
      isUpdatingCoupon.value = false;
    }
  }

  // Remove coupon from cart
  async function removeCoupon(code: string): Promise<void> {
    isUpdatingCoupon.value = true;
    try {
      const { removeCoupons } = await GqlRemoveCoupons({ codes: [code] });
      if (removeCoupons?.cart) updateCart(removeCoupons.cart);
    } catch (error: any) {
      logGQLError(error);
    } finally {
      isUpdatingCoupon.value = false;
    }
  }

  // Stop the loading spinner when the cart is updated
  watch(cart, (val) => {
    isUpdatingCart.value = false;
  });

  // Check if all products in the cart are virtual
  const allProductsAreVirtual = computed(() => {
    const nodes = cart.value?.contents?.nodes || [];
    return nodes.length === 0 ? false : nodes.every((node) => (node.product?.node as SimpleProduct)?.virtual === true);
  });

  // Check if the billing address is enabled
  const isBillingAddressEnabled = computed(() => (storeSettings.hideBillingAddressForVirtualProducts ? !allProductsAreVirtual.value : true));

  return {
    cart,
    isShowingCart,
    isUpdatingCart,
    isUpdatingCoupon,
    paymentGateways,
    isBillingAddressEnabled,
    updateCart,
    refreshCart,
    toggleCart,
    addToCart,
    removeItem,
    updateItemQuantity,
    emptyCart,
    updateShippingMethod,
    applyCoupon,
    removeCoupon,
  };
}
