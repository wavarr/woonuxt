<script lang="ts" setup>
const { logoutUser, viewer, avatar, isPending, isLoggedIn, getOrders, getDownloads } = useAuth();
const { cart } = useCart();
const route = useRoute();
const router = useRouter();

const activeTab = computed(() => route.query.tab || 'my-details');
const showLoader = computed(() => isPending.value || (!cart.value && !viewer.value && isLoggedIn.value)); // Show loader if pending or logged in but data not loaded yet

// Redirect to login if trying to access account page while not logged in
// This should ideally be middleware, but can be a local check too
onMounted(() => {
    // Use nextTick to ensure auth state is initialized
    nextTick(() => {
      if (!isLoggedIn.value) {
        // Instead of redirecting here, let the template handle the !isLoggedIn state
        // router.push('/login?redirect=/my-account');
      } else {
          // Fetch orders/downloads if landing directly on those tabs and data isn't loaded
          if (activeTab.value === 'orders') {
              getOrders(); // getOrders handles its own pending state
          } else if (activeTab.value === 'downloads') {
              getDownloads(); // getDownloads handles its own pending state
          }
      }
    });
});


// Watch for tab changes to load data
 watch(activeTab, (newTab) => {
   if (isLoggedIn.value) { // Only fetch if logged in
        if (newTab === 'orders') {
        getOrders();
        } else if (newTab === 'downloads') {
        getDownloads();
        }
   }
 });

useSeoMeta({
  title: `My Account`,
  robots: 'noindex, nofollow', // Prevent indexing of account pages
});
</script>

<template>
  <div class="container min-h-[600px]">
     <!-- Centralized Loader -->
    <div v-if="showLoader" class="flex flex-col items-center justify-center min-h-[500px]">
      <LoadingIcon class="m-auto" size="60" />
       <p class="mt-4 text-gray-500">Loading account details...</p>
    </div>

     <!-- Login/Register Component if not logged in -->
     <div v-else-if="!isLoggedIn" class="py-16">
        <LazyLoginAndRegister />
     </div>

    <!-- Account Details (If logged in) -->
    <div v-else-if="isLoggedIn && viewer" class="flex flex-col items-start justify-between w-full gap-12 mt-8 mb-24 lg:flex-row">
      <!-- Sidebar -->
      <div class="w-full lg:max-w-[260px] lg:sticky lg:top-24"> <!-- Sticky top adjusted -->
        <section class="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
          <img v-if="avatar" :src="avatar" class="w-12 h-12 border rounded-full aspect-square border-gray-200" alt="user-image" width="48" height="48" />
           <Icon v-else name="ion:person-circle-outline" size="48" class="text-gray-400" />
          <div class="flex-1 overflow-hidden text-sm">
             <div class="font-semibold truncate">Welcome, {{ viewer?.firstName || viewer?.username }}</div>
             <span v-if="viewer?.email" class="text-gray-500 truncate font-light" :title="viewer?.email">{{ viewer?.email }}</span>
          </div>
          <!-- Mobile Logout -->
           <button title="Logout" class="flex flex-col items-center p-2 text-gray-600 rounded-lg lg:hidden hover:bg-red-50 hover:text-red-600" @click="logoutUser">
             <LoadingIcon v-if="isPending" size="20" color="#DC2626" /> <!-- Use global isPending for logout -->
             <Icon v-else name="ion:log-out-outline" size="20" />
             <small class="text-xs">{{ $t('messages.account.logout') }}</small>
           </button>
        </section>

        <!-- Navigation -->
         <nav class="flex flex-wrap w-full gap-1.5 my-6 text-gray-700 lg:grid min-w-[240px] lg:w-auto items-start">
           <NuxtLink :to="{ path: '/my-account', query: { tab: 'my-details' }}" class="nav-link" :class="{ active: activeTab == 'my-details' }">
             <Icon name="ion:person-outline" size="20" /> <!-- Changed icon -->
             {{ $t('messages.general.myDetails') }}
           </NuxtLink>
           <NuxtLink :to="{ path: '/my-account', query: { tab: 'orders' }}" class="nav-link" :class="{ active: activeTab == 'orders' }">
             <Icon name="ion:receipt-outline" size="20" /> <!-- Changed icon -->
             {{ $t('messages.shop.order', 2) }}
           </NuxtLink>
           <NuxtLink :to="{ path: '/my-account', query: { tab: 'downloads' }}" class="nav-link" :class="{ active: activeTab == 'downloads' }">
             <Icon name="ion:cloud-download-outline" size="20" />
             {{ $t('messages.general.downloads') }}
           </NuxtLink>
           <NuxtLink :to="{ path: '/my-account', query: { tab: 'wishlist' }}" class="nav-link" :class="{ active: activeTab == 'wishlist' }">
             <Icon name="ion:heart-outline" size="20" />
             Wishlist
           </NuxtLink>
            <!-- Addresses Link -->
            <NuxtLink :to="{ path: '/my-account', query: { tab: 'addresses' }}" class="nav-link" :class="{ active: activeTab == 'addresses' }">
              <Icon name="ion:map-outline" size="20" />
              Addresses
            </NuxtLink>
         </nav>

        <!-- Desktop Logout -->
         <div class="hidden lg:block">
           <hr class="my-6" />
           <button class="flex items-center w-full gap-4 p-2 px-4 text-gray-700 rounded-lg hover:bg-red-100 hover:text-red-700" @click="logoutUser">
             <LoadingIcon v-if="isPending" size="20" color="#B91C1B" /> <!-- Use global isPending for logout -->
             <Icon v-else name="ion:log-out-outline" size="20" />
             {{ $t('messages.account.logout') }}
           </button>
         </div>
      </div>

      <!-- Main Content Area -->
       <main class="flex-1 w-full max-w-screen-lg p-6 bg-white rounded-lg shadow-sm lg:p-8">
         <AccountMyDetails v-if="activeTab === 'my-details'" :user="viewer" />
         <AccountAddresses v-else-if="activeTab === 'addresses'" />
         <OrderList v-else-if="activeTab === 'orders'" />
         <DownloadList v-else-if="activeTab === 'downloads'" />
         <WishList v-else-if="activeTab === 'wishlist'" />
         <!-- Add Fallback/Welcome message for default state (e.g., when no tab is active or tab is unrecognized) -->
          <div v-else-if="activeTab === 'my-details'">
               <!-- Content is handled by AccountMyDetails -->
          </div>
          <div v-else> <!-- Fallback for unrecognized tabs -->
              <h2 class="text-xl font-semibold mb-4">Welcome to your account</h2>
              <p>Select an option from the sidebar to view your details, orders, downloads, or wishlist.</p>
          </div>
       </main>
    </div>
      <!-- Fallback if user data somehow missing despite being logged in (should be rare) -->
      <div v-else-if="isLoggedIn && !viewer && !showLoader">
           <p class="text-center text-red-500">Could not load account details. Please try refreshing the page.</p>
      </div>
  </div>
</template>

<style lang="postcss" scoped>
.nav-link {
  @apply flex items-center gap-3 p-3 px-4 rounded-lg border border-transparent transition-colors duration-150 ease-in-out; /* Subtle border */

  &.active,
  &:hover {
    @apply bg-gray-100 text-primary font-medium border-gray-200; /* Consistent hover/active */
  }
  &:focus {
     @apply ring-2 ring-primary ring-opacity-50 outline-none; /* Focus state */
  }

  & svg {
     flex-shrink: 0; /* Prevent icon shrinking */
    @media (max-width: 640px) {
      /* display: none !important; */ /* Keep icons on mobile */
    }
  }
}
</style>