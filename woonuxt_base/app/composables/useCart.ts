import type { AddToCartInput } from '#gql';

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

  /** Refesh the cart from the server
   * @returns {Promise<boolean>} - A promise that resolves
   * to true if the cart was successfully refreshed
   */
  async function refreshCart(): Promise<boolean> {
    isUpdatingCart.value = true; // Set loading state immediately
    try {
      // Ensure WooCommerce session is included if available
      const headers = {};
      const sessionToken = useCookie('woocommerce-session');
      if (sessionToken.value) {
        headers['woocommerce-session'] = `Session ${sessionToken.value}`;
      }
      const authToken = useCookie('auth-token');
       if (authToken.value) {
         headers['Authorization'] = `Bearer ${authToken.value}`;
       }

      const { cart: cartData, customer, viewer, paymentGateways: pgData, loginClients } = await GqlGetCart({}, { headers });
      const { updateCustomer, updateViewer, updateLoginClients } = useAuth();

      // Ensure data exists before updating state
      updateCart(cartData ?? null);
      if (customer) updateCustomer(customer);
      if (viewer) updateViewer(viewer);
      if (pgData) updatePaymentGateways(pgData);
      if (loginClients) updateLoginClients(loginClients.filter((client): client is LoginClient => client !== null)); // Type assertion


      return true; // Cart was successfully refreshed
    } catch (error: any) {
      logGQLError(error);
      // Avoid clearing cookies on every error, maybe only specific auth errors
      // clearAllCookies();
      resetInitialState(); // Reset state on error
      return false; // Cart was not successfully refreshed
    } finally {
      isUpdatingCart.value = false;
    }
  }

  function resetInitialState() {
    cart.value = null;
    paymentGateways.value = null;
    // Reset other relevant state if needed
  }

  function updateCart(payload?: Cart | null): void {
    cart.value = payload || null;
    // Ensure loading state is stopped when cart is updated (or becomes null)
    isUpdatingCart.value = false;
  }

  function updatePaymentGateways(payload: PaymentGateways): void {
    // Filter out null entries if the backend schema allows them
    if (payload?.nodes) {
        payload.nodes = payload.nodes.filter((pg): pg is PaymentGateway => pg !== null);
    }
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
      const { addToCart: addToCartResponse } = await GqlAddToCart({ input });
      if (addToCartResponse?.cart) {
        updateCart(addToCartResponse.cart); // Use updateCart to handle state
         // Auto open the cart when an item is added to the cart if the setting is enabled
        if (storeSettings.autoOpenCart && !isShowingCart.value) {
          toggleCart(true);
        }
      } else {
         // Handle case where addToCart mutation doesn't return a cart
         console.warn('AddToCart mutation did not return a cart.');
         await refreshCart(); // Refresh cart as a fallback
      }

    } catch (error: any) {
      logGQLError(error);
      isUpdatingCart.value = false; // Ensure loading stops on error
    }
    // Loading state should be handled by updateCart or finally block
  }

  // remove an item from the cart
  async function removeItem(key: string) {
    isUpdatingCart.value = true;
    try {
      const { updateItemQuantities } = await GqlUpDateCartQuantity({ key, quantity: 0 });
      updateCart(updateItemQuantities?.cart); // updateCart handles loading state
    } catch (error: any) {
        logGQLError(error);
        isUpdatingCart.value = false; // Ensure loading stops on error
    }
  }

  // update the quantity of an item in the cart
  async function updateItemQuantity(key: string, quantity: number): Promise<void> {
     if (quantity < 0) quantity = 0; // Prevent negative quantity
    isUpdatingCart.value = true;
    try {
      const { updateItemQuantities } = await GqlUpDateCartQuantity({ key, quantity });
      updateCart(updateItemQuantities?.cart); // updateCart handles loading state
    } catch (error: any) {
      logGQLError(error);
      isUpdatingCart.value = false; // Ensure loading stops on error
    }
  }

  // empty the cart
  async function emptyCart(): Promise<void> {
    isUpdatingCart.value = true;
    try {
      const { emptyCart: emptyCartResponse } = await GqlEmptyCart();
      updateCart(emptyCartResponse?.cart); // updateCart handles loading state
    } catch (error: any) {
      logGQLError(error);
      isUpdatingCart.value = false; // Ensure loading stops on error
    }
  }

  // Update shipping method
  async function updateShippingMethod(shippingMethods: string | string[]) { // Allow string or array
     const methodsArray = Array.isArray(shippingMethods) ? shippingMethods : [shippingMethods];
    isUpdatingCart.value = true;
    try {
      const { updateShippingMethod: updateShippingResponse } = await GqlChangeShippingMethod({ shippingMethods: methodsArray });
      updateCart(updateShippingResponse?.cart); // updateCart handles loading state
    } catch (error: any) {
      logGQLError(error);
      isUpdatingCart.value = false; // Ensure loading stops on error
    }
  }

  // Apply coupon
  async function applyCoupon(code: string): Promise<{ message: string | null }> {
    let message: string | null = null;
    isUpdatingCoupon.value = true; // Use specific loading state
    isUpdatingCart.value = true; // Also set general loading state
    try {
      const { applyCoupon: applyCouponResponse } = await GqlApplyCoupon({ code });
      updateCart(applyCouponResponse?.cart); // updateCart handles loading state
    } catch (error: any) {
      logGQLError(error);
       message = error?.gqlErrors?.[0]?.message || 'Failed to apply coupon.';
       isUpdatingCart.value = false; // Stop loading if error occurs here
    } finally {
        isUpdatingCoupon.value = false; // Stop specific loading state
        // General loading state handled by updateCart or error case
    }
    return { message };
  }

  // Remove coupon
  async function removeCoupon(code: string): Promise<void> {
    isUpdatingCart.value = true; // Use general cart loading state here
    try {
      const { removeCoupons } = await GqlRemoveCoupons({ codes: [code] });
      updateCart(removeCoupons?.cart); // updateCart handles loading state
    } catch (error) {
      logGQLError(error);
      isUpdatingCart.value = false; // Ensure loading stops on error
    }
  }

  // Check if all products in the cart are virtual
  const allProductsAreVirtual = computed(() => {
    const nodes = cart.value?.contents?.nodes || [];
    return nodes.length > 0 && nodes.every((node) => (node.product?.node as SimpleProduct)?.virtual === true);
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