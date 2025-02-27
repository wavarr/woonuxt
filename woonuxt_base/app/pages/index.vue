<script setup lang="ts">
// Declare auto-imported composables for TypeScript
declare const ref: any;
declare const onMounted: any;
declare const useAsyncGql: any;
declare const useSeoMeta: any;
declare const useHead: any;

// Import components
import HeroBanner from '../components/HeroBanner/HeroBanner.vue';

// Fetch product categories
const { data: categoriesData } = await useAsyncGql('getProductCategories', { first: 6 });
const categories = categoriesData.value?.productCategories?.nodes || [];

// Fetch popular products
const { data: productsData } = await useAsyncGql('getProducts', { 
  first: 8,
  where: { 
    orderby: [{ field: 'TOTAL_SALES', order: 'DESC' }] 
  } 
});
const products = productsData.value?.products?.nodes || [];

// Set SEO metadata
useSeoMeta({
  title: 'Premium Products - Quality Selection',
  description: 'Discover our curated collection of premium products. Quality items at competitive prices.',
  ogTitle: 'Premium Products - Quality Selection',
  ogDescription: 'Discover our curated collection of premium products. Quality items at competitive prices.',
  ogImage: '/images/og-image.jpg',
});

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://modaprimeusa.com'
    }
  ]
});
</script>

<template>
  <div>
    <!-- Hero Banner -->
    <HeroBanner />
    
    <!-- Featured Categories -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-2xl md:text-3xl font-medium mb-3">Categories</h2>
          <p class="text-gray-600 max-w-2xl mx-auto text-sm">Browse our selection of quality products.</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          <div v-for="category in categories" :key="category.id" class="group">
            <NuxtLink :to="`/product-category/${category.slug}`" class="block">
              <div class="aspect-square bg-gray-100 rounded-sm overflow-hidden mb-2 transition-all duration-300 group-hover:opacity-90">
                <img 
                  v-if="category.image?.sourceUrl" 
                  :src="category.image.sourceUrl" 
                  :alt="category.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
                  <span class="text-gray-400 text-sm">No Image</span>
                </div>
              </div>
              <h3 class="text-sm font-medium text-center group-hover:text-gray-900 transition-colors">{{ category.name }}</h3>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Popular Products -->
    <section class="py-12 md:py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-2xl md:text-3xl font-medium mb-3">Popular Products</h2>
          <p class="text-gray-600 max-w-2xl mx-auto text-sm">Our most sought-after items.</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        
        <div class="text-center mt-10">
          <NuxtLink 
            to="/products" 
            class="inline-block px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-sm hover:bg-black transition-colors duration-300"
          >
            View All Products
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Benefits -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-2xl md:text-3xl font-medium mb-3">Our Advantages</h2>
          <p class="text-gray-600 max-w-2xl mx-auto text-sm">What sets us apart.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center p-6 border border-gray-100 rounded-sm hover:border-gray-200 transition-colors">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-700 rounded-sm mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-base font-medium mb-2">Quality Assurance</h3>
            <p class="text-gray-600 text-sm">Every product meets our strict quality standards.</p>
          </div>
          
          <div class="text-center p-6 border border-gray-100 rounded-sm hover:border-gray-200 transition-colors">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-700 rounded-sm mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-base font-medium mb-2">Efficient Shipping</h3>
            <p class="text-gray-600 text-sm">Fast processing and delivery of all orders.</p>
          </div>
          
          <div class="text-center p-6 border border-gray-100 rounded-sm hover:border-gray-200 transition-colors">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-700 rounded-sm mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-base font-medium mb-2">Simple Returns</h3>
            <p class="text-gray-600 text-sm">30-day return policy for your peace of mind.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter -->
    <section class="py-12 md:py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-xl mx-auto text-center">
          <h2 class="text-2xl md:text-3xl font-medium mb-3">Stay Updated</h2>
          <p class="text-gray-600 mb-6 text-sm">Subscribe to receive notifications about new products and offers.</p>
          
          <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Email address" 
              class="flex-1 px-4 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gray-400"
            />
            <button 
              type="submit" 
              class="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-sm hover:bg-black transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
          <p class="text-gray-500 mt-4 text-xs">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  </div>
</template>
