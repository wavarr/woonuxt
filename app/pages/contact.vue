<template>
  <div class="container my-8">
    <h1 class="mb-8 text-3xl font-semibold text-primary">Contact Us</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="prose">
        <h2 class="text-xl font-semibold mb-4">Get in Touch</h2>
        <p>
          Have questions about our products or services? Need assistance with your order? 
          We're here to help! As a Premium Nootropic Vendor, we pride ourselves on providing 
          exceptional customer service.
        </p>
        
        <h3 class="text-lg font-medium mt-6 mb-3">Our Office</h3>
        <p>
          ModaPrime USA<br>
          United States
        </p>
        
        <h3 class="text-lg font-medium mt-6 mb-3">Email</h3>
        <p>
          <a href="mailto:modaprime@protonmail.com" class="text-blue-600 hover:underline">
            modaprime@protonmail.com
          </a>
        </p>
        
        <h3 class="text-lg font-medium mt-6 mb-3">Business Hours</h3>
        <p>
          Monday - Friday: 9:00 AM - 5:00 PM EST<br>
          Saturday - Sunday: Closed
        </p>
      </div>
      
      <div>
        <ContactForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import ContactForm from '~/components/ContactForm.vue';
</script> 
