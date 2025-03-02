<template>
  <div class="products-fallback">
    <div v-if="isLoading" class="loading">
      <p class="text-center py-4">Loading products...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p class="text-red-500 py-4">Error loading products. Using fallback mode.</p>
      <pre v-if="process.dev" class="text-xs bg-gray-100 p-2 rounded">{{ error.message }}</pre>
    </div>
    
    <div v-else class="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="product in productsData" :key="product.id" class="product-card bg-white rounded-lg shadow overflow-hidden">
        <div class="product-image relative pb-[100%]">
          <img 
            v-if="product.featuredImage?.node?.sourceUrl" 
            :src="product.featuredImage.node.sourceUrl" 
            :alt="product.featuredImage.node.altText || product.name"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div v-else class="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span class="text-gray-400">No image</span>
          </div>
          
          <div v-if="product.onSale" class="sale-badge absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Sale
          </div>
        </div>
        
        <div class="product-details p-4">
          <h3 class="product-title font-medium text-lg mb-2">{{ product.name }}</h3>
          
          <div class="product-price mb-2">
            <span v-if="product.onSale" class="text-red-500 font-bold mr-2">{{ product.salePrice }}</span>
            <span :class="{ 'line-through text-gray-500': product.onSale }">{{ product.regularPrice }}</span>
          </div>
          
          <div class="product-stock text-sm" :class="{ 'text-green-600': product.stockStatus === 'IN_STOCK', 'text-red-600': product.stockStatus !== 'IN_STOCK' }">
            {{ product.stockStatus === 'IN_STOCK' ? 'In Stock' : 'Out of Stock' }}
          </div>
          
          <div class="product-actions mt-4">
            <NuxtLink :to="`/product/${product.slug}`" class="view-button bg-blue-600 text-white px-4 py-2 rounded block text-center hover:bg-blue-700 transition">
              View Product
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <div v-if="productsData.length === 0" class="col-span-full text-center py-8">
        <p>No products found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsFallback } from '~/composables/useProductsFallback';

const props = defineProps({
  limit: {
    type: Number,
    default: 10
  },
  category: {
    type: String,
    default: null
  }
});

const { productsData, isLoading, error, fetchProducts } = useProductsFallback({
  limit: props.limit,
  category: props.category
});

// Fetch products on component mount
onMounted(async () => {
  await fetchProducts();
});
</script>

<style scoped>
.products-fallback {
  @apply w-full;
}
</style> 
