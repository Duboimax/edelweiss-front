<script setup lang="ts">
const props = defineProps<{
  artisanImage: string,
  artisanName: string,
  artisanRole: string,
  description: string,
}>()
</script>

<template>
  <section class="bg-[#f5f2e9] rounded-xl p-8 w-full mx-auto my-12 flex flex-col items-center">
    <h2 class="font-serif text-2xl font-medium tracking-tight text-[#2a2a22] sm:text-3xl mb-8">Meet Our Artisans</h2>
    <div class="flex flex-col items-center gap-4">
      <div class="w-44 h-44 rounded-full overflow-hidden bg-[#e0ddd2] flex items-center justify-center">
        <NuxtImg
          :src="props.artisanImage || '/placeholder.svg'"
          :alt="props.artisanName"
          width="180"
          height="180"
          class="object-cover w-full h-full"
        />
      </div>
      <div class="text-center">
        <div class="font-serif text-base font-semibold text-[#2a2a22]">{{ props.artisanName }}</div>
        <div class="text-sm text-[#5a5a52] mb-1">{{ props.artisanRole }}</div>
        <div class="text-sm text-[#5a5a52] max-w-md mx-auto">{{ props.description }}</div>
      </div>
    </div>
  </section>
</template>

<style>

</style>