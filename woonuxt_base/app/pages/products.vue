<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute, useHead } from '#imports';
import { useProducts } from '~/composables/useProducts';
import { useHelpers } from '~/composables/useHelpers';
import { useAppConfig } from '#app';
import type { Product } from '~/types';

// Use auto-imports instead of explicit imports
const { setProducts, updateProductList, products, productsLoading, productsError } = useProducts();
const route = useRoute();
const { storeSettings } = useAppConfig();
const { isQueryEmpty } = useHelpers();
const nuxtApp = useNuxtApp();

const isLoading = ref(true);

const fetchInitialProducts = async () => {
  try {
    isLoading.value = true;
    const { data } = await useAsyncQuery('getProducts');
    
    if (!data.value) {
      throw new Error('No data received');
    }
    
    const allProducts = (data.value?.products?.nodes || []) as Product[];
    setProducts(allProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
  }
};

// Use defineAsyncComponent for the initial fetch
await nuxtApp.runWithContext(fetchInitialProducts);

onMounted(() => {
  if (!isQueryEmpty.value) updateProductList();
});

watch(
  () => route.query,
  () => {
    if (route.name !== 'products') return;
    updateProductList();
  },
);

useHead({
  title: 'Products',
  meta: [{ hid: 'description', name: 'description', content: 'Products' }],
});
</script>

<template>
  <div class="container my-8">
    <h1 class="text-2xl font-bold mb-8">Products</h1>
    
    <div v-if="isLoading || productsLoading" class="flex justify-center py-12">
      <LoadingIcon />
    </div>
    
    <div v-else-if="productsError" class="text-center py-12">
      <p class="text-red-500">{{ productsError }}</p>
      <button 
        @click="fetchInitialProducts" 
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
    
    <div v-else-if="products && products.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    
    <div v-else class="text-center py-12">
      <p>No products found.</p>
    </div>
    
    <!-- Add debug component -->
    <DebugProductDebug :products="products" :loading="productsLoading" :error="productsError" />
  </div>
</template>
