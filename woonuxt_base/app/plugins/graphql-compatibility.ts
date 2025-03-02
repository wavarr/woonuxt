export default defineNuxtPlugin(() => {
  // This plugin adds compatibility for schema changes between different WooCommerce GraphQL versions
  
  // Hook into GQL responses to transform data if needed
  const originalFetch = window.fetch;
  window.fetch = async function(input, init) {
    const response = await originalFetch(input, init);
    
    // Only process GraphQL responses
    if (input && input.toString().includes('/graphql') && init?.method === 'POST') {
      const clonedResponse = response.clone();
      try {
        const data = await clonedResponse.json();
        
        // Add compatibility for appliedCoupons without nodes field
        if (data?.data?.cart?.appliedCoupons && !data.data.cart.appliedCoupons.nodes) {
          // Transform the appliedCoupons array to include a nodes property
          data.data.cart.appliedCoupons = {
            nodes: data.data.cart.appliedCoupons
          };
          
          // Return modified response
          return new Response(JSON.stringify(data), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          });
        }
      } catch (e) {
        // If we can't parse the response, just return the original
        console.warn('GraphQL compatibility layer error:', e);
      }
    }
    
    return response;
  };
}); 
