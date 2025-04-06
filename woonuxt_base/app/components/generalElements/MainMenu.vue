<script lang="ts" setup>
import { MenuLocationEnum } from '#gql';

const { data } = await useAsyncGql('getMenuItems', { location: MenuLocationEnum.PRIMARY });
const menuItems = data.value?.menuItems?.nodes || [];
</script>

<template>
  <nav v-if="menuItems.length">
    <ul class="flex gap-8">
      <li v-for="item in menuItems" :key="item.id">
        <NuxtLink :to="item.path" class="hover:text-primary">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>