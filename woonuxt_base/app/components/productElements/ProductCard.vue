<script setup lang="ts">
defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="group">
    <NuxtLink :to="`/product/${product.slug}`" class="block">
      <div class="aspect-square bg-gray-50 rounded-sm overflow-hidden mb-3 transition-all duration-300 group-hover:opacity-90">
        <img 
          v-if="product.image?.sourceUrl" 
          :src="product.image.sourceUrl" 
          :alt="product.name"
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
          <span class="text-gray-400 text-sm">No Image</span>
        </div>
      </div>
      
      <h3 class="font-medium text-sm mb-1 group-hover:text-gray-900 transition-colors line-clamp-2">{{ product.name }}</h3>
      
      <div class="flex items-center justify-between">
        <div>
          <span 
            v-if="product.onSale" 
            class="text-gray-500 text-xs line-through mr-2"
          >
            {{ product.regularPrice }}
          </span>
          <span class="font-medium text-sm">{{ product.price }}</span>
        </div>
        
        <div v-if="product.onSale" class="text-xs bg-gray-900 text-white px-2 py-0.5 rounded-sm">
          Sale
        </div>
      </div>
    </NuxtLink>
    
    <button 
      class="mt-3 w-full px-3 py-1.5 border border-gray-900 text-gray-900 text-xs font-medium rounded-sm hover:bg-gray-900 hover:text-white transition-colors duration-300"
      @click="$emit('add-to-cart', product)"
    >
      Add to Cart
    </button>
  </div>
</template>
