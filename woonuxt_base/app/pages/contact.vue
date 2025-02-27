<template>
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-3xl md:text-4xl font-bold mb-8 text-center">Contact Us</h1>
    
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 class="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p class="text-gray-600 mb-6">We're here to help with any questions or concerns you might have.</p>
        
        <form class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              id="name" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              id="message" 
              rows="5" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            class="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      
      <div>
        <h2 class="text-2xl font-semibold mb-4">Our Support Team</h2>
        <p class="text-gray-600 mb-6">Meet the people who will be assisting you.</p>
        
        <div class="space-y-6">
          <div class="flex items-center space-x-4">
            <RedditAvatar size="md" type="1" alt="Support Team Member" />
            <div>
              <h3 class="font-medium">Customer Support</h3>
              <p class="text-gray-500 text-sm">Available 24/7 for general inquiries</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <RedditAvatar size="md" type="3" alt="Support Team Member" />
            <div>
              <h3 class="font-medium">Technical Support</h3>
              <p class="text-gray-500 text-sm">For website and order issues</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <RedditAvatar size="md" type="5" alt="Support Team Member" />
            <div>
              <h3 class="font-medium">Product Specialists</h3>
              <p class="text-gray-500 text-sm">For product-specific questions</p>
            </div>
          </div>
        </div>
        
        <div class="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 class="font-medium mb-2">Contact Information</h3>
          <div class="space-y-3 text-gray-600">
            <p>Email: support@modaprimeusa.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Hours: Monday-Friday, 9am-5pm EST</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import the RedditAvatar component
import RedditAvatar from '../components/RedditAvatar/RedditAvatar.vue';
</script>
