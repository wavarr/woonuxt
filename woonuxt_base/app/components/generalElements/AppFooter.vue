<script setup lang="ts">
// In Nuxt 3, composables are auto-imported, so we don't need explicit imports
const { wooNuxtVersionInfo } = useHelpers();
const { wishlistLink } = useAuth();
</script>

<template>
  <footer class="footer-container order-last">
    <div class="wave-container">
      <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path class="wave-path wave-path-1" d="M0,40 Q180,60 360,40 Q540,20 720,40 Q900,60 1080,40 Q1260,20 1440,40 L1440,120 L0,120 Z"></path>
        <path class="wave-path wave-path-2" d="M0,50 Q180,30 360,50 Q540,70 720,50 Q900,30 1080,50 Q1260,70 1440,50 L1440,120 L0,120 Z"></path>
      </svg>
    </div>
    <div class="footer-content" style="background-color: #e9e9e9;">
      <div class="container flex flex-wrap justify-between gap-12 py-24 md:gap-24">
        <div class="mr-auto">
          <Logo />
          <WebsiteShortDescription />
          <LangSwitcher class="mt-8" />
        </div>
        <div class="w-3/7 lg:w-auto">
          <div class="mb-1 font-semibold">Information</div>
          <div class="text-sm">
            <NuxtLink to="/" class="py-1.5 block">About Us</NuxtLink>
            <NuxtLink to="/" class="py-1.5 block">FAQ</NuxtLink>
          </div>
        </div>
        <div class="w-3/7 lg:w-auto">
          <div class="mb-1 font-semibold">Products</div>
          <div class="text-sm">
            <NuxtLink to="/products" class="py-1.5 block">{{ $t('messages.shop.newArrivals') }}</NuxtLink>
            <NuxtLink to="/products?filter=sale[true]" class="py-1.5 block">On sale</NuxtLink>
            <NuxtLink to="/products?orderby=rating&order=ASC&filter=rating[1]" class="py-1.5 block">Top rated</NuxtLink>
          </div>
        </div>
        <div class="w-3/7 lg:w-auto">
          <div class="mb-1 font-semibold">{{ $t('messages.general.customerService') }}</div>
          <div class="text-sm">
            <NuxtLink to="/contact" class="py-1.5 block">Contact Us</NuxtLink>
            <NuxtLink to="/" class="py-1.5 block">Shipping & Returns</NuxtLink>
            <NuxtLink to="/" class="py-1.5 block">Privacy Policy</NuxtLink>
            <NuxtLink to="/" class="py-1.5 block">Terms & Conditions</NuxtLink>
            <NuxtLink to="/" class="py-1.5 block">Cookie Policy</NuxtLink>
            <NuxtLink to="/" class="py-1.5 block">Accessibility</NuxtLink>
          </div>
        </div>
        <div class="w-3/7 lg:w-auto">
          <div class="mb-1 font-semibold">{{ $t('messages.account.myAccount') }}</div>
          <div class="text-sm">
            <NuxtLink to="/my-account/" class="py-1.5 block">{{ $t('messages.account.myAccount') }}</NuxtLink>
            <NuxtLink to="/my-account/?tab=orders" class="py-1.5 block">{{ $t('messages.shop.orderHistory') }}</NuxtLink>
          </div>
        </div>
      </div>
      <div class="container border-t flex flex-col md:flex-row items-center justify-center mb-4">
        <div class="copywrite">
          <p class="py-4 text-xs text-center">
            © {{ new Date().getFullYear() }} Moda Prime USA. All rights reserved.
          </p>
        </div>
        <SocialIcons class="md:ml-auto" />
      </div>
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
