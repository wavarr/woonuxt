<script setup lang="ts">
const { siteName } = useAppConfig();

useSeoMeta({
  title: `Contact Us | ${siteName}`,
  description: `Get in touch with our team. We're here to help with any questions about our products or services.`,
  ogImage: '/images/placeholder.jpg',
});

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  submitted: false,
  loading: false,
  error: null as string | null
});

const submitForm = () => {
  form.loading = true;
  form.error = null;
  
  // Simulate form submission
  setTimeout(() => {
    form.loading = false;
    form.submitted = true;
  }, 1500);
};
</script>

<template>
  <main>
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold mb-4 text-gray-900">Contact Us</h1>
          <p class="text-lg text-gray-600 mb-0">
            We're here to help and answer any questions you might have.
          </p>
        </div>
      </div>
    </div>
    
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Contact Information -->
          <div class="md:col-span-1">
            <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 class="text-xl font-semibold mb-4 text-gray-900">Contact Information</h2>
              
              <div class="space-y-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 font-medium">Phone</p>
                    <p class="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 font-medium">Email</p>
                    <p class="text-gray-600">support@example.com</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 font-medium">Address</p>
                    <p class="text-gray-600">
                      123 Commerce Street<br>
                      Suite 100<br>
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h2 class="text-xl font-semibold mb-4 text-gray-900">Business Hours</h2>
              
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Monday - Friday:</span>
                  <span class="text-gray-900 font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Saturday:</span>
                  <span class="text-gray-900 font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Sunday:</span>
                  <span class="text-gray-900 font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="md:col-span-2">
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h2 class="text-xl font-semibold mb-6 text-gray-900">Send Us a Message</h2>
              
              <div v-if="form.submitted" class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <svg class="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
                <p class="text-green-700 mb-4">
                  Your message has been sent successfully. We'll get back to you as soon as possible.
                </p>
                <button 
                  @click="form.submitted = false" 
                  class="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
                >
                  Send Another Message
                </button>
              </div>
              
              <form v-else @submit.prevent="submitForm" class="space-y-6">
                <div v-if="form.error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
                  {{ form.error }}
                </div>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      v-model="form.name" 
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    >
                  </div>
                  
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      v-model="form.email" 
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    >
                  </div>
                </div>
                
                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    v-model="form.subject" 
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="How can we help you?"
                  >
                </div>
                
                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    v-model="form.message" 
                    rows="6" 
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center"
                    :disabled="form.loading"
                  >
                    <svg v-if="form.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ form.loading ? 'Sending...' : 'Send Message' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-xl shadow-sm text-left">
              <h3 class="text-lg font-semibold mb-2 text-gray-900">What are your shipping times?</h3>
              <p class="text-gray-600">
                We typically process orders within 1-2 business days. Shipping times vary by location, but most domestic orders arrive within 3-5 business days.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm text-left">
              <h3 class="text-lg font-semibold mb-2 text-gray-900">Do you offer international shipping?</h3>
              <p class="text-gray-600">
                Yes, we ship to most countries worldwide. International shipping times typically range from 7-14 business days depending on the destination.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm text-left">
              <h3 class="text-lg font-semibold mb-2 text-gray-900">What is your return policy?</h3>
              <p class="text-gray-600">
                We offer a 30-day return policy for most items. Products must be in original condition with all packaging to qualify for a full refund.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm text-left">
              <h3 class="text-lg font-semibold mb-2 text-gray-900">How can I track my order?</h3>
              <p class="text-gray-600">
                Once your order ships, you'll receive a confirmation email with tracking information that allows you to monitor your package's journey.
              </p>
            </div>
          </div>
          
          <div class="mt-8">
            <p class="text-gray-600">
              Can't find the answer you're looking for? Please reach out to us using the contact form above.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
