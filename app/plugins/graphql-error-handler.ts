// Custom plugin to handle GraphQL client errors
export default defineNuxtPlugin({
  name: 'graphql-error-handler',
  enforce: 'pre', // Run before other plugins
  setup() {
    const { $graphql } = useNuxtApp();
    
    // Add global error handler for GraphQL client
    if ($graphql && $graphql.clients && $graphql.clients.default) {
      const client = $graphql.clients.default;
      
      // Log GraphQL operations in development
      if (process.dev) {
        console.log('Setting up GraphQL error handler plugin');
        
        // Add request interceptor
        const originalFetch = client.fetchOptions.fetch;
        client.fetchOptions.fetch = async (uri, options) => {
          try {
            console.log(`GraphQL Request to: ${uri}`, JSON.parse(options.body));
            const response = await originalFetch(uri, options);
            
            // Clone the response to read it and still return it
            const clonedResponse = response.clone();
            const responseData = await clonedResponse.json();
            console.log('GraphQL Response:', responseData);
            
            return response;
          } catch (error) {
            console.error('GraphQL Request Error:', error);
            throw error;
          }
        };
      }
    }
    
    // Handle Apollo errors
    const handleApolloError = (error: any) => {
      console.error('Apollo Client Error:', error);
      
      // Check for network errors
      if (error.networkError) {
        console.error('Network Error:', error.networkError);
      }
      
      // Check for GraphQL errors
      if (error.graphQLErrors && error.graphQLErrors.length) {
        error.graphQLErrors.forEach((gqlError: any) => {
          console.error('GraphQL Error:', gqlError);
        });
      }
    };
    
    return {
      provide: {
        handleApolloError
      }
    };
  }
}); 
