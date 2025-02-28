<!-- woonuxt_base/app/pages/products.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Products</h1>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="animate-pulse">
        <div class="bg-gray-200 h-48 rounded-lg mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg">
      {{ error }}
      <button 
        @click="fetchProducts" 
        class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="product in products" :key="product.id" class="border rounded-lg p-4">
        <h2 class="text-lg font-semibold">{{ product.name }}</h2>
        <p class="text-gray-600">Price: {{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGraphQL } from '~/composables/useGraphQL'

const products = ref([])
const loading = ref(true)
const error = ref(null)

const PRODUCTS_QUERY = `
  query GetProducts {
    products(first: 10) {
      nodes {
        id
        name
        ... on SimpleProduct {
          price
          regularPrice
        }
      }
    }
  }
`

const fetchProducts = async () => {
  try {
    loading.value = true
    const { executeQuery } = useGraphQL()
    const data = await executeQuery(PRODUCTS_QUERY)
    products.value = data.products.nodes
  } catch (e) {
    error.value = e.message
    console.error('Error fetching products:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>
