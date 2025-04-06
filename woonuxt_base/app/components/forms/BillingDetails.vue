<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { CustomerAddress } from '~/types';
const { updateShippingLocation } = useCheckout();
const { isBillingAddressEnabled } = useCart();

const props = defineProps({
  modelValue: { type: Object as PropType<CustomerAddress>, required: true }, // Use specific type
});

// Emit update event for v-model
const emit = defineEmits(['update:modelValue']);

// Local ref for reactive editing, updated via computed setter/getter
const billing = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

// Function to trigger shipping location update on relevant field changes
const handleLocationChange = () => {
    // Only update if billing address is enabled (as it affects shipping calcs)
    if (isBillingAddressEnabled.value) {
        // Debounce or delay update if needed to avoid excessive requests
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
