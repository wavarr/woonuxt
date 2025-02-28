import { useRuntimeConfig } from '#app';

export function useGraphQL() {
  const config = useRuntimeConfig();
  const graphqlUrl = config.public.GRAPHQL_URL || 'https://modaprimeusa.com/graphql';

  const executeQuery = async (query: string, variables = {}) => {
    try {
      const response = await fetch(graphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': config.public.FRONT_END_URL || 'https://store.modaprimeusa.com',
          'X-WP-Guest-Access': 'true'
        },
        body: JSON.stringify({
          query,
          variables
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data;
    } catch (error) {
      console.error('GraphQL Error:', error);
      throw error;
    }
  };

  return {
    executeQuery
  };
} 
