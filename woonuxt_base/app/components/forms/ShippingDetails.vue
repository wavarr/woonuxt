<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import type { PropType } from 'vue';
import type { CustomerAddress } from '~/types';
const { updateShippingLocation } = useCheckout();

const props = defineProps({
  modelValue: { type: Object as PropType<CustomerAddress>, required: true }, // Use specific type
});

const emit = defineEmits(['update:modelValue']);

// Use a local ref and watch for changes
const localShipping = ref({ ...props.modelValue });

// Watch the prop for external changes
watch(() => props.modelValue, (newValue) => {
  localShipping.value = { ...newValue };
}, { deep: true });

// Watch the local ref for internal changes and emit update
watch(localShipping, (newValue) => {
  emit('update:modelValue', { ...newValue });
}, { deep: true });

// Rename reactive variable used in template
const shipping = localShipping;

// Function to trigger shipping location update on relevant field changes
const handleLocationChange = () => {
    // Trigger location update whenever country, state, or postcode changes
    // Consider debouncing this if it causes performance issues
    updateShippingLocation();
}
</script>

<template>
  <div class="grid w-full gap-x-4 gap-y-5 lg:grid-cols-2"> <!-- Adjusted gap -->
    <!-- First Name -->
    <div class="w-full">
      <label for="shipping-first-name" class="form-label">{{ $t('messages.billing.firstName') }} <span class="text-red-600">*</span></label>
      <input id="shipping-first-name" v-model.trim="shipping.firstName" placeholder="John" autocomplete="given-name" type="text" class="form-input" required />
    </div>

    <!-- Last Name -->
    <div class="w-full">
      <label for="shipping-last-name" class="form-label">{{ $t('messages.billing.lastName') }} <span class="text-red-600">*</span></label>
      <input id="shipping-last-name" v-model.trim="shipping.lastName" placeholder="Doe" autocomplete="family-name" type="text" class="form-input" required />
    </div>

    <!-- Company (Optional) -->
    <div class="w-full col-span-full">
      <label for="shipping-company" class="form-label">{{ $t('messages.billing.company') }} ({{ $t('messages.general.optional') }})</label>
      <input id="shipping-company" v-model.trim="shipping.company" placeholder="Company Inc." autocomplete="organization" type="text" class="form-input" />
    </div>

    <!-- Address Line 1 -->
    <div class="w-full col-span-full">
      <label for="shipping-address1" class="form-label">{{ $t('messages.billing.address1') }} <span class="text-red-600">*</span></label>
      <input id="shipping-address1" v-model.trim="shipping.address1" placeholder="123 Main St" autocomplete="street-address address-line1" type="text" class="form-input" required />
    </div>

    <!-- Address Line 2 (Optional) -->
    <div class="w-full col-span-full">
      <label for="shipping-address2" class="form-label">{{ $t('messages.billing.address2') }} ({{ $t('messages.general.optional') }})</label>
      <input id="shipping-address2" v-model.trim="shipping.address2" placeholder="Apartment, suite, unit etc." autocomplete="address-line2" type="text" class="form-input" />
    </div>

    <!-- City -->
    <div class="w-full lg:col-span-1"> <!-- Adjusted span -->
      <label for="shipping-city" class="form-label">{{ $t('messages.billing.city') }} <span class="text-red-600">*</span></label>
      <input id="shipping-city" v-model.trim="shipping.city" placeholder="Anytown" autocomplete="address-level2 locality" type="text" class="form-input" required />
    </div>

    <!-- Country -->
    <div class="w-full lg:col-span-1"> <!-- Adjusted span -->
      <label for="shipping-country" class="form-label">{{ $t('messages.billing.country') }} <span class="text-red-600">*</span></label>
      <CountrySelect
        id="shipping-country"
        v-model="shipping.country"
        :default-value="shipping.country"
        @change="handleLocationChange"
        autocomplete="country"
        class="form-select" required />
    </div>

    <!-- State / County -->
    <div class="w-full lg:col-span-1"> <!-- Adjusted span -->
      <label for="shipping-state" class="form-label">
        {{ $t('messages.billing.state') }}
        <span v-if="shipping.country === 'US'" class="text-red-600">*</span> <!-- Example -->
        <span v-else>({{ $t('messages.general.optional') }})</span>
      </label>
      <StateSelect
        id="shipping-state"
        v-model="shipping.state"
        :default-value="shipping.state"
        :country-code="shipping.country"
        @change="handleLocationChange"
        autocomplete="address-level1"
        class="form-select" />
    </div>

    <!-- ZIP / Postal Code -->
    <div class="w-full lg:col-span-1"> <!-- Adjusted span -->
      <label for="shipping-postcode" class="form-label">{{ $t('messages.billing.zip') }} <span class="text-red-600">*</span></label>
      <input id="shipping-postcode" v-model.trim="shipping.postcode" placeholder="12345" autocomplete="postal-code" type="text" class="form-input" @change="handleLocationChange" required />
    </div>

    <!-- Phone (Often not needed for shipping, but depends on requirements) -->
    <!-- <div class="w-full col-span-full">
      <label for="shipping-phone" class="form-label">{{ $t('messages.billing.phone') }} ({{ $t('messages.general.optional') }})</label>
      <input id="shipping-phone" v-model.trim="shipping.phone" placeholder="+1 234 567 8901" autocomplete="tel" type="tel" class="form-input" />
    </div> -->
  </div>
</template>

<style lang="postcss" scoped>
/* Styles are inherited from BillingDetails via shared classes */
/* @import './BillingDetails.vue'; */ /* Removed problematic import */
/* Or define shared classes globally if preferred */

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
</style>
