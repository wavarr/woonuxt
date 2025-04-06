import pkg from '../../../woonuxt_base/package.json';

// A collection of helper functions.
export function useHelpers() {
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();

  const isShowingMobileMenu = useState<boolean>('isShowingMobileMenu', () => false);
  const wooNuxtVersionInfo: string = pkg.version || '0.0.0';
  const productsPerPage: number = runtimeConfig.public?.PRODUCTS_PER_PAGE || 24;
  const wooNuxtSEO = Array.isArray(runtimeConfig.public?.WOO_NUXT_SEO) ? runtimeConfig.public?.WOO_NUXT_SEO : [];
  const frontEndUrl = runtimeConfig.public?.FRONT_END_URL?.replace(/\/$/, '') || (typeof window !== 'undefined' ? window.location.origin : ''); // Fallback to window origin client-side
  const isDev: boolean = process.env.NODE_ENV === 'development';
  const FALLBACK_IMG = '/images/placeholder.jpg';

  /**
   * Toggles the mobile menu.
   */
  function toggleMobileMenu(state: boolean | undefined = undefined): void {
    isShowingMobileMenu.value = state ?? !isShowingMobileMenu.value;
  }

  /**
   * Formats an array of variation objects by removing spaces and hyphens from the 'name' and 'value' properties.
   * Handles potential null/undefined inputs gracefully.
   * @param {any[]} arr - The array of variation objects to format. Each object should have 'name' and 'value' properties.
   * @returns {any[]} The formatted array of variation objects.
   */
   const formatVariationArrays = (arr: any[] | undefined | null): any[] => {
     if (!Array.isArray(arr)) return [];
     return arr.map((a) => ({
       name: String(a?.name || '').replace(/[-\s]/g, ''),
       value: String(a?.value || '').replace(/[-\s]/g, ''),
     }));
   };


  /**
   * Determines if two arrays of variations are equal by comparing the formatted arrays.
   * Handles potential null/undefined inputs gracefully.
   * @param {any[]} a1 - The first array of variations to compare.
   * @param {any[]} a2 - The second array of variations to compare.
   * @returns {boolean} True if the arrays are equal, false otherwise.
   */
  const arraysEqual = (a1: any[] | undefined | null, a2: any[] | undefined | null): boolean => {
     // If both are null/undefined, consider them equal
     if (a1 == null && a2 == null) return true;
     // If only one is null/undefined, they are not equal
     if (a1 == null || a2 == null) return false;
     // If lengths differ, they are not equal
     if (a1.length !== a2.length) return false;

     // Compare formatted JSON strings after sorting
     return JSON.stringify(formatArray(a1).sort(compareVariationAttributes)) === JSON.stringify(formatArray(a2).sort(compareVariationAttributes));
   };

   // Helper function to sort variation attributes consistently by name for comparison
   const compareVariationAttributes = (a: { name: string }, b: { name: string }): number => {
     if (a.name < b.name) return -1;
     if (a.name > b.name) return 1;
     return 0;
   };

  // Formats an array of variations by converting the name and value properties to lowercase.
  // Handles potential null/undefined inputs gracefully.
  const formatArray = (arr: any[] | undefined | null): any[] => {
     if (!Array.isArray(arr)) return [];
    return arr.map((v) => {
      let name = String(v?.name || '').toLowerCase();
      // Keep 'pa_' prefix if present, needed for matching sometimes
      // name = name.startsWith('pa_') ? name.replace('pa_', '') : name;
      const value = String(v?.value || '').toLowerCase();
      return { name, value };
    });
  };

  /**
   * Clears all cookies accessible from the current domain/path.
   * Note: HttpOnly cookies cannot be cleared via client-side script.
   */
  function clearAllCookies(): void {
     console.log('Clearing client-side cookies...');
    if (typeof document === 'undefined') return; // Guard for SSR

    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      // Setting expires to a past date effectively deletes the cookie
      // Specify path and domain to ensure broad matching if needed, but start simple
       document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
       // Attempt removal without domain first, then with domain if necessary and known
       // const domain = document.domain.split('.').slice(-2).join('.'); // Example: get base domain
       // document.cookie = name + `=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`;
    }
     console.log('Client-side cookies cleared (HttpOnly cookies may remain).');
  }

  /**
   * Clear all local storage.
   */
  function clearAllLocalStorage(): void {
     console.log('Clearing local storage...');
     if (typeof localStorage === 'undefined') return; // Guard for SSR
    localStorage.clear();
     console.log('Local storage cleared.');
  }

  /**
   * Replaces a query parameter in a URL.Replace a query parameter in a URL
   * @param {string} param - The query parameter to replace.
   * @param {string} newval - The new value for the query parameter.
   * @param {string} search - The URL search string (e.g., window.location.search).
   * @returns {string} The updated URL search string.
   */
  function replaceQueryParam(param: string, newval: string, search: string): string {
     // Ensure search starts with '?' if not empty
     const currentSearch = search.startsWith('?') ? search : (search ? `?${search}`: ''); // Handle empty search string
     const params = new URLSearchParams(currentSearch);
     if (newval) {
       params.set(param, newval);
     } else {
       params.delete(param);
     }
     const newSearch = params.toString();
     return newSearch ? `?${newSearch}` : ''; // Return empty string if no params left
   }

  /**
   * Removes a class from the body element.
   * @param {string} className - The class to remove.
   */
  function removeBodyClass(className: string): void {
     if (typeof document === 'undefined') return;
    const body = document.querySelector('body');
    body?.classList.remove(className);
  }

  /**
   * Adds a class to the body element.
   * @param {string} className - The class to add.
   */
  function addBodyClass(className: string): void {
     if (typeof document === 'undefined') return;
    const body = document.querySelector('body');
    body?.classList.add(className);
  }

  /**
   * Toggles a class on the body element.
   * @param {string} className - The class to toggle.
   */
  function toggleBodyClass(className: string): void {
     if (typeof document === 'undefined') return;
    const body = document.querySelector('body');
    body?.classList.toggle(className);
  }

  /**
   * Checks for variation type of 'any' and returns an array of the indexes of those variations.
   * Handles potential null/undefined product data.
   * @param {Product} product - The product to check.
   * @returns {number[]} An array of the indexes of variations with a type of 'any'.
   */
  const checkForVariationTypeOfAny = (product: Product | null | undefined): number[] => {
     const attributes = product?.attributes?.nodes;
     const variations = product?.variations?.nodes;
     if (!attributes || !variations || attributes.length === 0 || variations.length === 0) {
       return [];
     }

     const numberOfAttributes = attributes.length;
     let indexOfTypeAny: number[] = [];

     for (let i = 0; i < numberOfAttributes; i++) {
         // Check if *all* variations lack a specific value for the attribute at index 'i'
         const allVariationsLackValue = variations.every(variation => {
             const variationAttributes = variation.attributes?.nodes;
             // A variation attribute exists at this index?
             const attrNode = variationAttributes?.[i];
             // It lacks a value if the node doesn't exist or its value is falsy (empty string, null)
             return !attrNode || !attrNode.value;
         });

         // If all variations lack a value for this attribute, it implies 'Any' for this attribute position
         if (allVariationsLackValue) {
             indexOfTypeAny.push(i);
         }
     }

     return indexOfTypeAny;
   };


  /**
   * Determines if the route query is empty.
   * @returns {boolean} True if the route query is empty, false otherwise.
   */
  const isQueryEmpty = computed<boolean>(() => Object.keys(route.query).length === 0);

  /**
   * Formats a date string.
   * @param {string} date - The date string to format.
   * @returns {string} The formatted date string, or empty string if invalid.
   */
  const formatDate = (date?: string | null): string => {
    if (!date) return '';
     try {
        return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
     } catch (e) {
        console.error("Error formatting date:", date, e);
        return ''; // Return empty string for invalid dates
     }
  };

  /**
   * Formats a price string using the Intl.NumberFormat API for better localization.
   * Uses currency settings from runtime config.
   * @param {string | number | null | undefined} price - The price value to format.
   * @param {object} options - Optional formatting options.
   * @returns {string} The formatted price string, or empty string if invalid.
   */
   const formatPrice = (price: string | number | null | undefined, options = {}): string => {
     const numericPrice = Number(price);
     if (price == null || isNaN(numericPrice)) {
       // Allow formatting of 0.00
       if (numericPrice === 0) {
            // Proceed to format zero
       } else {
          return ''; // Return empty for null, undefined, or non-numeric values (except 0)
       }
     }


     const { currencyCode = 'USD', currencySymbol = '$', currencyPosition = 'prefix', currencyDecimalSeparator = '.', currencyThousandSeparator = ',', currencyNumberOfDecimals = 2 } = runtimeConfig.public || {}; // Default to USD if not configured

     try {
         // Use Intl.NumberFormat for robust localization
         // Note: Intl doesn't always respect thousand/decimal separators from config, depends on locale.
        return new Intl.NumberFormat('en-US', { // Consider dynamic locale if needed
             style: 'currency',
             currency: currencyCode,
             minimumFractionDigits: currencyNumberOfDecimals,
             maximumFractionDigits: currencyNumberOfDecimals,
             ...options, // Allow overriding default options
         }).format(numericPrice);
     } catch (e) {
         console.error(`Error formatting price: ${price}, Currency: ${currencyCode}`, e);
         // Fallback to manual formatting using config settings
         const formattedNumber = numericPrice.toFixed(currencyNumberOfDecimals)
             .replace('.', currencyDecimalSeparator)
             // Basic thousand separator logic (might need improvement for complex cases)
             .replace(/\B(?=(\d{3})+(?!\d))/g, currencyThousandSeparator);

         return currencyPosition === 'prefix' ? `${currencySymbol}${formattedNumber}` : `${formattedNumber}${currencySymbol}`;
     }
   };


  /**
   * Scrolls to the top of the page smoothly.
   */
  const scrollToTop = () => {
     if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
     }
  };

  /**
   * Strips HTML tags from a string.
   * @param {string} str - The string to strip.
   * @returns {string} The stripped string.
   */
   const stripHtml = (str: string | null | undefined = ''): string => {
     if (str === null || str === undefined) return '';
     // More robust regex to handle attributes and variations
     let stripped = String(str).replace(/<[^>]*>?/gm, '');
     // Decode HTML entities like &amp; using the browser's built-in capabilities
     if (typeof document !== 'undefined') {
        try {
            const txt = document.createElement("textarea");
            txt.innerHTML = stripped;
            stripped = txt.value;
        } catch (e) {
            console.warn("Could not decode HTML entities during stripHtml:", e);
            // Return stripped version without decoding if textarea trick fails
        }
     }
     return stripped;
   };


  /**
   * Debounces a function.
   * @param {Function} func - The function to debounce.
   * @param {number} delay - The delay in milliseconds.
   * @returns {Function} The debounced function.
   */
  const debounce = <T extends (...args: any[]) => any>(func: T, delay: number = 300): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };


  /**
   *  Logs a GraphQL error message. Only show logs in development or when the 'debug' query parameter is present.
   * @param error
   */
   const logGQLError = (error: any) => {
     // Ensure route is available (might not be in some contexts)
     const isDebug = route?.query?.debug === 'true';

     if (!isDev && !isDebug) return;

     console.error('GraphQL Error:', {
        message: error?.message,
        gqlErrors: error?.gqlErrors,
        networkError: error?.networkError,
        // stack: error?.stack // Optional: include stack trace for deeper debugging
     });

     // Optionally display a user-friendly message in dev/debug mode
     // if (isDev || isDebug) { alert(`GraphQL Error: ${error?.gqlErrors?.[0]?.message || error?.message || 'Unknown GQL error'}`); }
   };


  /**
   * Get domain from URL, handling potential edge cases.
   * @param {string} urlString - The URL to get the domain from.
   * @returns {string} The domain, or empty string if parsing fails.
   */
  const getDomain = (urlString?: string | null): string => {
     if (!urlString) {
        if (typeof window !== 'undefined') {
            urlString = window.location.href;
        } else {
            return ''; // Cannot determine domain server-side without input
        }
     }
     try {
         const url = new URL(urlString);
         // Return hostname, which doesn't include the port
         // Handle potential localhost or IP addresses
         return url.hostname;
     } catch (e) {
         console.error("Error parsing URL for domain:", urlString, e);
          // Fallback regex attempt (less reliable)
          const match = urlString.match(/:\/\/(?:www[0-9]?\.)?(.[^/:]+)/i);
          if (match?.[1]) {
            return match[1];
          }
         return '';
     }
   };

  return {
    isShowingMobileMenu,
    wooNuxtVersionInfo,
    productsPerPage,
    isQueryEmpty,
    wooNuxtSEO,
    frontEndUrl,
    isDev,
    FALLBACK_IMG,
    formatArray,
    arraysEqual,
    clearAllCookies,
    clearAllLocalStorage,
    replaceQueryParam,
    addBodyClass,
    removeBodyClass,
    toggleBodyClass,
    toggleMobileMenu,
    checkForVariationTypeOfAny,
    formatDate,
    formatPrice,
    scrollToTop,
    stripHtml,
    debounce,
    logGQLError,
    getDomain,
  };
}