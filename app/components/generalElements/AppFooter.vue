<template>
  <footer class="bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#1d3557] text-white">
    <div class="container mx-auto px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand Section -->
        <div class="space-y-6">
          <Logo class="text-white" />
          <p class="text-[#f1faee] text-sm leading-relaxed">
            Your trusted source for premium modafinil, operating from our USA office with professional service.
          </p>
          <LangSwitcher class="mt-8" />
        </div>

        <!-- Information Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[#f1faee]">Information</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/" class="text-[#a8dadc] hover:text-white transition-colors">About Us</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="text-[#a8dadc] hover:text-white transition-colors">FAQ</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Products Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[#f1faee]">Products</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/products" class="text-[#a8dadc] hover:text-white transition-colors">
                New Arrivals
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?filter=sale[true]" class="text-[#a8dadc] hover:text-white transition-colors">
                On sale
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?orderby=rating&order=ASC&filter=rating[1]" class="text-[#a8dadc] hover:text-white transition-colors">
                Top rated
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Customer Service Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[#f1faee]">Customer Service</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/contact" class="text-[#a8dadc] hover:text-white transition-colors">
                Contact Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/my-account" class="text-[#a8dadc] hover:text-white transition-colors">
                My Account
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-16 pt-8 border-t border-[#457b9d]/30">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-[#a8dadc]">
            &copy; {{ new Date().getFullYear() }} ModaPrime USA. All rights reserved.
          </p>
          
          <!-- Social Media Icons -->
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="#" class="text-[#a8dadc] hover:text-white transition-colors">
              <span class="iconify i-ion:logo-twitter" style="font-size:20px;"></span>
            </a>
            <a href="#" class="text-[#a8dadc] hover:text-white transition-colors">
              <span class="iconify i-ion:logo-facebook" style="font-size:20px;"></span>
            </a>
            <a href="#" class="text-[#a8dadc] hover:text-white transition-colors">
              <span class="iconify i-ion:logo-instagram" style="font-size:20px;"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template> 
