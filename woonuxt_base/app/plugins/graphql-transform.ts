export default defineNuxtPlugin(() => {
  // Access the GraphQL client
  const nuxtApp = useNuxtApp()
  
  // Only run if the GraphQL client is available
  if (nuxtApp.$gql) {
    console.info('🔄 GraphQL response transformer active')
    
    // Store the original query method
    const originalQuery = nuxtApp.$gql.query
    const originalMutation = nuxtApp.$gql.mutation
    
    // Override the query method to transform responses
    nuxtApp.$gql.query = async function(...args) {
      const response = await originalQuery.apply(this, args)
      return transformGraphQLResponse(response)
    }
    
    // Override the mutation method to transform responses
    nuxtApp.$gql.mutation = async function(...args) {
      const response = await originalMutation.apply(this, args)
      return transformGraphQLResponse(response)
    }
  }
})

// Function to transform GraphQL responses to match expected schema
function transformGraphQLResponse(response) {
  if (!response) return response
  
  // Handle cart.appliedCoupons
  if (response.cart?.appliedCoupons && !response.cart.appliedCoupons.nodes) {
    // If appliedCoupons exists but doesn't have nodes, wrap it in a nodes property
    response.cart.appliedCoupons = {
      nodes: Array.isArray(response.cart.appliedCoupons) 
        ? response.cart.appliedCoupons 
        : [response.cart.appliedCoupons]
    }
    console.info('🔄 Transformed appliedCoupons to include nodes property')
  }
  
  return response
} 
