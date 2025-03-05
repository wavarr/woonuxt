<template>
  <div class="relative w-full overflow-hidden banner-container">
    <!-- Horizontal red, white, and blue stripes -->
    <div class="stripes-container">
      <!-- Large background star -->
      <div class="bg-star-container mx-auto absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[5]" style="top: calc(50% - 40px);">
        <svg class="bg-star" viewBox="0 0 51 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.5 0L31.4 18.2H50.5L35 29.5L40.9 47.7L25.5 36.4L10.1 47.7L16 29.5L0.5 18.2H19.6L25.5 0Z" fill="#f5f5f0" stroke="#222220" stroke-width="5" stroke-opacity="0.8"/>
        </svg>
      </div>
      
      <!-- Red stripe (top) -->
      <div class="stripe red-stripe">
        <div class="container mx-auto px-4 flex items-center justify-center h-full">
          <span class="text-7xl md:text-8xl font-bold text-white notable-font text-shadow tight-line-height transform -translate-y-[5px] relative z-20 text-outline-white">MODA</span>
        </div>
      </div>
      
      <!-- White stripe (middle) -->
      <div class="stripe white-stripe">
        <div class="container mx-auto px-4 flex items-center justify-center h-full">
          <span class="text-8xl md:text-9xl font-bold text-usa-red notable-font text-shadow-red relative z-20 tight-line-height transform -translate-y-[45px] text-outline-black">PRIME</span>
        </div>
      </div>
      
      <!-- Blue stripe (bottom) -->
      <div class="stripe blue-stripe">
        <div class="container mx-auto px-4 flex items-center justify-center h-full">
          <span class="text-8xl md:text-9xl font-bold text-white notable-font text-shadow tight-line-height transform -translate-y-[5px] relative z-20 text-outline-white usa-text">USA</span>
        </div>
      </div>
    </div>
    
    <!-- Bottom wave separator with menu -->
    <div class="absolute bottom-0 left-0 w-full z-20">
      <!-- Wave separator -->
      <div class="wave-separator">
        <svg class="w-full h-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <!-- Base wave path (white/light background) -->
          <path class="wave-path" d="M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,40 L0,40 Z" 
                fill="#e9e9e9"/>
          
          <!-- Navy blue frosted wave effect (5-10px from top) -->
          <path class="wave-path-navy" d="M0,25 C240,45 480,5 720,25 C960,45 1200,5 1440,25 L1440,40 L0,40 Z" 
                fill="#1d3557" opacity="0.3"/>
                
          <!-- White frosted wave effect (first 5px) -->
          <path class="wave-path-white" d="M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,25 L0,25 Z" 
                fill="white" opacity="0.4"/>
        </svg>
      </div>
      
      <!-- Menu container positioned over the wave -->
      <div class="menu-container bg-[#e9e9e9] py-2 shadow-md wave-menu">
        <div class="container mx-auto px-4">
          <nav class="flex justify-center space-x-8 md:space-x-12">
            <NuxtLink to="/" class="nav-link text-base md:text-lg font-medium wave-item">Home</NuxtLink>
            <NuxtLink to="/products" class="nav-link text-base md:text-lg font-medium wave-item">Products</NuxtLink>
            <NuxtLink to="/contact" class="nav-link text-base md:text-lg font-medium wave-item">Contact</NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Banner container with fixed height instead of viewport height */
.banner-container {
  height: 360px; /* Increased height to accommodate larger text and tiered layout */
  position: relative;
  overflow: hidden;
}

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
  height: 30%; /* Adjusted for tiered layout */
  background-color: #e63946;
  background-image: linear-gradient(90deg, 
    rgba(255,255,255,0.05) 0%, 
    rgba(255,255,255,0) 50%, 
    rgba(255,255,255,0.05) 100%);
}

.white-stripe {
  top: 25%; /* Overlap with red stripe for tiered effect */
  height: 35%;
  background-color: #f1faee;
  background-image: linear-gradient(90deg, 
    rgba(0,0,0,0.02) 0%, 
    rgba(0,0,0,0) 50%, 
    rgba(0,0,0,0.02) 100%);
}

.blue-stripe {
  top: 55%; /* Overlap with white stripe for tiered effect */
  height: 45%; /* Increased height for larger USA text */
  background-color: #1d3557;
  background-image: linear-gradient(90deg, 
    rgba(255,255,255,0.05) 0%, 
    rgba(255,255,255,0) 50%, 
    rgba(255,255,255,0.05) 100%);
  padding-bottom: 10px; /* Add padding to prevent USA text from being cut off */
}

.notable-font {
  font-family: 'Notable', sans-serif;
  letter-spacing: -0.02em;
}

