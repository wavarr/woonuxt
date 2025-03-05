<template>
  <section class="featured-products-section relative py-16 w-full">
    <!-- Katusha tiling background -->
    <div class="absolute inset-0 katusha-pattern opacity-10"></div>
    
    <!-- Flowing top wave in red, white, blue theme -->
    <div class="absolute top-0 left-0 w-full overflow-hidden">
      <svg class="w-full h-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,0 C240,95 480,120 720,120 C960,120 1200,95 1440,0 L1440,120 L0,120 Z" fill="white"></path>
      </svg>
    </div>
    
    <div class="container mx-auto px-4 relative z-10">
      <h2 class="text-3xl font-bold text-center mb-4 relative text-navy-blue" data-scroll-reveal="enter top move 20px over 0.6s after 0.2s">
        Featured Products
      </h2>
      <p class="text-center text-gray-600 mb-8 max-w-2xl mx-auto" data-scroll-reveal="enter top move 20px over 0.6s after 0.3s">
        Discover our most popular products, carefully selected for quality and effectiveness.
      </p>
      
      <div class="flowing-underline mx-auto mb-12"></div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="(product, index) in featuredProducts" :key="product.id" :node="product" :index="index" />
      </div>
    </div>
    
    <!-- Flowing bottom wave in red, white, blue theme -->
    <div class="absolute bottom-0 left-0 w-full overflow-hidden">
      <svg class="w-full h-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,120 C100,60 200,90 300,60 C400,30 500,60 600,90 C700,120 800,90 900,60 C1000,30 1100,60 1200,90 C1300,120 1400,90 1440,80 L1440,0 L0,0 Z" fill="white"></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

// Sample featured products - replace with your actual data source
const featuredProducts = ref([]);

// Fetch featured products
onMounted(async () => {
  try {
    // Replace with your actual data fetching logic
    const { data } = await useAsyncGql('getProducts', { 
      first: 4, 
      featured: true 
    });
    
    if (data.value?.products?.nodes) {
      featuredProducts.value = data.value.products.nodes;
    }
    
    // Scroll reveal implementation
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    
    const revealOnScroll = () => {
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('is-revealed');
        } else {
          element.classList.remove('is-revealed');
        }
      });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    // Initial check
    revealOnScroll();
    
    // Cleanup
    onUnmounted(() => {
      window.removeEventListener('scroll', revealOnScroll);
    });
    
  } catch (error) {
    console.error('Error fetching featured products:', error);
  }
});
</script>

<style scoped>
.katusha-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.featured-products-section {
  overflow: hidden;
  position: relative;
  background-color: #f8f9fa;
}

.flowing-underline {
  height: 3px;
  width: 100px;
  background: linear-gradient(90deg, #e63946, #ffffff, #1d3557);
  position: relative;
}

.flowing-underline::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #e63946, #ffffff, #1d3557);
  animation: flow 2s linear infinite;
}

@keyframes flow {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
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
