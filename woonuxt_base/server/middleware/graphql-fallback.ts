import { defineEventHandler, readBody } from 'h3';

// This middleware provides fallback responses for GraphQL requests when the main API is unavailable
export default defineEventHandler(async (event) => {
  // Only intercept GraphQL requests
  if (!event.path.endsWith('/graphql')) return;
  
  // Only handle POST requests (GraphQL queries)
  if (event.method !== 'POST') return;
  
  try {
    // Read the GraphQL query
    const body = await readBody(event);
    console.log('GraphQL request intercepted:', body);
    
    // Check if this is a request we want to mock
    // For example, you could check for specific query names
    
    // For now, just log that we received the request
    console.log('GraphQL fallback middleware active, but passing request through');
    
    // Let the request continue to the actual GraphQL endpoint
    // If that fails with 503, the client-side error handling will take over
  } catch (error) {
    console.error('Error in GraphQL fallback middleware:', error);
  }
}); 
