<template>
  <div class="relative mx-auto w-full overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 text-white">
    <!-- Flowing background elements -->
    <div class="absolute inset-0 z-0">
      <div class="flowing-blob-1"></div>
      <div class="flowing-blob-2"></div>
      <div class="flowing-blob-3"></div>
    </div>
    
    <div class="container relative z-10 flex flex-col md:flex-row items-center justify-between py-16 md:py-24">
      <!-- Left content -->
      <div class="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
        <h1 class="text-left notable-font">
          <div class="text-block">
            <div class="text-white">Moda</div>
            <div class="text-white">Prime</div>
            <div class="text-white">USA</div>
          </div>
        </h1>
        <p class="mt-6 text-xl text-blue-100 max-w-md">Premium modafinil delivered across the USA with fast shipping and reliable service.</p>
        <div class="mt-8 flex flex-wrap gap-4">
          <NuxtLink class="px-8 py-4 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl" to="/products">
            Shop Now
            <span class="ml-2">→</span>
          </NuxtLink>
          <NuxtLink class="px-8 py-4 font-bold text-white bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-blue-700 transition-all" to="/contact">
            Contact Us
          </NuxtLink>
        </div>
      </div>
      
      <!-- Right content - Featured product or promo -->
      <div class="md:w-1/2 flex justify-center">
        <div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
          <div class="flex items-center gap-4 mb-4">
            <div class="bg-blue-500/20 rounded-2xl p-4">
              <svg class="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white mb-1">Special Offer</h3>
              <p class="text-blue-100">Free shipping on all orders over $150</p>
            </div>
          </div>
          
          <div class="w-full h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent my-6"></div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <p class="text-green-300">Limited time offer</p>
            </div>
            <NuxtLink 
              to="/products"
              class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full text-center transition-colors duration-300"
            >
              Shop Now
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Wave separator at bottom -->
    <div class="absolute bottom-0 left-0 w-full">
      <svg class="w-full h-16" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 120L48 105C96 90 192 60 288 55C384 50 480 70 576 75C672 80 768 70 864 65C960 60 1056 60 1152 70C1248 80 1344 100 1392 110L1440 120V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V120Z" fill="white"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.text-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 0.9;
  max-height: 75; 
}

.text-block div {
  font-size: clamp(2rem, 15vw, 6rem);
  white-space: nowrap;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Flowing blob animations */
.flowing-blob-1 {
  position: absolute;
  top: -15%;
  right: -10%;
  width: 50%;
  height: 70%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: morph 15s linear infinite alternate;
}

.flowing-blob-2 {
  position: absolute;
  bottom: -20%;
  left: -10%;
  width: 60%;
  height: 60%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: morph 18s linear infinite alternate-reverse;
}

.flowing-blob-3 {
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: morph 20s linear infinite alternate;
}

@keyframes morph {
  0% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
  25% {
    border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
  }
  50% {
    border-radius: 30% 70% 70% 30% / 70% 70% 30% 30%;
  }
  75% {
    border-radius: 70% 30% 30% 70% / 30% 30% 70% 70%;
  }
  100% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
}
</style>
