<script lang="ts" setup>
const { t } = useI18n();
const { frontEndUrl } = useHelpers();

const { data, error, pending } = await useAsyncGql('getProductCategories', { first: 500 }); // Fetch more categories if needed

const productCategories = computed(() => data.value?.productCategories?.nodes as ProductCategory[] || []);

if (error.value) {
  console.error("Error fetching product categories:", error.value);
}

useHead({
  title: t('messages.shop.category', 2), // Pluralize 'Category'
  meta: [{ name: 'description', content: 'All product categories' }],
  link: [{ rel: 'canonical', href: `${frontEndUrl}/categories` }],
});
</script>

<template>
  <main class="container py-8">
     <h1 class="text-2xl font-bold mb-6">{{ $t('messages.shop.category', 2) }}</h1>
     <div v-if="pending" class="flex items-center justify-center min-h-[300px]">
         <LoadingIcon />
     </div>
     <div v-else-if="error" class="text-center text-red-500">
          {{ $t('messages.error.fetchingCategories') }}
     </div>
    <div v-else-if="productCategories?.length" class="grid grid-cols-2 gap-4 my-6 md:grid-cols-3 lg:gap-8 xl:grid-cols-4">
       <!-- Filter out null categories just in case -->
      <CategoryCard v-for="(category, i) in productCategories.filter(cat => cat !== null)" :key="category.databaseId || i" :node="category" :image-loading="i <= 3 ? 'eager' : 'lazy'" /> <!-- Eager load first few images -->
    </div>
     <div v-else class="text-center text-gray-500">
         {{ $t('messages.shop.noCategoriesFound') }}
     </div>
  </main>
</template>