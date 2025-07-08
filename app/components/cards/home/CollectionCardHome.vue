<script setup lang="ts">
import CTA from '~/components/buttons/CTA.vue'

const props = defineProps<{
    title: string,
    description: string,
    image?: string,
    link: string
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
    
   <div class="p-6 text-center flex flex-col flex-grow">
      <h3 class="text-xl font-serif text-[#2a2a22]">{{ title }}</h3>
      <p class="mt-2 text-sm text-[#5a5a52] flex-grow">{{ description }}</p>
      <div class="mt-4">
        <CTA button-name="Explore" :link="link" />
      </div>
    </div>
  </div>
</template>

