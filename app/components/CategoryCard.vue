<script setup lang="ts">
import { PropType } from 'vue';
import { useHelpers } from '~/composables/useHelpers';

const { FALLBACK_IMG } = useHelpers();
const props = defineProps({
  node: { type: Object, required: true },
  imageLoading: { type: String as PropType<'lazy' | 'eager'>, default: 'lazy' },
});

const imgWidth = 400;
const imgHeight = 300;
</script>

<template>
  <NuxtLink
    v-if="node"
    :to="`/product-category/${decodeURIComponent(node.slug)}`"
    class="relative flex justify-center overflow-hidden rounded-xl group hover:shadow-lg transition-all duration-300">
    <NuxtImg
      :width="imgWidth"
      :height="imgHeight"
      class="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      :src="node.image?.sourceUrl || FALLBACK_IMG"
      :alt="node.image?.altText || node.name"
      :title="node.image?.title || node.name"
      :loading="imageLoading"
      :sizes="`sm:${imgWidth}px md:${imgWidth}px`"
      placeholder
      placeholder-class="blur-xl" />
    <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent h-1/2" />
    <span class="relative z-10 mt-auto mb-4 text-lg font-semibold text-white capitalize md:text-xl" v-html="node.name" />
  </NuxtLink>
</template>

<style lang="postcss" scoped>
.group:hover {
  transform: translateY(-2px);
}
</style> 
