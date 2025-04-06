import type { CheckoutInput, UpdateCustomerInput, CreateAccountInput } from '#gql';

export function useCheckout() {
  const orderInput = useState<any>('orderInput', () => {
    return {
      customerNote: '',
      paymentMethod: null, // Initialize as null or empty object
      shipToDifferentAddress: false,
      metaData: [{ key: 'order_via', value: 'WooNuxt' }],
      createAccount: false,
      username: '',
      password: '',
      transactionId: '', // Ensure transactionId is part of the state
    };
  });

  const isProcessingOrder = useState<boolean>('isProcessingOrder', () => false);

  // if Country or State are changed, calculate the shipping rates again
  async function updateShippingLocation() {
    const { customer, viewer } = useAuth();
    const { isUpdatingCart, refreshCart } = useCart();

    // Ensure customer data exists before proceeding
     if (!customer.value || !viewer.value) {
       console.warn('Cannot update shipping location: customer or viewer data missing.');
       return;
     }

    isUpdatingCart.value = true;

    try {
      const shippingAddress = orderInput.value.shipToDifferentAddress ? customer.value.shipping : customer.value.billing;
      const billingAddress = customer.value.billing;

       // Basic validation: Ensure required fields are present if addresses are provided
      if (shippingAddress && (!shippingAddress.country || !shippingAddress.postcode)) {
          console.warn('Incomplete shipping address for location update.');
          // Optionally provide user feedback
          // isUpdatingCart.value = false; // Stop loading state
          // return;
       }
      if (billingAddress && (!billingAddress.country || !billingAddress.postcode || !billingAddress.email)) {
          console.warn('Incomplete billing address for location update.');
           // isUpdatingCart.value = false; // Stop loading state
           // return;
       }


      const { updateCustomer } = await GqlUpdateCustomer({
        input: {
          id: viewer.value.id, // Use viewer ID which should be stable
          shipping: shippingAddress,
          billing: billingAddress,
        } as UpdateCustomerInput,
      });

      if (updateCustomer) {
          console.log('Customer location updated, refreshing cart...');
          await refreshCart(); // Await refreshCart to ensure completion
      } else {
           console.warn('UpdateCustomer mutation did not return expected data.');
            // refreshCart might still be needed if backend updated session implicitly
           await refreshCart();
      }
    } catch (error) {
      console.error('Error updating shipping location:', error);
       // Consider user feedback for the error
       // Ensure loading state is stopped even on error
       isUpdatingCart.value = false;
    }
     // refreshCart() handles its own loading state, so no need to set isUpdatingCart.value = false here if refreshCart was called.
     // However, if validation fails or mutation returns no data, set it false.
     if (isUpdatingCart.value) { // Check if refreshCart already set it
        isUpdatingCart.value = false;
     }
  }

  // Removed PayPal specific logic (openPayPalWindow)

  const proccessCheckout = async (isPaid = false) => {
    const { customer, loginUser } = useAuth();
    const router = useRouter();
    // const { replaceQueryParam } = useHelpers(); // Keep if needed for other redirects
    const { cart, emptyCart, refreshCart } = useCart();

    // Ensure required data is available
    if (!customer.value || !cart.value || !orderInput.value.paymentMethod) {
        console.error('Checkout process cannot start: Missing customer, cart, or payment method.');
        alert('An error occurred during checkout preparation. Please refresh the page or contact support.');
        isProcessingOrder.value = false; // Ensure loading stops
        return; // Prevent further execution
    }


    isProcessingOrder.value = true;

    const { username, password, shipToDifferentAddress } = orderInput.value;
    const billing = customer.value?.billing;
    const shipping = shipToDifferentAddress ? customer.value?.shipping : billing;

     // Validate addresses before proceeding
     if (!billing || !billing.email || !billing.firstName || !billing.lastName || !billing.address1 || !billing.city || !billing.postcode || !billing.country) {
         alert('Please complete all required billing address fields.');
         isProcessingOrder.value = false;
         return;
     }
     if (shipToDifferentAddress && (!shipping || !shipping.firstName || !shipping.lastName || !shipping.address1 || !shipping.city || !shipping.postcode || !shipping.country)) {
         alert('Please complete all required shipping address fields.');
         isProcessingOrder.value = false;
         return;
     }


    // Ensure chosenShippingMethods is an array of strings if required by GQL
    const shippingMethods = cart.value?.chosenShippingMethods ? (Array.isArray(cart.value.chosenShippingMethods) ? cart.value.chosenShippingMethods : [cart.value.chosenShippingMethods]) : [];

    try {
      let checkoutPayload: CheckoutInput = {
        billing,
        shipping,
        // shippingMethod: shippingMethods, // Shipping method often derived from cart state by backend, remove if causing issues
        metaData: orderInput.value.metaData,
        paymentMethod: orderInput.value.paymentMethod.id, // Ensure ID exists
        customerNote: orderInput.value.customerNote,
        shipToDifferentAddress,
        transactionId: orderInput.value.transactionId || '', // Pass transactionId
        isPaid,
      };

      // Create account
      if (orderInput.value.createAccount) {
         if (!username || !password) {
            alert('Please provide both username and password to create an account.');
            isProcessingOrder.value = false;
            return;
         }
        checkoutPayload.account = { username, password } as CreateAccountInput;
      } else {
        // Ensure account is explicitly null if not creating one
        checkoutPayload.account = null;
      }

      console.log('Sending checkout payload:', checkoutPayload);
      const { checkout } = await GqlCheckout(checkoutPayload);
      console.log('Checkout response:', checkout);


      if (!checkout || !checkout.order || !checkout.order.databaseId || !checkout.order.orderKey) {
           // Check for specific failure messages from the backend
           const failureMessage = checkout?.messages || 'Checkout response invalid or missing order details.';
           // If the backend indicates failure explicitly
           if(checkout?.result === 'failure') {
                console.error('Checkout failed on server:', failureMessage);
                throw new Error(`Checkout failed: ${failureMessage}`);
           }
           // If result is not 'failure' but data is missing, it's still an error
          throw new Error(failureMessage);
      }


      // Login user if account was created during checkout
      if (orderInput.value.createAccount && checkout?.result === 'success') {
        console.log('Account created, attempting login...');
        await loginUser({ username, password });
      }

      const orderId = checkout.order.databaseId;
      const orderKey = checkout.order.orderKey;

      // Handle result/redirect (Generic approach, BTCPay handled in calling component)
      if (checkout?.result === 'success') {
          console.log(`Checkout successful. Order ID: ${orderId}`);
          // Redirect to order received page
          router.push(`/checkout/order-received/${orderId}/?key=${orderKey}`);
          // Clear cart *after* successful order creation and potential login
          await emptyCart();
          await refreshCart(); // Refresh to update user state if logged in
      } else if (checkout?.redirect) {
          // Handle generic redirects if any payment method uses them
          console.log(`Redirecting to: ${checkout.redirect}`);
           window.location.href = checkout.redirect;
            // Clear cart might happen after redirection depending on payment flow
           await emptyCart();
           await refreshCart();
      } else {
          // Handle failure without redirect (e.g., validation error server-side)
           const failureMessage = checkout?.messages || 'Checkout failed. Please review your order details and try again.';
          throw new Error(failureMessage);
      }

    } catch (error: any) {
      console.error('Error during checkout processing:', error);
      isProcessingOrder.value = false; // Stop loading

      const errorMessage = error?.gqlErrors?.[0]?.message || error.message || 'An unknown error occurred during checkout.';

      // Provide specific user feedback for common errors
      if (errorMessage?.includes('An account is already registered with your email address')) {
        alert('An account is already registered with your email address. Please log in or use a different email.');
      } else if (errorMessage?.includes('Invalid payment method')) {
         alert('The selected payment method is currently unavailable. Please choose another.');
      } else {
          // Display the error message from the GQL response or the caught error
        alert(`Checkout Error: ${errorMessage}`);
      }
      // Do not automatically reload, allow user to correct issues
      // window.location.reload();
      return null; // Indicate failure
    } finally {
        // Ensure processing state is always reset, unless redirection happens
        // Check if current path doesn't include '/checkout' to avoid resetting during redirect
        if (!router.currentRoute.value.path.includes('/checkout/order-received') && isProcessingOrder.value) {
           isProcessingOrder.value = false;
        }
    }
  };

  return {
    orderInput,
    isProcessingOrder,
    proccessCheckout,
    updateShippingLocation,
  };
}