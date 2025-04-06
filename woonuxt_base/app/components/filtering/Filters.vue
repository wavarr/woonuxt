<script setup lang="ts">
import { TaxonomyEnum } from '#woo';

const { isFiltersActive, filterQuery } = useFiltering(); // Get filterQuery for reactivity
const { removeBodyClass } = useHelpers();
const runtimeConfig = useRuntimeConfig();
const { storeSettings } = useAppConfig();

// hide-categories prop is used to hide the category filter on the product category page
const { hideCategories } = defineProps({ hideCategories: { type: Boolean, default: false } });

// Fetch all necessary terms for filters
const globalProductAttributes = (runtimeConfig?.public?.GLOBAL_PRODUCT_ATTRIBUTES as WooNuxtFilter[]) || [];
const taxonomiesToFetch = globalProductAttributes
    .map((attr) => attr?.slug?.toUpperCase().replace(/_/g, '')) // Convert slug to TaxonomyEnum convention (e.g., pa_color -> PACOLOR)
    .filter(Boolean) as TaxonomyEnum[]; // Filter out any null/undefined results

// Add PRODUCTCATEGORY if not hidden
if (!hideCategories) {
  taxonomiesToFetch.push(TaxonomyEnum.PRODUCTCATEGORY);
}
// Add PRODUCTTAG if tag filtering is enabled
if (storeSettings.enableTagFiltering) {
    taxonomiesToFetch.push(TaxonomyEnum.PRODUCTTAG);
}


const { data, pending: termsPending, error: termsError } = await useAsyncGql('getAllTerms', { taxonomies: taxonomiesToFetch });

if (termsError.value) {
  console.error("Error fetching filter terms:", termsError.value);
}

// Process terms once fetched
const terms = computed(() => data.value?.terms?.nodes || []);

// Filter terms by taxonomy
const productCategoryTerms = computed(() => hideCategories ? [] : terms.value.filter((term) => term.taxonomyName === 'product_cat'));
const productTagTerms = computed(() => storeSettings.enableTagFiltering ? terms.value.filter((term) => term.taxonomyName === 'product_tag') : []);

// Map attributes to their terms
const attributesWithTerms = computed(() => {
  return globalProductAttributes.map((attr) => ({
    ...attr,
    terms: terms.value.filter((term) => term.taxonomyName === attr.slug),
  })).filter(attr => attr.terms.length > 0); // Only include attributes that have terms
});

// Close filter sidebar when clicking overlay
const closeFilters = () => {
    removeBodyClass('show-filters');
}
</script>

<template>
  <aside id="filters" class="custom-scrollbar"> <!-- Added custom scrollbar class -->
    <div class="flex justify-between items-center mb-6 md:mb-8">
        <h3 class="text-xl font-semibold">Filters</h3>
        <button @click="closeFilters" class="p-1 -mr-2 md:hidden hover:bg-gray-100 rounded-md" aria-label="Close Filters">
            <Icon name="ion:close-outline" size="24" />
        </button>
    </div>

    <!-- Loading/Error State -->
     <div v-if="termsPending" class="text-center py-10">
        <LoadingIcon />
        <p class="text-sm text-gray-500 mt-2">Loading filters...</p>
     </div>
     <div v-else-if="termsError" class="text-center py-10 text-red-500">
        Error loading filters.
     </div>

     <!-- Filter Sections -->
    <div v-else class="relative z-30 grid space-y-6 divide-y divide-gray-100">
      <!-- Order By (Mobile) -->
      <OrderByDropdown class="block w-full md:hidden" />

       <!-- Price -->
      <PriceFilter class="pt-6 first:pt-0" />

      <!-- Categories -->
      <CategoryFilter v-if="productCategoryTerms.length" :terms="productCategoryTerms" class="pt-6 first:pt-0" />

      <!-- Attributes -->
      <div v-for="attribute in attributesWithTerms" :key="attribute.slug" class="pt-6 first:pt-0">
         <!-- Specific rendering for color -->
        <ColorFilter v-if="attribute.slug == 'pa_color' || attribute.slug == 'pa_colour'" :attribute="attribute" />
         <!-- Generic filter for other attributes -->
        <GlobalFilter v-else :attribute="attribute" />
      </div>

       <!-- Tags -->
       <TagFilter v-if="productTagTerms.length" :terms="productTagTerms" class="pt-6 first:pt-0" />

       <!-- Sale Items -->
      <OnSaleFilter class="pt-6 first:pt-0" />

      <!-- Rating -->
      <LazyStarRatingFilter v-if="storeSettings.showReviews" class="pt-6 first:pt-0" />

      <!-- Reset Button -->
      <LazyResetFiltersButton v-if="isFiltersActive" class="pt-8 pb-4 sticky bottom-0 bg-white" /> <!-- Sticky reset button -->
    </div>
  </aside>
  <!-- Overlay for mobile -->
  <div class="fixed inset-0 z-50 hidden bg-black/50 filter-overlay md:hidden" @click="closeFilters"></div> <!-- Darker overlay -->
</template>

<style lang="postcss">
/* Mobile Filter Panel Styling */
@media (max-width: 767px) { /* Below md breakpoint */
  #filters {
    @apply fixed inset-y-0 left-0 z-[60] bg-white h-full p-6 transform -translate-x-full transition-transform ease-in-out duration-300 overflow-y-auto w-[300px] max-w-[85vw] shadow-xl;
  }

  .show-filters #filters {
    @apply translate-x-0;
  }
  .show-filters .filter-overlay {
    @apply block; /* Show overlay */
  }
  .show-filters {
    overflow: hidden; /* Prevent body scroll when filters are open */
  }
}

/* Filter Section Styling */
#filters .pt-6:not(:first-child) {
   /* padding-top: 1.5rem; */ /* Consistent padding */
}

#filters .divide-y > *:not(:first-child) {
    @apply border-t border-gray-200; /* Slightly darker divider */
}

/* Price Slider Styles (if using noUiSlider) */
#filters .noUi-connect {
  @apply bg-primary; /* Slider connection color */
}
#filters .noUi-handle {
   @apply rounded-full border border-primary bg-white shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1;
    width: 18px !important;
    height: 18px !important;
    right: -9px !important;
    top: -7px !important;
}
#filters .noUi-handle::after,
#filters .noUi-handle::before {
    content: none; /* Remove default handle pseudo-elements */
}


/* Custom Scrollbar (already defined in app.vue, applied here via class) */
/* .custom-scrollbar::-webkit-scrollbar { ... } */
/* .custom-scrollbar::-webkit-scrollbar-track { ... } */
/* .custom-scrollbar::-webkit-scrollbar-thumb { ... } */

</style>