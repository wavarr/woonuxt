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
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight notable-font">
            <span class="text-[#e63946]">Moda</span>Prime <span class="text-[#f1faee]">USA</span>
          </h1>
          <p class="text-xl md:text-2xl mb-6 text-[#f1faee] font-light">The Gold Standard</p>
          
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
          <div class="usa-flag-container relative w-full max-w-md aspect-[4/3] waving-flag">
            <!-- Stars section -->
            <div class="absolute top-0 left-0 w-2/5 h-1/2 bg-[#1d3557] rounded-sm overflow-hidden flex items-center justify-center flag-stars-section">
              <div class="stars-grid">
                <div v-for="n in 20" :key="`flag-star-${n}`" class="flag-star"></div>
              </div>
            </div>
            
            <!-- Stripes - Top half -->
            <div class="absolute top-0 right-0 w-3/5 h-1/2 overflow-hidden flag-stripes-section">
              <div v-for="n in 3" :key="`stripe-top-${n}`" 
                   :class="`stripe ${n % 2 === 0 ? 'bg-[#f1faee]' : 'bg-[#e63946]'}`"
                   :style="`top: ${(n-1) * 33.33}%`">
              </div>
            </div>
            
            <!-- Bottom half with additional stripes and product text -->
            <div class="absolute bottom-0 left-0 w-full h-1/2 bg-transparent rounded-sm flex items-center justify-center overflow-hidden flag-content-section">
              <!-- Additional stripes for bottom half - white, red, white pattern -->
              <div class="stripe bg-[#f1faee]" style="top: 0%"></div>
              <div class="stripe bg-[#e63946]" style="top: 33.33%"></div>
              <div class="stripe bg-[#f1faee]" style="top: 66.66%"></div>
              
              <!-- Special offer announcement inside flag -->
              <div class="special-offer text-center relative z-10">
                <div class="announcement-badge mb-2 inline-block">
                  <span class="bg-[#e63946] text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-[#ffd700] new-customer-badge">NEW CUSTOMERS</span>
                </div>
                
                <!-- Split into segments for better wave animation -->
                <div class="offer-segments">
                  <div class="offer-segment">
                    <h3 class="text-white font-bold text-xl mb-1 special-offer-text">10 FREE MODAWAKE</h3>
                  </div>
                  <div class="offer-segment">
                    <p class="text-white text-sm px-2 special-offer-description">Try ModaPrime today! Limit 1 per new customer.</p>
                  </div>
                  <div class="offer-segment">
                    <p class="text-white text-sm px-2 special-offer-description">Cannot be combined with other offers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Wave separator with gradient - changed to navy blue and flipped -->
    <div class="absolute bottom-0 left-0 w-full">
      <svg class="w-full h-16 md:h-24 wave-separator" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#1d3557" />
            <stop offset="50%" style="stop-color:#457b9d" />
            <stop offset="100%" style="stop-color:#1d3557" />
          </linearGradient>
        </defs>
        <path fill="url(#waveGradient)" d="M0,50 C240,0 480,100 720,0 C960,100 1200,0 1440,50 L1440,100 L0,100 Z"></path>
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* Import Notable font from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Notable&display=swap');

/* Notable font class */
.notable-font {
  font-family: 'Notable', sans-serif;
  letter-spacing: 1px;
}

/* Banner container */
.banner-container {
  min-height: 550px;
  position: relative;
}

/* Wave separator styling */
svg.wave-separator {
  margin-top: 0px;
  background-color: #1d3557;
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
  position: relative;
}

.usa-flag-container:hover {
  transform: perspective(1000px) rotateY(0deg);
}

.usa-flag-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(192,192,192,0.4) 0%, rgba(255,255,255,0.8) 25%, rgba(160,160,160,0.3) 50%, rgba(255,255,255,0.6) 75%, rgba(192,192,192,0.4) 100%);
  opacity: 0.3;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: overlay;
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
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
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

