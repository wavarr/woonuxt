import { ref, computed } from 'vue';

// Define a basic Product interface
interface Product {
  id: string;
  name?: string;
  description?: string;
  shortDescription?: string;
  [key: string]: any;
}

export function useSearching() {
  const searchTerm = ref('');
  const isSearchActive = computed(() => searchTerm.value.trim().length > 0);

  /**
   * Search products by name, description, or short description
   * @param products Array of products to search through
   * @returns Filtered array of products that match the search term
   */
  const searchProducts = (products: Product[]): Product[] => {
    if (!isSearchActive.value) return products;
    
    const term = searchTerm.value.toLowerCase().trim();
    
    return products.filter((product) => {
      // Search in product name
      if (product.name && product.name.toLowerCase().includes(term)) {
        return true;
      }
      
      // Search in product description
      if (product.description && product.description.toLowerCase().includes(term)) {
        return true;
      }
      
      // Search in product short description
      if (product.shortDescription && product.shortDescription.toLowerCase().includes(term)) {
        return true;
      }
      
      return false;
    });
  };

  /**
   * Set the search term
   * @param term New search term
   */
  const setSearchTerm = (term: string): void => {
    searchTerm.value = term;
  };

  /**
   * Clear the search term
   */
  const clearSearch = (): void => {
    searchTerm.value = '';
  };

  return {
    searchTerm,
    isSearchActive,
    searchProducts,
    setSearchTerm,
    clearSearch
  };
} 
