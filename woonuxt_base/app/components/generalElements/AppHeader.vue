<script setup lang="ts">
import { computed } from 'vue';
import { useSearching, useWishlist, useCart } from '#imports'; // Import composables
import WishlistTrigger from './WishlistTrigger.vue'; // Import WishlistTrigger
const { isShowingSearch, toggleSearch } = useSearching(); // Added toggleSearch
const { wishlistCount } = useWishlist(); // Get wishlist count
const { cart } = useCart(); // Get cart for count display

const cartItemCount = computed(() => cart.value?.contents?.itemCount || 0);
</script>

<template>
  <header class="sticky top-0 z-40 bg-white shadow-sm shadow-light-500">
    <div class="container flex items-center justify-between h-16 md:h-20"> <!-- Standard height -->
      <!-- Left Section -->
      <div class="flex items-center">
        <MenuTrigger class="lg:hidden mr-2 -ml-2 p-2" /> <!-- Adjusted padding/margin -->
        <Logo class="h-8 md:h-10 w-auto" /> <!-- Adjusted size -->
      </div>

      <!-- Center Section - Main Menu -->
      <MainMenu class="items-center hidden gap-6 text-sm text-gray-600 lg:flex lg:px-4" />

      <!-- Right Section -->
      <div class="flex justify-end items-center gap-3 md:gap-4"> <!-- Adjusted gap -->
         <!-- Desktop Search -->
        <ProductSearch class="hidden md:inline-flex max-w-[280px] w-full" />
         <!-- Mobile Search Trigger -->
        <SearchTrigger class="md:hidden p-2 -mr-2" /> <!-- Adjusted padding/margin -->

        <!-- Icons -->
        <div class="flex items-center gap-3 md:gap-4">
          <WishlistTrigger :count="wishlistCount" />
          <SignInLink />
          <CartTrigger :count="cartItemCount" />
        </div>
      </div>
    </div>

    <!-- Mobile Search Bar -->
    <Transition name="slide-down"> <!-- Changed transition -->
      <div class="absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-100 p-4 md:hidden" v-if="isShowingSearch">
        <ProductSearch class="flex w-full" @search-performed="toggleSearch(false)" /> <!-- Close on search -->
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* Slide Down Transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
  max-height: 100px; /* Adjust as needed */
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to,
.slide-down-leave-from {
    max-height: 100px;
    opacity: 1;
    transform: translateY(0);
}
</style>
