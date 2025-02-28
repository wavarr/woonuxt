export default defineNuxtConfig({
  // ... other config
  runtimeConfig: {
    public: {
      GRAPHQL_URL: process.env.GRAPHQL_URL,
      APOLLO_HTTP_OPTIONS: {
        credentials: 'include'
      }
    }
  },
  
  build: {
    transpile: [
      '@apollo/client',
      '@vue/apollo-composable',
      'ts-invariant/process'
    ]
  }
}); 
