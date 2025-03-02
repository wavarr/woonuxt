<template>
  <div class="cart-fallback">
    <div v-if="isLoading" class="loading">
      <p class="text-center py-4">Loading cart...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p class="text-red-500 py-4">Error loading cart. Using fallback mode.</p>
      <pre v-if="process.dev" class="text-xs bg-gray-100 p-2 rounded">{{ error.message }}</pre>
    </div>
    
    <div v-else class="cart-content">
      <div v-if="cartData?.contents?.nodes?.length" class="cart-items">
        <div v-for="item in cartData.contents.nodes" :key="item.key" class="cart-item flex items-center p-2 border-b">
          <div class="item-details flex-grow">
            <p class="font-medium">{{ item.product?.node?.name || 'Product' }}</p>
            <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
          </div>
          <div class="item-price">
            {{ item.subtotal }}
          </div>
        </div>
        
        <div class="cart-totals mt-4 p-2">
          <div class="flex justify-between">
            <span>Subtotal:</span>
            <span>{{ cartData.subtotal }}</span>
          </div>
          <div class="flex justify-between font-bold">
            <span>Total:</span>
            <span>{{ cartData.total }}</span>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-cart p-4 text-center">
        <p>Your cart is empty</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartFallback } from '~/composables/useCartFallback';

const { cartData, isLoading, error, initializeCart } = useCartFallback();

// Initialize cart on component mount
onMounted(async () => {
  await initializeCart();
});
</script>

<style scoped>
.cart-fallback {
  @apply bg-white rounded-lg shadow p-4;
}
</style> 
