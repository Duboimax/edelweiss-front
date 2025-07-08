<script setup lang="ts">
const props = defineProps<{
  productName: string,
  image: string,
  price: number,
}>()
</script>

<template>
  <div class="bg-white overflow-hidden w-full max-w-[300px] mx-auto flex flex-col">
    <div class="relative w-full border-b border-[#000000] " style="padding-top: 100%;">
      <NuxtImg
        :src="props.image || '/placeholder.svg'"
        :alt="props.productName"
        class="absolute top-0 left-0 w-full h-full object-cover"
        width="300"
        height="300"
      />
    </div>
    <div class="p-5 flex-1 flex flex-col justify-between text-center">
      <h3 class="font-serif text-lg font-medium text-[#2a2a22] mb-1">{{ props.productName }}</h3>
      <div class="text-base font-semibold text-[#5a5a52]">{{ props.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</div>
    </div>
  </div>
</template> 