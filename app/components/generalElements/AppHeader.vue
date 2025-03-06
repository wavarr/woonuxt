<template>
  <header class="sticky top-0 z-40 bg-[#1d3557]/95 backdrop-blur-sm">
    <div class="container flex items-center justify-between py-3 relative z-10">
      
      <!-- Left Section (Logo) -->
      <div class="flex items-center">
        
        <!-- Mobile Menu Icon -->
        <div class="lg:hidden">
          <span 
            class="iconify i-ion:menu-outline mr-4 cursor-pointer text-[#f1faee] hover:text-white" 
            aria-hidden="true" 
            style="font-size:26px; filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));"
            @click="toggleMobileMenu">
          </span>
        </div>

        <!-- Logo - Simplified -->
        <NuxtLink to="/" class="router-link-active router-link-exact-active inline-flex items-center">
          <div class="flex items-center gap-2 text-lg font-bold text-[#f1faee] hover:text-white">
            <img src="/logo.svg" alt="Logo" width="40" height="40" class="usa-logo">
            <span class="hidden sm:inline logo-text">ModaPrime</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Right Section (Search, Cart, Sign In) -->
      <div class="flex items-center gap-4">
        
        <!-- Search Bar -->
        <form class="relative items-center hidden sm:inline-flex max-w-[250px]">
          <span class="iconify i-ion:search-outline absolute z-10 pointer-events-none left-2 text-gray-600" style="font-size:18px;"></span>
          <input id="product-search-input" type="text" placeholder="Search..." class="search-input">
        </form>

        <!-- Cart and Sign-In -->
        <div class="flex gap-4 items-center">
          <NuxtLink to="/my-account" class="inline-flex items-center text-[#f1faee] hover:text-white" title="Sign In">
            <Icon name="ion:person-outline" class="border border-transparent header-icon" size="20" />
          </NuxtLink>
          <CartTrigger />
        </div>
      </div>

    </div>
  </header>
</template>

<script setup>
import { useHelpers } from '@/composables/useHelpers';

const { toggleMobileMenu } = useHelpers();
</script>

<style scoped>
/* Header Styling */
header {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

/* Logo Styling */
.usa-logo {
  object-fit: contain;
  max-width: 100%;
  filter: drop-shadow(1px 1px 3px rgba(255, 255, 255, 0.3));
}

.logo-text {
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.3);
  letter-spacing: 0.02em;
}

.header-icon {
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.4));
  transition: all 0.2s ease;
}

.header-icon:hover {
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
}

/* Search Bar Styling */
.search-input {
  @apply z-0 inline-flex items-center w-full p-1.5 pl-8 text-sm text-gray-700 border border-gray-300 rounded-md shadow-inner outline-none bg-white/95 shadow-gray-200;
  transition: all 0.3s ease;
}

.search-input:focus {
  @apply bg-white border-blue-300;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}
</style>
