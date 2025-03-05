<template>
  <div class="relative w-full overflow-hidden">
    <!-- Horizontal red, white, and blue stripes -->
    <div class="stripes-container">
      <!-- Red stripe (top) -->
      <div class="stripe red-stripe">
        <div class="container mx-auto px-4 py-6 flex items-center justify-center h-full">
          <span class="text-6xl md:text-7xl font-bold text-white notable-font">MODA</span>
        </div>
      </div>
      
      <!-- White stripe (middle) -->
      <div class="stripe white-stripe">
        <div class="container mx-auto px-4 py-6 flex items-center justify-center h-full">
          <span class="text-6xl md:text-7xl font-bold text-usa-red notable-font">PRIME</span>
        </div>
      </div>
      
      <!-- Blue stripe (bottom) -->
      <div class="stripe blue-stripe">
        <div class="container mx-auto px-4 py-7 flex items-center justify-center h-full">
          <span class="text-8xl md:text-9xl font-bold text-white notable-font text-shadow tight-line-height transform -translate-y-[5px] relative z-20 text-outline-white">USA</span>
        </div>
      </div>
    </div>

    <!-- Star element -->
    <div class="star-container">
      <div class="bg-star">★</div>
    </div>

    <!-- Main content -->
    <div class="container relative z-10 mx-auto px-4 py-16">
      <div class="text-center max-w-4xl mx-auto">
        <p class="mt-6 text-xl text-gray-800 font-medium max-w-2xl mx-auto">
          Premium modafinil delivered across the USA with fast shipping and reliable service - UPDATED TEXT
        </p>
        
        <!-- Search Bar (Moved from header) -->
        <div class="mt-8 flex justify-center search-container">
          <form class="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for modafinil products..."
              class="w-full px-5 py-4 pl-12 text-gray-600 bg-white border-2 border-navy-blue rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <Icon name="ion:search" class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-blue" size="24" />
            <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 bg-navy-blue text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all">
              Search
            </button>
          </form>
        </div>
        
        <NuxtLink 
          to="/products"
          class="mt-8 inline-flex items-center px-8 py-4 bg-navy-blue text-white font-bold rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Shop Now
          <span class="ml-2">→</span>
        </NuxtLink>
      </div>
    </div>
    
    <!-- Bottom wave separator -->
    <div class="absolute bottom-0 left-0 w-full z-20">
      <svg class="w-full h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,100 L0,100 Z" 
              fill="#ffffff"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* Stripes container */
.stripes-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Individual stripes */
.stripe {
  position: absolute;
  width: 100%;
  left: 0;
}

.red-stripe {
  top: 0;
  height: 33.33%;
  background-color: #e63946;
  background-image: linear-gradient(90deg, 
    rgba(255,255,255,0.05) 0%, 
    rgba(255,255,255,0) 50%, 
    rgba(255,255,255,0.05) 100%);
}

.white-stripe {
  top: 33.33%;
  height: 33.33%;
  background-color: #f1faee;
  background-image: linear-gradient(90deg, 
    rgba(0,0,0,0.02) 0%, 
    rgba(0,0,0,0) 50%, 
    rgba(0,0,0,0.02) 100%);
}

.blue-stripe {
  top: 66.66%;
  height: 33.34%;
  background-color: #1d3557;
  background-image: linear-gradient(90deg, 
    rgba(255,255,255,0.05) 0%, 
    rgba(255,255,255,0) 50%, 
    rgba(255,255,255,0.05) 100%);
}

/* Enhanced metallic text effect */
.notable-font {
  font-family: 'Notable', sans-serif;
  letter-spacing: -0.02em;
  /* Stronger text stroke/outline - 5px as requested */
  -webkit-text-stroke: 5px rgba(192, 192, 192, 0.8);
  text-stroke: 5px rgba(192, 192, 192, 0.8);
  
  /* Enhanced text shadow for metallic effect */
  text-shadow: 
    rgb(192, 192, 192) 0px 5px 1px, 
    rgb(0, 255, 255) 0px -1px 1px, 
    rgb(192, 192, 192) 5px 0px 0px, 
    rgb(192, 192, 192) 5px 5px 5px;
  
  /* Add a filter for more metallic shine */
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
}

