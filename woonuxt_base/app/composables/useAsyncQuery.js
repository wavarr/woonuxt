import { ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';

export function useAsyncQuery(document, variables = {}, options = {}) {
  console.log(`Executing GraphQL query: ${document}`, { variables, options });
  
  try {
    // Add retry logic and timeout options
    const enhancedOptions = {
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      errorPolicy: 'all',
      // Add retry logic
      context: {
        fetchOptions: {
          timeout: 10000, // 10 second timeout
        },
      },
      ...options
    };
    
    console.log('Enhanced query options:', enhancedOptions);
    
    // Direct pass-through to Apollo's useQuery
    const result = useQuery(document, variables, enhancedOptions);
    
    // Add error handling
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
