<script lang="ts" setup>
import { StockStatusEnum, ProductTypesEnum, type AddToCartInput } from '#woo';

const route = useRoute();
const { storeSettings } = useAppConfig();
const { arraysEqual, formatArray, checkForVariationTypeOfAny, stripHtml, formatPrice, logGQLError } = useHelpers(); // Added logGQLError
const { addToCart, isUpdatingCart } = useCart();
const { t } = useI18n();
const slug = route.params.slug as string;
const { $notify } = useNuxtApp(); // Assuming a notification plugin is available

const { data, error: productError, pending: productPending } = await useAsyncGql('getProduct', { slug });

// Handle product not found or error during fetch
if (productError.value && !data.value?.product) {
  console.error(`Error fetching product with slug ${slug}:`, productError.value);
  throw showError({ statusCode: 404, statusMessage: t('messages.shop.productNotFound') });
}
if (!productPending.value && !data.value?.product) {
   console.warn(`Product with slug ${slug} not found after fetch completed.`);
   throw showError({ statusCode: 404, statusMessage: t('messages.shop.productNotFound') });
}


const product = ref<Product | null>(data?.value?.product || null);
const quantity = ref<number>(1);
const activeVariation = ref<Variation | null>(null);
const variationAttributes = ref<VariationAttribute[]>([]); // Stores the user's selected attributes {name, value}
// Removed indexOfTypeAny computed as it wasn't directly used in the template logic after refactor. Re-add if needed.
// const indexOfTypeAny = computed<number[]>(() => product.value ? checkForVariationTypeOfAny(product.value) : []);
// Removed attrValues ref as selectProductInput directly computes the needed structure

const isSimpleProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.SIMPLE);
const isVariableProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.VARIABLE);
const isExternalProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.EXTERNAL);
const isGroupedProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.GROUP); // Corrected type name


// Determine the product data to display (either main product or active variation)
const displayNode = computed(() => activeVariation.value || product.value);

// Input for adding to cart
const selectProductInput = computed<AddToCartInput | null>(() => {
    if (!product.value) return null;

    const input: AddToCartInput = {
        productId: product.value.databaseId, // Always use parent product ID
        quantity: quantity.value || 1,
    };

    if (isVariableProduct.value && activeVariation.value) {
        input.variationId = activeVariation.value.databaseId;
        // Ensure variation attributes are correctly formatted { attributeName: string, attributeValue: string }
        // Filter out attributes without a value (e.g., 'Any' selections not resolved to a specific variation)
        input.variation = variationAttributes.value
            .filter(attr => attr.value) // Only include attributes with a selected value
            .map(attr => ({
                attributeName: attr.name, // e.g., 'pa_color'
                attributeValue: attr.value, // e.g., 'Blue'
            }));
    } else {
        input.variationId = undefined; // Ensure variationId is not sent for non-variable or non-selected variable
        input.variation = undefined;
    }

    return input;
});


const handleAddToCart = async () => {
    if (!selectProductInput.value || disabledAddToCart.value) {
      console.warn("Add to cart prevented:", { input: selectProductInput.value, disabled: disabledAddToCart.value });
       if(isVariableProduct.value && !activeVariation.value) {
            $notify({ group: 'toasts', type: 'warn', title: 'Selection Required', text: 'Please select product options.' });
       } else if (disabledAddToCart.value) {
           $notify({ group: 'toasts', type: 'warn', title: 'Unavailable', text: 'This product/variation is currently unavailable.' });
       }
      return;
    }
    try {
      await addToCart(selectProductInput.value);
      $notify({ group: 'toasts', type: 'success', title: 'Success', text: `${displayNode.value?.name || 'Product'} added to cart.` });
    } catch (e) {
       console.error("Error adding to cart:", e);
       $notify({ group: 'toasts', type: 'error', title: 'Error', text: 'Could not add item to cart.' });
    }
}

// Live stock status fetch (optional, consider impact)
const mergeLiveStockStatus = (payload: Product): void => {
  if (!product.value) return;
  product.value.stockStatus = payload.stockStatus ?? product.value.stockStatus;
  product.value.stockQuantity = payload.stockQuantity ?? product.value.stockQuantity; // Update quantity too

  payload.variations?.nodes?.forEach((variation: Variation) => {
     const existingVariation = product.value?.variations?.nodes.find(v => v.databaseId === variation.databaseId);
     if (existingVariation) {
         existingVariation.stockStatus = variation.stockStatus;
         existingVariation.stockQuantity = variation.stockQuantity; // Update quantity
     }
  });
   // Re-evaluate active variation stock status if necessary
   if (activeVariation.value) {
      const updatedActive = product.value?.variations?.nodes.find(v => v.databaseId === activeVariation.value!.databaseId);
      if (updatedActive) activeVariation.value = updatedActive;
   }
};

