// composables/useAsyncQuery.js
import { ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';

export function useAsyncQuery(document, variables = {}, options = {}) {
  console.log(`Executing GraphQL query: ${document}`, { variables, options });
  
  try {
    // Direct pass-through to Apollo's useQuery
    const result = useQuery(document, variables, {
      fetchPolicy: 'network-only',
      ...options
    });
    
    // Add error handling
    if (result.error && result.error.value) {
      console.error(`GraphQL query error for ${document}:`, result.error.value);
    }
    
    // Log successful result
    if (result.data && result.data.value) {
      console.log(`GraphQL query ${document} completed successfully`);
    }
    
    return result;
  } catch (error) {
    console.error(`Exception in useAsyncQuery for ${document}:`, error);
    // Return a structured error object similar to what useQuery would return
    return {
      data: ref(null),
      error: ref(error),
      loading: ref(false),
      networkStatus: ref('error')
    };
  }
}