/* Add tight line height class */
.tight-line-height {
  line-height: 0.3; /* Changed from 0.2 to 0.3 */
}

/* Text outline styles */
.text-outline-white {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
  text-stroke: 1px rgba(255, 255, 255, 0.3);
}

.text-outline-black {
  -webkit-text-stroke: 2px rgba(0, 0, 0, 0.2);
  text-stroke: 2px rgba(0, 0, 0, 0.2);
}

/* Large background star styling */
.bg-star-container {
  display: inline-block;
  height: 300px; /* Much larger background star */
  width: 320px;
  opacity: 0.7;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.bg-star {
  height: 100%;
  width: 100%;
}

/* Text shadow for better visibility */
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.text-shadow-red {
  text-shadow: 2px 2px 4px rgba(230, 57, 70, 0.3);
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

/* Wave separator positioning */
.wave-separator {
  height: 40px; /* Smaller wave for header */
  position: relative;
  z-index: 1;
  margin-bottom: -1px; /* Ensure seamless connection with menu */
  overflow: hidden;
}

.wave-path {
  animation: waveFlow 8s ease-in-out infinite alternate;
  transform-origin: center;
}

.wave-path-navy {
  animation: waveFlowNavy 8s ease-in-out infinite alternate;
  transform-origin: center;
}

.wave-path-white {
  animation: waveFlowWhite 8s ease-in-out infinite alternate;
  transform-origin: center;
}

/* Wave menu animation */
.wave-menu {
  position: relative;
  overflow: hidden;
}

.wave-item {
  display: inline-block;
  animation: waveText 3s ease-in-out infinite;
  animation-delay: calc(var(--i, 0) * 0.2s);
}

.wave-item:nth-child(1) {
  --i: 0;
}

.wave-item:nth-child(2) {
  --i: 1;
}

.wave-item:nth-child(3) {
  --i: 2;
}

@keyframes waveText {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px) skewX(5deg);
  }
}

@keyframes waveFlow {
  0% {
    d: path("M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,40 L0,40 Z");
    transform: scaleX(1);
  }
  50% {
    d: path("M0,20 C240,0 480,40 720,20 C960,0 1200,40 1440,20 L1440,40 L0,40 Z");
    transform: scaleX(1.05) skewX(-2deg);
  }
  100% {
    d: path("M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,40 L0,40 Z");
    transform: scaleX(1);
  }
}

@keyframes waveFlowNavy {
  0% {
    d: path("M0,25 C240,45 480,5 720,25 C960,45 1200,5 1440,25 L1440,40 L0,40 Z");
    transform: scaleX(1);
  }
  50% {
    d: path("M0,25 C240,5 480,45 720,25 C960,5 1200,45 1440,25 L1440,40 L0,40 Z");
    transform: scaleX(1.1) skewX(-3deg);
  }
  100% {
    d: path("M0,25 C240,45 480,5 720,25 C960,45 1200,5 1440,25 L1440,40 L0,40 Z");
    transform: scaleX(1);
  }
}

@keyframes waveFlowWhite {
  0% {
    d: path("M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,25 L0,25 Z");
    transform: scaleX(1);
  }
  50% {
    d: path("M0,20 C240,0 480,40 720,20 C960,0 1200,40 1440,20 L1440,25 L0,25 Z");
    transform: scaleX(1.15) skewX(-4deg);
  }
  100% {
    d: path("M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,25 L0,25 Z");
    transform: scaleX(1);
  }
}

/* Menu styling */
.menu-container {
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(0,0,0,0.05);
}

.nav-link {
  font-weight: 500;
  color: #1d3557;
  padding: 0.5rem;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: #e63946;
  transform: translateY(-3px) skewX(5deg);
}

.nav-link.router-link-active {
  color: #e63946;
  font-weight: 600;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.5rem;
  right: 0.5rem;
  height: 2px;
  background-color: #e63946;
}

/* Responsive text adjustments */
@media (max-width: 768px) {
  .banner-container {
    height: 320px; /* Slightly smaller on mobile but still with space for menu */
  }
  
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .bg-star-container {
    height: 250px;
    width: 270px;
  }
}

.usa-text {
  font-weight: 900;
  letter-spacing: 0em;
  font-size: 8rem; /* Default size for mobile */
  padding-right: 2px;
  padding-left: 1px;
  position: relative;
  top: -100px;
  margin-bottom: -30px;
  z-index: 109;
  color: #FFFFFF;
  text-shadow: rgba(0, 10, 10, 0.9) 10px 5px 0px;
  /* transform: translateY(-15px); */
}

@media (min-width: 768px) {
  .usa-text {
    font-size: 10rem; /* Larger size for screens over 768px */
  }
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
