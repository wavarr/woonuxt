<template>
  <div class="relative group is-revealed">
    <NuxtLink v-if="node.slug" :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name" class="block">
      <SaleBadge :node="node" class="absolute top-4 right-4 z-10" />
      <div class="relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 group-hover:shadow-xl">
        <NuxtImg
          v-if="imagetoDisplay"
          :width="imgWidth"
          :height="imgHeight"
          :src="imagetoDisplay"
          :alt="node.image?.altText || node.name || 'Product image'"
          :title="node.image?.title || node.name"
          :loading="index <= 3 ? 'eager' : 'lazy'"
          :sizes="`sm:${imgWidth / 2}px md:${imgWidth}px`"
          class="w-full aspect-9/8 object-cover transition-transform duration-300 group-hover:scale-105"
          placeholder
          placeholder-class="blur-xl" />
      </div>
    </NuxtLink>
    <div class="p-4">
      <StarRating v-if="storeSettings.showReviews" :rating="node.averageRating" :count="node.reviewCount" class="mb-2" />
      <NuxtLink v-if="node.slug" :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name">
        <h2 class="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">{{ node.name }}</h2>
      </NuxtLink>
      <ProductPrice class="mt-2 text-lg font-semibold" :sale-price="node.salePrice" :regular-price="node.regularPrice" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  node: {
    type: Object,
    required: true
  },
  imagetoDisplay: {
    type: String,
    default: ''
  },
  imgWidth: {
    type: Number,
    default: 400
  },
  imgHeight: {
    type: Number,
    default: 400
  },
  index: {
    type: Number,
    default: 0
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-primary {
  color: #5E38C6;
}

/* Make sure products are visible */
.is-revealed {
  opacity: 1 !important;
  transform: translateY(0) translateX(0) !important;
}
</style> 
