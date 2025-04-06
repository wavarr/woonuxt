<script setup>
import { ref } from 'vue';

const loading = ref(true);
const error = ref(null);
const products = ref([]);

// Prevent eternal loading state
const timeoutRef = ref(null);

// Fetch products with a timeout
try {
  const { data } = await useAsyncGql('getProducts');
  products.value = data.value?.products?.nodes || [];
  loading.value = false;
  
  // Clear timeout if successful
  if (timeoutRef.value) {
    clearTimeout(timeoutRef.value);
  }
} catch (e) {
  console.error('Error fetching products:', e);
  error.value = e;
  loading.value = false;
}

// Set a timeout to prevent eternal loading state
timeoutRef.value = setTimeout(() => {
  if (loading.value) {
    loading.value = false;
    error.value = new Error('Request timed out. Please try again.');
  }
}, 8000);

// Clear timeout on component unmount
onUnmounted(() => {
  if (timeoutRef.value) {
    clearTimeout(timeoutRef.value);
  }
});
</script>

<template>
  <div class="container py-8">
    <div v-if="loading" class="flex justify-center items-center py-16">
      <div class="animate-pulse text-center">
        <p class="text-xl font-semibold">Loading products...</p>
      </div>
    </div>
    
    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative my-6">
      <strong class="font-bold">Error loading products!</strong>
      <p>{{ error.message || 'Please try again later.' }}</p>
    </div>
    
    <div v-else-if="products && products.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
    
    <div v-else class="text-center py-16">
      <p class="text-lg text-gray-600">No products found.</p>
    </div>
  </div>
</template> 
