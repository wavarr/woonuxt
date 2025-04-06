<script setup>
const { updateItemQuantity, removeItem } = useCart(); // Use removeItem directly if preferred
const { addToWishlist } = useWishlist();
const { FALLBACK_IMG, formatPrice, stripHtml } = useHelpers(); // Import helpers
const { storeSettings } = useAppConfig();
const { $notify } = useNuxtApp(); // For notifications

const { item } = defineProps({
  item: { type: Object, required: true },
});

// Determine if the item is a variation or simple product
const productType = computed(() => (item.variation?.node ? item.variation.node : item.product?.node));

// Generate slug for linking
const productSlug = computed(() => `/product/${decodeURIComponent(item.product?.node?.slug || '')}`);

// Stock information
const stockQuantity = computed(() => productType.value?.stockQuantity);
const stockStatus = computed(() => productType.value?.stockStatus);
const isLowStock = computed(() => {
    if (stockStatus.value === 'IN_STOCK' && stockQuantity.value !== null && storeSettings.lowStockAmount) {
        // Ensure lowStockAmount is treated as a number
        const lowStockThreshold = parseInt(storeSettings.lowStockAmount);
        return !isNaN(lowStockThreshold) && stockQuantity.value <= lowStockThreshold;
    }
    return false;
});


// Image handling
const imgScr = computed(() => productType.value?.image?.cartSourceUrl || productType.value?.image?.sourceUrl || item.product?.node?.image?.cartSourceUrl || item.product?.node?.image?.sourceUrl || FALLBACK_IMG);
const imgAlt = computed(() => stripHtml(productType.value?.image?.altText || productType.value?.name || item.product?.node?.name || ''));
const imgTitle = computed(() => stripHtml(productType.value?.image?.title || productType.value?.name || item.product?.node?.name || ''));


// Sale percentage calculation
const salePercentage = computed(() => {
  // Use raw prices directly from the computed productType
  const regular = parseFloat(productType.value?.regularPrice || '0'); // Base prices now directly on node
  const sale = parseFloat(productType.value?.salePrice || '0'); // Base prices now directly on node
  if (regular > 0 && sale > 0 && sale < regular) {
    return Math.round(((regular - sale) / regular) * 100) + '%';
  }
  return null; // Return null if not on sale or prices invalid
});

// Get variation attributes for display
const variationAttributes = computed(() => {
    return item.variation?.node?.attributes || [];
});

// Remove item function (using removeItem composable)
const handleRemoveItem = () => {
  removeItem(item.key);
   $notify({ group: 'toasts', type: 'info', title: 'Item Removed', text: `${productType.value?.name || 'Product'} removed from cart.` });

};

// Move to wishlist function
const handleMoveToWishList = () => {
   if (item.product?.node) {
      addToWishlist(item.product.node);
      removeItem(item.key); // Remove from cart after adding to wishlist
      $notify({ group: 'toasts', type: 'success', title: 'Moved to Wishlist', text: `${productType.value?.name || 'Product'} moved to wishlist.` });
   }
};
</script>

<template>
  <li v-if="productType" class="py-4"> <!-- Use li for list context -->
    <SwipeCard @remove="handleRemoveItem">
      <div class="flex items-start gap-4 group"> <!-- items-start for better alignment -->
        <!-- Image Link -->
        <NuxtLink :to="productSlug" class="flex-shrink-0">
          <NuxtImg
            width="80"  height="80"  class="w-20 h-20 rounded-md object-cover border skeleton" <!-- Larger image -->
            :src="imgScr" :alt="imgAlt" :title="imgTitle" loading="lazy" />
        </NuxtLink>

        <!-- Details -->
        <div class="flex-1 min-w-0"> <!-- min-w-0 prevents overflow issues -->
           <NuxtLink class="text-sm font-medium leading-tight hover:text-primary line-clamp-2" :to="productSlug" :title="productType.name"> <!-- Line clamp for long names -->
               {{ productType.name }}
           </NuxtLink>
           <!-- Variation Attributes -->
           <div v-if="variationAttributes.length" class="mt-1 text-xs text-gray-500 capitalize">
               <span v-for="(attr, index) in variationAttributes" :key="attr.label || index">
                 {{ attr.label }}: {{ attr.value }}<span v-if="index < variationAttributes.length - 1">, </span>
               </span>
           </div>

           <!-- Price -->
           <!-- Pass raw numeric prices to ProductPrice component -->
           <ProductPrice class="mt-1 text-sm" :sale-price="productType.salePrice" :regular-price="productType.regularPrice" />


           <!-- Status Badges -->
            <div class="flex flex-wrap gap-1 mt-1.5">
                 <span v-if="salePercentage" class="badge badge-success">
                    Save {{ salePercentage }}
                 </span>
                 <span v-if="isLowStock" class="badge badge-warning">
                    Low Stock
                 </span>
                 <span v-if="stockStatus === 'OUT_OF_STOCK'" class="badge badge-error">
                     Out of stock
                 </span>
            </div>
        </div>

        <!-- Quantity & Actions -->
        <div class="inline-flex flex-col items-end gap-2 ml-auto">
           <QuantityInput :item="item" />
           <!-- Wishlist/Remove Buttons -->
           <div class="text-xs text-gray-400 group-hover:opacity-100 md:opacity-0 transition-opacity duration-150 ease-in-out flex leading-none items-center mt-1">
             <button v-if="storeSettings.showMoveToWishlist" class="px-1 hover:text-primary" @click="handleMoveToWishList" type="button" title="Move to Wishlist">
                 <Icon name="ion:heart-outline" size="14"/>
             </button>
             <span v-if="storeSettings.showMoveToWishlist" class="border-r h-3 mx-1 border-gray-300"></span> <!-- Separator -->
             <button
               title="Remove Item"
               aria-label="Remove Item"
               @click="handleRemoveItem"
               type="button"
               class="px-1 flex items-center gap-1 hover:text-red-500 cursor-pointer">
               <Icon name="ion:trash-bin-outline" size="14" /> <!-- Changed icon -->
             </button>
           </div>
        </div>
      </div>
    </SwipeCard>
  </li>
</template>

<style scoped>
/* Reusable badge styles */
.badge {
 @apply text-[10px] leading-none inline-block p-1 rounded border font-medium;
}
.badge-success {
 @apply bg-green-50 text-green-700 border-green-200;
}
.badge-warning {
 @apply bg-yellow-50 text-yellow-700 border-yellow-200;
}
.badge-error {
 @apply bg-red-50 text-red-700 border-red-200;
}

/* Optional: subtle hover effect */
/* li:hover { background-color: #f9fafb; } */
</style>