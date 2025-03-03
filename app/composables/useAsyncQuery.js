import { ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';

// Export as named function for auto-import in Nuxt
export function useAsyncQuery(document, variables = {}, options = {}) {
  console.log(`Executing GraphQL query: ${document}`, { variables, options });
  
  try {
    // Enhanced options with better error handling and timeout
    const enhancedOptions = {
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      errorPolicy: 'all',
      context: {
        fetchOptions: {
          timeout: 10000, // 10 second timeout
        },
      },
      ...options
    };
    
    // Direct pass-through to Apollo's useQuery
    const result = useQuery(document, variables, enhancedOptions);
    
    // Better error handling and logging
    if (result.error && result.error.value) {
      console.error(`GraphQL query error for ${document}:`, result.error.value);
      console.error('Network details:', {
        status: result.error.value.networkError?.statusCode,
        message: result.error.value.networkError?.message,
        name: result.error.value.name,
        graphQLErrors: result.error.value.graphQLErrors
      });
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

// Also export as default for more flexible importing
export default useAsyncQuery;
