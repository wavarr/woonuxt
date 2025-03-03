<template>
  <footer class="bg-gray-900 text-white">
    <div class="container mx-auto px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand Section -->
        <div class="space-y-6">
          <Logo class="text-white" />
          <p class="text-gray-400 text-sm leading-relaxed">
            Your trusted source for premium modafinil, operating from our USA office with professional service.
          </p>
          <LangSwitcher class="mt-8" />
        </div>

        <!-- Information Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Information</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">About Us</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">FAQ</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Products Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Products</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/products" class="text-gray-400 hover:text-white transition-colors">
                New Arrivals
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?filter=sale[true]" class="text-gray-400 hover:text-white transition-colors">
                On sale
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?orderby=rating&order=ASC&filter=rating[1]" class="text-gray-400 hover:text-white transition-colors">
                Top rated
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Customer Service Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Customer Service</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/contact" class="text-gray-400 hover:text-white transition-colors">Contact Us</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">Shipping & Returns</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">Terms & Conditions</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">Cookie Policy</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">Accessibility</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-16 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} ModaPrime USA. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <Icon name="ion:logo-facebook" size="20" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <Icon name="ion:logo-twitter" size="20" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <Icon name="ion:logo-instagram" size="20" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template> 
