<script setup lang="ts">
const route = useRoute();
const { storeSettings } = useAppConfig();
const props = defineProps({
  node: { type: Object as PropType<Product>, required: true },
  index: { type: Number, default: 1 },
});

const imgWidth = 280;
const imgHeight = Math.round(imgWidth * 1.125);

// example: ?filter=pa_color[green,blue],pa_size[large]
const filterQuery = ref(route.query?.filter as string);
const paColor = ref(filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || []);

// watch filterQuery
watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter as string;
    paColor.value = filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || [];
  },
);

const mainImage = computed<string>(() => props.node?.image?.producCardSourceUrl || props.node?.image?.sourceUrl || '/images/placeholder.jpg');
const imagetoDisplay = computed<string>(() => {
  if (paColor.value.length) {
    const activeColorImage = props.node?.variations?.nodes.filter((variation) => {
      const hasMatchingAttributes = variation.attributes?.nodes.some((attribute) => paColor.value.some((color) => attribute?.value?.includes(color)));
      const hasMatchingSlug = paColor.value.some((color) => variation.slug?.includes(color));
      return hasMatchingAttributes || hasMatchingSlug;
    });
    if (activeColorImage?.length) return activeColorImage[0]?.image?.producCardSourceUrl || activeColorImage[0]?.image?.sourceUrl || mainImage.value;
  }
  return mainImage.value;
});

const { addToCart } = useCart();

const addToCartQuick = (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (props.node.databaseId) {
    addToCart({ productId: props.node.databaseId, quantity: 1 });
  }
};
</script>

<template>
  <div class="relative group product-card" data-scroll-reveal="enter bottom move 20px over 0.6s after 0.1s">
    <NuxtLink v-if="node.slug" :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name" class="product-link">
      <SaleBadge :node class="absolute top-2 right-2 z-10" />
      <div class="overflow-hidden rounded-t-lg product-image-container">
        <NuxtImg
          v-if="imagetoDisplay"
          :width="imgWidth"
          :height="imgHeight"
          :src="imagetoDisplay"
          :alt="node.image?.altText || node.name || 'Product image'"
          :title="node.image?.title || node.name"
          :loading="index <= 3 ? 'eager' : 'lazy'"
          :sizes="`sm:${imgWidth / 2}px md:${imgWidth}px`"
          class="rounded-t-lg object-top object-cover w-full aspect-9/8 transition-transform duration-500 group-hover:scale-110"
          placeholder
          placeholder-class="blur-xl" />
      </div>
    </NuxtLink>
    <div class="p-4 bg-gray-100 rounded-b-lg">
      <StarRating v-if="storeSettings.showReviews" :rating="node.averageRating" :count="node.reviewCount" />
      <NuxtLink v-if="node.slug" :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name">
        <h2 class="mb-2 font-medium leading-tight group-hover:text-navy-blue transition-colors duration-300">{{ node.name }}</h2>
      </NuxtLink>
      <div class="flex items-center justify-between">
        <ProductPrice class="text-sm" :sale-price="node.salePrice" :regular-price="node.regularPrice" />
        <button 
          @click="addToCartQuick" 
          class="p-2 text-gray-600 bg-white rounded-full hover:bg-usa-red hover:text-white transition-colors duration-300 shadow-sm"
          :title="`Add ${node.name} to cart`"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.product-card {
  @apply bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300;
}

.product-card:hover {
  @apply shadow-md transform -translate-y-1;
}

.product-image-container {
  @apply overflow-hidden bg-gray-100;
}

/* Scroll reveal fallback */
[data-scroll-reveal] {
  opacity: 0;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

[data-scroll-reveal].is-revealed {
  opacity: 1;
  transform: translateY(0) translateX(0);
}

/* Fallback for browsers without JS */
@media (prefers-reduced-motion: reduce) {
  [data-scroll-reveal] {
    opacity: 1;
    transform: none !important;
    transition: none !important;
  }
}
</style>
