<script setup lang="ts">
const route = useRoute();
const { productsPerPage } = useHelpers();
const { products } = useProducts(); // Get products state from composable

// Determine current page from route params or default to 1
const page = computed(() => parseInt(route.params.pageNumber as string) || 1);

// Calculate the products to display for the current page
const productsToShow = computed(() => {
  const startIndex = (page.value - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  // Slice the products array managed by useProducts
   // Filter out null products before slicing, just in case
  return products.value.filter(p => p !== null).slice(startIndex, endIndex);
});

// Watch for changes in the products list (e.g., after filtering/sorting)
// This ensures the grid updates correctly even if the page number doesn't change
watch(products, () => {
  // console.log("Product list updated in ProductGrid watcher, count:", products.value.length);
  // No specific action needed here unless manual re-calculation is required,
  // as productsToShow computed property will react automatically.
}, { deep: true }); // Deep watch might be needed if product properties change

</script>

<template>
  <div class="relative w-full">
    <Transition name="fade" mode="out-in">
       <!-- Show grid only if there are products for the current page -->
      <div v-if="productsToShow.length" key="grid">
        <TransitionGroup name="product-card" tag="div" class="product-grid">
          <ProductCard v-for="(node, i) in productsToShow" :key="node.databaseId || node.id || i" :node="node" :index="i" />
        </TransitionGroup>
        <Pagination /> <!-- Pagination component handles page numbers -->
      </div>
       <!-- Show 'No Products Found' only if the *entire* list is empty after filtering -->
       <NoProductsFound v-else-if="!products.length" key="no-products"/>
       <!-- Optional: Handle cases where current page has no products but others might -->
       <div v-else key="empty-page" class="text-center py-16 text-gray-500">
          <p>No more products found for this page.</p>
          <!-- Optional: Link back to page 1 or clear filters -->
       </div>
    </Transition>
  </div>
</template>

<style lang="postcss" scoped>
.product-grid {
  @apply my-4 grid min-h-[400px] gap-4 md:gap-6 lg:gap-8 lg:my-8; /* Adjusted gap */
  /* Responsive columns using auto-fill and minmax */
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Smaller min for more columns on small screens */
}

/* Media queries for more controlled column counts */
@media (min-width: 640px) { /* sm */
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}
@media (min-width: 768px) { /* md */
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
@media (min-width: 1024px) { /* lg */
 .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  }
}


/* Transition for product cards */
.product-card-move, /* Moving existing card */
.product-card-enter-active,
.product-card-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1); /* Smoother transition */
}

.product-card-enter-from,
.product-card-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px); /* Subtle scale and slide */
}

/* Ensure leaving items absolute positioned for smooth transition */
.product-card-leave-active {
  position: absolute;
  /* Calculate width based on column count (example for 4 columns, adjust as needed) */
  /* This might be tricky and depend on the exact grid setup */
   width: calc( (100% / 4) - 1.5rem ); /* Approximate width */
   /* Consider using JS to calculate exact width if transitions are jumpy */
}

/* Fade transition for the whole grid vs NoProductsFound */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>