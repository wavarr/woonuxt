<template>
  <div class="flex flex-col min-h-screen relative overflow-hidden">
    <!-- Background flowing elements that appear throughout the site -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <!-- Subtle flowing elements for the entire app -->
      <div class="flowing-accent red-accent"></div>
      <div class="flowing-accent blue-accent"></div>
      
      <!-- Medical symbol pattern background -->
      <div class="medical-symbols-bg"></div>
    </div>
    
    <!-- Site header -->
    <HeroBanner v-if="$route.path === '/'" />
    <AppHeader v-else />
    
    <!-- Main content -->
    <main class="flex-grow relative z-10 bg-white/90">
      <slot />
    </main>

    <!-- Debug panel (only in development) -->
    <DebugPanel v-if="showDebugPanel" />

    <!-- Footer wave separator - adjusted to be closer to content -->
    <div class="relative w-full -mb-1">
      <svg class="w-full h-12 md:h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path class="fill-[#1d3557]" d="M0,0 C240,100 480,0 720,100 C960,0 1200,100 1440,0 L1440,100 L0,100 Z"></path>
      </svg>
    </div>

    <!-- Footer -->
    <footer class="bg-navy-900 text-white relative z-10">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">ModaPrime USA</h3>
            <p class="text-gray-300">Premium modafinil delivered across the USA with fast shipping and reliable service.</p>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-gray-300 hover:text-white">Home</NuxtLink></li>
              <li><NuxtLink to="/products" class="text-gray-300 hover:text-white">Products</NuxtLink></li>
              <li><NuxtLink to="/contact" class="text-gray-300 hover:text-white">Contact</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Contact Us</h3>
            <p class="text-gray-300">Have questions? Reach out to us.</p>
            <NuxtLink to="/contact" class="inline-block mt-4 px-4 py-2 bg-usa-red text-white rounded-full hover:bg-red-700 transition-colors">
              Contact Us
            </NuxtLink>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} ModaPrime USA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DebugPanel from '~/components/debug/DebugPanel.vue';
import AppHeader from '~/components/generalElements/AppHeader.vue';
import HeroBanner from '~/components/generalElements/HeroBanner.vue';

const showDebugPanel = ref(process.env.NODE_ENV === 'development' && process.client);

// Handle debug keyboard shortcuts
const handleDebugShortcut = (event) => {
  // Ctrl+Shift+D to toggle debug panel
  if (event.ctrlKey && event.shiftKey && event.key === 'D') {
    event.preventDefault();
    showDebugPanel.value = !showDebugPanel.value;
    console.log(`Debug panel ${showDebugPanel.value ? 'enabled' : 'disabled'}`);
  }
};

onMounted(() => {
  if (process.client) {
    // Add global keyboard shortcut listener
    window.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        showDebugPanel.value = !showDebugPanel.value;
      }
    });
    
    // Log environment info
    console.log('🔧 Environment:', {
      mode: process.env.NODE_ENV,
      gqlHost: process.env.GQL_HOST,
      baseUrl: window.location.origin
    });
  }
});
</script>

<style>
/* Global styles */
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Ensure proper stacking context */
#__nuxt {
  position: relative;
  z-index: 0;
}
</style>

<style scoped>
/* Flowing accents for the entire app */
.flowing-accent {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.05;
  pointer-events: none;
}

.red-accent {
  background-color: #e63946;
  width: 50vw;
  height: 50vw;
  top: -25vw;
  right: -25vw;
}

.blue-accent {
  background-color: #1d3557;
  width: 60vw;
  height: 60vw;
  bottom: -30vw;
  left: -30vw;
}

/* Medical symbols background */
.medical-symbols-bg {
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0zm0 8c-12.15 0-22 9.85-22 22s9.85 22 22 22 22-9.85 22-22-9.85-22-22-22zm0 4c9.941 0 18 8.059 18 18s-8.059 18-18 18-18-8.059-18-18 8.059-18 18-18zm-2 4v10h-10v8h10v10h4v-10h10v-8h-10v-10h-4z' fill='%23f3f4f6' fill-opacity='0.4'/%3E%3C/svg%3E");
  background-repeat: repeat;
  opacity: 0.05;
  pointer-events: none;
}

/* Navigation styles */
.nav-link {
  font-weight: 500;
  color: #1d3557;
  padding: 0.5rem;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: #e63946;
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

.debug-shortcut-handler {
  position: fixed;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

/* Theme colors */
:root {
  --usa-red: #e63946;
  --navy-blue: #1d3557;
}

.text-navy-900 {
  color: #1d3557;
}

.text-usa-red {
  color: #e63946;
}

.bg-navy-900 {
  background-color: #1d3557;
}
</style> 
