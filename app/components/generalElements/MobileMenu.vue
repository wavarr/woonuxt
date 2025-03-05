<script setup>
import { useHelpers } from '~/composables/useHelpers';
const { toggleMobileMenu } = useHelpers();
</script>

<template>
  <div class="bg-white flex flex-col max-w-lg shadow-lg top-0 bottom-0 left-0 w-11/12 z-50 fixed overflow-x-hidden">
    <!-- Close button -->
    <div class="absolute top-4 right-4 cursor-pointer p-2" @click="toggleMobileMenu(false)">
      <div class="w-6 h-6 relative">
        <div class="w-full h-0.5 bg-gray-600 absolute top-1/2 transform -translate-y-1/2 rotate-45"></div>
        <div class="w-full h-0.5 bg-gray-600 absolute top-1/2 transform -translate-y-1/2 -rotate-45"></div>
      </div>
    </div>
    
    <!-- Menu title -->
    <div class="mt-8 text-center text-xl font-bold text-gray-800">Menu</div>
    
    <!-- Navigation links -->
    <nav class="m-4 grid p-4 gap-6">
      <NuxtLink 
        to="/" 
        class="text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
        @click="toggleMobileMenu(false)">
        Home
      </NuxtLink>
      <NuxtLink 
        to="/products" 
        class="text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
        @click="toggleMobileMenu(false)">
        Products
      </NuxtLink>
      <NuxtLink 
        to="/about" 
        class="text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
        @click="toggleMobileMenu(false)">
        About
      </NuxtLink>
      <NuxtLink 
        to="/contact" 
        class="text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
        @click="toggleMobileMenu(false)">
        Contact
      </NuxtLink>
    </nav>
    
    <!-- Search bar -->
    <div class="px-6 py-4">
      <form class="relative w-full">
        <input
          type="text"
          placeholder="Search products..."
          class="w-full px-4 py-3 pl-10 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <Icon name="ion:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size="18" />
      </form>
    </div>
    
    <!-- Footer -->
    <div class="mt-auto text-center p-8 text-sm text-gray-400">
      <p>ModaPrime USA</p>
    </div>
  </div>
</template>

<style scoped>
.text-primary {
  color: #5E38C6;
}
</style> 
