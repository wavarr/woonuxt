<template>
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-3xl md:text-4xl font-bold mb-8 text-center">About Us</h1>
    
    <div class="max-w-3xl mx-auto prose prose-lg mb-16">
      <p>
        Welcome to Moda Prime USA, your trusted source for high-quality products. We are dedicated to providing exceptional service and premium products to our customers.
      </p>
      
      <h2>Our Story</h2>
      <p>
        Founded with a passion for quality and customer satisfaction, Moda Prime USA has grown from a small startup to a trusted name in the industry. Our journey began with a simple mission: to provide customers with products they can trust at prices they can afford.
      </p>
      
      <h2>Our Mission</h2>
      <p>
        At Moda Prime USA, our mission is to deliver exceptional products that enhance our customers' lives. We believe in transparency, integrity, and building lasting relationships with our customers.
      </p>
      
      <h2>Our Values</h2>
      <ul>
        <li><strong>Quality:</strong> We source only the highest quality products.</li>
        <li><strong>Integrity:</strong> We operate with honesty and transparency in all our dealings.</li>
        <li><strong>Customer Focus:</strong> Our customers are at the heart of everything we do.</li>
        <li><strong>Innovation:</strong> We continuously seek to improve and innovate.</li>
      </ul>
      
      <h2>Our Commitment</h2>
      <p>
        We are committed to providing:
      </p>
      <ul>
        <li>Premium quality products</li>
        <li>Exceptional customer service</li>
        <li>Fast and reliable shipping</li>
        <li>Secure and easy shopping experience</li>
      </ul>
    </div>
    
    <!-- Team Section with Reddit-style Avatars -->
    <section class="py-12 bg-gray-50 rounded-xl">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="mx-auto mb-4 flex justify-center">
              <RedditAvatar size="xl" type="1" alt="Team Member" />
            </div>
            <h3 class="text-xl font-semibold mb-1">Alex Johnson</h3>
            <p class="text-gray-500 mb-3">Founder & CEO</p>
            <p class="text-gray-600">Passionate about providing quality products and exceptional customer service.</p>
          </div>
          
          <div class="text-center">
            <div class="mx-auto mb-4 flex justify-center">
              <RedditAvatar size="xl" type="3" alt="Team Member" />
            </div>
            <h3 class="text-xl font-semibold mb-1">Jamie Smith</h3>
            <p class="text-gray-500 mb-3">Product Specialist</p>
            <p class="text-gray-600">Expert in finding the best products to meet our customers' needs.</p>
          </div>
          
          <div class="text-center">
            <div class="mx-auto mb-4 flex justify-center">
              <RedditAvatar size="xl" type="5" alt="Team Member" />
            </div>
            <h3 class="text-xl font-semibold mb-1">Taylor Reed</h3>
            <p class="text-gray-500 mb-3">Customer Support Lead</p>
            <p class="text-gray-600">Dedicated to ensuring every customer has a positive experience.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Import the RedditAvatar component
import RedditAvatar from '../components/RedditAvatar/RedditAvatar.vue';
</script>
