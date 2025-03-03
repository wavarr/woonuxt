<script setup lang="ts">
// In Nuxt 3, composables are auto-imported, so we don't need explicit imports
const { wooNuxtVersionInfo } = useHelpers();
const { wishlistLink } = useAuth();
</script>

<template>
  <footer class="footer-container order-last">
    <div class="wave-container">
      <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
        <path class="wave-path" d="M0,96L60,80C120,64,240,32,360,32C480,32,600,64,720,80C840,96,960,96,1080,80C1200,64,1320,32,1380,16L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
    </div>
    <div class="footer-content bg-gray-200">
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
}

.wave {
  width: 100%;
  height: 120px;
}

.wave-path {
  fill: #0047AB; /* Navy blue color */
  transform-origin: bottom;
  animation: wave-animation 10s linear infinite;
}

.footer-content {
  position: relative;
  z-index: 1;
}

@keyframes wave-animation {
  0% {
    transform: translateX(0) translateY(0) scaleY(1);
  }
  50% {
    transform: translateX(-25px) translateY(5px) scaleY(1.1);
  }
  100% {
    transform: translateX(0) translateY(0) scaleY(1);
  }
}
</style>
