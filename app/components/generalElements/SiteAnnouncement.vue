<script setup>
import { ref } from 'vue';

const isVisible = ref(true);

const closeAnnouncement = () => {
  isVisible.value = false;
};
</script>

<template>
  <Transition name="fade">
    <div v-if="isVisible" class="silver-background py-3 relative">
      <div class="gold-trim-top"></div>
      <div class="gold-trim-bottom"></div>
      <div class="container text-center">
        <p class="text-[#2b2118] font-medium">Free shipping on all orders over $100</p>
      </div>
      <button 
        @click="closeAnnouncement" 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#2b2118] hover:text-black transition-colors"
        aria-label="Close announcement">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.silver-background {
  background: linear-gradient(to right, #e6e8fa, #c0c0c0, #e6e8fa);
  position: relative;
}

.gold-trim-top, .gold-trim-bottom {
  height: 2px;
  background: linear-gradient(to right, #b8860b, #d4af37, #b8860b);
  position: absolute;
  left: 0;
  right: 0;
}

.gold-trim-top {
  top: 0;
}

.gold-trim-bottom {
  bottom: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 