onMounted(async () => {
   // Initialize default attributes for variable products
   // Ensure defaultAttributes is an array and has content
   const defaultAttrs = product.value?.defaultAttributes?.nodes;
   if (isVariableProduct.value && Array.isArray(defaultAttrs) && defaultAttrs.length > 0) {
      // Ensure the default attributes structure matches VariationAttribute[] expected by updateSelectedVariations
       updateSelectedVariations(defaultAttrs as VariationAttribute[]);
   }

  // Optional: Fetch live stock status on mount
  if (product.value && storeSettings.showLiveStockStatus) {
    try {
      const { product: stockData } = await GqlGetStockStatus({ slug });
      if (stockData) mergeLiveStockStatus(stockData as Product);
    } catch (error: any) {
       logGQLError(error); // Use helper for logging
    }
  }
});

// Update selected variation based on user choices
const updateSelectedVariations = (selectedAttrs: VariationAttribute[]): void => {
  if (!product.value?.variations?.nodes || !Array.isArray(selectedAttrs)) return;

  // Ensure the incoming attributes have the necessary 'name' and 'value' properties
  const formattedSelectedAttrs = formatArray(selectedAttrs);
  variationAttributes.value = selectedAttrs; // Store the raw selection state for the component

  // Find the matching variation based on formatted attributes
   const matchedVariation = product.value.variations.nodes.find((variation) => {
     if (!variation.attributes?.nodes) return false;
     // Compare selected attributes with the variation's attributes after formatting and sorting
     return arraysEqual(formattedSelectedAttrs, formatArray(variation.attributes.nodes));
   });

   activeVariation.value = matchedVariation || null; // Set to null if no exact match

   // console.log("Selected Attributes:", formattedSelectedAttrs);
   // console.log("Active Variation:", activeVariation.value ? activeVariation.value.databaseId : 'None');
};

// Computed stock status based on product type and selection
const stockStatus = computed(() => {
  if (isVariableProduct.value) {
    // If attributes are selected but no matching variation found, it's effectively OOS
    if (variationAttributes.value.length > 0 && !activeVariation.value) {
        return StockStatusEnum.OUT_OF_STOCK;
    }
    return activeVariation.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK; // Default to OOS if no variation selected/found
  }
  return product.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK;
});

const stockQuantity = computed<number | null | undefined>(() => { // Explicit type
   if (isVariableProduct.value) {
     return activeVariation.value?.stockQuantity; // May be null or undefined
   }
   return product.value?.stockQuantity; // May be null or undefined
});


const isInStock = computed(() => stockStatus.value === StockStatusEnum.IN_STOCK);

// Computed property to disable Add to Cart button
const disabledAddToCart = computed(() => {
   if (isUpdatingCart.value) return true; // Disable while cart is updating
   if (!isInStock.value) return true; // Disable if out of stock

   // For variable products, a variation must be selected that corresponds to an actual variation node
   if (isVariableProduct.value && !activeVariation.value) return true;

   return false;
});

// SEO Meta
useSeoMeta({
    title: () => product.value?.name || 'Product',
    description: () => stripHtml(product.value?.shortDescription || product.value?.description || '').substring(0, 150),
    ogTitle: () => product.value?.name || 'Product',
    ogDescription: () => stripHtml(product.value?.shortDescription || product.value?.description || '').substring(0, 150),
    ogImage: () => displayNode.value?.image?.sourceUrl || product.value?.image?.sourceUrl || null,
    twitterCard: 'summary_large_image',
});
</script>

