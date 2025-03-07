<template>
  <div class="contact-form-wrapper">
    <h2 class="text-2xl font-semibold mb-6">Contact Us</h2>
    <form @submit.prevent="submitForm" class="space-y-6">
      <div class="form-group">
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input 
          type="text" 
          id="name" 
          v-model="formData.name" 
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
      </div>
      
      <div class="form-group">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="formData.email" 
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
      </div>
      
      <div class="form-group">
        <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <input 
          type="text" 
          id="subject" 
          v-model="formData.subject" 
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
      </div>
      
      <div class="form-group">
        <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea 
          id="message" 
          v-model="formData.message" 
          rows="5" 
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        ></textarea>
      </div>
      
      <div v-if="formError" class="text-red-600 font-medium">{{ formError }}</div>
      <div v-if="formSuccess" class="text-green-600 font-medium">{{ formSuccess }}</div>
      
      <button 
        type="submit" 
        class="px-6 py-2 bg-[#1d3557] text-white rounded-md hover:bg-[#1d3557]/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const formError = ref('');
const formSuccess = ref('');

// Get the form ID from the environment variables
const contactFormId = process.env.NUXT_PUBLIC_CONTACT_FORM_ID || '7e11941';
const wpUrl = process.env.NUXT_PUBLIC_WP_URL || 'https://modaprimeusa.com';

const submitForm = async () => {
  isSubmitting.value = true;
  formError.value = '';
  formSuccess.value = '';
  
  try {
    // Create FormData object for the API request
    const apiFormData = new FormData();
    apiFormData.append('your-name', formData.name);
    apiFormData.append('your-email', formData.email);
    apiFormData.append('your-subject', formData.subject);
    apiFormData.append('your-message', formData.message);
    
    // Send the form data to the WordPress Contact Form 7 endpoint
    const response = await fetch(`${wpUrl}/wp-json/contact-form-7/v1/contact-forms/${contactFormId}/feedback`, {
      method: 'POST',
      body: apiFormData
    });
    
    const result = await response.json();
    
    if (result.status === 'mail_sent') {
      formSuccess.value = 'Thank you for your message. We will get back to you soon!';
      // Reset form
      formData.name = '';
      formData.email = '';
      formData.subject = '';
      formData.message = '';
    } else {
      formError.value = result.message || 'There was an error sending your message. Please try again.';
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    formError.value = 'There was an error sending your message. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-form-wrapper {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style> 
