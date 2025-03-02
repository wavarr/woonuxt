// Custom composable to handle products fetching with fallbacks
export const useProductsFallback = (options = {}) => {
  const { limit = 10, category = null } = options;
  
  const productsData = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  
  // Fetch products with fallback mechanism
  const fetchProducts = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      console.log('Fetching products with fallback mechanism...');
      
      // Build the GraphQL query
      let productsQuery = `
        query GET_PRODUCTS {
          products(first: ${limit}${category ? `, where: {categoryIn: "${category}"}` : ''}) {
            nodes {
              id
              databaseId
              name
              slug
              type
              ... on SimpleProduct {
                price
                regularPrice
                salePrice
                onSale
                stockStatus
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
              ... on VariableProduct {
                price
                regularPrice
                salePrice
                onSale
                stockStatus
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
        }
      `;
      
      // Use fetch directly instead of Apollo client
      const response = await fetch(process.env.GQL_HOST || 'https://modaprimeusa.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': process.env.APP_HOST || 'https://store.modaprimeusa.com',
          'Referer': process.env.APP_HOST || 'https://store.modaprimeusa.com',
          'X-WP-Guest-Access': 'true'
        },
        credentials: 'include',
        body: JSON.stringify({ query: productsQuery })
      });
      
      if (!response.ok) {
        throw new Error(`GraphQL request failed with status ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Unknown GraphQL error');
      }
      
      if (result.data && result.data.products && result.data.products.nodes) {
        productsData.value = result.data.products.nodes;
        console.log(`Fetched ${productsData.value.length} products successfully`);
      } else {
        console.warn('Products data not found in response');
        productsData.value = [];
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      error.value = err;
      productsData.value = []; // Use empty array as fallback
    } finally {
      isLoading.value = false;
    }
    
    return productsData.value;
  };
  
  return {
    productsData,
    isLoading,
    error,
    fetchProducts
  };
}; 
