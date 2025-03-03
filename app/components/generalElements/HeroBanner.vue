<template>
  <div class="relative">
    <!-- Background layers -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
    <div class="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
    
    <!-- Content -->
    <div class="relative flex flex-col items-start justify-center min-h-[90vh] px-8 py-16">
      <div class="max-w-4xl">
        <h1 class="text-left notable-font">
          <div class="text-5xl md:text-7xl lg:text-8xl text-white/90">Moda</div>
          <div class="text-6xl md:text-8xl lg:text-9xl text-white">Prime</div>
          <div class="text-5xl md:text-7xl lg:text-8xl text-white/90">USA</div>
        </h1>
        <p class="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
          Your trusted source for premium modafinil, operating from our USA office with professional service.
        </p>
        <NuxtLink 
          class="mt-8 px-8 py-4 font-bold text-white bg-primary hover:bg-primary-dark rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" 
          to="/products">
          Shop now
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const parallaxBg = ref(null);
const parallaxText = ref(null);

// Parallax scroll effect
const handleScroll = () => {
  if (!parallaxBg.value || !parallaxText.value) return;
  
  const scrollPosition = window.scrollY;
  
  // Background moves slower (parallax effect)
  parallaxBg.value.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  
  // Text moves faster for enhanced parallax effect
  parallaxText.value.style.transform = `translateY(${-scrollPosition * 1}px)`;
};

// Mouse hover effect for text
const initHoverEffects = () => {
  const elements = document.querySelectorAll('.hover-effect');
  
  elements.forEach(el => {
    el.addEventListener('mouseover', () => {
      el.classList.add('text-glow');
    });
    
    el.addEventListener('mouseout', () => {
      el.classList.remove('text-glow');
    });
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  initHoverEffects();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.notable-font {
  font-family: 'Notable', sans-serif;
  letter-spacing: -0.02em;
}

.text-primary {
  color: #5E38C6;
}

.bg-primary {
  background-color: #5E38C6;
}

.bg-primary-dark {
  background-color: #4A2B9C;
}

/* Responsive text adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style> 
