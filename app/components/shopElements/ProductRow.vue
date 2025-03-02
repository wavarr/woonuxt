<script setup>
import { computed } from 'vue';

const props = defineProps({
  products: { type: Array, default: null },
});

// Filter out undefined products to prevent errors in ProductCard
const validProducts = computed(() => {
  if (!props.products) return [];
  return props.products.filter(node => node !== undefined && node !== null);
});
</script>

<template>
  <div v-if="validProducts.length > 0" class="grid gap-8">
    <ProductCard
      v-for="(node, i) in validProducts"
      :key="node?.databaseId || i"
      class="w-full"
      :node="node"
      :index="i"
      :class="{
        hidden: i === validProducts.length - 1,
        'lg:block': i === validProducts.length - 1,
      }" />
  </div>
  <div v-else-if="products && products.length > 0 && validProducts.length === 0" class="text-center py-8">
    <p>Unable to display products at this time.</p>
  </div>
</template>
