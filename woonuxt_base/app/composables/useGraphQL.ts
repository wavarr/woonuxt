/**
 * GraphQL utility functions for the application
 */
import { useAsyncQuery } from '#imports';

// Define basic product type
interface Product {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  [key: string]: any; // Allow for additional properties
}

export default function useGraphQL() {
  /**
   * Fetch products with pagination
   * @param perPage Number of products per page
   * @param after Cursor for pagination
   * @returns Promise with products data including edges and pageInfo
   */
  const getProducts = async (perPage = 12, after = '') => {
    try {
      const variables = {
        first: perPage,
        after: after || null
      };
      
      const { data, error } = await useAsyncQuery('getProducts', variables);
      
      if (error.value) {
        console.error('GraphQL error:', error.value);
        throw new Error(error.value.message || 'Failed to fetch products');
      }
      
      // Transform nodes to edges format for compatibility with products.vue
      const nodes = data.value?.products?.nodes || [];
      const edges = nodes.map((node: Product) => ({
        node,
        cursor: node.id // Using ID as cursor since we don't have actual cursors
      }));
      
      // Return data in the format expected by products.vue
      return {
        edges,
        pageInfo: data.value?.products?.pageInfo || { 
          hasNextPage: false, 
          endCursor: '' 
        }
      };
    } catch (err) {
      console.error('Error fetching products:', err);
      throw err;
    }
  };

  /**
   * Fetch a single product by ID or slug
   * @param variables Variables for the query (id or slug)
   * @returns Promise with product data
   */
  const getProduct = async (variables = {}) => {
    try {
      const { data, error } = await useAsyncQuery('getProduct', variables);
      
      if (error.value) {
        console.error('GraphQL error:', error.value);
        throw new Error(error.value.message || 'Failed to fetch product');
      }
      
      return data.value?.product || null;
    } catch (err) {
      console.error('Error fetching product:', err);
      throw err;
    }
  };

  /**
   * Fetch related products
   * @param variables Variables for the query (category, productId)
   * @returns Promise with related products data
   */
  const getRelatedProducts = async (variables = {}) => {
    try {
      const { data, error } = await useAsyncQuery('getRelatedProducts', variables);
      
      if (error.value) {
        console.error('GraphQL error:', error.value);
        throw new Error(error.value.message || 'Failed to fetch related products');
      }
      
      return data.value?.products?.nodes || [];
    } catch (err) {
      console.error('Error fetching related products:', err);
      throw err;
    }
  };

  return {
    getProducts,
    getProduct,
    getRelatedProducts
  };
} 
