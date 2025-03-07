import { ref, computed } from 'vue';

// Local state
let allProducts = [] as Product[];
const products = ref<Product[]>([]);
const isUsingFallbackData = ref(false);

export function useProducts() {
  /**
   * Sets the products state variable and the allProducts variable.
   * @param {Product[]} newProducts - The new products to set.
   */
  function setProducts(newProducts: Product[]): void {
    if (!Array.isArray(newProducts)) {
      console.warn('Products must be an array. Using fallback data.');
      useFallbackData();
      return;
    }
    
    if (newProducts.length === 0 && !isUsingFallbackData.value) {
      console.warn('No products received from API. Using fallback data.');
      useFallbackData();
      return;
    }
    
    products.value = newProducts ?? [];
    allProducts = JSON.parse(JSON.stringify(newProducts));
  }

  /**
   * Use fallback product data when the API is unavailable
   */
  function useFallbackData(): void {
    isUsingFallbackData.value = true;
    
    // Check if we have product data in the query
    const queryData = window.__NUXT__?.data?.products?.nodes;
    if (queryData && Array.isArray(queryData) && queryData.length > 0) {
      console.log('Using product data from query');
      products.value = queryData;
      allProducts = JSON.parse(JSON.stringify(queryData));
      return;
    }
    
    // Otherwise use hardcoded fallback data
    console.log('Using hardcoded fallback product data');
    const fallbackProducts = [
      {
        name: "Modalert",
        slug: "modalert",
        type: "VARIABLE",
        databaseId: 22,
        id: "cG9zdDoyMg==",
        averageRating: 0,
        reviewCount: 0,
        price: "$110.00 - $270.00",
        rawPrice: "110.00, 160.00, 270.00",
        regularPrice: "$110.00 - $270.00",
        rawRegularPrice: "110.00, 160.00, 270.00",
        stockStatus: "IN_STOCK",
        image: {
          sourceUrl: "https://modaprimeusa.com/wp-content/uploads/2024/02/modalert.png",
          altText: "Modalert",
          title: "Modalert",
          producCardSourceUrl: "https://modaprimeusa.com/wp-content/uploads/2024/02/modalert-239x239.png"
        }
      },
      {
        name: "Sample order - 10 Modawake",
        slug: "sample-order-10-modawake",
        type: "SIMPLE",
        databaseId: 48,
        id: "cG9zdDo0OA==",
        averageRating: 0,
        reviewCount: 0,
        price: "$25.00",
        rawPrice: "25",
        regularPrice: "$25.00",
        rawRegularPrice: "25",
        stockStatus: "IN_STOCK",
        image: {
          sourceUrl: "https://modaprimeusa.com/wp-content/uploads/2024/02/modawake.png",
          altText: "A strip of modafinil (Modawake)",
          title: "modawake",
          producCardSourceUrl: "https://modaprimeusa.com/wp-content/uploads/2024/02/modawake-239x239.png"
        }
      }
    ];
    
    products.value = fallbackProducts;
    allProducts = JSON.parse(JSON.stringify(fallbackProducts));
  }

  const updateProductList = async (): Promise<void> => {
    const { scrollToTop } = useHelpers();
    const { isSortingActive, sortProducts } = useSorting();
    const { isFiltersActive, filterProducts } = useFiltering();
    const { isSearchActive, searchProducts } = useSearching();

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
    allProducts, 
    setProducts, 
    updateProductList, 
    useFallbackData,
    isUsingFallbackData: computed(() => isUsingFallbackData.value)
  };
} 
