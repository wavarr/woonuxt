<script setup>
useHead({
  title: 'My Account',
  meta: [
    { name: 'description', content: 'Manage your account settings and view your orders.' }
  ]
})
</script>

<template>
  <div class="container mx-auto px-4 py-12 md:py-16">
    <h1 class="text-2xl md:text-3xl font-medium mb-8 text-center">My Account</h1>
    
    <div class="max-w-4xl mx-auto">
      <div class="bg-white p-8 rounded-sm border border-gray-100 mb-8">
        <h2 class="text-xl font-medium mb-6">Account Information</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-sm font-medium mb-4">Personal Details</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Name</label>
                <p class="font-medium">John Doe</p>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Email</label>
                <p class="font-medium">john.doe@example.com</p>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Phone</label>
                <p class="font-medium">(555) 123-4567</p>
              </div>
            </div>
            <button class="mt-4 text-sm text-gray-700 hover:text-black">Edit Details</button>
          </div>
          
          <div>
            <h3 class="text-sm font-medium mb-4">Default Address</h3>
            <div class="space-y-1 text-sm">
              <p>John Doe</p>
              <p>123 Main Street</p>
              <p>Apt 4B</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
            </div>
            <button class="mt-4 text-sm text-gray-700 hover:text-black">Edit Address</button>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-8 rounded-sm border border-gray-100">
        <h2 class="text-xl font-medium mb-6">Recent Orders</h2>
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 font-medium">Order</th>
                <th class="text-left py-3 px-4 font-medium">Date</th>
                <th class="text-left py-3 px-4 font-medium">Status</th>
                <th class="text-left py-3 px-4 font-medium">Total</th>
                <th class="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200">
                <td class="py-3 px-4">#1001</td>
                <td class="py-3 px-4">June 15, 2023</td>
                <td class="py-3 px-4">Completed</td>
                <td class="py-3 px-4">$129.99</td>
                <td class="py-3 px-4">
                  <button class="text-gray-700 hover:text-black">View</button>
                </td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="py-3 px-4">#1002</td>
                <td class="py-3 px-4">July 2, 2023</td>
                <td class="py-3 px-4">Processing</td>
                <td class="py-3 px-4">$79.50</td>
                <td class="py-3 px-4">
                  <button class="text-gray-700 hover:text-black">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template> 
