import { defineNuxtPlugin } from '#app';
import { useQuery } from '@vue/apollo-composable';
import useAsyncQuery from '~/composables/useAsyncQuery';

export default defineNuxtPlugin(() => {
  // Add a global fallback for useAsyncQuery if it's missing
  if (typeof window !== 'undefined') {
    // Make useAsyncQuery available globally
    window.useAsyncQuery = useAsyncQuery || ((document, variables, options) => {
      console.log('Using fallback useAsyncQuery');
      return useQuery(document, variables, options);
    });
  }
  
  // Add a response transformer to fix cart structure inconsistencies
  const originalFetch = window.fetch;
  window.fetch = async function(input, init) {
    const response = await originalFetch(input, init);
    
    // Only process GraphQL responses
    if (input && input.toString && input.toString().includes('/graphql') && init?.method === 'POST') {
      try {
        const clonedResponse = response.clone();
        const data = await clonedResponse.json();
        
        // Fix for cart.appliedCoupons missing nodes field
        if (data?.data?.cart?.appliedCoupons && !data.data.cart.appliedCoupons.nodes) {
          data.data.cart.appliedCoupons = {
            nodes: Array.isArray(data.data.cart.appliedCoupons) 
              ? data.data.cart.appliedCoupons 
              : [data.data.cart.appliedCoupons]
          };
          
          return new Response(JSON.stringify(data), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          });
        }
      } catch (e) {
        console.warn('GraphQL compatibility transform error:', e);
      }
    }
    
    return response;
  };
});
