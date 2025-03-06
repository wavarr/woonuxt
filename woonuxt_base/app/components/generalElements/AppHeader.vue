<script setup lang="ts">
// No imports needed
</script>

<template>
  <header class="sticky top-0 z-40 bg-[#1d3557]/95 backdrop-blur-sm">
    <div class="container flex items-center justify-between py-3 relative z-10">
      <div class="flex items-center">
        <MenuTrigger class="lg:hidden menu-trigger" />
        <Logo class="md:w-[140px] logo" />
      </div>
      <div class="flex items-center gap-4">
        <ProductSearch class="hidden sm:inline-flex max-w-[250px]" />
        <SearchTrigger class="search-trigger" />
        <div class="flex gap-4 items-center">
          <SignInLink class="sign-in-link" />
          <CartTrigger class="cart-trigger" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Header Styling */
header {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

/* Component Styling for Better Contrast */
:deep(.menu-trigger), 
:deep(.search-trigger), 
:deep(.sign-in-link), 
:deep(.cart-trigger) {
  color: #f1faee !important;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.4));
  transition: all 0.2s ease;
}

:deep(.menu-trigger:hover), 
:deep(.search-trigger:hover), 
:deep(.sign-in-link:hover), 
:deep(.cart-trigger:hover) {
  color: white !important;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
}

:deep(.logo) {
  filter: drop-shadow(1px 1px 3px rgba(255, 255, 255, 0.3));
}

:deep(.logo span) {
  color: #f1faee !important;
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.3);
  letter-spacing: 0.02em;
}
</style>
