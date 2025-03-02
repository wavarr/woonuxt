import { ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';

// Export as named function for auto-import in Nuxt
export function useAsyncQuery(document, variables = {}, options = {}) {
  console.group(`🔍 GraphQL Query: ${typeof document === 'object' ? document.definitions[0]?.name?.value || 'Unnamed' : document}`);
  console.log('Variables:', JSON.stringify(variables, null, 2));
  console.log('Options:', JSON.stringify(options, null, 2));
  
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
    console.time('Query execution time');
    const result = useQuery(document, variables, enhancedOptions);
    
    // Add watchers for debugging
    watch(() => result.loading.value, (isLoading) => {
      console.log(`Query loading state: ${isLoading ? 'Loading...' : 'Completed'}`);
      if (!isLoading) console.timeEnd('Query execution time');
    });
    
    // Better error handling and logging
    watch(() => result.error.value, (error) => {
      if (error) {
        console.error(`❌ GraphQL query error:`, error);
        console.error('Network details:', {
          status: error.networkError?.statusCode,
          message: error.networkError?.message,
          name: error.name,
          graphQLErrors: error.graphQLErrors
        });
      }
    });
    
    // Log successful result
    watch(() => result.data.value, (data) => {
      if (data) {
        console.log(`✅ GraphQL query completed successfully`);
        console.log('Response data:', data);
      }
    });
    
    console.groupEnd();
    return result;
  } catch (error) {
    console.error(`❌ Exception in useAsyncQuery:`, error);
    console.trace('Stack trace:');
    console.groupEnd();
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
