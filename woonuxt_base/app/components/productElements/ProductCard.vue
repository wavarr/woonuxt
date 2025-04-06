<script setup lang="ts">
const route = useRoute();
const { storeSettings } = useAppConfig();
const { formatPrice, FALLBACK_IMG, stripHtml } = useHelpers(); // Import helpers

const props = defineProps({
  node: { type: Object as PropType<Product>, required: true },
  index: { type: Number, default: 1 }, // Used for eager/lazy loading
});

const imgWidth = 280; // Base width for calculation
const imgHeight = Math.round(imgWidth * 1.125); // Aspect ratio ~9:8

// Reactive reference to the filter query parameter 'pa_color'
const paColorFilter = computed(() => {
    const filterParam = route.query.filter as string;
    if (!filterParam) return [];
    const match = filterParam.match(/pa_color\[([^\]]+)\]/);
     // Decode values after splitting
    return match ? match[1].split(',').map(decodeURIComponent) : [];
});

// Determine the main image URL, providing a fallback
const mainImage = computed<string>(() => {
    // Prefer specific size for product card, then fallback
     return props.node?.image?.producCardSourceUrl || props.node?.image?.sourceUrl || FALLBACK_IMG;
});

// Determine the image to display based on active color filter (if any)
const imagetoDisplay = computed<string>(() => {
   // Only attempt variation image swap if color filter is active and product is variable
  if (paColorFilter.value.length && props.node?.type === 'VARIABLE' && props.node.variations?.nodes) {
    const activeColorValue = paColorFilter.value[0]; // Use first selected color value for simplicity

    const activeVariation = props.node.variations.nodes.find(variation =>
       // Check if variation attributes contain the selected color value
       variation.attributes?.some(attr => attr.name === 'pa_color' && attr.value === activeColorValue)
    );

     // Use variation image if found and valid, otherwise fallback to main image
     const variationImage = activeVariation?.image?.producCardSourceUrl || activeVariation?.image?.sourceUrl;
     if (variationImage) {
       return variationImage;
     }
  }
  // Default to main image if no filter, not variable, or no matching variation image
  return mainImage.value;
});

// Computed properties for cleaner template access
const productName = computed(() => stripHtml(props.node?.name || ''));
const productSlug = computed(() => props.node?.slug ? `/product/${decodeURIComponent(props.node.slug)}` : '#');
const averageRating = computed(() => props.node?.averageRating || 0);
const reviewCount = computed(() => props.node?.reviewCount || 0);
// Use base prices directly as format argument is removed
const salePrice = computed(() => props.node?.salePrice);
const regularPrice = computed(() => props.node?.regularPrice);
const imageAlt = computed(() => stripHtml(props.node?.image?.altText || props.node?.name || 'Product image'));
const imageTitle = computed(() => stripHtml(props.node?.image?.title || props.node?.name || ''));
</script>

<template>
  <div class="relative group flex flex-col h-full"> <!-- Flex column and h-full for consistent card height -->
    <NuxtLink v-if="node.slug" :to="productSlug" :title="productName" class="block mb-2 flex-shrink-0 relative">
      <SaleBadge v-if="node.onSale" :node="node" class="absolute top-2 right-2 z-10" />
      <NuxtImg
        :src="imagetoDisplay"
        :alt="imageAlt"
        :title="imageTitle"
        :width="imgWidth"
        :height="imgHeight"
        :sizes="`(max-width: 640px) 50vw, (max-width: 1024px) 33vw, ${imgWidth}px`" <!-- Responsive sizes -->
        :loading="index < 4 ? 'eager' : 'lazy'" <!-- Eager load first few images -->
        format="webp" <!-- Use modern format -->
        quality="80" <!-- Adjust quality -->
        fit="cover" <!-- Ensure image covers area -->
        class="rounded-lg object-cover w-full aspect-[8/9] transition-transform duration-300 ease-in-out group-hover:scale-105 skeleton" <!-- Adjusted aspect ratio, hover effect -->
        placeholder <!-- Enable placeholder -->
         />
    </NuxtLink>

     <!-- Ensure content below image takes remaining space -->
    <div class="p-2 flex flex-col flex-grow">
       <!-- Star Rating (optional) -->
       <StarRating v-if="storeSettings.showReviews" :rating="averageRating" :count="reviewCount" class="mb-1 h-5" /> <!-- Added height -->
        <div v-else class="h-5 mb-1"></div> <!-- Placeholder for consistent height -->

      <!-- Product Name -->
      <NuxtLink v-if="node.slug" :to="productSlug" :title="productName" class="flex-grow"> <!-- Allow name to grow -->
        <h2 class="mb-2 text-sm font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2"> <!-- Adjusted font size, weight, line clamp -->
            {{ productName }}
        </h2>
      </NuxtLink>
      <h2 v-else class="mb-2 text-sm font-medium leading-tight line-clamp-2 flex-grow">{{ productName }}</h2>

      <!-- Price -->
      <ProductPrice class="text-sm mt-auto pt-1" :sale-price="salePrice" :regular-price="regularPrice" /> <!-- mt-auto pushes price down -->

    </div>
  </div>
</template>

<style scoped>
/* Add skeleton styles if NuxtImg placeholder isn't sufficient */
/* img.skeleton { ... } */
</style>