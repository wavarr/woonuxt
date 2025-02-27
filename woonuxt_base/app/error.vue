<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 text-gray-700 rounded-sm mb-6">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 class="text-2xl font-medium mb-3">{{ error.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred' }}</h1>
      <p class="text-gray-600 mb-6 text-sm">{{ error.message || "The requested page could not be found." }}</p>
      <button 
        @click="handleError" 
        class="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-sm hover:bg-black transition-colors duration-300"
      >
        Return to Home
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: Object
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>
