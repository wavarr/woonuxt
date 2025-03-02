import { ref, reactive } from 'vue';

export function useGraphQLDebug() {
  const queries = reactive({
    history: [],
    errors: [],
    pending: 0
  });
  
  const lastResponse = ref(null);
  const lastError = ref(null);
  
  // Track a new query
  const trackQuery = (query, variables) => {
    const queryInfo = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      query: typeof query === 'object' ? query.definitions[0]?.name?.value || 'Unnamed' : query,
      variables,
      status: 'pending',
      duration: 0,
      startTime: performance.now()
    };
    
    queries.history.unshift(queryInfo);
    queries.pending++;
    
    // Keep history manageable
    if (queries.history.length > 20) {
      queries.history.pop();
    }
    
    return queryInfo.id;
  };
  
  // Update query status
  const updateQueryStatus = (id, status, response = null, error = null) => {
    const queryInfo = queries.history.find(q => q.id === id);
    if (queryInfo) {
      queryInfo.status = status;
      queryInfo.duration = performance.now() - queryInfo.startTime;
      
      if (response) {
        queryInfo.response = response;
        lastResponse.value = response;
      }
      
      if (error) {
        queryInfo.error = error;
        lastError.value = error;
        queries.errors.unshift({
          ...queryInfo,
          errorMessage: error.message || 'Unknown error'
        });
        
        // Keep errors manageable
        if (queries.errors.length > 10) {
          queries.errors.pop();
        }
      }
      
      queries.pending = Math.max(0, queries.pending - 1);
    }
  };
  
  // Test a GraphQL endpoint
  const testEndpoint = async (endpoint = process.env.GQL_HOST) => {
    console.log(`Testing GraphQL endpoint: ${endpoint}`);
    
    try {
      const startTime = performance.now();
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `{ __typename }`
        })
      });
      
      const duration = performance.now() - startTime;
      const data = await response.json();
      
      console.log(`Endpoint test completed in ${duration.toFixed(2)}ms:`, data);
      
      return {
        success: !!data.data,
        duration,
        status: response.status,
        data
      };
    } catch (error) {
      console.error('GraphQL endpoint test failed:', error);
      return {
        success: false,
        error: error.message,
        details: error
      };
    }
  };
  
  // Get GraphQL client info
  const getClientInfo = () => {
    // This will depend on which GraphQL client you're using
    // For Apollo Client:
    if (window.__APOLLO_CLIENT__) {
      const client = window.__APOLLO_CLIENT__;
      return {
        cache: {
          size: Object.keys(client.cache.data.data).length,
          rootIds: Object.keys(client.cache.data.data)
        },
        defaultOptions: client.defaultOptions,
        queryManager: {
          queries: client.queryManager.queries.size
        }
      };
    }
    
    return null;
  };
  
  return {
    queries,
    lastResponse,
    lastError,
    trackQuery,
    updateQueryStatus,
    testEndpoint,
    getClientInfo
  };
} 
