import { ref } from '#imports';
import { useAsyncQuery } from './useAsyncQuery';
import { useSorting } from './useSorting';
import { useFiltering } from './useFiltering';
import { useSearching } from './useSearch';
import { useHelpers } from './useHelpers';

// Define a basic Product interface if you don't have access to the types file
interface Product {
  id: string;
  [key: string]: any;
}

let allProducts: Product[] = [];

/**
 * @name useProducts
 * @description A composable that handles the products
 */
export function useProducts() {
  const products = ref<Product[]>([]);
  const product = ref<Product | null>(null);
  const productsLoading = ref(false);
  const productsError = ref<string | null>(null);
  const { scrollToTop } = useHelpers();
  const { isSortingActive, sortProducts, orderQuery } = useSorting();
  const { isFiltersActive, filterProducts, getFilter } = useFiltering();
  const { isSearchActive, searchProducts, getSearchQuery } = useSearching();

  /**
   * Fetch products from the API
   * @param {object} variables - The variables to pass to the query
   * @returns {Promise<void>}
   */
  const fetchProducts = async (variables = {}) => {
    productsLoading.value = true;
    productsError.value = null;
    
    try {
      console.log('Fetching products with variables:', variables);
      const { data, error } = useAsyncQuery('getProducts', variables);
      
      if (error.value) {
        productsError.value = error.value.message || 'Error loading products';
        console.error('GraphQL error:', error.value);
      } else if (data.value?.products?.nodes) {
        products.value = data.value.products.nodes;
        allProducts = [...data.value.products.nodes];
        console.log('Products loaded:', products.value.length);
      } else {
        productsError.value = 'No products found';
      }
    } catch (err: unknown) {
      console.error('Error in fetchProducts:', err);
      productsError.value = err instanceof Error ? err.message : 'Error loading products';
    } finally {
      productsLoading.value = false;
    }
  };

  /**
   * Sets the products state variable and the allProducts variable.
   * @param {Product[]} newProducts - The new products to set.
   */
  function setProducts(newProducts: Product[]): void {
    if (!Array.isArray(newProducts)) throw new Error('Products must be an array.');
    products.value = newProducts ?? [];
    allProducts = [...newProducts];
  }

  const updateProductList = async (): Promise<void> => {
    // scroll to top of page
    scrollToTop();

    // return all products if no filters are active
    if (!isFiltersActive.value && !isSearchActive.value && !isSortingActive.value) {
      products.value = allProducts;
      return;
    }

    // otherwise, apply filter, search and sorting in that order
    try {
      let newProducts = [...allProducts];
      if (isFiltersActive.value) newProducts = filterProducts(newProducts);
      if (isSearchActive.value) newProducts = searchProducts(newProducts);
      if (isSortingActive.value) newProducts = sortProducts(newProducts);

      products.value = newProducts;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    products,
    product,
    productsLoading,
    productsError,
    fetchProducts,
    allProducts,
    setProducts,
    updateProductList,
    // Expose these for compatibility with the updated version
    orderQuery,
    getFilter,
    getSearchQuery
  };
}
