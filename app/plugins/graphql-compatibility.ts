import { defineNuxtPlugin } from '#app';
import { useQuery } from '@vue/apollo-composable';

export default defineNuxtPlugin(() => {
  // Add a global fallback for useAsyncQuery if it's missing
  // This helps with code that might be trying to use it without importing
  if (typeof window !== 'undefined' && typeof window.useAsyncQuery === 'undefined') {
    window.useAsyncQuery = (document, variables, options) => {
      console.log('Using fallback useAsyncQuery');
      return useQuery(document, variables, options);
    };
  }
}); 
