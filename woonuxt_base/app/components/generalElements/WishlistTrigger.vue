<template>
    <NuxtLink
      to="/wishlist"
      aria-label="Wishlist"
      class="relative flex items-center justify-center w-8 h-8 p-1 text-gray-600 transition rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    >
      <span class="sr-only">Wishlist</span>
      <!-- Basic Heart Icon (Heroicons outline/heart) -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
  
      <!-- Optional Count Badge -->
      <span
        v-if="count > 0"
        class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full"
      >
        {{ count }}
      </span>
    </NuxtLink>
  </template>
  
  <script setup lang="ts">
  defineProps({
    count: {
      type: Number,
      default: 0,
    },
  });
  </script>
