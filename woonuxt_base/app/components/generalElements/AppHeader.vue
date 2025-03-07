<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isMobileMenuOpen = ref(false);
const showNotification = ref(true);

// Check if notification was previously dismissed
onMounted(() => {
  if (process.client) {
    const notificationDismissed = localStorage.getItem('notificationDismissed');
    if (notificationDismissed) {
      showNotification.value = false;
    }
  }
});

// Dismiss notification
function dismissNotification() {
  showNotification.value = false;
  if (process.client) {
    localStorage.setItem('notificationDismissed', 'true');
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}
</script>

<template>
  <header class="sticky top-0 z-40">
    <!-- Important notification banner with gold bullion effect -->
    <div v-if="showNotification" class="gold-bullion-banner relative">
      <div class="gold-sheen"></div>
      <p class="text-xs md:text-sm relative z-10 py-1.5 px-4 notification-text">
        <span class="font-bold">Important:</span> MODAPRIME USA will only contact you from this email address: <span class="font-semibold">modaprime@protonmail.com</span>. When in doubt, please reach out!
      </p>
      <button @click="dismissNotification" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-800 transition-colors z-10">
        <span class="iconify i-ion:close-outline" style="font-size:16px;"></span>
      </button>
    </div>
    
    <!-- Navy blue navigation bar -->
    <div class="bg-[#1d3557]/95 backdrop-blur-sm">
      <div class="container flex items-center justify-between py-1.5 relative z-10">
        
        <!-- Left Section (Logo) -->
        <div class="flex items-center">
          
          <!-- Mobile Menu Icon -->
          <div class="lg:hidden">
            <span 
              class="iconify i-ion:menu-outline mr-4 cursor-pointer text-[#f1faee] hover:text-[#ffd700]" 
              aria-hidden="true" 
              style="font-size:22px; filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));"
              @click="toggleMobileMenu">
            </span>
          </div>

          <!-- Logo - With larger image and no text -->
          <NuxtLink to="/" class="router-link-active router-link-exact-active inline-flex items-center">
            <div class="flex items-center gap-2 text-base font-bold text-[#f1faee] hover:text-[#ffd700]">
              <img src="https://wooprime-ov0b2cxpn-wavewrs-projects.vercel.app/_vercel/image?url=https:%2F%2Fmodaprimeusa.com%2Fwp-content%2Fuploads%2F2024%2F03%2Fcropped-cropped-cropped-Moda-Prime-011-1.png&w=1536&q=100" alt="ModaPrime Logo" width="270" height="270" class="usa-logo gold-filter">
            </div>
          </NuxtLink>
        </div>

        <!-- Navigation Menu (Desktop) -->
        <div class="hidden lg:flex items-center space-x-6">
          <NuxtLink to="/" class="nav-link text-sm font-medium gold-hover">Home</NuxtLink>
          <NuxtLink to="/products" class="nav-link text-sm font-medium gold-hover">Products</NuxtLink>
          <NuxtLink to="/contact" class="nav-link text-sm font-medium contact-link">Contact</NuxtLink>
        </div>

        <!-- Right Section (Search, Cart, Sign In) -->
        <div class="flex items-center gap-3">
          
          <!-- Search Bar -->
          <form class="relative items-center hidden sm:inline-flex max-w-[200px]">
            <span class="iconify i-ion:search-outline absolute z-10 pointer-events-none left-2 text-gray-600" style="font-size:16px;"></span>
            <input id="product-search-input" type="text" placeholder="Search..." class="search-input text-sm py-1">
          </form>

          <!-- Cart and Sign-In -->
          <div class="flex gap-3 items-center">
            <NuxtLink to="/my-account" class="inline-flex items-center text-[#f1faee] hover:text-white" title="Sign In">
              <Icon name="ion:person-outline" class="border border-transparent header-icon" size="18" />
            </NuxtLink>
            <CartTrigger />
          </div>
        </div>

      </div>
      
      <!-- Wave separator -->
      <div class="relative w-full">
        <svg class="w-full h-3" viewBox="0 0 1440 30" preserveAspectRatio="none">
          <path class="fill-[#1d3557]" d="M0,15 C240,30 480,0 720,15 C960,30 1200,0 1440,15 L1440,30 L0,30 Z"></path>
        </svg>
      </div>
      
      <!-- Mobile Navigation Menu -->
      <div v-show="isMobileMenuOpen" class="lg:hidden bg-[#1d3557] text-white py-2 border-t border-[#f1faee]/20">
        <div class="container">
          <nav class="flex flex-col space-y-2">
            <NuxtLink to="/" class="nav-link text-sm font-medium">Home</NuxtLink>
            <NuxtLink to="/products" class="nav-link text-sm font-medium">Products</NuxtLink>
            <NuxtLink to="/contact" class="nav-link text-sm font-medium contact-link">Contact</NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Header Styling */
header {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

/* Component Styling for Better Contrast */
:deep(.menu-trigger), 
:deep(.search-trigger), 
:deep(.sign-in-link), 
:deep(.cart-trigger) {
  color: #f1faee !important;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.4));
  transition: all 0.2s ease;
}

:deep(.menu-trigger:hover), 
:deep(.search-trigger:hover), 
:deep(.sign-in-link:hover), 
:deep(.cart-trigger:hover) {
  color: #ffd700 !important;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
}

:deep(.logo) {
  filter: drop-shadow(1px 1px 3px rgba(255, 255, 255, 0.3));
}

:deep(.logo span) {
  color: #f1faee !important;
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.3);
  letter-spacing: 0.02em;
}

/* Navigation styling */
.nav-link {
  color: #f1faee;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #ffd700;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #ffd700;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.router-link-active.nav-link {
  color: #ffd700;
  font-weight: 600;
}

.router-link-active.nav-link::after {
  width: 100%;
  background-color: #ffd700;
}

/* Contact link special styling */
.contact-link {
  color: #ffffff;
  font-weight: 600;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  position: relative;
  transition: all 0.3s ease;
}

.contact-link:hover {
  color: #ffd700;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
}

.contact-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #ffd700;
  transition: width 0.3s ease;
}

