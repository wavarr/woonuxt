cat > woonuxt_base/app/components/AppHeader/AppHeader.vue << 'EOL'
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const isSearchOpen = ref(false);
const searchQuery = ref('');

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  
  // Prevent scrolling when menu is open
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
  if (isSearchOpen.value) {
    // Focus the search input when opened
    setTimeout(() => {
      document.getElementById('search-input')?.focus();
    }, 100);
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial scroll position
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Redirect to search results page
    navigateTo(`/products?search=${encodeURIComponent(searchQuery.value.trim())}`);
    isSearchOpen.value = false;
    searchQuery.value = '';
  }
};

// Get cart from store
const { cart } = useCart();
const cartItemsCount = computed(() => cart.value?.items?.length || 0);

// Get categories for menu
const categories = ref([]);

onMounted(async () => {
  try {
    const { data } = await useAsyncGql('getProductCategories', { first: 10 });
    categories.value = data.value?.productCategories?.nodes || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
});
</script>

<template>
  <header 
    class="sticky top-0 z-50 w-full transition-all duration-300"
    :class="isScrolled ? 'bg-white shadow-sm' : 'bg-white'"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex-shrink-0">
          <img src="/logo.svg" alt="Logo" class="h-8 md:h-10" />
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            to="/" 
            class="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
            active-class="text-gray-900 font-medium"
            exact
          >
            Home
          </NuxtLink>
          
          <div class="relative group">
            <button 
              class="flex items-center text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              <span>Products</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-sm py-2 z-10 hidden group-hover:block border border-gray-100">
              <NuxtLink 
                to="/products" 
                class="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
              >
                All Products
              </NuxtLink>
              
              <NuxtLink 
                v-for="category in categories" 
                :key="category.id" 
                :to="`/product-category/${category.slug}`" 
                class="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
              >
                {{ category.name }}
              </NuxtLink>
            </div>
          </div>
          
          <NuxtLink 
            to="/about" 
            class="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
            active-class="text-gray-900 font-medium"
          >
            About
          </NuxtLink>
          
          <NuxtLink 
            to="/contact" 
            class="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
            active-class="text-gray-900 font-medium"
          >
            Contact
          </NuxtLink>
        </nav>
        
        <!-- Right Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search Button -->
          <button 
            @click="toggleSearch"
            class="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Search"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <!-- Cart -->
          <CartTrigger />
          
          <!-- Account -->
          <NuxtLink 
            to="/account" 
            class="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Account"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </NuxtLink>
          
          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMenu"
            class="md:hidden text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Menu"
          >
            <svg 
              v-if="!isMenuOpen" 
              class="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              v-else 
              class="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen"
      class="md:hidden fixed inset-0 bg-white z-40 pt-20 overflow-y-auto"
    >
      <nav class="container mx-auto px-4 py-6">
        <ul class="space-y-6">
          <li>
            <NuxtLink 
              to="/" 
              class="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors"
              @click="toggleMenu"
            >
              Home
            </NuxtLink>
          </li>
          
          <li>
            <div class="mb-2">
              <NuxtLink 
                to="/products" 
                class="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors"
                @click="toggleMenu"
              >
                All Products
              </NuxtLink>
            </div>
            
            <ul class="pl-4 space-y-3 border-l border-gray-100">
              <li v-for="category in categories" :key="category.id">
                <NuxtLink 
                  :to="`/product-category/${category.slug}`" 
                  class="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                  @click="toggleMenu"
                >
                  {{ category.name }}
                </NuxtLink>
              </li>
            </ul>
          </li>
          
          <li>
            <NuxtLink 
              to="/about" 
              class="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors"
              @click="toggleMenu"
            >
              About
            </NuxtLink>
          </li>
          
          <li>
            <NuxtLink 
              to="/contact" 
              class="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors"
              @click="toggleMenu"
            >
              Contact
            </NuxtLink>
          </li>
          
          <li>
            <NuxtLink 
              to="/account" 
              class="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors"
              @click="toggleMenu"
            >
              My Account
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    
    <!-- Search Overlay -->
    <div 
      v-if="isSearchOpen"
      class="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-start justify-center pt-20"
      @click.self="isSearchOpen = false"
    >
      <div class="bg-white rounded-md shadow-sm w-full max-w-2xl mx-4 overflow-hidden border border-gray-100">
        <form @submit.prevent="handleSearch" class="relative">
          <input 
            id="search-input"
            v-model="searchQuery"
            type="text" 
            placeholder="Search for products..." 
            class="w-full px-4 py-3 pr-12 text-gray-900 focus:outline-none text-sm"
          />
          <button 
            type="submit"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </header>
</template>
EOL
