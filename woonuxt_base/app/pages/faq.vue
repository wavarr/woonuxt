<script setup>
// Use auto-imported useHead
useHead({
  title: 'Frequently Asked Questions',
  meta: [
    { name: 'description', content: 'Find answers to common questions about our products, shipping, returns, and more.' }
  ]
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-8">Frequently Asked Questions</h1>

    <div class="space-y-8">
      <div class="bg-white p-6 rounded-sm border border-gray-100">
        <h2 class="text-lg font-medium mb-4">Refunds</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-medium text-sm mb-2">When will I receive my refund?</h3>
            <p class="text-gray-600 text-sm">
              Refunds are processed within 3-5 business days after we receive your return. It may take an additional 5-10 business days for the refund to appear on your account, depending on your payment provider.
            </p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-sm border border-gray-100">
        <h2 class="text-lg font-medium mb-4">Products & Inventory</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-medium text-sm mb-2">Are your products authentic?</h3>
            <p class="text-gray-600 text-sm">
              Yes, all our products are 100% authentic. We source directly from manufacturers or authorized distributors.
            </p>
          </div>
          
          <div>
            <h3 class="font-medium text-sm mb-2">What if an item is out of stock?</h3>
            <p class="text-gray-600 text-sm">
              You can sign up for email notifications to be alerted when an out-of-stock item becomes available again.
            </p>
          </div>
          
          <div>
            <h3 class="font-medium text-sm mb-2">Do you offer product warranties?</h3>
            <p class="text-gray-600 text-sm">
              Most products come with the manufacturer's warranty. Warranty information is listed on the product page when applicable.
            </p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-sm border border-gray-100">
        <h2 class="text-lg font-medium mb-4">Account & Privacy</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-medium text-sm mb-2">Do I need to create an account to place an order?</h3>
            <p class="text-gray-600 text-sm">
              No, you can check out as a guest. However, creating an account allows you to track orders, save shipping information, and access order history.
            </p>
          </div>
          
          <div>
            <h3 class="font-medium text-sm mb-2">How is my personal information protected?</h3>
            <p class="text-gray-600 text-sm">
              We use industry-standard security measures to protect your personal information. Please see our Privacy Policy for details on how we collect, use, and protect your data.
            </p>
          </div>
          
          <div>
            <h3 class="font-medium text-sm mb-2">Can I update my account information?</h3>
            <p class="text-gray-600 text-sm">
              Yes, you can update your account information, including shipping addresses and payment methods, by logging into your account and navigating to the Account Settings page.
            </p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-sm border border-gray-100">
        <h2 class="text-lg font-medium mb-4">Contact & Support</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-medium text-sm mb-2">How can I contact customer service?</h3>
            <p class="text-gray-600 text-sm">
              You can reach our customer service team by email at support@example.com or by phone at (555) 123-4567, Monday through Friday, 9am-5pm EST.
            </p>
          </div>
          
          <div>
            <h3 class="font-medium text-sm mb-2">What is your response time for inquiries?</h3>
            <p class="text-gray-600 text-sm">
              We aim to respond to all inquiries within 24 hours during business days.
            </p>
          </div>
          
          <div>
            <h3 class="font-medium text-sm mb-2">Do you have a physical store location?</h3>
            <p class="text-gray-600 text-sm">
              We operate exclusively online at this time and do not have a physical retail location.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-12 text-center">
      <h2 class="text-lg font-medium mb-4">Still Have Questions?</h2>
      <p class="text-gray-600 mb-6">Our customer service team is here to help.</p>
      <NuxtLink 
        to="/contact" 
        class="inline-block px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-sm hover:bg-black transition-colors duration-300"
      >
        Contact Us
      </NuxtLink>
    </div>
  </div>
</template> 
