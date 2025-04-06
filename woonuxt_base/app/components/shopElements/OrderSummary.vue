<script setup>
const { cart, isUpdatingCart, isUpdatingCoupon } = useCart(); // Add isUpdatingCoupon
const { formatPrice } = useHelpers();

const isLoading = computed(() => isUpdatingCart.value || isUpdatingCoupon.value);

// Helper to format prices, handling potential null values from cart
const formatCartPrice = (value) => value ? formatPrice(value) : '...';

// Computed properties for totals using the helper
const formattedSubtotal = computed(() => formatCartPrice(cart.value?.subtotal));
const formattedShippingTotal = computed(() => {
    // Check if shipping total exists and is greater than 0
    const rawShipping = parseFloat(cart.value?.rawShippingTotal || '0');
    if (rawShipping > 0) {
        return formatCartPrice(cart.value?.shippingTotal);
    } else if (cart.value?.needsShippingAddress) {
        // If shipping is needed but not calculated yet
        return t('messages.general.calculatedAtCheckout');
    } else {
        // If no shipping needed or free shipping
        return formatCartPrice('0'); // Display as $0.00 or equivalent
    }
});
const formattedDiscountTotal = computed(() => formatCartPrice(cart.value?.discountTotal));
const formattedTotal = computed(() => formatCartPrice(cart.value?.total));

const hasDiscount = computed(() => cart.value?.discountTotal && parseFloat(cart.value?.rawDiscountTotal || '0') > 0);

</script>

<template>
  <aside v-if="cart" class="relative w-full p-6 bg-white rounded-lg shadow-lg md:max-w-md md:sticky md:top-24 sm:p-8"> <!-- Adjusted padding and sticky top -->
    <h2 class="mb-6 text-xl font-semibold leading-none">{{ $t('messages.shop.orderSummary') }}</h2>

     <!-- Cart Items -->
    <div class="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar mb-6"> <!-- Scrollable area for items -->
        <ul v-if="cart.contents?.nodes?.length" class="flex flex-col gap-4 divide-y divide-gray-100">
          <CartCard v-for="item in cart.contents.nodes" :key="item.key" :item="item" />
        </ul>
         <p v-else class="text-sm text-center text-gray-500">Your cart is empty.</p>
    </div>


    <AddCoupon class="my-6" />

    <!-- Totals Section -->
    <div class="grid gap-2 text-sm">
      <!-- Subtotal -->
      <div class="flex justify-between">
        <span class="text-gray-600">{{ $t('messages.shop.subtotal') }}</span>
        <span class="font-medium text-gray-900 tabular-nums" v-html="formattedSubtotal" />
      </div>

      <!-- Shipping -->
      <div class="flex justify-between">
         <span class="text-gray-600">{{ $t('messages.general.shipping') }}</span>
         <span class="font-medium text-gray-900 tabular-nums">
            {{ formattedShippingTotal }}
         </span>
      </div>

       <!-- Discount -->
      <Transition name="scale-y" mode="out-in">
        <div v-if="hasDiscount" class="flex justify-between text-primary">
          <span>{{ $t('messages.shop.discount') }}</span>
          <span class="font-medium tabular-nums">- <span v-html="formattedDiscountTotal" /></span>
        </div>
      </Transition>

       <!-- Grand Total -->
      <div class="flex justify-between pt-2 mt-2 text-base border-t">
        <span class="font-semibold text-gray-900">{{ $t('messages.shop.total') }}</span>
        <span class="text-lg font-bold text-gray-900 tabular-nums" v-html="formattedTotal" />
      </div>
    </div>

     <!-- Slot for Checkout Button -->
    <slot></slot>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-white rounded-lg bg-opacity-60 backdrop-blur-sm">
      <LoadingIcon />
    </div>
  </aside>
   <!-- Placeholder if cart is not yet loaded -->
   <aside v-else class="relative w-full p-6 bg-white rounded-lg shadow-lg md:max-w-md md:sticky md:top-24 sm:p-8 min-h-[400px] flex items-center justify-center">
       <LoadingIcon />
   </aside>
</template>

<style scoped>
/* Custom scrollbar styles can be reused or defined here */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}

/* Ensure scale-y transition works */
.scale-y-enter-active,
.scale-y-leave-active {
  transition: all 0.2s ease-out;
  max-height: 50px; /* Adjust as needed */
}
.scale-y-enter-from,
.scale-y-leave-to {
  opacity: 0;
  transform: scaleY(0.8);
  max-height: 0;
}

/* Form styles */
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
