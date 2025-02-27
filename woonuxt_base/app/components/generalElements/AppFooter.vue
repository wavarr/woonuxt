<script setup lang="ts">
//const { wooNuxtVersionInfo } = useHelpers();
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
          <NuxtLink to="/about" class="py-1.5 block">About Us</NuxtLink>
          <NuxtLink to="/products/new-customers-10-free-modawake" class="py-1.5 block">Special Offer</NuxtLink>
          <NuxtLink to="/contact" class="py-1.5 block">Contact Us</NuxtLink>
          <NuxtLink to="/terms" class="py-1.5 block">Terms of Service</NuxtLink>
        </div>
      </div>
      <div class="w-3/7 lg:w-auto">
        <div class="mb-1 font-semibold">Products</div>
        <div class="text-sm">
          <NuxtLink to="/products" class="py-1.5 block">{{ $t('messages.shop.newArrivals') }}</NuxtLink>
          <NuxtLink to="/products?filter=sale[true]" class="py-1.5 block">Current Sales</NuxtLink>
          <NuxtLink to="/products?orderby=price" class="py-1.5 block">Shop by Price</NuxtLink>
          <NuxtLink to="/products?orderby=popularity&order=desc" class="py-1.5 block">Popular Products</NuxtLink>
        </div>
      </div>
      <div class="w-3/7 lg:w-auto">
        <div class="mb-1 font-semibold">{{ $t('messages.general.customerService') }}</div>
        <div class="text-sm">
          <NuxtLink to="/contact" class="py-1.5 block">Contact Us</NuxtLink>
          <NuxtLink to="/privacy" class="py-1.5 block">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="py-1.5 block">Terms & Conditions</NuxtLink>
          <NuxtLink to="/products/new-customers-10-free-modawake" class="py-1.5 block">New Customer Offer</NuxtLink>
        </div>
      </div>
      <div class="w-3/7 lg:w-auto">
        <div class="mb-1 font-semibold">{{ $t('messages.account.myAccount') }}</div>
        <div class="text-sm">
          <NuxtLink to="/my-account/" class="py-1.5 block">{{ $t('messages.account.myAccount') }}</NuxtLink>
          <NuxtLink to="/my-account/?tab=orders" class="py-1.5 block">{{ $t('messages.shop.orderHistory') }}</NuxtLink>
          <NuxtLink :to="wishlistLink" class="py-1.5 block">{{ $t('messages.shop.wishlist') }}</NuxtLink>
          <NuxtLink to="/my-account/?tab=account_details" class="py-1.5 block">Account Settings</NuxtLink>
        </div>
      </div>
    </div>
    <div class="container border-t flex items-center justify-center mb-4">
      <div class="copywrite">
        <p class="py-4 text-xs text-center">
          <a href="https://modaprimeusa.com">© 2024 ModaPrime USA</a> - All Rights Reserved
        </p>
      </div>
      <SocialIcons class="ml-auto" />
    </div>
  </footer>
</template>

<style scoped lang="postcss">
a {
  @apply hover:underline;
}
</style>
