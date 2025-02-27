<script setup>
useHead({
  title: 'About Us',
  meta: [
    { name: 'description', content: 'Learn about our company, mission, and values.' }
  ]
})
</script>

<template>
  <div class="container mx-auto px-4 py-12 md:py-16">
    <h1 class="text-2xl md:text-3xl font-medium mb-8 text-center">About Us</h1>
    
    <div class="max-w-4xl mx-auto">
      <div class="prose prose-sm max-w-none">
        <p class="lead text-lg mb-6">
          We are committed to providing quality products with efficient service and secure transactions.
        </p>
        
        <h2 class="text-xl font-medium mt-10 mb-4">Our Approach</h2>
        <p>
          Our business model is built on the principles of quality, efficiency, and security. We carefully select our products to ensure they meet our standards for durability and performance. Our streamlined operations allow us to deliver products promptly and respond to customer inquiries in a timely manner.
        </p>
        
        <h2 class="text-xl font-medium mt-10 mb-4">Our Objectives</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li>Provide high-quality products that meet customer needs</li>
          <li>Ensure efficient delivery and responsive customer service</li>
          <li>Maintain secure transactions and protect customer data</li>
          <li>Continuously improve our product selection and service quality</li>
        </ul>
        
        <h2 class="text-xl font-medium mt-10 mb-4">Our Standards</h2>
        <p>
          We adhere to strict standards in all aspects of our business:
        </p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Product Quality: All items undergo thorough inspection before shipping</li>
          <li>Customer Service: Prompt, professional responses to all inquiries</li>
          <li>Data Security: Advanced encryption and privacy protection measures</li>
          <li>Business Ethics: Fair pricing and transparent policies</li>
        </ul>
        
        <h2 class="text-xl font-medium mt-10 mb-4">Our Guarantees</h2>
        <p>
          We stand behind our products and services with the following guarantees:
        </p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Satisfaction Guarantee: If you're not satisfied, we'll make it right</li>
          <li>Secure Transactions: Your payment and personal information are protected</li>
          <li>Quality Assurance: Products that meet or exceed industry standards</li>
          <li>Responsive Support: Assistance when you need it</li>
        </ul>
      </div>
    </div>
  </div>
</template>
