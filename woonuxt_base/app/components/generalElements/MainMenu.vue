<script setup lang="ts">
// No need for wishlistLink since we're removing that link
</script>

<template>
  <nav>
    <NuxtLink to="/">{{ $t('messages.general.home') }}</NuxtLink>
    <NuxtLink to="/products">{{ $t('messages.general.allProducts') }}</NuxtLink>
    <NuxtLink to="/contact">{{ $t('messages.general.contact') }}</NuxtLink>
  </nav>
</template>
