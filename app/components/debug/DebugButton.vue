<template>
  <div v-if="isVisible" class="debug-button" @click="toggleDebug">
    🐞
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isVisible = ref(process.env.NODE_ENV === 'development');
const isActive = ref(false);

const toggleDebug = () => {
  if (window.wooDebug) {
    isActive.value = window.wooDebug.toggle();
  }
};
</script>

<style scoped>
.debug-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
  font-size: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.debug-button:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}
</style> 