/* Star styling */
.bg-star {
  font-size: 240px; /* Doubled from 120px */
  -webkit-text-stroke: 8px rgba(192, 192, 192, 0.9);
  text-stroke: 8px rgba(192, 192, 192, 0.9);
  
  /* Same metallic shadow as the text */
  text-shadow: 
    rgb(192, 192, 192) 0px 5px 1px, 
    rgb(0, 255, 255) 0px -1px 1px, 
    rgb(192, 192, 192) 5px 0px 0px, 
    rgb(192, 192, 192) 5px 5px 5px;
  
  color: #FFFFFF; /* Solid white */
  filter: none; /* Remove sepia filter */
  background-clip: text;
  background-position-x: 51%;
  z-index: -1;
  position: absolute;
  left: 50%;
  top: 33%; /* Position at the top of PRIME text (which starts at 33.33%) */
  --tw-translate-x: -50%;
  --tw-translate-y: -45px;
  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y));
  opacity: 0.9; /* Slightly increased opacity for better visibility */
}

/* Theme colors */
.text-usa-red {
  color: #e63946;
}

.text-navy-blue {
  color: #1d3557;
}

.bg-navy-blue {
  background-color: #1d3557;
}

/* USA text specific styling */
.text-8xl.md\:text-9xl.font-bold.text-white.notable-font.text-shadow.tight-line-height.transform.-translate-y-\[5px\].relative.z-20.text-outline-white {
  font-weight: 900;
  letter-spacing: 0em;
  font-size: 10rem;
  padding-right: 2px;
  padding-left: 1px;
  padding-bottom: 196px;
  border-width: 0px;
  background-color: rgba(0, 0, 0, 0);
  position: relative;
  top: -30px;
  margin-bottom: -30px;
  transform: translateY(-15px);
  color: #ffff00;
}

/* Responsive text adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Font bold - Direct targeting */
.stripe .font-bold {
  min-height: 208px;
  padding-bottom: 0px;
  transform: translatex(3px) translatey(0px);
  margin-top: 0px;
  padding-top: 59px;
}

/* Font bold - Direct targeting */
.stripe:nth-child(3) .font-bold {
  padding-top: 0px;
}

/* Stripes container - Direct targeting */
.stripes-container {
  transform: translatex(3px) translatey(0px);
}

/* Font bold - Direct targeting */
.stripe:nth-child(2) .font-bold {
  margin-top: 49px;
  font-size: 150px !important;
  padding-top: 37px;
  transform: translatex(0px) translatey(9px);
  min-height: 221px;
}

/* Banner container - Direct targeting */
.banner-container {
  transform: translatex(0px) translatey(9px);
}

/* New CSS rules */
/* Font bold */
.min-h-screen .stripe .font-bold {
  padding-bottom: 69px;
  transform: translatex(0px) translatey(0px);
  letter-spacing: -5px;
}

/* Font bold */
.min-h-screen .stripe:nth-child(3) .font-bold {
  margin-bottom: 82px;
  font-size: 128px;
}

.min-h-screen .stripe:nth-child(4) .font-bold {
  min-height: 312px;
}

/* Stripe */
.min-h-screen .stripe {
  transform: translatex(0px) translatey(0px);
}

/* Star - Keeping the original rule as well but updating it */
.min-h-screen .mx-auto .bg-star {
  font-size: 240px; /* Doubled from 120px */
  -webkit-text-stroke: 8px rgba(192, 192, 192, 0.9);
  text-stroke: 8px rgba(192, 192, 192, 0.9);
  color: #FFFFFF; /* Solid white */
  filter: none; /* Remove sepia filter */
  background-clip: text;
  background-position-x: 51%;
  z-index: -1;
  position: absolute;
  left: 50%;
  top: 33%; /* Position at the top of PRIME text */
  --tw-translate-x: -50%;
  --tw-translate-y: -45px;
  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y));
  opacity: 0.9; /* Slightly increased opacity for better visibility */
}

/* Search container positioning */
.search-container {
  --tw-translate-y: -45px;
  transform: translateY(var(--tw-translate-y));
  position: relative;
  z-index: 10;
}

/* Star container */
.star-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
}
</style>

<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  // Simple scroll reveal implementation
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
});
</script> 
