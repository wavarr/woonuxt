<script setup lang="ts">
const { cart, toggleCart, isUpdatingCart } = useCart();
const { formatPrice } = useHelpers(); // Import formatPrice

const formattedTotal = computed(() => {
    // Use formatPrice helper if available and cart total exists
    // Fetch the base 'total' field now
    return cart.value?.total ? formatPrice(cart.value.total) : '...';
});

const formattedSubtotal = computed(() => {
    return cart.value?.subtotal ? formatPrice(cart.value.subtotal) : '...';
});
</script>

<template>
  <div class="fixed top-0 bottom-0 right-0 z-50 flex flex-col w-11/12 max-w-md bg-white shadow-lg overflow-hidden"> <!-- Adjusted max-width -->
     <!-- Header -->
     <div class="flex items-center justify-between p-4 border-b">
         <h2 class="text-lg font-semibold">
             {{ $t('messages.shop.cart') }}
             <span v-if="cart?.contents?.productCount"> ({{ cart?.contents?.productCount }}) </span>
         </h2>
         <button @click="toggleCart(false)" class="p-1 rounded-md hover:bg-gray-100" aria-label="Close Cart">
            <Icon name="ion:close-outline" size="28" />
         </button>
     </div>

     <!-- Cart Content -->
     <div class="flex-1 overflow-y-auto">
        <ClientOnly>
          <template v-if="cart && !cart.isEmpty">
            <ul class="flex flex-col gap-4 p-4 divide-y divide-gray-100"> <!-- Added padding and divider -->
              <CartCard v-for="item in cart.contents?.nodes" :key="item.key" :item="item" />
            </ul>
          </template>
          <!-- Empty Cart Message -->
          <EmptyCartMessage v-else-if="cart && cart.isEmpty" class="p-8"/>
          <!-- Cart Loading Initial State -->
          <div v-else class="flex flex-col items-center justify-center h-full">
            <LoadingIcon size="40" />
             <p class="mt-4 text-gray-500">Loading cart...</p>
          </div>
        </ClientOnly>
     </div>


    <!-- Footer / Checkout Button -->
     <div class="p-4 border-t" v-if="cart && !cart.isEmpty">
         <!-- Totals Summary (Optional) -->
         <div class="flex justify-between mb-4 text-sm">
             <span class="text-gray-600">{{ $t('messages.shop.subtotal') }}</span>
             <!-- Use formatted subtotal -->
             <span class="font-medium" v-html="formattedSubtotal"></span>
         </div>
          <!-- Add more totals like shipping, discounts if needed -->

          <!-- Checkout Button -->
         <NuxtLink
            class="block w-full p-3 text-lg font-semibold text-center text-white rounded-lg shadow-md bg-primary justify-evenly hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            to="/checkout"
            @click="toggleCart(false)"> <!-- Close cart on click -->
            <span class="mx-2">{{ $t('messages.shop.checkout') }}</span>
            <span v-html="formattedTotal"></span> <!-- Use formatted total -->
         </NuxtLink>
     </div>

    <!-- Cart Updating Overlay -->
    <div v-if="isUpdatingCart" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
      <LoadingIcon size="40"/>
    </div>
  </div>
</template>