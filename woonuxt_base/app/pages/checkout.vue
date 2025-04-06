<script setup lang="ts">
// Base checkout using Stripe - This file will be overridden by app/checkout.vue if BTCPay is used.
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe, StripeElements, CreateSourceData, StripeCardElement } from '@stripe/stripe-js';

const { t } = useI18n();
const { query } = useRoute();
const { cart, isUpdatingCart, paymentGateways } = useCart();
const { customer, viewer } = useAuth();
const { orderInput, isProcessingOrder, proccessCheckout } = useCheckout();
const runtimeConfig = useRuntimeConfig();
const stripeKey = runtimeConfig.public?.STRIPE_PUBLISHABLE_KEY || null;
const { $notify } = useNuxtApp(); // For notifications

const buttonText = ref<string>(isProcessingOrder.value ? t('messages.general.processing') : t('messages.shop.checkoutButton'));
const isCheckoutDisabled = computed<boolean>(() => isProcessingOrder.value || isUpdatingCart.value || !orderInput.value.paymentMethod);

const isInvalidEmail = ref<boolean>(false);
const stripe = ref<Stripe | null>(null); // Use ref for stripe instance
const elements = ref<StripeElements | null>(null); // Use ref for elements
const isPaid = ref<boolean>(false); // Track if payment succeeded via Stripe Intent

// Load Stripe on mount if key exists
onMounted(async () => {
  if (stripeKey && !stripe.value) {
    try {
      stripe.value = await loadStripe(stripeKey);
    } catch (error) {
      console.error("Error loading Stripe:", error);
      $notify({ group: 'toasts', type: 'error', title: 'Error', text: 'Could not initialize payment system.' });
    }
  }
});


onBeforeMount(async () => {
  if (query.cancel_order) {
      // Handle cancelled PayPal/other redirect orders if needed
      console.log("Order cancelled via query param.");
      // Potentially show a message to the user
      window.close(); // Close popup if applicable
  }
});

const payNow = async () => {
  buttonText.value = t('messages.general.processing');
  isPaid.value = false; // Reset isPaid status

  // Ensure payment method is selected
   if (!orderInput.value.paymentMethod) {
     alert('Please select a payment method.');
     buttonText.value = t('messages.shop.placeOrder');
     isProcessingOrder.value = false; // Stop loading state
     return;
   }


  try {
    // Handle Stripe Payment
    if (orderInput.value.paymentMethod.id === 'stripe' && stripe.value && elements.value) {
      console.log('Processing Stripe payment...');
       const { data: intentData, error: intentError } = await useAsyncGql('getStripePaymentIntent');

       if (intentError.value || !intentData?.value?.stripePaymentIntent?.clientSecret) {
           console.error('Error fetching Stripe Payment Intent:', intentError.value);
           throw new Error('Could not initialize Stripe payment. Please try again.');
       }

       const clientSecret = intentData.value.stripePaymentIntent.clientSecret;
       const cardElement = elements.value.getElement('card');

       if (!cardElement) {
            throw new Error('Stripe card element not found.');
       }

        // Confirm the card setup using the PaymentIntent's client secret
        console.log('Confirming Stripe card setup...');
        const { setupIntent, error: setupError } = await stripe.value.confirmCardSetup(clientSecret, {
           payment_method: { card: cardElement },
        });


       if (setupError) {
           console.error('Stripe setup error:', setupError);
           throw new Error(setupError.message || 'Payment failed. Please check your card details.');
       }

       if (setupIntent?.status === 'succeeded') {
            console.log('Stripe SetupIntent succeeded:', setupIntent);
            isPaid.value = true;
            orderInput.value.transactionId = setupIntent.id; // Use SetupIntent ID as transaction ID
             // Add Stripe Intent ID to metadata for backend processing
             orderInput.value.metaData = [
                 ...(orderInput.value.metaData || []).filter(m => m.key !== '_stripe_intent_id' && m.key !== '_stripe_charge_captured'), // Keep existing metadata, remove old stripe ones
                 { key: '_stripe_intent_id', value: setupIntent.id },
                 { key: '_stripe_charge_captured', value: 'true' }, // Indicate payment is captured (adjust if using separate auth/capture)
             ];

             // Optionally create source if needed by specific backend implementations, but Intent ID is usually sufficient
             // const { source, error: sourceError } = await stripe.value.createSource(cardElement as CreateSourceData);
             // if (source) orderInput.value.metaData.push({ key: '_stripe_source_id', value: source.id });

       } else {
            console.warn('Stripe SetupIntent status:', setupIntent?.status);
            throw new Error('Payment authorization failed. Please try again.');
       }
    } else if (orderInput.value.paymentMethod.id !== 'stripe') {
        // Handle non-Stripe payment methods (e.g., COD, Bank Transfer)
        console.log(`Processing non-Stripe payment: ${orderInput.value.paymentMethod.title}`);
        // Assign a generic transaction ID or leave blank if not applicable
         orderInput.value.transactionId = `${orderInput.value.paymentMethod.id}_${new Date().getTime()}`;
         isPaid.value = false; // Assume not paid for COD/Bank Transfer initially
          // Clear any lingering Stripe metadata
         orderInput.value.metaData = (orderInput.value.metaData || []).filter(m => !m.key.startsWith('_stripe_'));
    }
  } catch (error: any) {
    console.error("Error during payment processing:", error);
    buttonText.value = t('messages.shop.placeOrder'); // Reset button
    isProcessingOrder.value = false; // Stop loading state
     $notify({ group: 'toasts', type: 'error', title: 'Payment Error', text: error.message || 'An unexpected payment error occurred.' });
    return; // Stop execution
  }

  // Proceed to create WooCommerce order via GraphQL mutation
   console.log(`Calling proccessCheckout with isPaid=${isPaid.value} and transactionId=${orderInput.value.transactionId}`);
  await proccessCheckout(isPaid.value);
  // proccessCheckout handles its own loading state reset and redirection/messaging
   // Reset button text if checkout process itself fails internally without redirecting
   if (isProcessingOrder.value) { // Check if still processing (meaning it failed internally)
      buttonText.value = t('messages.shop.placeOrder');
      // isProcessingOrder is reset within proccessCheckout's finally block now
   }

};

