<script lang="ts" setup>
import { ProductsOrderByEnum } from '#woo';
const { siteName, description, shortDescription, siteImage } = useAppConfig();

const { data } = await useAsyncGql('getProductCategories', { first: 6 });
const productCategories = data.value?.productCategories?.nodes || [];

const { data: productData } = await useAsyncGql('getProducts', { first: 5, orderby: ProductsOrderByEnum.POPULARITY });
const popularProducts = productData.value.products?.nodes || [];

// Testimonials data with proper type annotation
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Customer',
    content: 'The quality of products from Moda Prime USA is exceptional. Fast shipping and great customer service!',
    avatar: '/images/avatars/reddit-avatar-1.svg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Verified Buyer',
    content: 'I\'ve been a loyal customer for over 2 years. Their products are consistently high quality and effective.',
    avatar: '/images/avatars/reddit-avatar-2.svg'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Regular Customer',
    content: 'The best place to buy Modafinil online. Secure, reliable, and always delivers as promised.',
    avatar: '/images/avatars/reddit-avatar-3.svg'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'New Customer',
    content: 'I was skeptical at first, but the product quality exceeded my expectations. Will definitely order again!',
    avatar: '/images/avatars/reddit-avatar-4.svg'
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    role: 'Loyal Customer',
    content: 'Their customer support team is amazing. They helped me resolve an issue with my order quickly and efficiently.',
    avatar: '/images/avatars/reddit-avatar-5.svg'
  }
];

useSeoMeta({
  title: `Home`,
  ogTitle: siteName,
  description: description,
  ogDescription: shortDescription,
  ogImage: siteImage,
  twitterCard: `summary_large_image`,
});
</script>

<template>
  <main>
    <HeroBanner />
    
    <!-- Featured Categories Section -->
    <section class="py-16 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Featured Categories</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Browse our most popular categories and find exactly what you're looking for</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <NuxtLink 
            v-for="category in productCategories" 
            :key="category.id" 
            :to="`/product-category/${category.slug}`"
            class="category-card group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col items-center p-4 text-center"
          >
            <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
              <img 
                v-if="category.image && category.image.sourceUrl" 
                :src="category.image.sourceUrl" 
                :alt="category.name" 
                class="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              <span v-else class="text-2xl text-blue-500">{{ category.name.charAt(0) }}</span>
            </div>
            <h3 class="font-medium text-gray-900 group-hover:text-primary transition-colors duration-300">{{ category.name }}</h3>
            <p class="text-xs text-gray-500 mt-1">{{ category.count || 0 }} products</p>
          </NuxtLink>
        </div>
      </div>
    </section>
  
    <!-- Popular Products Section -->
    <section class="py-16 bg-white" v-if="popularProducts">
      <div class="container mx-auto px-4">
        <div class="flex items-end justify-between mb-8">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold">{{ $t('messages.shop.popularProducts') }}</h2>
            <p class="text-gray-600 mt-2">Our best-selling products that customers love</p>
          </div>
          <NuxtLink class="text-primary hover:underline font-medium flex items-center" to="/products">
            {{ $t('messages.general.viewAll') }}
            <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
        
        <ProductRow :products="popularProducts" class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5" />
      </div>
    </section>
    
    <!-- Benefits Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">We're committed to providing the best experience for our customers</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="benefit-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Premium Quality</h3>
            <p class="text-gray-600">We source only the highest quality products to ensure customer satisfaction.</p>
          </div>
          
          <div class="benefit-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Fast Shipping</h3>
            <p class="text-gray-600">We process and ship orders quickly to get your products to you as soon as possible.</p>
          </div>
          
          <div class="benefit-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div class="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">24/7 Support</h3>
            <p class="text-gray-600">Our customer service team is available around the clock to assist you.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it - hear from our satisfied customers</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="testimonial in testimonials" 
            :key="testimonial.id"
            class="testimonial-card bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div class="flex items-center mb-4">
              <div class="w-16 h-16 rounded-full overflow-hidden mr-4 bg-white p-1 border border-gray-200">
                <img 
                  v-if="testimonial.avatar" 
                  :src="testimonial.avatar" 
                  :alt="testimonial.name" 
                  class="w-full h-full object-contain"
                />
                <span v-else class="w-full h-full flex items-center justify-center text-white bg-primary">
                  {{ testimonial.name.charAt(0) }}
                </span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
              </div>
            </div>
            <p class="text-gray-600 italic">"{{ testimonial.content }}"</p>
            <div class="mt-4 flex">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter Section -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p class="mb-8">Subscribe to our newsletter for exclusive offers, new arrivals, and other news. Sent no more than twice monthly.</p>
          
          <form class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button 
              type="submit" 
              class="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
          
          <p class="text-sm mt-4 text-blue-100">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}

.category-card, .benefit-card, .testimonial-card {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: calc(var(--index, 0) * 100ms);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply animation delay to cards based on their position */
.category-card:nth-child(1) { --index: 1; }
.category-card:nth-child(2) { --index: 2; }
.category-card:nth-child(3) { --index: 3; }
.category-card:nth-child(4) { --index: 4; }
.category-card:nth-child(5) { --index: 5; }
.category-card:nth-child(6) { --index: 6; }

.benefit-card:nth-child(1) { --index: 1; }
.benefit-card:nth-child(2) { --index: 2; }
.benefit-card:nth-child(3) { --index: 3; }

.testimonial-card:nth-child(1) { --index: 1; }
.testimonial-card:nth-child(2) { --index: 2; }
.testimonial-card:nth-child(3) { --index: 3; }
</style>
