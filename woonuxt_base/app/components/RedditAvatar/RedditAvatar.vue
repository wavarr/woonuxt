<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'sm', // xs, sm, md, lg, xl
  },
  type: {
    type: Number,
    default: 1, // 1-5 for different avatar types
  },
  alt: {
    type: String,
    default: 'Avatar',
  }
});

const getSize = (size: string) => {
  switch (size) {
    case 'xs': return 'w-6 h-6';
    case 'sm': return 'w-8 h-8';
    case 'md': return 'w-12 h-12';
    case 'lg': return 'w-16 h-16';
    case 'xl': return 'w-24 h-24';
    default: return 'w-8 h-8';
  }
};
</script>

<template>
  <div :class="[getSize(size), 'rounded-full overflow-hidden bg-primary-50 border border-primary-100 flex-shrink-0']">
    <img 
      :src="`/images/avatars/reddit-avatar-${type}.svg`" 
      :alt="alt"
      class="w-full h-full object-contain"
    />
  </div>
</template>
