<script setup lang="ts">
import { ProductsOrderByEnum } from '#woo';

const { t } = useI18n();
const { products, setProducts, updateProductList } = useProducts(); // Removed fetchProducts as initial load is handled by useAsyncGql
const { frontEndUrl } = useHelpers();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const title = ref(t('messages.shop.products'));
const isLoading = ref(true); // Keep local loading state for initial load indication

// Use route params or query for initial variables (pagination, sorting from URL)
const initialPage = computed(() => parseInt(route.params.pageNumber as string || route.query.page as string || '1'));
const initialSort = computed(() => {
    // Example: derive sort from query param 'orderby=price&order=asc'
    const orderByField = (route.query.orderby as string || 'date').toUpperCase() as ProductsOrderByEnum;
    const orderDirection = (route.query.order as string || 'desc').toUpperCase() as OrderEnum;
    return { field: orderByField, order: orderDirection };
});
// Add initial filter parsing if needed

// Initial fetch of products using useAsyncGql for SSR/hydration
const { data, error, pending } = await useAsyncGql('getProducts', {
    first: runtimeConfig.public.PRODUCTS_PER_PAGE, // Fetch only the first page initially
    // Add other initial variables based on route/defaults if needed
    // orderby: initialSort.value.field,
    // order: initialSort.value.order,
    // after: ... calculate cursor if needed ...
});

watch(pending, (newPending) => {
  // Update local loading only if products haven't been loaded yet
  if (products.value.length === 0) {
    isLoading.value = newPending;
  } else {
      // If products already exist, pending likely indicates a background update/filter change
      // You might want a different loading indicator for this (e.g., overlay on grid)
      isLoading.value = false; // Assume main load complete once products are present
  }
});

if (error.value) {
  console.error("Error fetching initial products:", error.value);
  // Handle error display or logging
  setProducts([]); // Clear products on error
}

// Set products once initial data is available
watch(data, (newData) => {
  const fetchedProducts = newData?.products?.nodes || [];
  // Only set initial products if the 'products' state is currently empty
  // This prevents overwriting filtered lists on route changes if useAsyncGql re-runs
  if (products.value.length === 0 && fetchedProducts.length > 0) {
     console.log("Setting initial products from useAsyncGql");
     setProducts(fetchedProducts); // Use setProducts from composable
     isLoading.value = false; // Explicitly stop loading indicator
  } else if (!pending.value && products.value.length === 0) {
     // Handle case where fetch completes but no products are found initially
     console.log("Initial fetch returned no products.");
     setProducts([]);
     isLoading.value = false;
  }
}, { immediate: true }); // Immediate watcher to process initial data

// Update product list when route query changes (filters, sort, search)
// This will trigger filtering/sorting/searching within useProducts composable
watch(() => route.query, () => {
    console.log("Route query changed, triggering updateProductList");
    updateProductList();
}, { deep: true });


useHead({
  title: title,
  meta: [{ name: 'description', content: `Products` }],
  link: [{ rel: 'canonical', href: `${frontEndUrl}/products` }],
});
</script>

<template>
  <main class="container pt-4 pb-24">
    <div class="flex items-center justify-between mb-6"> <!-- Added margin-bottom -->
      <h1 class="text-2xl font-bold tracking-tight text-gray-900">
        {{ title }}
      </h1>
      <div class="flex items-center gap-4"> <!-- Grouped controls -->
          <OrderByDropdown class="hidden md:block" />
          <FilterTrigger class="md:hidden" />
      </div>
    </div>

    <div class="flex flex-col gap-8 lg:flex-row lg:gap-12"> <!-- Adjusted gap -->
       <!-- Filters Sidebar -->
       <div class="w-full lg:w-1/4 lg:max-w-[280px] xl:max-w-[300px]"> <!-- Sized sidebar -->
          <Filters class="hidden lg:block" />
       </div>

      <!-- Main Content Area -->
      <div class="flex-1 min-w-0"> <!-- Added min-w-0 -->
         <ProductSearchInput class="mb-6 lg:hidden" /> <!-- Adjusted margin -->
         <ActiveFilters class="mb-6" />
         <!-- Loading state for initial load -->
         <div v-if="isLoading" class="flex items-center justify-center min-h-[400px]">
             <LoadingIcon size="40" />
             <p class="ml-3 text-gray-500">Loading products...</p>
         </div>
          <!-- Product Grid Display -->
         <div v-else>
             <ProductGrid />
         </div>
      </div>
    </div>
  </main>
</template>