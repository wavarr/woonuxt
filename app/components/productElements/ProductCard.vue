<script setup lang="ts">
import { computed } from 'vue';

// Define props with default values
const props = defineProps({
  product: {
    type: Object,
    default: null
  },
  node: {
    type: Object,
    default: null
  },
  index: { type: Number, default: 0 },
});

// Determine the actual product data from either product or node prop
const productData = computed(() => {
  // If both are undefined, return a safe default object
  if (!props.product && !props.node) {
    console.warn('ProductCard: No product data provided');
    return { __typename: 'EmptyProduct' };
  }
  
  // Use whichever is available
  const data = props.product || props.node;
  
  // Safety check for data
  if (!data) {
    console.warn('ProductCard: Product data is null or undefined');
    return { __typename: 'EmptyProduct' };
  }
  
  return data;
});

// Extract product type safely
const productType = computed(() => {
  if (productData.value.__typename === 'EmptyProduct') return 'EmptyProduct';
  return productData.value.__typename || '';
});

// Extract product slug safely
const productSlug = computed(() => {
  if (productType.value === 'EmptyProduct') return '';
  
  if (productType.value === 'SimpleProduct' || productType.value === 'VariableProduct') {
    return productData.value?.slug || '';
  }
  
  return productData.value?.product?.slug || '';
});

// Extract product name safely
const productName = computed(() => {
  if (productType.value === 'EmptyProduct') return '';
  
  if (productType.value === 'SimpleProduct' || productType.value === 'VariableProduct') {
    return productData.value?.name || '';
  }
  
  return productData.value?.product?.name || '';
});

// Extract product image safely
const productImage = computed(() => {
  if (productType.value === 'EmptyProduct') return null;
  
  if (productType.value === 'SimpleProduct' || productType.value === 'VariableProduct') {
    return productData.value?.image || null;
  }
  
  return productData.value?.product?.image || null;
});

// Extract product price safely
const productPrice = computed(() => {
  if (productType.value === 'EmptyProduct') return '';
  
  if (productType.value === 'SimpleProduct' || productType.value === 'VariableProduct') {
    return productData.value?.price || '';
  }
  
  return productData.value?.product?.price || '';
});

// Extract product regular price safely
const productRegularPrice = computed(() => {
  if (productType.value === 'EmptyProduct') return '';
  
  if (productType.value === 'SimpleProduct' || productType.value === 'VariableProduct') {
    return productData.value?.regularPrice || '';
  }
  
  return productData.value?.product?.regularPrice || '';
});

// Determine if product is on sale
const isOnSale = computed(() => {
  if (productType.value === 'EmptyProduct') return false;
  
  if (productType.value === 'SimpleProduct' || productType.value === 'VariableProduct') {
    return productData.value?.onSale || false;
  }
  
  return productData.value?.product?.onSale || false;
});

// Extract stock status safely
const stockStatus = computed(() => {
  if (productType.value === 'EmptyProduct') return 'OUT_OF_STOCK';
  
  if (productType.value === 'SimpleProduct' || productType.value === 'VariableProduct') {
    return productData.value?.stockStatus || 'OUT_OF_STOCK';
  }
  
  return productData.value?.product?.stockStatus || 'OUT_OF_STOCK';
});
</script>

<template>
  <div v-if="productType !== 'EmptyProduct'" class="product-card group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-2">
    <NuxtLink :to="`/product/${productSlug}`" class="relative flex-1">
      <!-- Product Image -->
      <div class="aspect-h-1 aspect-w-1 relative overflow-hidden rounded-md bg-gray-100">
        <NuxtImg
          v-if="productImage && productImage.sourceUrl"
          :src="productImage.sourceUrl"
          :alt="productImage.altText || productName"
          width="500"
          height="500"
          class="h-full w-full object-cover object-center transition-opacity group-hover:opacity-75" />
        <div v-else class="flex h-full items-center justify-center bg-gray-100">
          <span class="text-sm text-gray-500">No image available</span>
        </div>
      </div>

      <!-- Sale Badge -->
      <SaleBadge v-if="isOnSale" class="absolute left-2 top-2" />

      <!-- Wishlist Button -->
      <WishList :product-id="productData.databaseId" class="absolute right-2 top-2" />
    </NuxtLink>

    <!-- Product Info -->
    <div class="mt-2 flex flex-col space-y-1">
      <NuxtLink :to="`/product/${productSlug}`" class="text-sm font-medium text-gray-900 hover:text-primary">
        {{ productName }}
      </NuxtLink>

      <!-- Price -->
      <ProductPrice :price="productPrice" :regular-price="productRegularPrice" :sale="isOnSale" />

      <!-- Stock Status -->
      <div v-if="stockStatus === 'OUT_OF_STOCK'" class="text-xs text-red-500">
        Out of stock
      </div>
    </div>
  </div>
  <div v-else class="product-card group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-2">
    <div class="aspect-h-1 aspect-w-1 relative overflow-hidden rounded-md bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <span class="text-sm text-gray-500">Product unavailable</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  transition: all 0.2s ease;
}
.product-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
