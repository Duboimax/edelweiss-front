<template>
  <div class="flex flex-col items-center space-y-4 p-6">
    <div class="h-20 w-20 rounded-full bg-[#e6e2d7] flex items-center justify-center">
      <span class="text-2xl font-serif text-[#2a2a22]">{{ number }}</span>
    </div>
    <h3 class="text-xl font-serif text-center text-[#2a2a22] font-medium">{{ title }}</h3>
    <p class="text-center text-[#5a5a52] leading-relaxed max-w-xs">{{ information }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  number: string
  title: string
  information: string
}>()
</script>