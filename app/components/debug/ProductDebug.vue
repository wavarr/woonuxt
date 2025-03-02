<script setup>
const props = defineProps({
  products: Array,
  loading: Boolean,
  error: [String, Object, null]
});
</script>

<template>
  <div v-if="import.meta.env.DEV" class="fixed bottom-0 right-0 bg-white border p-4 max-w-md max-h-96 overflow-auto z-50">
    <h3 class="font-bold">Product Debug</h3>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <p>Products: {{ products?.length || 0 }}</p>
      <details>
        <summary>First product data</summary>
        <pre class="text-xs">{{ products && products.length > 0 ? JSON.stringify(products[0], null, 2) : 'No products' }}</pre>
      </details>
    </div>
  </div>
</template> 
