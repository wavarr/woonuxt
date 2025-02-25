<script setup lang="ts">
const { setProducts, updateProductList, products, productsLoading, productsError } = useProducts();
const route = useRoute();
const { storeSettings } = useAppConfig();
const { isQueryEmpty } = useHelpers();

const { data } = await useAsyncGql('getProducts');
const allProducts = (data.value?.products?.nodes || []) as Product[];
setProducts(allProducts);

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
  title: `Products`,
  meta: [{ hid: 'description', name: 'description', content: 'Products' }],
});
</script>

<template>
  <div class="container my-8">
    <h1 class="text-2xl font-bold mb-8">Products</h1>
    
    <div v-if="productsLoading" class="flex justify-center py-12">
      <LoadingIcon />
    </div>
    
    <div v-else-if="productsError" class="text-center py-12">
      <p class="text-red-500">{{ productsError }}</p>
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
