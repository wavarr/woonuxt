<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '~/composables/useCart';
import { useAuth } from '~/composables/useAuth';
import { useCheckout } from '~/composables/useCheckout';
import { useRuntimeConfig, useSeoMeta } from '#imports';

const { t } = useI18n();
const { query } = useRoute();
const { cart, isUpdatingCart, paymentGateways } = useCart();
const { customer, viewer } = useAuth();
const { orderInput, isProcessingOrder, proccessCheckout } = useCheckout();

const buttonText = ref<string>(isProcessingOrder.value ? t('messages.general.processing') : t('messages.shop.checkoutButton'));
const isCheckoutDisabled = computed<boolean>(() => isProcessingOrder.value || isUpdatingCart.value || !orderInput.value.paymentMethod);

const isInvalidEmail = ref<boolean>(false);
const isPaid = ref<boolean>(false);

onBeforeMount(async () => {
  if (query.cancel_order) window.close();
});

const payNow = async () => {
  buttonText.value = t('messages.general.processing');
  proccessCheckout(isPaid.value);
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
</script>

<template>
  <div class="flex flex-col min-h-[600px]">
    <LoadingIcon v-if="!cart" class="m-auto" />
    <template v-else>
      <div v-if="cart.isEmpty" class="flex flex-col items-center justify-center flex-1 mb-12">
        <div class="mb-20 text-xl text-gray-300">{{ $t('messages.shop.cartEmpty') }}</div>
      </div>

      <form v-else class="container flex flex-wrap items-start gap-8 my-16 justify-evenly lg:gap-20" @submit.prevent="payNow">
        <div class="grid w-full max-w-2xl gap-8 checkout-form md:flex-1">
          <!-- Customer details -->
          <div v-if="!viewer">
            <h2 class="w-full mb-2 text-2xl font-semibold leading-none">Contact Information</h2>
            <p class="mt-1 text-sm text-gray-500">Already have an account? <a href="/my-account" class="text-primary text-semibold">Log in</a>.</p>
            <div class="w-full mt-4">
              <label for="billing_email">{{ $t('messages.billing.email') }}</label>
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
            <template v-if="orderInput.createAccount">
              <div class="w-full mt-4">
                <label for="username">{{ $t('messages.account.username') }}</label>
                <input 
                  v-model="orderInput.username" 
                  placeholder="Username" 
                  type="text" 
                  id="username"
                  name="username" 
                  required 
                />
              </div>
              <div class="w-full my-2">
                <label for="password">{{ $t('messages.account.password') }}</label>
                <PasswordInput 
                  id="password"
                  name="password" 
                  class="my-2" 
                  v-model="orderInput.password" 
                  placeholder="Password" 
                  :required="true" 
                />
              </div>
            </template>
            <div v-if="!viewer" class="flex items-center gap-2 my-2">
              <label for="creat-account">Create an account?</label>
              <input id="creat-account" v-model="orderInput.createAccount" type="checkbox" name="creat-account" />
            </div>
          </div>

          <div v-if="!cart?.isEmpty" class="mb-6">
            <h2 class="text-xl font-bold mb-4">Your Information</h2>
            
            <!-- Show current addresses if they exist -->
            <div v-if="hasBillingAddress" class="mb-4 p-4 bg-gray-50 rounded">
              <h3 class="font-medium mb-2">Current Billing Address:</h3>
              <p>{{ customer.billing.address1 }}</p>
              <p>{{ customer.billing.city }}, {{ customer.billing.state }} {{ customer.billing.postcode }}</p>
              <p>{{ customer.billing.country }}</p>
            </div>

            <!-- Always show the "Ship to different address" option -->
            <div class="mb-4">
              <label class="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  v-model="orderInput.shipToDifferentAddress"
                  class="form-checkbox"
                />
                <span>Ship to a different address?</span>
              </label>
            </div>

            <!-- Show shipping form if checked -->
            <div v-if="orderInput.shipToDifferentAddress">
              <h3 class="font-medium mb-2">Shipping Address:</h3>
              <ShippingDetails 
                v-model="customer.shipping"
                :is-visible="true"
              />
            </div>
          </div>

          <!-- Shipping methods -->
          <div v-if="cart.availableShippingMethods.length">
            <h3 class="mb-4 text-xl font-semibold">{{ $t('messages.general.shippingSelect') }}</h3>
            <ShippingOptions :options="cart.availableShippingMethods[0].rates" :active-option="cart.chosenShippingMethods[0]" />
          </div>

          <!-- Pay methods -->
          <div v-if="paymentGateways.nodes.length" class="mt-2 col-span-full">
            <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.billing.paymentOptions') }}</h2>
            <PaymentOptions 
              v-model="orderInput.paymentMethod" 
              class="mb-4" 
              :payment-gateways="paymentGateways" 
            />
          </div>

          <!-- Order note -->
          <div>
            <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.shop.orderNote') }} ({{ $t('messages.general.optional') }})</h2>
            <textarea
              id="order-note"
              v-model="orderInput.customerNote"
              name="order-note"
              class="w-full"
              rows="4"
              :placeholder="$t('messages.shop.orderNotePlaceholder')"></textarea>
          </div>
        </div>

        <OrderSummary>
          <button
            class="flex items-center justify-center w-full gap-3 p-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-400"
            :disabled="isCheckoutDisabled">
            {{ buttonText }}<LoadingIcon v-if="isProcessingOrder" color="#fff" size="18" />
          </button>
        </OrderSummary>
      </form>
    </template>
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
</style>
