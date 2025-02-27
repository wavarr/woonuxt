<script setup>
// No imports, relying on Nuxt auto-imports
const title = 'Test Page'
const description = 'This is a test page to verify metadata handling'

// Try different metadata approaches
if (typeof useSeoMeta !== 'undefined') {
  useSeoMeta({
    title,
    description
  })
} else if (typeof useHead !== 'undefined') {
  useHead({
    title,
    meta: [
      { name: 'description', content: description }
    ]
  })
} else {
  console.log('Neither useSeoMeta nor useHead are available')
}
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-2xl font-medium mb-4">Test Page</h1>
    <p>This is a simple test page to verify that our Nuxt setup is working correctly.</p>
  </div>
</template> 
