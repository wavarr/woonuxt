<template>
  <header class="sticky top-0 z-40 bg-white shadow-sm">
    <div class="container mx-auto px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Left Section -->
        <div class="flex items-center">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" class="w-10 h-10">
            <span class="text-xl font-bold text-gray-900">ModaPrime USA</span>
          </NuxtLink>
        </div>

        <!-- Center Section - Navigation -->
        <nav class="hidden lg:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path"
            class="text-gray-600 hover:text-primary transition-colors">
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Right Section -->
        <div class="flex items-center space-x-6">
          <!-- Icons -->
          <div class="flex items-center space-x-4">
            <NuxtLink to="/my-account" class="text-gray-600 hover:text-primary transition-colors">
              <Icon name="ion:person" size="22" />
            </NuxtLink>
            <CartTrigger />
            
            <!-- Custom Menu Trigger (replacing hamburger) -->
            <div class="lg:hidden cursor-pointer" @click="toggleMobileMenu">
              <div class="menu-icon">
                <div class="menu-icon-diamond"></div>
                <div class="menu-icon-diamond"></div>
                <div class="menu-icon-diamond"></div>
                <div class="menu-icon-diamond"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useHelpers } from '@/composables/useHelpers';

const { toggleMobileMenu } = useHelpers();

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];
</script>

<style scoped>
.text-primary {
  color: #5E38C6;
}

/* Custom menu icon (diamond pattern) */
.menu-icon {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px;
  width: 30px;
  height: 30px;
  padding: 3px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f5f5f5;
}

.menu-icon-diamond {
  width: 10px;
  height: 10px;
  background-color: #5E38C6;
  transform: rotate(45deg);
  transition: all 0.3s ease;
}

.menu-icon:hover {
  background-color: #efefef;
}

.menu-icon:hover .menu-icon-diamond {
  background-color: #7E58E6;
}
</style> 
