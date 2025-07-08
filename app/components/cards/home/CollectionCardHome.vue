<script setup lang="ts">
const props = defineProps<{
    title: string,
    description: string,
    image?: string
}>()
</script>

<template>
  <div class="group flex flex-col overflow-hidden border border-[#e6e2d7]">
    <div class="aspect-square overflow-hidden bg-[#f5f2e9]">
      <NuxtImg
        :src="props.image || '/placeholder.svg'"
        :alt="props.title"
        width="300"
        height="300"
        class="h-full w-full object-cover"
      />
    </div>
    
    <!-- Content -->
    <div class="p-6 text-center">
      <h3 class="text-xl font-serif text-[#2a2a22]">{{ props.title }}</h3>
      <p class="mt-2 text-sm text-[#5a5a52]">{{ props.description }}</p>
      <button class="mt-4 bg-[#2a2a22] hover:bg-[#3a3a32] text-white rounded-none px-6 py-3 cursor-pointer transition-colors">
        Explore
      </button>
    </div>
  </div>
</template>

