<template>
  <div>
    <NewHeroBanner />
    
    <div class="container mx-auto py-12 px-4">
      <h1 class="text-3xl font-bold mb-6">New Hero Banner Test</h1>
      <p class="mb-4">
        This is a test page to view the updated hero banner component with the new design.
      </p>
    </div>
  </div>
</template>

<script setup>
import NewHeroBanner from '~/components/generalElements/NewHeroBanner.vue';

// SEO
useHead({
  title: 'New Hero Banner Test',
  meta: [
    { name: 'description', content: 'Test page for viewing the updated hero banner component' }
  ]
});
</script> 
