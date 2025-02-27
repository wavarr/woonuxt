<script setup lang="ts">
const { siteName, description, shortDescription, siteImage } = useAppConfig();

useSeoMeta({
  title: `About Us`,
  ogTitle: `About ${siteName}`,
  description: `Learn more about ${siteName} and our commitment to quality products and service.`,
  ogDescription: shortDescription,
  ogImage: siteImage,
  twitterCard: `summary_large_image`,
});
</script>

<template>
  <main>
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-8 text-gray-900">About Us</h1>
        
        <div class="prose prose-lg max-w-none">
          <p class="text-xl text-gray-700 mb-8">
            At Moda Prime, we're dedicated to providing premium quality products that help our customers achieve their goals.
          </p>
          
          <h2 class="text-2xl font-semibold mt-12 mb-4">Our Story</h2>
          <p>
            Founded in 2018, Moda Prime began with a simple mission: to provide access to high-quality products with exceptional customer service. 
            What started as a small operation has grown into a trusted source for customers around the world.
          </p>
          
          <h2 class="text-2xl font-semibold mt-12 mb-4">Our Commitment</h2>
          <p>
            We believe in transparency, quality, and customer satisfaction. Every product we offer undergoes rigorous quality control to ensure you receive only the best.
          </p>
          
          <div class="bg-blue-50 p-8 rounded-xl my-12">
            <h3 class="text-xl font-semibold text-blue-800 mb-4">Our Values</h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <svg class="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span><strong>Quality:</strong> We source only the highest quality products.</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span><strong>Integrity:</strong> We operate with honesty and transparency.</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span><strong>Customer Focus:</strong> Your satisfaction is our priority.</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span><strong>Innovation:</strong> We continuously improve our products and services.</span>
              </li>
            </ul>
          </div>
          
          <h2 class="text-2xl font-semibold mt-12 mb-4">Our Team</h2>
          <p>
            Our team consists of dedicated professionals with expertise in pharmaceuticals, customer service, and logistics. 
            We work together to ensure that every aspect of your experience with us exceeds expectations.
          </p>
          
          <h2 class="text-2xl font-semibold mt-12 mb-4">Contact Us</h2>
          <p>
            Have questions or need assistance? Our customer service team is available to help. 
            Visit our <NuxtLink to="/contact" class="text-primary hover:underline">Contact page</NuxtLink> to get in touch.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.prose h2 {
  color: #4f46e5;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}
</style> 
