<script setup lang="ts">
import { ref, computed } from 'vue';

// Temporarily disable menu fetching to avoid useAsyncGql issues
// const { data, error, loading } = useAsyncGql('getMenuItems', { identifier: 'PRIMARY_MENU' });

// Default to empty array
const menuItems = ref([]);

</script>

<template>
  <!-- Render based on the ref -->
  <nav v-if="menuItems && menuItems.length > 0">
    <ul class="flex gap-8">
      <li v-for="item in menuItems" :key="item.id">
        <NuxtLink :to="item.path" class="hover:text-primary">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
  <!-- Removed loading indicator as we are not tracking loading state -->
</template>
