<script setup lang="ts">
// In Nuxt 3, composables are auto-imported, so we don't need explicit imports
const { wooNuxtVersionInfo } = useHelpers();
const { wishlistLink } = useAuth();
</script>

<template>
  <footer class="bg-white order-last">
    <div class="container flex flex-wrap justify-between gap-12 my-24 md:gap-24">
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
  </footer>
</template>

<style scoped lang="postcss">
a {
  @apply hover:underline;
}
</style>
