
import { defineNuxtPlugin } from '#app';
import useAsyncQuery from '~/composables/useAsyncQuery';

export default defineNuxtPlugin(nuxtApp => {
  // Make useAsyncQuery available globally
  globalThis.useAsyncQuery = useAsyncQuery;
  
  // Polyfill for Array.find if it's missing (very unlikely but good fallback)
  if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      
      const list = Object(this);
      const length = list.length >>> 0;
      const thisArg = arguments[1];
      
      for (let i = 0; i < length; i++) {
        const value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  }
  
  // Add error logging for GraphQL errors
  nuxtApp.hook('apollo:error', (error) => {
    console.error('Apollo error:', error);
  });
});
