<script lang="ts" setup>
// import { MenuLocationEnum } from '#gql'; // Removed problematic import
const { toggleMobileMenu } = useHelpers();
const { viewer } = useAuth();

// Replaced location enum with string identifier
const { data } = await useAsyncGql('getMenuItems', { identifier: 'PRIMARY_MENU' });
const menuItems = data.value?.menuItems?.nodes || [];

const closeMenu = () => toggleMobileMenu(false);
</script>

<template>
  <div class="fixed inset-0 z-50 flex flex-col w-11/12 max-w-md overflow-x-hidden bg-white shadow-lg">
     <!-- Header -->
     <div class="flex items-center justify-between p-4 border-b">
       <Logo class="h-8 w-auto" />
       <button @click="closeMenu" class="p-1 -mr-2 rounded-md hover:bg-gray-100" aria-label="Close Menu">
         <Icon name="ion:close-outline" size="28" />
       </button>
     </div>

    <!-- Menu Items -->
    <nav class="flex-1 p-4 overflow-y-auto">
      <ul class="flex flex-col gap-4 text-lg">
        <li v-for="item in menuItems" :key="item.id">
          <NuxtLink :to="item.path" class="block p-2 rounded hover:bg-gray-100 hover:text-primary" @click="closeMenu">
            {{ item.label }}
          </NuxtLink>
        </li>
        <!-- Account Link -->
        <li>
          <NuxtLink :to="viewer ? '/my-account' : '/my-account'" class="block p-2 rounded hover:bg-gray-100 hover:text-primary" @click="closeMenu">
             My Account
          </NuxtLink>
        </li>
      </ul>
    </nav>

     <!-- Footer Links (Optional) -->
     <!-- <div class="p-4 mt-auto border-t">
       <ul class="flex justify-around text-sm">
         <li><NuxtLink to="/wishlist" @click="closeMenu">Wishlist</NuxtLink></li>
         <li><NuxtLink to="/contact" @click="closeMenu">Contact</NuxtLink></li>
       </ul>
     </div> -->
  </div>
</template>


--- END OF FILE compiled_project.txt ---