.contact-link:hover::after {
  width: 100%;
}

.router-link-active.contact-link {
  color: #ffd700;
  font-weight: 700;
}

.router-link-active.contact-link::after {
  width: 100%;
  background-color: #ffd700;
}

/* Gold Bullion Banner Styling */
.gold-bullion-banner {
  background: linear-gradient(to right, #b8860b, #ffd700, #b8860b);
  text-align: center;
  color: #000;
  font-weight: 500;
  z-index: 50;
  border-bottom: 2px solid #1d3557;
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.2),
    inset 0 0 10px rgba(255,255,255,0.3);
  position: relative;
  overflow: hidden;
}

.gold-sheen {
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    90deg, 
    transparent 0%,
    rgba(255,255,255,0.1) 20%,
    rgba(255,255,255,0.5) 50%,
    rgba(255,255,255,0.1) 80%,
    transparent 100%
  );
  animation: shine 6s infinite ease-in-out;
  z-index: 1;
  pointer-events: none;
}

@keyframes shine {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Gold accent styling */
.gold-accent {
  filter: drop-shadow(0 0 3px rgba(255, 215, 0, 0.5));
}

.gold-gradient-text {
  background: linear-gradient(to bottom, #ffd700, #b8860b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  position: relative;
}

.gold-hover {
  position: relative;
}

.gold-hover::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #ffd700, #b8860b);
  transition: width 0.3s ease;
}

.gold-hover:hover::after {
  width: 100%;
}

.gold-hover:hover {
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
  color: #ffd700;
}

/* Remove unused styles */
.gold-nav-bar, .stars-container, .star, .nav-link-gold, .navy-text {
  display: none;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
}

.notification-text {
  color: #000;
  text-shadow: 
    0 1px 0 #ffd700,
    0 -1px 0 rgba(184, 134, 11, 0.7),
    1px 0 0 rgba(184, 134, 11, 0.7),
    -1px 0 0 rgba(184, 134, 11, 0.7);
  font-weight: 600;
  letter-spacing: 0.01em;
}

.notification-text span {
  color: #000;
  font-weight: 800;
  text-shadow: 
    0 1px 1px #ffd700,
    0 -1px 1px rgba(184, 134, 11, 0.8),
    1px 0 1px rgba(184, 134, 11, 0.8),
    -1px 0 1px rgba(184, 134, 11, 0.8);
  letter-spacing: 0.02em;
}

/* Logo Styling */
.usa-logo {
  object-fit: contain;
  max-width: 100%;
  filter: drop-shadow(1px 1px 3px rgba(255, 255, 255, 0.3)) brightness(1.1) contrast(1.1);
  padding: 2px;
  transition: all 0.3s ease;
}

.gold-filter {
  filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.7)) 
          brightness(1.2) 
          contrast(1.1) 
          sepia(0.3) 
          hue-rotate(320deg);
}
</style>
