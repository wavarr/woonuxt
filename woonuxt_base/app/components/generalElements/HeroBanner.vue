<script setup>
// Slideshow data
const slides = [
  {
    id: 1,
    title: 'Premium Quality Products',
    subtitle: 'Curated selection of high-quality items',
    cta: {
      text: 'Shop Now',
      link: '/products'
    },
    image: 'https://via.placeholder.com/1200x600'
  },
  {
    id: 2,
    title: 'Efficient Delivery',
    subtitle: 'Fast shipping on all orders',
    cta: {
      text: 'Learn More',
      link: '/about'
    },
    image: 'https://via.placeholder.com/1200x600'
  }
];

const currentSlide = ref(0);
const slideInterval = ref(null);

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
  resetInterval();
};

const resetInterval = () => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value);
  }
  slideInterval.value = window.setInterval(nextSlide, 5000);
};

onMounted(() => {
  resetInterval();
});

onUnmounted(() => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value);
  }
});
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Slides -->
    <div class="relative h-[400px] md:h-[500px]">
      <div 
        v-for="(slide, index) in slides" 
        :key="slide.id"
        class="absolute inset-0 transition-opacity duration-500"
        :class="index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      >
        <img 
          :src="slide.image" 
          :alt="slide.title"
          class="w-full h-full object-cover"
        />
        
        <div class="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center text-white px-4 max-w-xl">
            <h2 class="text-2xl md:text-4xl font-medium mb-2 md:mb-4">{{ slide.title }}</h2>
            <p class="text-sm md:text-base mb-4 md:mb-6 opacity-90">{{ slide.subtitle }}</p>
            <NuxtLink 
              :to="slide.cta.link" 
              class="inline-block px-5 py-2 bg-white text-gray-900 text-sm font-medium rounded-sm hover:bg-gray-100 transition-colors duration-300"
            >
              {{ slide.cta.text }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Navigation Arrows -->
    <button 
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-sm rounded-sm text-white hover:bg-opacity-50 transition-colors"
      aria-label="Previous slide"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button 
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-sm rounded-sm text-white hover:bg-opacity-50 transition-colors"
      aria-label="Next slide"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
      </svg>
    </button>
    
    <!-- Dots -->
    <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
      <button 
        v-for="(slide, index) in slides" 
        :key="slide.id"
        @click="goToSlide(index)"
        class="w-2 h-2 rounded-full transition-colors"
        :class="index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </div>
</template>