const handleStripeElement = (stripeElements: StripeElements | null): void => {
   // console.log("Stripe Elements ready:", stripeElements);
  elements.value = stripeElements;
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
              <label for="checkout-email-base">{{ $t('messages.billing.email') }}</label>
              <input
                id="checkout-email-base"
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
                <label for="checkout-username-base">{{ $t('messages.account.username') }}</label>
                <input id="checkout-username-base" v-model="orderInput.username" placeholder="johndoe" autocomplete="username" type="text" name="username" required />
              </div>
              <div class="w-full my-2" v-if="orderInput.createAccount">
                <label for="checkout-password-base">{{ $t('messages.account.password') }}</label>
                <PasswordInput id="checkout-password-base" class="my-2" v-model="orderInput.password" placeholder="••••••••••" :required="true" />
              </div>
            </template>
            <div v-if="!viewer" class="flex items-center gap-2 my-2">
               <input id="creat-account-base" v-model="orderInput.createAccount" type="checkbox" name="creat-account" />
               <label for="creat-account-base">Create an account?</label>
            </div>
          </div>

          <div>
            <h2 class="w-full mb-3 text-2xl font-semibold">{{ $t('messages.billing.billingDetails') }}</h2>
            <BillingDetails v-model="customer.billing" />
          </div>

          <label v-if="cart.availableShippingMethods.length > 0" for="shipToDifferentAddress-base" class="flex items-center gap-2 cursor-pointer">
             <input id="shipToDifferentAddress-base" v-model="orderInput.shipToDifferentAddress" type="checkbox" name="shipToDifferentAddress" />
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
            <PaymentOptions v-model="orderInput.paymentMethod" class="mb-4" :paymentGateways />
             <!-- Stripe Element conditionally shown -->
            <LazyStripeElement v-if="stripe" v-show="orderInput.paymentMethod?.id == 'stripe'" :stripe="stripe" @updateElement="handleStripeElement" />
              <!-- Add info for COD/Bank Transfer if needed -->
             <div v-if="orderInput.paymentMethod?.id === 'cod'" class="p-4 my-2 text-sm border rounded bg-gray-50 border-gray-200">
                 {{ paymentGateways.nodes.find(p => p.id ==='cod')?.description || 'Pay with cash upon delivery.' }}
             </div>
             <div v-if="orderInput.paymentMethod?.id === 'bacs'" class="p-4 my-2 text-sm border rounded bg-gray-50 border-gray-200">
                 {{ paymentGateways.nodes.find(p => p.id ==='bacs')?.description || 'Make your payment directly into our bank account.' }}
             </div>
          </div>

          <!-- Order note -->
          <div>
            <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.shop.orderNote') }} ({{ $t('messages.general.optional') }})</h2>
            <textarea
              id="order-note-base"
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
.checkout-form select,
.checkout-form .StripeElement { /* Target StripeElement class */
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

/* Style Stripe Element container */
.checkout-form .StripeElement {
  padding: 0.75rem 1rem; /* Adjust padding to match other inputs */
  margin-bottom: 1rem; /* Add some space below */
}
</style>