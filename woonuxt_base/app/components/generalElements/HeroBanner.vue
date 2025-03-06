<template>
  <div class="relative w-full overflow-hidden banner-container bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#1d3557]">
    <!-- Background elements -->
    <div class="absolute inset-0 opacity-10">
      <div class="stars-pattern">
        <div v-for="n in 30" :key="n" class="star" :style="`top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; animation-delay: ${n * 0.2}s;`"></div>
      </div>
    </div>
    
    <!-- Main content -->
    <div class="container mx-auto px-4 py-16 md:py-24 relative z-10">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <!-- Left content -->
        <div class="w-full md:w-1/2 text-white mb-10 md:mb-0">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span class="text-[#e63946]">Moda</span>Prime <span class="text-[#f1faee]">USA</span>
          </h1>
          <p class="text-xl md:text-2xl mb-6 text-[#f1faee] font-light">Premium Modafinil Service</p>
          <p class="mb-8 text-[#a8dadc] max-w-lg">Boutique Modafinil Vendor with fast shipping, US to US. Quality products delivered discreetly to your doorstep.</p>
          
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/products" class="btn-primary">
              Shop Now
            </NuxtLink>
            <NuxtLink to="/contact" class="btn-secondary">
              Contact Us
            </NuxtLink>
          </div>
          
          <!-- Trust badges -->
          <div class="mt-10 flex items-center gap-6">
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-full bg-[#f1faee] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#1d3557]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-[#f1faee]">US Shipping</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-full bg-[#f1faee] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#1d3557]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span class="text-[#f1faee]">Secure Payment</span>
            </div>
          </div>
        </div>
        
        <!-- Right content - USA flag inspired design -->
        <div class="w-full md:w-1/2 flex justify-center">
          <div class="usa-flag-container relative w-full max-w-md aspect-[4/3]">
            <!-- Stars section -->
            <div class="absolute top-0 left-0 w-2/5 h-1/2 bg-[#1d3557] rounded-sm overflow-hidden flex items-center justify-center">
              <div class="stars-grid">
                <div v-for="n in 20" :key="`flag-star-${n}`" class="flag-star"></div>
              </div>
            </div>
            
            <!-- Stripes -->
            <div class="absolute top-0 right-0 w-3/5 h-1/2 overflow-hidden">
              <div v-for="n in 3" :key="`stripe-${n}`" 
                   :class="`stripe ${n % 2 === 0 ? 'bg-[#f1faee]' : 'bg-[#e63946]'}`"
                   :style="`top: ${(n-1) * 33.33}%`">
              </div>
            </div>
            
            <!-- Bottom half with product image or text -->
            <div class="absolute bottom-0 left-0 w-full h-1/2 bg-[#f1faee]/10 backdrop-blur-sm rounded-sm flex items-center justify-center overflow-hidden">
              <!-- Special offer announcement inside flag -->
              <div class="special-offer text-center p-4 w-full">
                <div class="announcement-badge mb-2 inline-block">
                  <span class="bg-[#e63946] text-white px-3 py-1 rounded-full text-xs font-bold">NEW CUSTOMERS</span>
                </div>
                <h3 class="text-[#f1faee] font-bold text-xl mb-1">10 FREE MODAWAKE</h3>
                <p class="text-[#a8dadc] text-sm px-2">Try ModaPrime today! Limit 1 per new customer.<br>Cannot be combined with other offers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Wave separator -->
    <div class="absolute bottom-0 left-0 w-full">
      <svg class="w-full h-16 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path class="fill-[#f1faee]" d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z"></path>
      </svg>
    </div>
    
    <!-- Navigation menu -->
    <div class="absolute bottom-0 left-0 w-full z-20">
      <div class="container mx-auto px-4">
        <nav class="flex justify-center space-x-8 md:space-x-12 py-2 relative z-30">
          <NuxtLink to="/" class="nav-link text-base md:text-lg font-medium">Home</NuxtLink>
          <NuxtLink to="/products" class="nav-link text-base md:text-lg font-medium">Products</NuxtLink>
          <NuxtLink to="/contact" class="nav-link text-base md:text-lg font-medium">Contact</NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Banner container */
.banner-container {
  min-height: 550px;
  position: relative;
}

/* Stars pattern */
.stars-pattern {
  width: 100%;
  height: 100%;
  position: relative;
}

.star {
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: white;
  border-radius: 50%;
  animation: twinkle 4s ease-in-out infinite;
}

@keyframes twinkle {
  0% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.2; transform: scale(0.8); }
}

/* USA Flag styling */
.usa-flag-container {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.5s ease;
}

.usa-flag-container:hover {
  transform: perspective(1000px) rotateY(0deg);
}

.stars-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 100%;
  height: 100%;
  padding: 10%;
}

.flag-star {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.flag-star::before {
  content: '★';
  color: white;
  font-size: 14px;
}

.stripe {
  position: absolute;
  width: 100%;
  height: 33.33%;
}

/* Button styling */
.btn-primary {
  @apply bg-[#e63946] hover:bg-[#e63946]/90 text-white font-medium py-3 px-6 rounded-md transition duration-300 inline-block;
}

.btn-secondary {
  @apply bg-transparent border-2 border-[#f1faee] hover:bg-[#f1faee]/10 text-[#f1faee] font-medium py-3 px-6 rounded-md transition duration-300 inline-block;
}

/* Navigation styling */
.nav-link {
  color: #1d3557;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #e63946;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #e63946;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.router-link-active {
  color: #e63946;
  font-weight: 600;
}

.router-link-active::after {
  width: 100%;
  background-color: #e63946;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .banner-container {
    min-height: 650px;
  }
}

/* Announcement badge animation */
.announcement-badge {
  animation: pulse 2s infinite;
  position: relative;
}

.announcement-badge::after {
  content: '';
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  border-radius: 9999px;
  background-color: rgba(230, 57, 70, 0.3);
  z-index: -1;
  animation: ripple 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes ripple {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* Special offer styling */
.special-offer {
  position: relative;
  overflow: hidden;
}

.special-offer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: shine 3s infinite;
}

.special-offer h3 {
  animation: glow 2s ease-in-out infinite alternate;
  text-shadow: 0 0 5px rgba(230, 57, 70, 0.5);
}

@keyframes shine {
  0% { left: -100%; }
  20% { left: 100%; }
  100% { left: 100%; }
}

@keyframes glow {
  from { text-shadow: 0 0 5px rgba(230, 57, 70, 0.5); }
  to { text-shadow: 0 0 15px rgba(230, 57, 70, 0.8), 0 0 20px rgba(241, 250, 238, 0.8); }
}
</style>

<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  // Add any additional functionality here if needed
});
</script> 
