<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

// Debug the product structure
console.log('Product in card:', props.product);

// Extract product data with proper type handling
const productData = computed(() => {
  // Handle different product types
  if (props.product.__typename === 'SimpleProduct' || props.product.__typename === 'VariableProduct') {
    return props.product;
  }
  
  // For products that might be wrapped in a node structure
  if (props.product.node) {
    return props.product.node;
  }
  
  return props.product;
});

const productSlug = computed(() => productData.value?.slug || '');
const productName = computed(() => productData.value?.name || 'Product');
const productImage = computed(() => productData.value?.image || null);
const productPrice = computed(() => productData.value?.price || '');
const productRegularPrice = computed(() => productData.value?.regularPrice || '');
const isOnSale = computed(() => productData.value?.onSale || false);
const stockStatus = computed(() => productData.value?.stockStatus || 'IN_STOCK');
</script>

<template>
  <NuxtLink 
    :to="productSlug ? `/product/${productSlug}` : '#'" 
    class="group relative flex flex-col overflow-hidden rounded-lg border hover:border-primary"
  >
    <!-- Image with fallback -->
    <div class="aspect-h-1 aspect-w-1 bg-gray-100 sm:aspect-none group-hover:opacity-75 h-48 sm:h-60">
      <img
        v-if="productImage && productImage.sourceUrl"
        :src="productImage.sourceUrl"
        :alt="productImage.altText || productName"
        class="h-full w-full object-contain object-center sm:h-full sm:w-full"
      />
      <div v-else class="flex h-full w-full items-center justify-center bg-gray-100">
        <span class="text-gray-400">No image</span>
      </div>
    </div>

    <!-- Product details -->
    <div class="flex flex-1 flex-col space-y-2 p-4">
      <h3 class="text-sm font-medium text-gray-900">{{ productName }}</h3>
      
      <div class="flex-1 flex items-end">
        <p class="text-base font-medium text-gray-900" v-html="productPrice"></p>
        <p v-if="isOnSale && productRegularPrice" class="ml-2 text-sm text-gray-500 line-through" v-html="productRegularPrice"></p>
      </div>
      
      <div class="text-xs">
        <span v-if="stockStatus === 'IN_STOCK'" class="text-green-600">In Stock</span>
        <span v-else-if="stockStatus === 'OUT_OF_STOCK'" class="text-red-600">Out of Stock</span>
        <span v-else class="text-yellow-600">{{ stockStatus }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
}
</style>
