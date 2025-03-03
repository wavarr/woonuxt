<template>
  <div class="relative mx-auto bg-gray-100">
    <div class="container flex flex-col items-start justify-center h-[40vh] py-8 pt-6">
      <h1 class="text-left notable-font">
        <div class="text-block">
          <div class="text-[#0047AB]">Moda</div>
          <div class="text-[#0047AB]">Prime</div>
          <div class="text-[#0047AB]">USA</div>
        </div>
      </h1>
      <NuxtLink class="mt-8 px-6 py-3 font-bold text-white bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors" to="/products">Shoppe</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.text-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 0.9;
  max-height: 75; 
}

.text-block div {
  font-size: clamp(2rem, 15vw, 12rem);
  white-space: nowrap;
}
/* Notable font is imported in the global CSS */
</style>
