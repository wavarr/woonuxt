// composables/useAsyncQuery.js
import { ref, watch } from 'vue';

/**
 * Custom hook for handling GraphQL queries with proper error handling
 * and support for Apollo client if available
 * 
 * @param {import('graphql').DocumentNode | string} query - GraphQL query document or string
 * @param {Object} variables - Query variables
 * @param {Object} options - Additional options like fetchPolicy
 * @returns {Object} - Returns data, loading, error and execute function
 */
export function useAsyncQuery(query, variables = {}, options = {}) {
  // If Apollo client's useQuery is available globally, use it
  if (typeof useQuery === 'function') {
    return useQuery(query, variables, {
      fetchPolicy: 'network-only',
      ...options
    });
  }
  
  // Fallback implementation without Apollo
  const data = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const execute = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      // Extract query string from DocumentNode if needed
      const queryString = typeof query === 'string' 
        ? query 
        : (query.loc && query.loc.source) 
          ? query.loc.source.body 
          : JSON.stringify(query);
      
      // Make GraphQL request with fetch API
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: queryString,
          variables
        }),
        credentials: 'include', // Include cookies for auth
      });
      
      const result = await response.json();
      
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      
      data.value = result.data;
    } catch (e) {
      console.error('GraphQL query error:', e);
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  // Watch for variable changes and re-execute query
  if (typeof variables === 'object' && variables !== null) {
    watch(() => JSON.stringify(variables), execute, { immediate: true });
  } else {
    execute();
  }

  return { data, loading, error, execute };
}
