<template>
  <div>
    <!-- Your existing layout content -->
    <slot />
    
    <!-- Debug panel (only in development) -->
    <DebugPanel v-if="showDebugPanel" />
    
    <!-- Debug keyboard shortcut handler -->
    <div v-if="process.client" class="debug-shortcut-handler" tabindex="0" @keydown="handleDebugShortcut"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DebugPanel from '~/components/debug/DebugPanel.vue';

const showDebugPanel = ref(process.env.NODE_ENV === 'development' && process.client);

// Handle debug keyboard shortcuts
const handleDebugShortcut = (event) => {
  // Ctrl+Shift+D to toggle debug panel
  if (event.ctrlKey && event.shiftKey && event.key === 'D') {
    event.preventDefault();
    showDebugPanel.value = !showDebugPanel.value;
    console.log(`Debug panel ${showDebugPanel.value ? 'enabled' : 'disabled'}`);
  }
};

onMounted(() => {
  if (process.client) {
    // Add global keyboard shortcut listener
    window.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        showDebugPanel.value = !showDebugPanel.value;
      }
    });
    
    // Log environment info
    console.log('🔧 Environment:', {
      mode: process.env.NODE_ENV,
      gqlHost: process.env.GQL_HOST,
      baseUrl: window.location.origin
    });
  }
});
</script>

<style scoped>
.debug-shortcut-handler {
  position: fixed;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
</style> 
