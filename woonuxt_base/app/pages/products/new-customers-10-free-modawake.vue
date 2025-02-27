<script setup lang="ts">
const { siteName } = useAppConfig();

useSeoMeta({
  title: `Special Offer: 10 FREE Modawake for New Customers`,
  ogTitle: `Special Offer from ${siteName}`,
  description: `Limited time offer: Get 10 FREE Modawake tablets with your first order as a new customer.`,
  ogImage: '/images/hero-3.jpg',
  twitterCard: `summary_large_image`,
});
</script>

<template>
  <main>
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold text-sm mb-6 animate-pulse">
            LIMITED TIME OFFER
          </div>
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            <span class="block">10 FREE Modawake</span>
            <span class="block mt-2">For New Customers!</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            Experience the benefits of premium quality Modawake at no cost.
          </p>
          
          <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <NuxtLink to="/products" class="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300 flex items-center justify-center">
              Shop Now
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </NuxtLink>
            <a href="#details" class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300 flex items-center justify-center">
              Learn More
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
          </div>
          
          <div class="text-sm text-blue-200">
            *Offer valid for new customers only. Limited to one per customer.
          </div>
        </div>
      </div>
    </div>
    
    <div id="details" class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">How It Works</h2>
          
          <div class="grid md:grid-cols-3 gap-8 mb-16">
            <div class="bg-gray-50 p-6 rounded-xl text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 class="text-xl font-semibold mb-2">Create an Account</h3>
              <p class="text-gray-600">Sign up for a new account on our website.</p>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-xl text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 class="text-xl font-semibold mb-2">Place Your Order</h3>
              <p class="text-gray-600">Add products to your cart and proceed to checkout.</p>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-xl text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 class="text-xl font-semibold mb-2">Receive Your Free Gift</h3>
              <p class="text-gray-600">We'll automatically add 10 free Modawake tablets to your order.</p>
            </div>
          </div>
          
          <div class="bg-blue-50 p-8 rounded-xl mb-16">
            <h3 class="text-2xl font-bold mb-4 text-blue-800">About Modawake</h3>
            <p class="mb-4">
              Modawake is our premium quality cognitive enhancer designed to help you stay alert and focused. 
              It's perfect for those long study sessions, important projects, or whenever you need that extra mental clarity.
            </p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Enhances focus and concentration</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Improves mental clarity</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Premium quality, lab-tested</span>
              </li>
            </ul>
            <NuxtLink to="/products" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
              View Product Details
            </NuxtLink>
          </div>
          
          <div class="text-center">
            <h3 class="text-2xl font-bold mb-4">Don't Miss Out!</h3>
            <p class="text-lg text-gray-600 mb-8">
              This special offer is available for a limited time only. 
              Take advantage of this opportunity to try our premium products.
            </p>
            <NuxtLink to="/products" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300">
              Shop Now
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div class="space-y-6">
            <div class="bg-white p-6 rounded-xl shadow-sm">
              <h3 class="text-xl font-semibold mb-2">Who is eligible for this offer?</h3>
              <p class="text-gray-600">
                This offer is available to new customers only who are creating their first account with us.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm">
              <h3 class="text-xl font-semibold mb-2">How long will this offer last?</h3>
              <p class="text-gray-600">
                This is a limited-time promotion. We recommend taking advantage of it as soon as possible.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm">
              <h3 class="text-xl font-semibold mb-2">Is there a minimum purchase required?</h3>
              <p class="text-gray-600">
                No minimum purchase is required to receive your 10 free Modawake tablets.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm">
              <h3 class="text-xl font-semibold mb-2">How will I receive my free Modawake?</h3>
              <p class="text-gray-600">
                Your free Modawake will be automatically added to your order and shipped together with your purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style> 
