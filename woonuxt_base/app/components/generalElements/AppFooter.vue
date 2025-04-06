<script setup lang="ts">
const { viewer } = useAuth();
const { data } = await useAsyncGql('getMenuItems', { identifier: 'FOOTER_MENU' });
const menuItems = data?.value?.menuItems?.nodes || [];
const { siteName, storeAddress, storeCity, storeZip, storeCountry } = useAppConfig();
</script>

<template>
  <footer class="pt-12 pb-6 text-white bg-gray-800">
    <div class="container">
      <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <Logo :is-dark="false" class="h-10 mb-4 text-white" />
          <div class="text-sm text-gray-300">
            <p>{{ storeAddress }}<br />{{ storeCity }}, {{ storeZip }} {{ storeCountry }}</p>
          </div>
        </div>

        <div>
          <h4 class="mb-4 text-lg font-semibold">Information</h4>
          <ul class="text-sm grid gap-2">
            <li v-for="item in menuItems" :key="item.id">
              <NuxtLink class="hover:text-primary text-gray-300" :to="item.path">{{ item.label }}</NuxtLink>
            </li>
             <!-- Ensure My Account link respects login state -->
             <li>
               <NuxtLink :to="viewer ? '/my-account' : '/my-account'" class="hover:text-primary text-gray-300">My Account</NuxtLink>
             </li>
          </ul>
        </div>

        <div>
          <h4 class="mb-4 text-lg font-semibold">Products</h4>
           <ul class="text-sm grid gap-2">
             <li><NuxtLink to="/products" class="hover:text-primary text-gray-300">All Products</NuxtLink></li>
             <li><NuxtLink to="/categories" class="hover:text-primary text-gray-300">Categories</NuxtLink></li>
             <!-- Add links to specific categories or sale items if desired -->
           </ul>
        </div>

        <div>
          <h4 class="mb-4 text-lg font-semibold">Follow Us</h4>
           <ul class="text-sm grid gap-2">
             <!-- Replace # with actual social links -->
             <li><a href="#" target="_blank" rel="noopener noreferrer" class="hover:text-primary text-gray-300">Facebook</a></li>
             <li><a href="#" target="_blank" rel="noopener noreferrer" class="hover:text-primary text-gray-300">Twitter</a></li>
             <li><a href="#" target="_blank" rel="noopener noreferrer" class="hover:text-primary text-gray-300">Instagram</a></li>
           </ul>
        </div>
      </div>
      <hr class="my-8 border-gray-700" />
      <div class="text-sm text-center text-gray-400">© {{ new Date().getFullYear() }} {{ siteName }}. All Rights Reserved.</div>
    </div>
  </footer>
</template>
