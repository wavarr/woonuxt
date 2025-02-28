<script setup lang="ts">
import { ref, computed, onBeforeMount, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '~/composables/useCart';
import { useAuth } from '~/composables/useAuth';
import { useCheckout } from '~/composables/useCheckout';
import { useRuntimeConfig, useSeoMeta } from '#imports';

const { t } = useI18n();
const { query } = useRoute();
const { cart, loading: cartLoading, error: cartError, fetchCart } = useCart();
const { customer, viewer } = useAuth();
const { 
  currentStep, 
  checkoutData, 
  loading: checkoutLoading, 
  error: checkoutError,
  nextStep,
  prevStep,
  validateStep,
  placeOrder
} = useCheckout();

const buttonText = ref<string>(checkoutLoading.value ? t('messages.general.processing') : t('messages.shop.checkoutButton'));
const isCheckoutDisabled = computed<boolean>(() => checkoutLoading.value || cartLoading.value || !checkoutData.payment.method);

const isInvalidEmail = ref<boolean>(false);
const isPaid = ref<boolean>(false);

onBeforeMount(async () => {
  if (query.cancel_order) window.close();
});

onMounted(() => {
  fetchCart();
});

onMounted(() => {
  fetchCart();
});

const payNow = async () => {
  buttonText.value = t('messages.general.processing');
  placeOrder();
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const checkEmailOnBlur = (email) => {
  if (email) isInvalidEmail.value = !emailRegex.test(email);
};

const checkEmailOnInput = (email) => {
  if (email && isInvalidEmail.value) isInvalidEmail.value = !emailRegex.test(email);
};

useSeoMeta({
  title: t('messages.shop.checkout'),
});

// Add this to check if user has address
const hasShippingAddress = computed(() => {
  return Boolean(
    customer.value?.shipping?.address1 &&
    customer.value?.shipping?.city &&
    customer.value?.shipping?.country
  );
});

const hasBillingAddress = computed(() => {
  return Boolean(
    customer.value?.billing?.address1 &&
    customer.value?.billing?.city &&
    customer.value?.billing?.country
  );
});

// Update shipping address when sameAsBilling changes
watch(() => checkoutData.shipping.sameAsBilling, (newValue) => {
  if (newValue) {
    Object.keys(checkoutData.shipping).forEach(key => {
      if (key !== 'sameAsBilling') {
        checkoutData.shipping[key] = checkoutData.billing[key];
      }
    });
  }
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Checkout Progress -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div v-for="step in 3" :key="step" 
             class="flex items-center"
             :class="{ 'text-green-600': currentStep >= step }">
          <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center"
               :class="{ 'border-green-600 bg-green-600 text-white': currentStep >= step }">
            {{ step }}
          </div>
          <div class="ml-2">
            {{ step === 1 ? 'Billing' : step === 2 ? 'Shipping' : 'Payment' }}
          </div>
          <div v-if="step < 3" class="w-24 h-1 mx-4"
               :class="{ 'bg-green-600': currentStep > step, 'bg-gray-200': currentStep <= step }">
          </div>
        </div>
      </div>
    </div>

    <!-- Error Messages -->
    <div v-if="cartError || checkoutError" 
         class="mb-6 p-4 bg-red-50 text-red-600 rounded">
      {{ cartError || checkoutError }}
    </div>

    <!-- Loading State -->
    <div v-if="cartLoading || checkoutLoading" 
         class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
    </div>

    <div v-else class="flex flex-wrap -mx-4">
      <!-- Checkout Forms -->
      <div class="w-full lg:w-2/3 px-4">
        <!-- Step 1: Billing -->
        <div v-show="currentStep === 1" class="bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-2xl font-bold mb-6">Billing Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">First Name</label>
              <input v-model="checkoutData.billing.firstName" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Last Name</label>
              <input v-model="checkoutData.billing.lastName" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input
                v-model="customer.billing.email"
                placeholder="johndoe@email.com"
                type="email"
                id="billing_email"
                name="billing_email"
                :class="{ 'has-error': isInvalidEmail }"
                @blur="checkEmailOnBlur(customer.billing.email)"
                @input="checkEmailOnInput(customer.billing.email)"
                required />
              <Transition name="scale-y" mode="out-in">
                <div v-if="isInvalidEmail" class="mt-1 text-sm text-red-500">Invalid email address</div>
              </Transition>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Phone</label>
              <input v-model="customer.billing.phone" 
                     type="tel" 
                     class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Address</label>
              <input v-model="customer.billing.address1" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">City</label>
              <input v-model="customer.billing.city" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">State</label>
              <input v-model="customer.billing.state" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Postcode</label>
              <input v-model="customer.billing.postcode" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Country</label>
              <input v-model="customer.billing.country" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
          </div>
        </div>

        <!-- Step 2: Shipping -->
        <div v-show="currentStep === 2" class="bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-2xl font-bold mb-6">Shipping Information</h2>
          <div class="mb-4">
            <label class="flex items-center">
              <input type="checkbox" 
                     v-model="checkoutData.shipping.sameAsBilling"
                     class="mr-2">
              Same as billing address
            </label>
          </div>
          <div v-if="!checkoutData.shipping.sameAsBilling" 
               class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">First Name</label>
              <input v-model="checkoutData.shipping.firstName" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Last Name</label>
              <input v-model="checkoutData.shipping.lastName" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Address</label>
              <input v-model="checkoutData.shipping.address1" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">City</label>
              <input v-model="checkoutData.shipping.city" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">State</label>
              <input v-model="checkoutData.shipping.state" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Postcode</label>
              <input v-model="checkoutData.shipping.postcode" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Country</label>
              <input v-model="checkoutData.shipping.country" 
                     type="text" 
                     class="w-full p-2 border rounded">
            </div>
          </div>
        </div>

        <!-- Step 3: Payment -->
        <div v-show="currentStep === 3" class="bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-2xl font-bold mb-6">Payment Information</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Payment Method</label>
              <select v-model="checkoutData.payment.method" 
                      class="w-full p-2 border rounded">
                <option value="card">Credit Card</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>
            <div v-if="checkoutData.payment.method === 'card'" 
                 class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Card Number</label>
                <input v-model="checkoutData.payment.cardNumber" 
                       type="text" 
                       class="w-full p-2 border rounded">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Expiry Date</label>
                <input v-model="checkoutData.payment.expiryDate" 
                       type="text" 
                       class="w-full p-2 border rounded">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">CVV</label>
                <input v-model="checkoutData.payment.cvv" 
                       type="text" 
                       class="w-full p-2 border rounded">
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="mt-6 flex justify-between">
          <button v-if="currentStep > 1" 
                  @click="prevStep"
                  class="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Back
          </button>
          <button v-if="currentStep < 3" 
                  @click="nextStep"
                  :disabled="!validateStep(currentStep)"
                  class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
            Continue
          </button>
          <button v-else 
                  @click="placeOrder"
                  :disabled="!validateStep(currentStep)"
                  class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
            Place Order
          </button>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="w-full lg:w-1/3 px-4 mt-8 lg:mt-0">
        <div class="bg-white p-6 rounded-lg shadow-sm sticky top-4">
          <h3 class="text-xl font-bold mb-4">Order Summary</h3>
          <div v-if="cart?.contents?.nodes?.length" class="space-y-4">
            <div v-for="item in cart.contents.nodes" 
                 :key="item.key" 
                 class="flex items-center space-x-4">
              <img v-if="item.product.node.image?.sourceUrl" 
                   :src="item.product.node.image.sourceUrl"
                   :alt="item.product.node.image.altText"
                   class="w-16 h-16 object-cover rounded">
              <div>
                <h4 class="font-medium">{{ item.product.node.name }}</h4>
                <p class="text-sm text-gray-600">
                  Qty: {{ item.quantity }} × {{ item.product.node.price }}
                </p>
              </div>
            </div>

            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>{{ cart.subtotal }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span>{{ cart.shippingTotal }}</span>
              </div>
              <div v-if="cart.appliedCoupons?.length" class="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{{ cart.discountTotal }}</span>
              </div>
              <div class="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{{ cart.total }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.checkout-form input[type='text'],
.checkout-form input[type='email'],
.checkout-form input[type='tel'],
.checkout-form input[type='password'],
.checkout-form textarea,
.checkout-form select {
  @apply border border-gray-300 rounded-lg p-2 w-full focus:border-primary focus:ring-1 focus:ring-primary;
}

.checkout-form input.has-error,
.checkout-form textarea.has-error {
  @apply border-red-500;
}

.checkout-form label {
  @apply my-1.5 text-xs text-gray-600 uppercase;
}

.sticky {
  position: sticky;
  top: 1rem;
}

input:focus, select:focus {
  outline: 2px solid #059669;
  outline-offset: -2px;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
