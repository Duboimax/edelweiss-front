<script setup lang="ts">
import CTA from '~/components/dynamic/CTA.vue'

const props = defineProps<{
    title: string,
    description: string,
    image?: string,
    link: string,
}>()
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-2 lg:gap-12">
    <div class="aspect-square overflow-hidden bg-[#f5f2e9]">
      <NuxtImg
        :src="props.image || '/placeholder.svg'"
        :alt="props.title"
        width="600"
        height="600"
        class="h-full w-full object-cover"
      />
    </div>

    <div class="flex flex-col justify-center space-y-4">
      <h2 class="font-serif text-3xl font-medium text-[#2a2a22]">{{ props.title }}</h2>
      <p class="text-[#5a5a52]">{{ props.description }}</p>
      
      <div class="pt-4">
        <CTA button-name="Explore Collection" :link="props.link" />
      </div>
    </div>
  </div>
</template>