<script setup lang="ts">
import { computed } from 'vue';``

// No need to import computed in Nuxt as it's globally available

const props = defineProps({
  node: {
    type: Object,
    default: null
  },
  product: {
    type: Object,
    default: null
  },
  index: {
    type: Number,
    default: 0
  }
});

// Extract product data with proper type handling
const productData = computed(() => {
  const productSource = props.node || props.product;
  
  // Handle different product types
  if (productSource?.__typename === 'SimpleProduct' || productSource?.__typename === 'VariableProduct') {
    return productSource;
  }
  
  // For products that might be wrapped in a node structure
  if (productSource?.node) {
    return productSource.node;
  }
  
  return productSource;
});

const productSlug = computed(() => productData.value?.slug || '');
const productName = computed(() => productData.value?.name || 'Product');
const productImage = computed(() => productData.value?.image || null);
const productPrice = computed(() => productData.value?.price || '');
const productRegularPrice = computed(() => productData.value?.regularPrice || '');
const isOnSale = computed(() => productData.value?.onSale || false);
const stockStatus = computed(() => productData.value?.stockStatus || 'IN_STOCK');

// Animation delay based on index
const animationDelay = computed(() => `${props.index * 100}ms`);
</script>

<template>
  <NuxtLink 
    :to="productSlug ? `/product/${productSlug}` : '#'" 
    class="product-card group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
    :style="{ 'animation-delay': animationDelay }"
  >
    <!-- Sale badge -->
    <div v-if="isOnSale" class="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
      SALE
    </div>
    
    <!-- Image with fallback -->
    <div class="aspect-h-1 aspect-w-1 bg-gray-100 sm:aspect-none group-hover:opacity-90 h-48 sm:h-60 overflow-hidden">
      <img
        v-if="productImage && productImage.sourceUrl"
        :src="productImage.sourceUrl"
        :alt="productImage.altText || productName"
        class="h-full w-full object-contain object-center sm:h-full sm:w-full transition-transform duration-500 group-hover:scale-110"
      />
      <div v-else class="flex h-full w-full items-center justify-center bg-gray-100">
        <span class="text-gray-400">No image</span>
      </div>
    </div>

    <!-- Product details -->
    <div class="flex flex-1 flex-col space-y-2 p-4 bg-white">
      <h3 class="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">{{ productName }}</h3>
      
      <div class="flex-1 flex items-end">
        <p class="text-base font-medium text-gray-900" v-html="productPrice"></p>
        <p v-if="isOnSale && productRegularPrice" class="ml-2 text-sm text-gray-500 line-through" v-html="productRegularPrice"></p>
      </div>
      
      <div class="text-xs flex justify-between items-center">
        <span v-if="stockStatus === 'IN_STOCK'" class="text-green-600 font-medium">In Stock</span>
        <span v-else-if="stockStatus === 'OUT_OF_STOCK'" class="text-red-600 font-medium">Out of Stock</span>
        <span v-else class="text-yellow-600 font-medium">{{ stockStatus }}</span>
        
        <span class="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">View Details →</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary, #4f46e5);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
