<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Fallback Components Test Page</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <!-- Cart Fallback Test -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Cart Fallback</h2>
        <CartFallback />
      </div>
      
      <!-- Products Fallback Test -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Products Fallback</h2>
        <ProductsFallback :limit="4" />
      </div>
    </div>
    
    <!-- GraphQL Test Section -->
    <div class="bg-white p-6 rounded-lg shadow mb-8">
      <h2 class="text-xl font-semibold mb-4">GraphQL Connection Test</h2>
      
      <div class="flex flex-wrap gap-4 mb-6">
        <button 
          @click="testIntrospection" 
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          :disabled="isLoading"
        >
          Test Introspection
        </button>
        
        <button 
          @click="testCart" 
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          :disabled="isLoading"
        >
          Test Cart Query
        </button>
        
        <button 
          @click="testProducts" 
          class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          :disabled="isLoading"
        >
          Test Products Query
        </button>
      </div>
      
      <div v-if="isLoading" class="p-4 bg-gray-100 rounded">
        <p>Loading...</p>
      </div>
      
      <div v-else-if="error" class="p-4 bg-red-50 text-red-700 rounded">
        <h3 class="font-semibold mb-2">Error:</h3>
        <pre class="text-xs overflow-auto">{{ error }}</pre>
      </div>
      
      <div v-else-if="result" class="p-4 bg-gray-100 rounded">
        <h3 class="font-semibold mb-2">Result:</h3>
        <pre class="text-xs overflow-auto max-h-96">{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const isLoading = ref(false);
const error = ref(null);
const result = ref(null);

// Test introspection query
const testIntrospection = async () => {
  isLoading.value = true;
  error.value = null;
  result.value = null;
  
  try {
    const introspectionQuery = `
      query IntrospectionQuery {
        __schema {
          queryType {
            name
          }
          types {
            name
            kind
          }
        }
      }
    `;
    
    const response = await fetch(process.env.GQL_HOST || 'https://modaprimeusa.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': process.env.APP_HOST || 'https://store.modaprimeusa.com',
        'Referer': process.env.APP_HOST || 'https://store.modaprimeusa.com',
        'X-WP-Guest-Access': 'true'
      },
      credentials: 'include',
      body: JSON.stringify({ query: introspectionQuery })
    });
    
    if (!response.ok) {
      throw new Error(`GraphQL request failed with status ${response.status}`);
    }
    
    result.value = await response.json();
  } catch (err) {
    error.value = err.message;
    console.error('Error testing introspection:', err);
  } finally {
    isLoading.value = false;
  }
};

// Test cart query
const testCart = async () => {
  isLoading.value = true;
  error.value = null;
  result.value = null;
  
  try {
    const cartQuery = `
      query GET_CART {
        cart {
          contents {
            nodes {
              key
              product {
                node {
                  id
                  name
                }
              }
              quantity
              subtotal
            }
          }
          subtotal
          total
        }
      }
    `;
    
    const response = await fetch(process.env.GQL_HOST || 'https://modaprimeusa.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': process.env.APP_HOST || 'https://store.modaprimeusa.com',
        'Referer': process.env.APP_HOST || 'https://store.modaprimeusa.com',
        'X-WP-Guest-Access': 'true'
      },
      credentials: 'include',
      body: JSON.stringify({ query: cartQuery })
    });
    
    if (!response.ok) {
      throw new Error(`GraphQL request failed with status ${response.status}`);
    }
    
    result.value = await response.json();
  } catch (err) {
    error.value = err.message;
    console.error('Error testing cart query:', err);
  } finally {
    isLoading.value = false;
  }
};

// Test products query
const testProducts = async () => {
  isLoading.value = true;
  error.value = null;
  result.value = null;
  
  try {
    const productsQuery = `
      query GET_PRODUCTS {
        products(first: 5) {
          nodes {
            id
            name
            slug
            type
            ... on SimpleProduct {
              price
              regularPrice
              onSale
            }
          }
        }
      }
    `;
    
    const response = await fetch(process.env.GQL_HOST || 'https://modaprimeusa.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': process.env.APP_HOST || 'https://store.modaprimeusa.com',
        'Referer': process.env.APP_HOST || 'https://store.modaprimeusa.com',
        'X-WP-Guest-Access': 'true'
      },
      credentials: 'include',
      body: JSON.stringify({ query: productsQuery })
    });
    
    if (!response.ok) {
      throw new Error(`GraphQL request failed with status ${response.status}`);
    }
    
    result.value = await response.json();
  } catch (err) {
    error.value = err.message;
    console.error('Error testing products query:', err);
  } finally {
    isLoading.value = false;
  }
};

// Set page metadata
definePageMeta({
  title: 'Fallback Components Test',
  description: 'Test page for fallback components and GraphQL connection',
});
</script> 
