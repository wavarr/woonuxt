<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import type { PropType } from 'vue';
import type { CustomerAddress } from '~/types';
const { updateShippingLocation } = useCheckout();
const { isBillingAddressEnabled } = useCart();

const props = defineProps({
  modelValue: { type: Object as PropType<CustomerAddress>, required: true },
});

const emit = defineEmits(['update:modelValue']);

// Use a local ref and watch for changes
const localBilling = ref({ ...props.modelValue });

// Watch the prop for external changes
watch(() => props.modelValue, (newValue) => {
  localBilling.value = { ...newValue };
}, { deep: true });

// Watch the local ref for internal changes and emit update
watch(localBilling, (newValue) => {
  emit('update:modelValue', { ...newValue });
}, { deep: true });

// Rename reactive variable used in template
const billing = localBilling;

// Function to trigger shipping location update on relevant field changes
const handleLocationChange = () => {
    if (isBillingAddressEnabled.value) {
        // Consider debouncing
        updateShippingLocation();
    }
}
</script>

<template>
  <div class="grid w-full gap-x-4 gap-y-5 lg:grid-cols-2"> <!-- Adjusted gap -->
     <!-- First Name -->
    <div class="w-full">
      <label for="billing-first-name" class="form-label">{{ $t('messages.billing.firstName') }} <span class="text-red-600">*</span></label>
      <input id="billing-first-name" v-model.trim="billing.firstName" placeholder="John" autocomplete="given-name" type="text" class="form-input" required />
    </div>

    <!-- Last Name -->
    <div class="w-full">
      <label for="billing-last-name" class="form-label">{{ $t('messages.billing.lastName') }} <span class="text-red-600">*</span></label>
      <input id="billing-last-name" v-model.trim="billing.lastName" placeholder="Doe" autocomplete="family-name" type="text" class="form-input" required />
    </div>

     <!-- Company Name (Optional) -->
    <div class="w-full col-span-full">
      <label for="billing-company" class="form-label">{{ $t('messages.billing.company') }} ({{ $t('messages.general.optional') }})</label>
      <input id="billing-company" v-model.trim="billing.company" placeholder="Company Inc." autocomplete="organization" type="text" class="form-input" />
    </div>

    <!-- Address Line 1 -->
    <div v-if="isBillingAddressEnabled" class="w-full col-span-full">
      <label for="billing-address1" class="form-label">{{ $t('messages.billing.address1') }} <span class="text-red-600">*</span></label>
      <input id="billing-address1" v-model.trim="billing.address1" placeholder="123 Main St" autocomplete="street-address address-line1" type="text" class="form-input" required />
    </div>

    <!-- Address Line 2 (Optional) -->
    <div v-if="isBillingAddressEnabled" class="w-full col-span-full">
      <label for="billing-address2" class="form-label">{{ $t('messages.billing.address2') }} ({{ $t('messages.general.optional') }})</label>
      <input id="billing-address2" v-model.trim="billing.address2" placeholder="Apartment, suite, unit etc." autocomplete="address-line2" type="text" class="form-input" />
    </div>

    <!-- City -->
    <div v-if="isBillingAddressEnabled" class="w-full lg:col-span-1"> <!-- Adjusted span -->
      <label for="billing-city" class="form-label">{{ $t('messages.billing.city') }} <span class="text-red-600">*</span></label>
      <input id="billing-city" v-model.trim="billing.city" placeholder="Anytown" autocomplete="address-level2 locality" type="text" class="form-input" required />
    </div>
    <!-- Country -->
    <div v-if="isBillingAddressEnabled" class="w-full lg:col-span-1"> <!-- Adjusted span -->
      <label for="billing-country" class="form-label">{{ $t('messages.billing.country') }} <span class="text-red-600">*</span></label>
      <CountrySelect
           id="billing-country"
           v-model="billing.country"
           :default-value="'US'"
           @change="handleLocationChange"
           autocomplete="country"
           class="form-select"
           required />
    </div>

    <!-- State / County -->
    <div v-if="isBillingAddressEnabled" class="w-full lg:col-span-1"> <!-- Adjusted span -->
      <label for="billing-state" class="form-label">
          {{ $t('messages.billing.state') }}
           <span v-if="billing.country === 'US'" class="text-red-600">*</span> <!-- Example: Required for US -->
           <span v-else> ({{ $t('messages.general.optional') }})</span>
      </label>
      <StateSelect
        id="billing-state"
        v-model="billing.state"
        :default-value="billing.state"
        :country-code="billing.country"
        @change="handleLocationChange"
        autocomplete="address-level1"
        class="form-select" /> <!-- Use select class -->
        <!-- Add required based on country if needed -->
    </div>


    <!-- ZIP / Postal Code -->
    <div v-if="isBillingAddressEnabled" class="w-full lg:col-span-1"> <!-- Adjusted span -->
      <label for="billing-postcode" class="form-label">{{ $t('messages.billing.zip') }} <span class="text-red-600">*</span></label>
      <input id="billing-postcode" v-model.trim="billing.postcode" placeholder="12345" autocomplete="postal-code" type="text" class="form-input" @change="handleLocationChange" required />
    </div>

    <!-- Phone (Optional based on Woo settings) - Hidden as per request -->
    <div class="w-full col-span-full hidden">
      <label for="billing-phone" class="form-label">{{ $t('messages.billing.phone') }} ({{ $t('messages.general.optional') }})</label>
      <input id="billing-phone" v-model.trim="billing.phone" placeholder="+1 234 567 8901" autocomplete="tel" type="tel" class="form-input" />
    </div>

     <!-- Email (Required - Usually collected separately if guest checkout, but good to have here for account management) -->
     <div class="w-full col-span-full">
       <label for="billing-email" class="form-label">{{ $t('messages.billing.email') }} <span class="text-red-600">*</span></label>
       <input id="billing-email" v-model.trim="billing.email" placeholder="you@example.com" autocomplete="email" type="email" class="form-input" required />
     </div>
  </div>
</template>

<style lang="postcss" scoped>
/* Shared form input/select styles */
.form-label {
   @apply block mb-1 text-xs font-medium text-gray-600 uppercase;
}
.form-input, .form-select {
 @apply w-full p-3 text-sm bg-white border rounded-md outline-none border-gray-300 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-gray-50 disabled:cursor-not-allowed;
}
.form-select {
  @apply pr-10; /* Add padding for select dropdown arrow */
   background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
   background-position: right 0.5rem center;
   background-repeat: no-repeat;
   background-size: 1.5em 1.5em;
   -webkit-appearance: none;
      -moz-appearance: none;
           appearance: none;
}

/* Add error state styles if needed */
.form-input.error, .form-select.error {
   @apply border-red-500 focus:border-red-500 focus:ring-red-500;
}
</style>
