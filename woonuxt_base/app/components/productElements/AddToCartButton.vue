<script setup>
const { isUpdatingCart } = useCart(); // Use isUpdatingCart for loading state
const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const { t } = useI18n();

// The parent form submission handles the click, this button mainly shows state.
// isLoading ref removed, rely on isUpdatingCart and props.disabled

const addToCartButtonText = computed(() => {
    if (isUpdatingCart.value) return t('messages.shop.adding');
    return t('messages.shop.addToCart');
});

// Determine final disabled state based on prop and cart status
const isDisabled = computed(() => props.disabled || isUpdatingCart.value);

</script>

<template>
  <button
    type="submit"
    class="inline-flex items-center justify-center font-bold text-white text-center p-3 gap-3 rounded-lg shadow-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
    :class="[
        isDisabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dark active:bg-primary-darker'
    ]"
    :disabled="isDisabled"
    aria-live="polite" <!-- Announce changes -->
    >
     <!-- Use min-w to prevent size jumps -->
    <span class="min-w-[80px]">{{ addToCartButtonText }}</span>
    <LoadingIcon v-if="isUpdatingCart" stroke="4" size="16" color="#fff" /> <!-- Slightly smaller icon -->
  </button>
</template>

<style lang="postcss" scoped>
/* Additional styles if needed */
button {
  /* Example: Minimum width */
   min-width: 150px;
}
</style>