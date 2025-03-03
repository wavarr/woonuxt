<template>
  <header class="sticky top-0 z-40 bg-white shadow-sm">
    <div class="container mx-auto px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Left Section -->
        <div class="flex items-center">
          <!-- Mobile Menu Trigger -->
          <div class="lg:hidden">
            <MenuTrigger />
          </div>
          
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" class="w-8 h-8">
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
          <!-- Search -->
          <form class="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search products..."
              class="w-64 px-4 py-2 pl-10 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <Icon name="ion:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size="18" />
          </form>

          <!-- Icons -->
          <div class="flex items-center space-x-4">
            <NuxtLink to="/my-account" class="text-gray-600 hover:text-primary transition-colors">
              <Icon name="ion:person" size="22" />
            </NuxtLink>
            <CartTrigger />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
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
</style> 
