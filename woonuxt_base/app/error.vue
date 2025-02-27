<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <div class="flex justify-center mb-6">
        <RedditAvatar size="xl" type="4" alt="Error" />
      </div>
      <h1 class="text-4xl font-bold mb-4">{{ error.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred' }}</h1>
      <p class="text-gray-600 mb-8">{{ error.message || "We couldn't find the page you're looking for." }}</p>
      <button 
        @click="handleError" 
        class="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300"
      >
        Go Back Home
      </button>
    </div>
  </div>
</template>

<script setup>
import RedditAvatar from './components/RedditAvatar/RedditAvatar.vue';

defineProps({
  error: Object
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>
