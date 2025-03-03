<script setup lang="ts">
import { ref } from 'vue';
import { useAppConfig, useSeoMeta } from '#imports';

const { siteName, description, shortDescription, siteImage } = useAppConfig();

// Fetch popular products
const popularProducts = ref([]);

// Set SEO metadata
useSeoMeta({
  title: `ModaPrime USA - Premium Pharmaceutical Service`,
  ogTitle: `${siteName} - USA Based Operations`,
  description: description,
  ogDescription: shortDescription,
  ogImage: siteImage,
  twitterCard: `summary_large_image`,
});
</script>

<template>
  <div>
    <HeroBanner />
    
    <!-- Featured Products Section -->
    <section class="py-24 bg-gray-50" v-if="popularProducts.length">
      <div class="container mx-auto px-8">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ $t('messages.shop.popularProducts') }}</h2>
            <p class="text-gray-600">Discover our most popular products</p>
          </div>
          <NuxtLink 
            class="inline-flex items-center text-primary hover:text-primary-dark transition-colors" 
            to="/products">
            View All
            <Icon name="ion:arrow-forward" class="ml-2" />
          </NuxtLink>
        </div>
        <ProductRow 
          :products="popularProducts" 
          class="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}

.text-primary {
  color: #5E38C6;
}

.text-primary-dark {
  color: #4A2B9C;
}
</style> 
