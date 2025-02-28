<script setup>
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();
const result = ref(null);
const loading = ref(false);
const error = ref(null);

const TEST_QUERY = `
  query {
    products(first: 1) {
      nodes {
        id
        name
        price
      }
    }
  }
`;

const testConnection = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await fetch(config.public.GRAPHQL_URL || '/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: TEST_QUERY })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    result.value = data;
    console.log('GraphQL response:', data);
  } catch (e) {
    error.value = e.message;
    console.error('GraphQL error:', e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow">
    <h2 class="text-xl font-bold mb-4">GraphQL Connection Test</h2>
    
    <div class="mb-4">
      <button 
        @click="testConnection"
        :disabled="loading"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? 'Testing...' : 'Test Connection' }}
      </button>
    </div>

    <div v-if="error" class="p-4 bg-red-50 text-red-600 rounded mb-4">
      {{ error }}
    </div>

    <div v-if="result" class="p-4 bg-green-50 text-green-600 rounded">
      <pre class="whitespace-pre-wrap">{{ JSON.stringify(result, null, 2) }}</pre>
    </div>
  </div>
</template> 
