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
    <!-- Important notification banner -->
    <div v-if="showNotification" class="bg-[#1d3557] text-white py-1 px-4 text-center z-50 border-b-2 border-[#ffd700] relative">
      <p class="text-xs md:text-sm">
        <span class="font-bold">Important:</span> MODAPRIME USA will only contact you from this email address: modaprime@protonmail.com. If in doubt, reach out!
      </p>
      <button @click="dismissNotification" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-[#ffd700] transition-colors">
        <span class="iconify i-ion:close-outline" style="font-size:16px;"></span>
      </button>
    </div>
    
    <div class="bg-[#1d3557]/95 backdrop-blur-sm">
      <div class="container flex items-center justify-between py-1.5 relative z-10">
        
        <!-- Left Section (Logo) -->
        <div class="flex items-center">
          
          <!-- Mobile Menu Icon -->
          <div class="lg:hidden">
            <span 
              class="iconify i-ion:menu-outline mr-4 cursor-pointer text-[#f1faee] hover:text-white" 
              aria-hidden="true" 
              style="font-size:22px; filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));"
              @click="toggleMobileMenu">
            </span>
          </div>

          <!-- Logo - Simplified -->
          <NuxtLink to="/" class="router-link-active router-link-exact-active inline-flex items-center">
            <div class="flex items-center gap-2 text-base font-bold text-[#f1faee] hover:text-white">
              <img src="/logo.svg" alt="Logo" width="30" height="30" class="usa-logo">
              <span class="hidden sm:inline logo-text">ModaPrime</span>
            </div>
          </NuxtLink>
        </div>

        <!-- Navigation Menu (Desktop) -->
        <nav class="hidden lg:flex items-center space-x-8">
          <NuxtLink to="/" class="nav-link text-sm font-medium">Home</NuxtLink>
          <NuxtLink to="/products" class="nav-link text-sm font-medium">Products</NuxtLink>
          <NuxtLink to="/contact" class="nav-link text-sm font-medium">Contact</NuxtLink>
        </nav>

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
            <NuxtLink to="/contact" class="nav-link text-sm font-medium">Contact</NuxtLink>
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
  color: white !important;
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

.router-link-active.nav-link {
  color: #e63946;
  font-weight: 600;
}

.router-link-active.nav-link::after {
  width: 100%;
  background-color: #e63946;
}
</style>