.announcement-badge span {
  border-color: #ffd700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5), inset 0 0 5px rgba(255, 215, 0, 0.3);
  background-image: linear-gradient(to bottom, #ffd700, #b8860b);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
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
  padding-top: 10px;
  position: relative;
  z-index: 10;
  text-align: center;
}

.special-offer h3 {
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 0, 0, 0.4);
  letter-spacing: 1px;
  font-weight: 800;
}

.new-customer-badge {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.special-offer-text {
  position: relative;
  display: inline-block;
  padding: 0 10px;
  margin: 5px 0;
}

.special-offer-description {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 5px;
  margin-top: 5px;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
}

.offer-segments {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.offer-segment {
  position: relative;
  width: 100%;
  transform-origin: left center;
}

.offer-segment:nth-child(1) {
  animation: segment-wave 24s ease-in-out infinite;
  animation-delay: 0.4s;
}

.offer-segment:nth-child(2) {
  animation: segment-wave 24s ease-in-out infinite;
  animation-delay: 0.8s;
}

.offer-segment:nth-child(3) {
  animation: segment-wave 24s ease-in-out infinite;
  animation-delay: 1.2s;
}

@keyframes segment-wave {
  0%, 100% { transform: skewX(0deg); }
  25% { transform: skewX(3deg); }
  50% { transform: skewX(0deg); }
  75% { transform: skewX(-3deg); }
}

.special-offer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shine 12s infinite; /* Slowed down 4x from 3s to 12s */
}

@keyframes shine {
  0% { left: -100%; }
  20% { left: 100%; }
  100% { left: 100%; }
}

/* Flag waving animation */
.waving-flag {
  perspective: 1000px;
  transform-style: preserve-3d;
  animation: flag-container-wave 24s ease-in-out infinite; /* Slowed down 4x from 6s to 24s */
}

.flag-stars-section,
.flag-stripes-section,
.flag-content-section {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.flag-stars-section {
  animation: flag-section-wave 24s ease-in-out infinite; /* Slowed down 4x from 6s to 24s */
  transform-origin: left center;
}

.flag-stripes-section {
  animation: flag-section-wave 24s ease-in-out infinite 0.8s; /* Slowed down 4x from 0.2s to 0.8s delay */
  transform-origin: left center;
}

.flag-content-section {
  animation: flag-section-wave 24s ease-in-out infinite 1.6s; /* Slowed down 4x from 0.4s to 1.6s delay */
  transform-origin: top center;
}

@keyframes flag-container-wave {
  0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
  25% { transform: rotateY(8deg) rotateX(2deg); }
  50% { transform: rotateY(0deg) rotateX(0deg); }
  75% { transform: rotateY(-8deg) rotateX(-2deg); }
}

@keyframes flag-section-wave {
  0%, 100% { transform: rotateY(0deg); }
  25% { transform: rotateY(12deg); }
  50% { transform: rotateY(0deg); }
  75% { transform: rotateY(-12deg); }
}

.stripe {
  position: absolute;
  width: 100%;
  height: 33.33%;
  animation: stripe-wave 24s ease-in-out infinite; /* Slowed down 4x from 6s to 24s */
  transform-origin: left center;
  z-index: 1;
}

.stripe:nth-child(1) {
  animation-delay: 0.4s; /* Slowed down 4x from 0.1s to 0.4s */
}

.stripe:nth-child(2) {
  animation-delay: 0.8s; /* Slowed down 4x from 0.2s to 0.8s */
}

.stripe:nth-child(3) {
  animation-delay: 1.2s; /* Slowed down 4x from 0.3s to 1.2s */
}

@keyframes stripe-wave {
  0%, 100% { transform: skewY(0deg); }
  25% { transform: skewY(3deg); }
  50% { transform: skewY(0deg); }
  75% { transform: skewY(-3deg); }
}
</style>

<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  // Add any additional functionality here if needed
});
</script> 
