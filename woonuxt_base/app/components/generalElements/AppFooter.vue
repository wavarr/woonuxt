<script setup lang="ts">
// In Nuxt 3, composables are auto-imported, so we don't need explicit imports
const { wooNuxtVersionInfo } = useHelpers();
const { wishlistLink } = useAuth();
</script>

<template>
  <footer class="bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#1d3557] text-white">
    <div class="container mx-auto px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand Section -->
        <div class="space-y-6">
          <Logo class="text-white" />
          <p class="text-[#f1faee] text-sm leading-relaxed">
            Your trusted source for premium modafinil, operating from our USA office with professional service.
          </p>
          <LangSwitcher class="mt-8" />
        </div>

        <!-- Information Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[#f1faee]">Information</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/" class="text-[#a8dadc] hover:text-white transition-colors">About Us</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="text-[#a8dadc] hover:text-white transition-colors">FAQ</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Products Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[#f1faee]">Products</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/products" class="text-[#a8dadc] hover:text-white transition-colors">
                New Arrivals
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?filter=sale[true]" class="text-[#a8dadc] hover:text-white transition-colors">
                On sale
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?orderby=rating&order=ASC&filter=rating[1]" class="text-[#a8dadc] hover:text-white transition-colors">
                Top rated
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Customer Service Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[#f1faee]">Customer Service</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/contact" class="text-[#a8dadc] hover:text-white transition-colors">
                Contact Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/my-account" class="text-[#a8dadc] hover:text-white transition-colors">
                My Account
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-16 pt-8 border-t border-[#457b9d]/30">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-[#a8dadc]">
            &copy; {{ new Date().getFullYear() }} ModaPrime USA. All rights reserved.
          </p>
          
          <!-- Social Media Icons -->
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="#" class="text-[#a8dadc] hover:text-white transition-colors">
              <span class="iconify i-ion:logo-twitter" style="font-size:20px;"></span>
            </a>
            <a href="#" class="text-[#a8dadc] hover:text-white transition-colors">
              <span class="iconify i-ion:logo-facebook" style="font-size:20px;"></span>
            </a>
            <a href="#" class="text-[#a8dadc] hover:text-white transition-colors">
              <span class="iconify i-ion:logo-instagram" style="font-size:20px;"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom wave separator -->
    <div class="relative w-full">
      <svg class="w-full h-16 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path class="fill-white opacity-90" d="M0,0 C240,50 480,0 720,50 C960,0 1200,50 1440,0 L1440,0 L0,0 L0,100 L1440,100 Z"></path>
      </svg>
    </div>
  </footer>
</template>

<style scoped lang="postcss">
a {
  @apply hover:underline;
}

.footer-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.wave-container {
  height: 120px;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.wave {
  width: 100%;
  height: 120px;
  overflow: visible;
}

.wave-path {
  fill: #e9e9e9;
}

.wave-path-1 {
  opacity: 0.7;
  animation: wave-animation-vertical 8s ease-in-out infinite;
}

.wave-path-2 {
  opacity: 0.5;
  animation: wave-animation-vertical 6s ease-in-out infinite reverse;
}

.footer-content {
  position: relative;
  z-index: 1;
}

@keyframes wave-animation-vertical {
  0% {
    d: path("M0,40 Q180,60 360,40 Q540,20 720,40 Q900,60 1080,40 Q1260,20 1440,40 L1440,120 L0,120 Z");
  }
  50% {
    d: path("M0,50 Q180,30 360,50 Q540,70 720,50 Q900,30 1080,50 Q1260,70 1440,50 L1440,120 L0,120 Z");
  }
  100% {
    d: path("M0,40 Q180,60 360,40 Q540,20 720,40 Q900,60 1080,40 Q1260,20 1440,40 L1440,120 L0,120 Z");
  }
}
</style>
