<script setup>
// Use auto-imported useHead
useHead({
  title: 'Shipping Information',
  meta: [
    { name: 'description', content: 'Learn about our shipping policies, delivery times, and shipping methods.' }
  ]
})
</script>

<template>
  <div class="container mx-auto px-4 py-12 md:py-16">
    <h1 class="text-2xl md:text-3xl font-medium mb-8 text-center">Shipping Information</h1>
    
    <div class="max-w-4xl mx-auto">
      <div class="prose prose-sm max-w-none">
        <h2 class="text-xl font-medium mt-10 mb-4">Shipping Policy</h2>
        <p>
          We are committed to delivering your orders promptly and securely. All orders are processed within 1-2 business days. Once your order ships, you will receive a confirmation email with tracking information.
        </p>
        
        <h2 class="text-xl font-medium mt-10 mb-4">Delivery Times</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Standard Shipping:</strong> 3-5 business days</li>
          <li><strong>Express Shipping:</strong> 1-2 business days</li>
          <li><strong>International Shipping:</strong> 7-14 business days</li>
        </ul>
        <p class="text-sm text-gray-600 mt-2">
          Please note that delivery times may vary based on your location and any potential customs processing for international orders.
        </p>
        
        <h2 class="text-xl font-medium mt-10 mb-4">Shipping Methods</h2>
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th class="border border-gray-200 p-3 text-left">Method</th>
              <th class="border border-gray-200 p-3 text-left">Estimated Delivery</th>
              <th class="border border-gray-200 p-3 text-left">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-200 p-3">Standard</td>
              <td class="border border-gray-200 p-3">3-5 business days</td>
              <td class="border border-gray-200 p-3">$5.99</td>
            </tr>
            <tr>
              <td class="border border-gray-200 p-3">Express</td>
              <td class="border border-gray-200 p-3">1-2 business days</td>
              <td class="border border-gray-200 p-3">$12.99</td>
            </tr>
            <tr>
              <td class="border border-gray-200 p-3">International</td>
              <td class="border border-gray-200 p-3">7-14 business days</td>
              <td class="border border-gray-200 p-3">$19.99</td>
            </tr>
          </tbody>
        </table>
        
        <h2 class="text-xl font-medium mt-10 mb-4">Free Shipping</h2>
        <p>
          Orders over $75 qualify for free standard shipping within the continental United States.
        </p>
        
        <h2 class="text-xl font-medium mt-10 mb-4">Order Tracking</h2>
        <p>
          Once your order ships, you will receive a confirmation email with tracking information. You can also track your order by logging into your account and viewing your order history.
        </p>
        
        <h2 class="text-xl font-medium mt-10 mb-4">Contact Us</h2>
        <p>
          If you have any questions about your shipment, please contact our customer service team at <a href="mailto:support@example.com" class="text-gray-700 hover:text-black">support@example.com</a> or call us at (555) 123-4567.
        </p>
      </div>
    </div>
  </div>
</template> 
