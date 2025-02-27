<script setup lang="ts">
// Declare auto-imported composables for TypeScript
declare const ref: any;
declare const useAsyncQuery: any;
declare const useHead: any;
declare const gql: any;

// Fetch product categories
const { data: categoriesData } = await useAsyncQuery(gql`
  query Categories {
    productCategories(first: 4, where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
        }
      }
    }
  }
`);

// Fetch popular products
const { data: productsData } = await useAsyncQuery(gql`
  query Products {
    products(first: 8) {
      nodes {
        id
        databaseId
        name
        slug
        onSale
        date
        type
        shortDescription
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
          regularPrice
        }
        ... on VariableProduct {
          price
          regularPrice
        }
      }
    }
  }
`);

// Set SEO metadata
useHead({
  title: 'Home',
  meta: [
    { name: 'description', content: 'Shop our curated selection of quality products with secure transactions and efficient delivery.' },
    { property: 'og:title', content: 'Home' },
    { property: 'og:description', content: 'Shop our curated selection of quality products with secure transactions and efficient delivery.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://example.com' },
    { property: 'og:image', content: 'https://example.com/og-image.jpg' },
  ],
});

// Testimonials data
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
    content: 'The ordering process was straightforward and my items arrived within 4 days. Very satisfied with the quality and service.',
    avatar: '/images/avatars/avatar-1.png'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Customer',
    content: 'I have been a customer for over two years. The products are consistently reliable and customer service is responsive.',
    avatar: '/images/avatars/avatar-2.png'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Customer',
    content: 'After several disappointing experiences with other vendors, I was pleased to find this site. Fast shipping and legitimate products.',
    avatar: '/images/avatars/avatar-3.png'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Customer',
    content: 'As a first-time buyer, I was initially hesitant. The product arrived on time and was exactly as described. Will order again.',
    avatar: '/images/avatars/avatar-4.png'
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    role: 'Customer',
    content: 'There was a mix-up with my order, but customer support resolved it quickly. They even offered a discount on my next purchase.',
    avatar: '/images/avatars/avatar-5.png'
  }
];
</script>

<template>
  <div>
    <!-- Hero Banner -->
    <HeroBanner />
    
    <!-- Featured Categories -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-medium mb-3">Featured Categories</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Browse our selection of products organized by category.</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="category in categoriesData?.productCategories?.nodes" :key="category.id" class="group">
            <NuxtLink :to="`/product-category/${category.slug}`" class="block">
              <div class="aspect-square bg-gray-50 rounded-sm overflow-hidden mb-3 transition-all duration-300 group-hover:opacity-90">
                <img 
                  v-if="category.image?.sourceUrl" 
                  :src="category.image.sourceUrl" 
                  :alt="category.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
                  <span class="text-gray-400 text-sm">No Image</span>
                </div>
              </div>
              
              <h3 class="font-medium text-center">{{ category.name }}</h3>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Popular Products -->
    <section class="py-12 md:py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-medium mb-3">Popular Products</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Our most frequently purchased items.</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in productsData?.products?.nodes" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </section>
    
    <!-- Benefits -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-medium mb-3">Why Choose Us</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">We prioritize quality, efficiency, and security in all aspects of our service.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-12 h-12 bg-gray-100 rounded-sm flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-lg font-medium mb-2">Quality Products</h3>
            <p class="text-gray-600 text-sm">Carefully selected items that meet our standards for durability and performance.</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-12 h-12 bg-gray-100 rounded-sm flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium mb-2">Efficient Delivery</h3>
            <p class="text-gray-600 text-sm">Streamlined shipping process to ensure your order arrives promptly.</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-12 h-12 bg-gray-100 rounded-sm flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium mb-2">Secure Transactions</h3>
            <p class="text-gray-600 text-sm">Advanced encryption and privacy protection for your payment and personal information.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials -->
    <section class="py-12 md:py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-medium mb-3">Customer Testimonials</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Read what our customers have to say about their experience.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="testimonial in testimonials" :key="testimonial.id" class="bg-white p-6 rounded-sm border border-gray-100">
            <div class="flex items-center mb-4">
              <img 
                :src="testimonial.avatar" 
                :alt="testimonial.name"
                class="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 class="font-medium text-sm">{{ testimonial.name }}</h3>
                <p class="text-gray-500 text-xs">{{ testimonial.role }}</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm">{{ testimonial.content }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-xl mx-auto text-center">
          <h2 class="text-2xl font-medium mb-3">Subscribe to Our Newsletter</h2>
          <p class="text-gray-600 mb-6">Stay updated with our latest products and promotions.</p>
          
          <form class="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              class="flex-1 px-4 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gray-400"
            />
            <button 
              type="submit" 
              class="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-sm hover:bg-black transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
          <p class="text-gray-500 text-xs mt-3">We respect your privacy and will not share your information.</p>
        </div>
      </div>
    </section>
  </div>
</template>
