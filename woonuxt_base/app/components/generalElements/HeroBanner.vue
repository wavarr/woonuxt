<template>
  <div class="relative w-full bg-gradient-to-r from-blue-50 to-indigo-50 h-[100vh] overflow-hidden">
    <!-- Removed animated background elements and pattern -->

    <div class="container relative h-full mx-auto">
      <!-- Main Content -->
      <div class="relative z-10 h-full flex flex-col justify-center items-start px-4">
        <!-- Hero Text Section -->
        <div class="flex flex-col items-start w-full">
          <div class="overflow-hidden">
            <h1 
              class="text-[15vw] sm:text-[18vw] md:text-[20vw] font-black tracking-tighter leading-[0.85] motion-safe:animate-float notable-regular text-indigo-800"
              style="font-family: 'Notable', sans-serif; text-transform: uppercase; letter-spacing: -0.08em; word-wrap: break-word;"
            >
              <span class="block transform hover:scale-105 transition-transform duration-300 hero-text-animate" style="animation-delay: 0ms;">Moda</span>
              <span class="block transform hover:scale-105 transition-transform duration-300 hero-text-animate" style="animation-delay: 200ms;">Prime</span>
              <span class="block transform hover:scale-105 transition-transform duration-300 hero-text-animate" style="animation-delay: 400ms;">USA</span>
            </h1>
          </div>
          
          <p 
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-700 mt-4 leading-relaxed max-w-3xl hero-text-animate"
            style="animation-delay: 600ms; font-family: 'Poppins', sans-serif;"
          >
            <span class="font-semibold text-blue-600">Modafinil</span>
            <span class="text-gray-600"> - Premium Quality</span>
          </p>
          
          <div class="mt-8 flex flex-wrap gap-4 hero-text-animate" style="animation-delay: 800ms;">
            <NuxtLink 
              class="inline-flex items-center justify-center px-8 sm:px-10 py-4 text-xl sm:text-2xl font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              to="/products"
            >
              <span>Shop Now</span>
              <svg class="w-8 h-8 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            
            <NuxtLink 
              class="inline-flex items-center justify-center px-8 sm:px-10 py-4 text-xl sm:text-2xl font-semibold text-indigo-600 rounded-full border-2 border-indigo-600 hover:bg-indigo-50 transform hover:scale-105 transition-all duration-300"
              to="/about"
            >
              <span>Learn More</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
      <span class="text-gray-500 mb-2">Scroll Down</span>
      <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic here
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-reverse {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 7s ease-in-out infinite;
}

.hero-text-animate {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
