/**
 * Composable for handling GraphQL queries related to products
 */

// Declare auto-imported composables for TypeScript
declare const useAsyncGql: any;

// Define types for our functions
interface Product {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  [key: string]: any; // Allow for additional properties
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

interface ProductsResponse {
  edges: Array<{ node: Product }>;
  pageInfo: PageInfo;
}

export default function useGraphQL() {
  /**
   * Fetch products with pagination support
   * @param first Number of products to fetch
   * @param after Cursor for pagination
   * @returns Products data with pagination info
   */
  const getProducts = async (first = 12, after = ''): Promise<ProductsResponse> => {
    try {
      const variables = { first, after };
      const { data } = await useAsyncGql('getProducts', variables);
      
      if (!data.value?.products) {
        throw new Error('No products data returned');
      }
      
      return {
        edges: data.value.products.nodes.map((node: any) => ({ node })),
        pageInfo: {
          hasNextPage: data.value.products.pageInfo?.hasNextPage || false,
          endCursor: data.value.products.pageInfo?.endCursor || ''
        }
      };
    } catch (error) {
      console.error('Error fetching products via GraphQL:', error);
      throw error;
    }
  };

  /**
   * Fetch a single product by slug
   * @param slug Product slug
   * @returns Product data
   */
  const getProductBySlug = async (slug: string): Promise<Product | null> => {
    try {
      const { data } = await useAsyncGql('getProduct', { slug });
      return data.value?.product || null;
    } catch (error) {
      console.error('Error fetching product by slug:', error);
      throw error;
    }
  };

  /**
   * Fetch related products
   * @param productId ID of the product to find related items for
   * @param first Number of related products to fetch
   * @returns Array of related products
   */
  const getRelatedProducts = async (productId: string, first = 4): Promise<Product[]> => {
    try {
      const { data } = await useAsyncGql('getRelatedProducts', { id: productId, first });
      return data.value?.product?.related?.nodes || [];
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  };

  return {
    getProducts,
    getProductBySlug,
    getRelatedProducts
  };
} 
