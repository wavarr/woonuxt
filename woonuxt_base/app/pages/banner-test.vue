<template>
  <div>
    <HeroBanner />
    
    <div class="container mx-auto px-4 py-12">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-navy-900 mb-4">Banner Test Page</h2>
        <p class="text-gray-700 mb-4">
          This is a test page to view the updated HeroBanner component with flowing ribbon design.
        </p>
        <p class="text-gray-700 mb-4">
          The banner should display flowing red, white, and blue ribbons in a style similar to the reference image.
        </p>
        <div class="mt-8">
          <NuxtLink to="/" class="inline-flex items-center px-4 py-2 bg-navy-900 text-white rounded-md hover:bg-opacity-90 transition-colors">
            <span>Return to Home</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeroBanner from '../components/generalElements/HeroBanner.vue';

// Set page metadata
useHead({
  title: 'Banner Test Page',
  meta: [
    { name: 'description', content: 'Test page for viewing the updated HeroBanner component' }
  ]
});
</script>

<style scoped>
/* Additional styles if needed */
</style> 
