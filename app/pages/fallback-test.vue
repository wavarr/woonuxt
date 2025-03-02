<template>
  <div class="fallback-test container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Fallback Components Test</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="col-span-1">
        <h2 class="text-xl font-semibold mb-4">Cart (Fallback)</h2>
        <CartFallback />
      </div>
      
      <div class="col-span-1 lg:col-span-2">
        <h2 class="text-xl font-semibold mb-4">Products (Fallback)</h2>
        <ProductsFallback :limit="6" />
      </div>
    </div>
    
    <div class="mt-12">
      <h2 class="text-xl font-semibold mb-4">GraphQL Test</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button @click="testIntrospection" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Test Introspection
        </button>
        <button @click="testCart" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Test Cart
        </button>
        <button @click="testProducts" class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
          Test Products
        </button>
      </div>
      
      <div v-if="testResult" class="mt-4">
        <h3 class="text-lg font-medium mb-2">Result:</h3>
        <pre class="bg-gray-100 p-4 rounded overflow-x-auto">{{ JSON.stringify(testResult, null, 2) }}</pre>
      </div>
      
      <div v-if="testError" class="mt-4">
        <h3 class="text-lg font-medium text-red-600 mb-2">Error:</h3>
        <pre class="bg-red-50 text-red-800 p-4 rounded overflow-x-auto">{{ testError }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const testResult = ref(null);
const testError = ref(null);

const GQL_HOST = process.env.GQL_HOST || 'https://modaprimeusa.com/graphql';
const APP_HOST = process.env.APP_HOST || 'https://store.modaprimeusa.com';

// Function to make GraphQL requests
async function makeGraphQLRequest(query) {
  testResult.value = null;
  testError.value = null;
  
  try {
    const response = await fetch(GQL_HOST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': APP_HOST,
        'Referer': APP_HOST,
        'X-WP-Guest-Access': 'true'
      },
      credentials: 'include',
      body: JSON.stringify({ query })
    });
    
    if (!response.ok) {
      throw new Error(`GraphQL request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'Unknown GraphQL error');
    }
    
    testResult.value = data;
  } catch (error) {
    testError.value = error.message;
    console.error('GraphQL request error:', error);
  }
}

// Introspection query
const testIntrospection = () => {
  const query = `
    query {
      __schema {
        queryType {
          name
        }
      }
    }
  `;
  makeGraphQLRequest(query);
};

// Cart query
const testCart = () => {
  const query = `
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
  makeGraphQLRequest(query);
};

// Products query
const testProducts = () => {
  const query = `
    query GET_PRODUCTS {
      products(first: 5) {
        nodes {
          id
          databaseId
          name
          slug
          type
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
            onSale
            stockStatus
          }
          ... on VariableProduct {
            price
            regularPrice
            salePrice
            onSale
            stockStatus
          }
        }
      }
    }
  `;
  makeGraphQLRequest(query);
};
</script> 
