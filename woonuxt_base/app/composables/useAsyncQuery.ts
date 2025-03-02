// Wrapper for useAsyncGql to maintain backward compatibility
import { useAsyncGql } from '#imports';
import { ref } from 'vue';

/**
 * Wrapper for useAsyncGql to maintain backward compatibility with code using useAsyncQuery
 * @param document The GraphQL query or mutation name
 * @param variables Variables to pass to the query
 * @param options Additional options
 * @returns The result of useAsyncGql
 */
export function useAsyncQuery(document: string, variables = {}, options = {}) {
  try {
    return useAsyncGql(document, variables, options);
  } catch (error) {
    console.error(`Exception in useAsyncQuery for ${document}:`, error);
    // Return a default structure to prevent errors
    return {
      data: ref(null),
      error: ref(error),
      pending: ref(false),
      refresh: () => Promise.resolve()
    };
  }
} 
