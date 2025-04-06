<script setup lang="ts">
const { t } = useI18n();
const { query } = useRoute();
const { cart, isUpdatingCart, paymentGateways } = useCart();
const { customer, viewer } = useAuth();
const { orderInput, isProcessingOrder, proccessCheckout } = useCheckout();
const runtimeConfig = useRuntimeConfig();

const buttonText = ref<string>(isProcessingOrder.value ? t('messages.general.processing') : t('messages.shop.checkoutButton'));
const isCheckoutDisabled = computed<boolean>(() => isProcessingOrder.value || isUpdatingCart.value || !orderInput.value.paymentMethod);

const isInvalidEmail = ref<boolean>(false);
// BTCPay flow typically creates the order first, then redirects for payment. So isPaid should be false initially.
const isPaid = ref<boolean>(false);

onBeforeMount(async () => {
  // Handle potential redirection from payment gateway (though BTCPay often uses modals/iframes)
  if (query.cancel_order) window.close();
});

const payNow = async () => {
  buttonText.value = t('messages.general.processing');
  let btcpayError = null;

  try {
    if (orderInput.value.paymentMethod?.id === 'btcpay') {
      console.log('Processing BTCPay payment...');
      // BTCPay Server integration
      try {
        // Ensure cart total and currency code are valid before sending
        const amount = cart.value?.total; // Fetching formatted total, consider rawTotal if backend expects number
        const currency = runtimeConfig.public.currencyCode;

        // Use rawTotal which should be a number
        const rawAmount = cart.value?.rawTotal;
        if (!rawAmount || !currency) {
           throw new Error('Cart total (raw) or currency code is missing.');
        }

        console.log(`Requesting BTCPay intent for ${rawAmount} ${currency}`);

        // Fetch from API endpoint (ensure this endpoint exists and works)
        // Example: /server/api/btcpay/intent.post.ts
        const response = await $fetch('/api/btcpay/intent', {
          method: 'POST',
          body: {
            // Send raw numeric amount
            amount: parseFloat(rawAmount), // Ensure it's a number
            currency: currency
          }
        });

        console.log('BTCPay intent response:', response);

        // Assuming the API returns { btcPaymentIntent: { checkoutLink: '...', transactionId: '...' } } or similar
        const btcPaymentIntent = response?.btcPaymentIntent;

        if (btcPaymentIntent?.error) {
          throw new Error(btcPaymentIntent.error);
        }

        if (!btcPaymentIntent?.checkoutLink || !btcPaymentIntent?.transactionId) {
          throw new Error('Missing checkoutLink or transactionId from BTCPay intent.');
        }

        // Set the transaction ID from our intent
        orderInput.value.transactionId = btcPaymentIntent.transactionId;
        console.log(`BTCPay transactionId set: ${orderInput.value.transactionId}`);

        // Redirect to BTCPay checkout page or handle modal/iframe
        // For redirection: window.location.href = btcPaymentIntent.checkoutLink;
        // For now, we'll proceed to create the WC order *before* payment confirmation,
        // which is a common BTCPay flow. BTCPay will notify via webhook later.
        // IMPORTANT: Ensure your backend handles BTCPay webhooks to update order status.

      } catch (error: any) {
        console.error('BTCPay intent creation failed:', error);
        btcpayError = error.message || 'Failed to initiate BTCPay payment. Please try again.';
        // Fallback transaction ID (less ideal, but prevents GQL error if ID is required)
        orderInput.value.transactionId = `fallback_${new Date().getTime().toString()}`;
      }
    } else {
      // Handle other payment methods if any, or set a default transaction ID
      orderInput.value.transactionId = `std_${new Date().getTime().toString()}`;
    }
  } catch (error) {
    console.error('Error during payment method processing:', error);
    buttonText.value = t('messages.shop.placeOrder'); // Reset button text on error
    alert(`An error occurred: ${error.message || 'Unknown error'}`);
    isProcessingOrder.value = false; // Stop loading if error occurs here
    return; // Stop execution if there was an error before calling proccessCheckout
  }

  // If BTCPay intent failed, show error and stop
  if (btcpayError) {
      buttonText.value = t('messages.shop.placeOrder'); // Reset button text
      alert(btcpayError);
      isProcessingOrder.value = false; // Ensure loading state stops
      return;
  }

  // Proceed to create the WooCommerce order
  // For BTCPay, isPaid is typically false here. Order status updates via webhook.
  console.log(`Calling proccessCheckout with isPaid=${isPaid.value} and transactionId=${orderInput.value.transactionId}`);
  await proccessCheckout(isPaid.value);

  // Reset button text *after* proccessCheckout finishes or errors within it
  // Note: proccessCheckout handles its own loading state and redirects
  // Ensure button text resets even if proccessCheckout fails internally without throwing
  if (isProcessingOrder.value) { // Check if still processing (meaning it failed internally)
    buttonText.value = t('messages.shop.placeOrder');
    isProcessingOrder.value = false; // Manually reset if needed
  }
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Improved regex

const checkEmailOnBlur = (email?: string | null): void => {
  if (email) isInvalidEmail.value = !emailRegex.test(email);
};

const checkEmailOnInput = (email?: string | null): void => {
  if (email && isInvalidEmail.value) isInvalidEmail.value = !emailRegex.test(email);
};

useSeoMeta({
  title: t('messages.shop.checkout'),
  // Prevent indexing of checkout page
  robots: 'noindex, nofollow',
});
</script>

<template>
  <div class="flex flex-col min-h-[600px]">
    <template v-if="cart && customer">
      <div v-if="cart.isEmpty" class="flex flex-col items-center justify-center flex-1 mb-12">
        <Icon name="ion:cart-outline" size="156" class="opacity-25 mb-5" />
        <h2 class="text-2xl font-bold mb-2">{{ $t('messages.shop.cartEmpty') }}</h2>
        <span class="text-gray-400 mb-4">{{ $t('messages.shop.addProductsInYourCart') }}</span>
        <NuxtLink
          to="/products"
          class="flex items-center justify-center gap-3 p-2 px-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark">
          {{ $t('messages.shop.browseOurProducts') }}
        </NuxtLink>
      </div>

      <form v-else class="container flex flex-wrap items-start gap-8 my-16 justify-evenly lg:gap-20" @submit.prevent="payNow">
        <div class="grid w-full max-w-2xl gap-8 checkout-form md:flex-1">
          <!-- Customer details -->
          <div v-if="!viewer && customer.billing">
            <h2 class="w-full mb-2 text-2xl font-semibold leading-none">Contact Information</h2>
            <p class="mt-1 text-sm text-gray-500">Already have an account? <NuxtLink to="/my-account" class="text-primary text-semibold">Log in</NuxtLink>.</p>
            <div class="w-full mt-4">
              <label for="checkout-email">{{ $t('messages.billing.email') }}</label>
              <input
                id="checkout-email"
                v-model="customer.billing.email"
                placeholder="johndoe@email.com"
                autocomplete="email"
                type="email"
                name="email"
                :class="{ 'has-error': isInvalidEmail }"
                @blur="checkEmailOnBlur(customer.billing.email)"
                @input="checkEmailOnInput(customer.billing.email)"
                required />
              <Transition name="scale-y" mode="out-in">
                <div v-if="isInvalidEmail" class="mt-1 text-sm text-red-500">Invalid email address</div>
              </Transition>
            </div>
            <template v-if="orderInput.createAccount">
              <div class="w-full mt-4">
                <label for="checkout-username">{{ $t('messages.account.username') }}</label>
                <input id="checkout-username" v-model="orderInput.username" placeholder="johndoe" autocomplete="username" type="text" name="username" required />
              </div>
              <div class="w-full my-2" v-if="orderInput.createAccount">
                <label for="checkout-password">{{ $t('messages.account.password') }}</label>
                <PasswordInput id="checkout-password" class="my-2" v-model="orderInput.password" placeholder="••••••••••" :required="true" />
              </div>
            </template>
            <div v-if="!viewer" class="flex items-center gap-2 my-2">
              <input id="creat-account" v-model="orderInput.createAccount" type="checkbox" name="creat-account" />
              <label for="creat-account">Create an account?</label>
            </div>
          </div>

          <div>
            <h2 class="w-full mb-3 text-2xl font-semibold">{{ $t('messages.billing.billingDetails') }}</h2>
            <BillingDetails v-model="customer.billing" />
          </div>

          <label v-if="cart.availableShippingMethods.length > 0" for="shipToDifferentAddress" class="flex items-center gap-2 cursor-pointer">
            <input id="shipToDifferentAddress" v-model="orderInput.shipToDifferentAddress" type="checkbox" name="shipToDifferentAddress" />
            <span>{{ $t('messages.billing.differentAddress') }}</span>
          </label>

          <Transition name="scale-y" mode="out-in">
            <div v-if="orderInput.shipToDifferentAddress">
              <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.general.shippingDetails') }}</h2>
              <ShippingDetails v-model="customer.shipping" />
            </div>
          </Transition>

          <!-- Shipping methods -->
          <div v-if="cart.availableShippingMethods.length">
            <h3 class="mb-4 text-xl font-semibold">{{ $t('messages.general.shippingSelect') }}</h3>
            <ShippingOptions :options="cart.availableShippingMethods[0].rates" :active-option="cart.chosenShippingMethods[0]" />
          </div>

          <!-- Pay methods -->
          <div v-if="paymentGateways?.nodes.length" class="mt-2 col-span-full">
            <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.billing.paymentOptions') }}</h2>
             <!-- Ensure paymentGateways data includes 'btcpay' -->
            <PaymentOptions v-model="orderInput.paymentMethod" class="mb-4" :paymentGateways />
             <!-- Add conditional rendering for BTCPay specific info if needed -->
             <div v-if="orderInput.paymentMethod?.id === 'btcpay'" class="p-4 my-2 text-sm border rounded bg-gray-50 border-gray-200">
               You will be redirected to BTCPay Server to complete your payment securely.
             </div>
          </div>

          <!-- Order note -->
          <div>
            <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.shop.orderNote') }} ({{ $t('messages.general.optional') }})</h2>
            <textarea
              id="order-note"
              v-model="orderInput.customerNote"
              name="order-note"
              class="w-full min-h-[100px]"
              rows="4"
              :placeholder="$t('messages.shop.orderNotePlaceholder')"></textarea>
          </div>
        </div>

        <OrderSummary>
          <button
            type="submit"
            class="flex items-center justify-center w-full gap-3 p-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-gray-400"
            :disabled="isCheckoutDisabled">
            {{ buttonText }}<LoadingIcon v-if="isProcessingOrder" color="#fff" size="18" />
          </button>
          <p v-if="isCheckoutDisabled && !isProcessingOrder && !isUpdatingCart && !orderInput.paymentMethod" class="mt-2 text-sm text-red-600 text-center">
              Please select a payment method.
          </p>
        </OrderSummary>
      </form>
    </template>
    <LoadingIcon v-else class="m-auto" />
  </div>
</template>

<style lang="postcss">
.checkout-form input[type='text'],
.checkout-form input[type='email'],
.checkout-form input[type='tel'],
.checkout-form input[type='password'],
.checkout-form textarea,
.checkout-form select {
  @apply bg-white border rounded-md outline-none border-gray-300 shadow-sm w-full py-2 px-4 focus:border-primary focus:ring-1 focus:ring-primary;
}

.checkout-form input.has-error,
.checkout-form textarea.has-error {
  @apply border-red-500 focus:border-red-500 focus:ring-red-500;
}

.checkout-form label {
  @apply block mb-1.5 text-xs font-medium text-gray-600 uppercase; /* Made label block and bolded */
}

/* Ensure checkbox label alignment */
.checkout-form input[type='checkbox'] + label {
  @apply inline-block align-middle ml-2 text-sm normal-case font-normal;
}
</style>