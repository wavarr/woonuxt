/**
 * @name useFiltering
 * @description A composable that handles the filtering of products. For reference this
 * is what the filter query looks like: ?filter=pa_color[green,blue],pa_size[md]
 */
export function useFiltering() {
  const route = useRoute();
  const router = useRouter();
  const runtimeConfig = useRuntimeConfig(); // Declare a variable for the runtime config and the filter and order functions
  const { updateProductList } = useProducts();

  // Ensure filter query state reflects current route on initialization and updates reactively
   const filterQuery = useState<string>('filter', () => route.query.filter as string || '');

   // Watch route query changes to keep state synchronized
   watch(() => route.query.filter, (newFilter) => {
     filterQuery.value = newFilter as string || '';
   });


  /**
   * Get the filter value from the url
   * @param {string} filterName
   * @returns {string[]} - An array of filter values
   * @example getFilter('pa_color') // ["green", "blue"]
   */
  function getFilter(filterName: string): string[] {
     if (!filterQuery.value) return []; // Return empty if no filter query exists
     // Improved regex to handle multiple filters and edge cases, and encoded values
     // Escape special characters in filterName for regex
      const escapedFilterName = filterName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`${escapedFilterName}\\[([^\\]]+)\\]`);
      const match = filterQuery.value.match(regex);
      // Decode comma-separated values
      return match ? match[1].split(',').map(decodeURIComponent) : [];
  }

  /**
   * Set the filter value in the url
   * @param {string} filterName
   * @param {string[]} filterValue - Array of *decoded* filter values
   * @example Just like the example above, but in reverse. setFilter('pa_color', ['green', 'blue'])
   */
  function setFilter(filterName: string, filterValue: string[]) {
    let currentFilters = filterQuery.value || '';
    // Escape special characters for regex
    const escapedFilterName = filterName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const filterRegex = new RegExp(`${escapedFilterName}\\[[^\\]]*\\]`, 'g'); // Match empty or populated brackets

    // Remove existing filter instance(s)
    currentFilters = currentFilters.replace(filterRegex, '');

    // Add the new filter if value exists
    if (filterValue.length > 0) {
        // Encode values before joining
        const encodedValues = filterValue.map(encodeURIComponent);
        const newFilterSegment = `${filterName}[${encodedValues.join(',')}]`;
        if (currentFilters) {
            // Append with a comma if other filters exist and it doesn't end with one
             currentFilters += (currentFilters.endsWith(',') || currentFilters === '' ? '' : ',') + newFilterSegment;
        } else {
             currentFilters = newFilterSegment;
        }
    }

    // Clean up separators: remove leading/trailing/multiple commas
    currentFilters = currentFilters.replace(/^,|,$/g, '').replace(/,{2,}/g, ',');

    // Update route query parameter
    const currentPath = route.path;
    const currentPage = route.params.pageNumber ? parseInt(route.params.pageNumber as string) : 1;
    let pathWithoutPage = currentPath;

    // Remove existing page number from path if present
     if (currentPage > 1 && currentPath.includes(`/page/${currentPage}`)) {
        pathWithoutPage = currentPath.substring(0, currentPath.lastIndexOf('/page/'));
     } else if (currentPath.endsWith('/page/1')) {
         pathWithoutPage = currentPath.substring(0, currentPath.lastIndexOf('/page/1'));
     }
     // Ensure base path ends correctly (e.g., /products not /products/)
     if (pathWithoutPage.endsWith('/')) {
         pathWithoutPage = pathWithoutPage.slice(0, -1);
     }
     // Reset to base path (page 1) when filters change
     const targetPath = pathWithoutPage || '/products'; // Default to /products if path is root


    const queryParams = { ...route.query };
     if (currentFilters) {
        queryParams.filter = currentFilters;
     } else {
        delete queryParams.filter; // Remove filter param if empty
     }
     // Remove page number from query as we are navigating to page 1 (path handles it)
     delete queryParams.page;
     delete queryParams.pageNumber; // Also remove pageNumber if it exists in query


    router.push({
        path: targetPath, // Navigate to base path (effectively page 1)
        query: queryParams,
    });

    // Update product list after router push completes (nextTick ensures route is updated)
     nextTick(() => {
       updateProductList();
     });
  }

  /**
   * Reset the filter value in the url
   */
  function resetFilter(): void {
    const { scrollToTop } = useHelpers();

     const currentPath = route.path;
     const currentPage = route.params.pageNumber ? parseInt(route.params.pageNumber as string) : 1;
     let pathWithoutPage = currentPath;

     // Remove existing page number from path if present
      if (currentPage > 1 && currentPath.includes(`/page/${currentPage}`)) {
         pathWithoutPage = currentPath.substring(0, currentPath.lastIndexOf('/page/'));
      } else if (currentPath.endsWith('/page/1')) {
         pathWithoutPage = currentPath.substring(0, currentPath.lastIndexOf('/page/1'));
     }
      // Ensure base path ends correctly (e.g., /products not /products/)
      if (pathWithoutPage.endsWith('/')) {
         pathWithoutPage = pathWithoutPage.slice(0, -1);
      }
      // Reset to base path (page 1)
      const targetPath = pathWithoutPage || '/products';


     const queryParams = { ...route.query };
     delete queryParams.filter; // Remove filter
     delete queryParams.page; // Remove page query param
     delete queryParams.pageNumber; // Remove pageNumber query param


    router.push({
        path: targetPath,
        query: queryParams
    });


     nextTick(() => {
       updateProductList();
       scrollToTop();
     });
  }

  /**
   * Check if there are any filters active
   * @returns {boolean}
   */
  const isFiltersActive = computed<boolean>(() => !!filterQuery.value);

  /**
   * Filter the products based on the active filters
   * @param {Product[]} products - An array of all the products
   * @returns {Product[]} - An array of filtered products
   */
  function filterProducts(products: Product[]): Product[] {
    if (!isFiltersActive.value) return products;

    // console.log(`Filtering ${products.length} products with query: ${filterQuery.value}`);

    return products.filter((product) => {
      // Category filter
      const categorySlugs = getFilter('category'); // ["category-slug"]
      const categoryCondition = categorySlugs.length
        ? product.productCategories?.nodes?.some((node) => categorySlugs.includes(node.slug as string))
        : true;
        // if (!categoryCondition) console.log(`${product.name} failed category filter`);


      // price filter
      const priceRange = getFilter('price'); // ["0", "100"]
      const productPrice = getProductPrice(product); // Helper to get comparable price
      const priceCondition = priceRange.length && priceRange[0] && priceRange[1]
          ? productPrice >= parseFloat(priceRange[0]) && productPrice <= parseFloat(priceRange[1])
          : true;
        // if (!priceCondition) console.log(`${product.name} failed price filter (${productPrice} vs ${priceRange})`);


      // Star rating filter
      const starRating = getFilter('rating');
      const ratingCondition = starRating.length && starRating[0]
          ? (product?.averageRating || 0) >= parseFloat(starRating[0])
          : true;
       // if (!ratingCondition) console.log(`${product.name} failed rating filter`);

      // Product attribute filters
       const globalProductAttributes = runtimeConfig?.public?.GLOBAL_PRODUCT_ATTRIBUTES?.map((attribute: any) => attribute.slug) || [];
       // Check ALL defined global attributes
       const attributeCondition = globalProductAttributes.every((attributeSlug: string) => {
            const requiredAttributeValues = getFilter(attributeSlug);
            if (!requiredAttributeValues.length) return true; // No filter for this attribute, so pass

            // Check if the product has ANY term matching the required values for this attribute
            // For variable products, check both parent terms AND variation attributes
            let hasMatchingTerm = false;
             if (product.terms?.nodes?.some(termNode => termNode.taxonomyName === attributeSlug && requiredAttributeValues.includes(termNode.slug))) {
                 hasMatchingTerm = true;
             } else if (product.type === 'VARIABLE' && product.variations?.nodes?.length) {
                 hasMatchingTerm = product.variations.nodes.some(variation =>
                     variation.attributes?.nodes?.some(attr => attr.name === attributeSlug && requiredAttributeValues.includes(attr.value))
                 );
             }

            // if (!hasMatchingTerm) console.log(`${product.name} failed attribute filter ${attributeSlug}`);
            return hasMatchingTerm;
        });
         // if (!attributeCondition) console.log(`${product.name} failed one or more attribute filters`);


      // onSale filter
      const onSale = getFilter('sale');
      // Check if 'true' is present in the sale filter array
      const saleItemsOnlyCondition = onSale.includes('true') ? product.onSale === true : true;
      // if (!saleItemsOnlyCondition) console.log(`${product.name} failed sale filter`);


      return ratingCondition && priceCondition && attributeCondition && categoryCondition && saleItemsOnlyCondition;
    });
  }

  // Helper to get a single comparable price for simple/variable products
    function getProductPrice(product: Product): number {
     // For variable products, use the minimum price found in variations or the main price if variations lack price info.
     // Use rawPrice for calculation consistency.
     if (product.type === 'VARIABLE' && product.variations?.nodes?.length) {
        const variationPrices = product.variations.nodes
         .map(v => parseFloat(v.rawPrice || v.price || '0')) // Use rawPrice or price
         .filter(p => p > 0); // Filter out invalid or zero prices
         if (variationPrices.length > 0) {
             return Math.min(...variationPrices);
         }
     }
     // Fallback to the main product price (rawPrice preferred)
     return parseFloat(product.rawPrice || product.price || '0');
    }


  return { getFilter, setFilter, resetFilter, isFiltersActive, filterProducts, filterQuery };
}