<template>
  <main class="container relative py-6 xl:max-w-7xl">
     <LoadingIcon v-if="productPending && !product" class="m-auto my-32" />
    <div v-else-if="product">
      <!-- SEOHead removed as useSeoMeta is used -->
      <Breadcrumb :product class="mb-6" v-if="storeSettings.showBreadcrumbOnSingleProduct && product.productCategories?.nodes?.length" />

      <div class="flex flex-col gap-10 md:flex-row md:justify-between lg:gap-24">
        <ProductImageGallery
          v-if="product.image || product.galleryImages?.nodes?.length"
          class="relative flex-1"
          :main-image="product.image!"
          :gallery="product.galleryImages!"
          :node="displayNode!"
          :activeVariation="activeVariation" />
        <NuxtImg v-else class="relative flex-1 skeleton" src="/images/placeholder.jpg" :alt="product?.name || 'Product'" />

        <div class="lg:max-w-md xl:max-w-lg md:py-2 w-full">
          <div class="flex justify-between mb-4">
            <div class="flex-1">
              <h1 class="flex flex-wrap items-center gap-2 mb-2 text-2xl font-semibold"> <!-- Changed font-weight -->
                {{ displayNode?.name || product.name }}
                <LazyWPAdminLink :link="`/wp-admin/post.php?post=${product.databaseId}&action=edit`">Edit</LazyWPAdminLink>
              </h1>
              <StarRating :rating="product.averageRating || 0" :count="product.reviewCount || 0" v-if="storeSettings.showReviews" />
            </div>
            <ProductPrice class="text-xl" :sale-price="displayNode?.salePrice" :regular-price="displayNode?.regularPrice" />
          </div>

          <div class="grid gap-2 my-8 text-sm empty:hidden">
            <!-- Display availability only for non-external products -->
            <div v-if="!isExternalProduct && !isGroupedProduct" class="flex items-center gap-2">
              <span class="text-gray-500">{{ $t('messages.shop.availability') }}: </span>
              <!-- Pass product data to StockStatus if live updates are needed -->
              <StockStatus :stockStatus="stockStatus" :stockQuantity="stockQuantity" />
            </div>
             <!-- SKU -->
            <div class="flex items-center gap-2" v-if="storeSettings.showSKU && displayNode?.sku">
              <span class="text-gray-500">{{ $t('messages.shop.sku') }}: </span>
              <span>{{ displayNode.sku }}</span>
            </div>
             <!-- Weight -->
             <div class="flex items-center gap-2" v-if="storeSettings.showWeight && displayNode?.weight">
               <span class="text-gray-500">{{ $t('messages.general.weight') }}: </span>
               <span>{{ displayNode.weight }} kg</span> <!-- Assuming kg -->
             </div>
              <!-- Dimensions -->
             <div class="flex items-center gap-2" v-if="storeSettings.showDimensions && displayNode?.length && displayNode?.width && displayNode?.height">
               <span class="text-gray-500">{{ $t('messages.general.dimensions') }}: </span>
               <span>{{ displayNode.length }} x {{ displayNode.width }} x {{ displayNode.height }} cm</span> <!-- Assuming cm -->
             </div>
          </div>

          <!-- Short Description -->
          <div class="mb-8 font-light prose max-w-none prose-sm" v-if="product.shortDescription" v-html="product.shortDescription" />
          <!-- Fallback to long description if short is missing -->
          <div class="mb-8 font-light prose max-w-none prose-sm" v-else-if="product.description" v-html="product.description" />


          <hr class="my-6" />

          <!-- Product Types Logic -->
           <!-- Variable Product Form -->
          <form v-if="isVariableProduct" @submit.prevent="handleAddToCart">
            <AttributeSelections
              v-if="product.attributes?.nodes && product.variations?.nodes"
              class="mt-4 mb-8"
              :attributes="product.attributes.nodes"
              :defaultAttributes="product.defaultAttributes?.nodes"
              :variations="product.variations.nodes"
              @attrs-changed="updateSelectedVariations" />
            <div
              class="fixed bottom-0 left-0 z-10 flex items-center w-full gap-4 p-4 mt-12 bg-white md:static md:bg-transparent bg-opacity-90 md:p-0 shadow-md md:shadow-none">
              <input
                v-model.number="quantity"
                type="number"
                min="1"
                :max="(typeof stockQuantity === 'number' && stockQuantity >= 0) ? stockQuantity : undefined"
                :disabled="!isInStock"
                aria-label="Quantity"
                class="bg-white border rounded-lg flex text-left p-2.5 w-20 gap-4 items-center justify-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50" />
              <AddToCartButton class="flex-1 w-full md:max-w-xs" :disabled="disabledAddToCart" />
            </div>
          </form>

          <!-- Simple Product Form -->
          <form v-else-if="isSimpleProduct" @submit.prevent="handleAddToCart">
             <div
              class="fixed bottom-0 left-0 z-10 flex items-center w-full gap-4 p-4 mt-12 bg-white md:static md:bg-transparent bg-opacity-90 md:p-0 shadow-md md:shadow-none">
              <input
                v-model.number="quantity"
                type="number"
                min="1"
                :max="(typeof stockQuantity === 'number' && stockQuantity >= 0) ? stockQuantity : undefined"
                :disabled="!isInStock"
                aria-label="Quantity"
                 class="bg-white border rounded-lg flex text-left p-2.5 w-20 gap-4 items-center justify-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50" />
              <AddToCartButton class="flex-1 w-full md:max-w-xs" :disabled="disabledAddToCart" />
            </div>
          </form>

          <!-- External Product Link -->
          <a
            v-else-if="isExternalProduct && product.externalUrl"
            :href="product.externalUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center w-full gap-3 p-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark md:w-auto md:min-w-[150px]">
            {{ product?.buttonText || t('messages.shop.buyProduct') }}
            <Icon name="ion:open-outline" />
          </a>

           <!-- Grouped Product Placeholder -->
           <div v-else-if="isGroupedProduct" class="mt-4 text-gray-500">
                <!-- Implement grouped product display logic here -->
                {{ t('messages.shop.groupedProductPlaceholder') }}
            </div>

           <!-- Fallback for unknown types -->
           <div v-else class="mt-4 text-gray-500">
                 {{ t('messages.shop.productTypeNotSupported') }}
            </div>


          <!-- Categories & Tags -->
          <div v-if="storeSettings.showProductCategoriesOnSingleProduct || storeSettings.showProductTagsOnSingleProduct" class="my-8 space-y-4 text-sm">
              <!-- Categories -->
             <div v-if="storeSettings.showProductCategoriesOnSingleProduct && product.productCategories?.nodes?.length" class="flex items-center gap-2 flex-wrap"> <!-- Added flex-wrap -->
               <span class="text-gray-500 flex-shrink-0">{{ $t('messages.shop.category', product.productCategories.nodes.length) }}:</span>
               <div class="product-categories">
                 <NuxtLink
                   v-for="(category, index) in product.productCategories.nodes"
                   :key="category.databaseId"
                   :to="`/product-category/${decodeURIComponent(category?.slug || '')}`"
                   class="hover:text-primary"
                   :title="category.name"
                   >{{ category.name }}<span v-if="index < product.productCategories.nodes.length - 1" class="comma">, </span>
                 </NuxtLink>
               </div>
             </div>
               <!-- Tags -->
             <div v-if="storeSettings.showProductTagsOnSingleProduct && product.productTags?.nodes?.length" class="flex items-center gap-2 flex-wrap"> <!-- Added flex-wrap -->
                <span class="text-gray-500 flex-shrink-0">{{ $t('messages.shop.tag', product.productTags.nodes.length) }}:</span>
                <div class="product-tags">
                  <NuxtLink
                    v-for="(tag, index) in product.productTags.nodes"
                    :key="tag.databaseId"
                    :to="`/product-tag/${decodeURIComponent(tag?.slug || '')}`"
                    class="hover:text-primary"
                    :title="tag.name"
                    >{{ tag.name }}<span v-if="index < product.productTags.nodes.length - 1" class="comma">, </span>
                  </NuxtLink>
                </div>
             </div>
               <hr v-if="(storeSettings.showProductCategoriesOnSingleProduct || storeSettings.showProductTagsOnSingleProduct) && (product.productCategories?.nodes?.length || product.productTags?.nodes?.length)" class="my-4"/>
           </div>


          <!-- Wishlist & Share -->
          <div class="flex flex-wrap gap-4 mt-6">
            <WishlistButton :product />
            <ShareButton :product />
          </div>
        </div>
      </div>

      <!-- Tabs: Description & Reviews -->
      <div v-if="product.description || (storeSettings.showReviews && product.reviews)" class="my-16 md:my-24">
        <ProductTabs :product />
      </div>

       <!-- Related Products -->
      <div class="my-16 md:my-24" v-if="product.related?.nodes?.length && storeSettings.showRelatedProducts">
        <div class="mb-6 text-xl font-semibold">{{ $t('messages.shop.youMayLike') }}</div>
        <ProductRow :products="product.related.nodes" class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5" />
      </div>
    </div>
    <!-- Fallback if product becomes null after initial load -->
    <div v-else-if="!productPending" class="text-center my-16">
         <p>{{ $t('messages.shop.productNotFound') }}</p>
         <NuxtLink to="/products" class="mt-4 text-primary hover:underline">{{ $t('messages.shop.browseProducts') }}</NuxtLink>
    </div>
  </main>
</template>

<style scoped>
/* Hide comma on the last category/tag link */
.product-categories > a:last-child .comma,
.product-tags > a:last-child .comma {
  display: none;
}

/* Improve number input appearance */
input[type='number'] {
  -moz-appearance: textfield; /* Firefox */
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>