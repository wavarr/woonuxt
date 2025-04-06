let allProducts = [] as Product[];
let isFetching = false; // Prevent concurrent fetches

export function useProducts() {
  // Declare the state variables and the setter functions
  const products = useState<Product[]>('products', () => []);
  const { getFilter, isFiltersActive, filterProducts } = useFiltering();
  const { getSearchQuery, isSearchActive, searchProducts } = useSearching();
  const { getSort, isSortingActive, sortProducts } = useSorting();

  /**
   * Fetches all products from the GQL endpoint.
   * Consider adding pagination or limiting the initial fetch if dataset is large.
   */
  async function fetchProducts(variables: any = { first: 500 }) {
    if (isFetching) return; // Avoid multiple simultaneous fetches
    isFetching = true;
    console.log("Fetching products with variables:", variables);
    try {
      const { data, error } = await useAsyncGql('getProducts', variables);
      if (error.value) {
        console.error("Error fetching products:", error.value);
        // Optionally handle error state here
        setProducts([]); // Clear products on error
      } else {
         const fetchedProducts = data.value?.products?.nodes || [];
         console.log(`Fetched ${fetchedProducts.length} products.`);
         // Basic deduplication based on ID, in case GQL returns duplicates across fetches
         const uniqueProducts = Array.from(new Map(fetchedProducts.map(p => [p.id, p])).values());
         setProducts(uniqueProducts);
      }
    } catch (err) {
       console.error("Exception during product fetch:", err);
        setProducts([]); // Clear products on exception
    } finally {
      isFetching = false;
    }
  }


  /**
   * Sets the products state variable and the allProducts variable.
   * @param {Product[]} newProducts - The new products to set.
   */
  function setProducts(newProducts: Product[]): void {
    if (!Array.isArray(newProducts)) {
        console.error('setProducts received non-array value:', newProducts);
        throw new Error('Products must be an array.');
    }
     // Filter out any null/undefined entries just in case
     const validProducts = newProducts.filter(p => p !== null && p !== undefined);
    allProducts = JSON.parse(JSON.stringify(validProducts)); // Deep copy for filtering base
    products.value = [...validProducts]; // Initially display all fetched products using spread for reactivity
    // console.log(`setProducts updated. allProducts: ${allProducts.length}, products.value: ${products.value.length}`);
    // Apply filters immediately after setting new base products if filters are active
    updateProductList();
  }


  const updateProductList = (): void => {
    // console.log(`Updating product list. Filters active: ${isFiltersActive.value}, Search active: ${isSearchActive.value}, Sort active: ${isSortingActive.value}`);
    // console.log(`Current filter query: ${getFilter('')}, Search query: ${getSearchQuery()}, Sort: ${JSON.stringify(getSort())}`);

    const { scrollToTop } = useHelpers();
    // scroll to top of page
    scrollToTop();

    // return all products if no filters, search, or sorting are active
    if (!isFiltersActive.value && !isSearchActive.value && !isSortingActive.value) {
      // console.log("No filters active, displaying all products.");
      products.value = [...allProducts]; // Use spread to ensure reactivity trigger
      return;
    }

    // otherwise, apply filter, search and sorting in that order
    try {
      let newProducts = [...allProducts]; // Start with a fresh copy of all products
      // console.log(`Starting filter process with ${newProducts.length} products.`);

      if (isFiltersActive.value) {
          newProducts = filterProducts(newProducts);
          // console.log(`After filtering: ${newProducts.length} products.`);
      }
      if (isSearchActive.value) {
          newProducts = searchProducts(newProducts);
           // console.log(`After searching: ${newProducts.length} products.`);
      }
      if (isSortingActive.value) {
          newProducts = sortProducts(newProducts);
           // console.log(`After sorting: ${newProducts.length} products.`);
      }

      products.value = newProducts;
      // console.log(`Finished updateProductList. Displaying ${products.value.length} products.`);

    } catch (error) {
      console.error("Error updating product list:", error);
    }
  };

  // Expose products state, the fetch function, and the update function
  return { products, fetchProducts, setProducts, updateProductList };
}