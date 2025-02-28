// composables/useAsyncQuery.js
import { ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';

export function useAsyncQuery(document, variables = {}, options = {}) {
  // Direct pass-through to Apollo's useQuery
  return useQuery(document, variables, {
    fetchPolicy: 'network-only',
    ...options
  });
}
