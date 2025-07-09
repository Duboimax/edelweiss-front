<script setup lang="ts">
import CTA from '~/components/dynamic/CTA.vue'

const props = defineProps<{
  data: {
    title: string,
    subtitle: string,
    title1: string,
    content1: string,
    title2: string,
    content2: string,
    title3: string,
    content3: string,
    buttonName: string,
    link: string,
  }
}>()

const { data } = props

</script>

<template>
  <section class="bg-white rounded-3xl py-8 px-6 max-w-6xl mx-auto my-16 shadow-xl border border-[#f5f2e9]">
    <div class="mb-8 text-center">
      <h2 class="font-serif text-3xl md:text-4xl font-bold text-[#2a2a22] mb-2">{{ data.title }}</h2>
      <p class="text-base md:text-lg text-[#5a5a52] mt-2">{{ data.subtitle }}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div v-for="(title, i) in [data.title1, data.title2, data.title3]" :key="i" class="bg-white rounded-2xl p-6 shadow-md border border-[#e6e2d7] flex flex-col items-center text-center">
        <h3 class="font-serif text-xl md:text-2xl text-[#2a2a22] mb-2">{{ title }}</h3>
        <p class="text-[#5a5a52] text-sm md:text-base">
          {{ [data.content1, data.content2, data.content3][i] }}
        </p>
      </div>
    </div>
    <div v-if="data.buttonName && data.link" class="flex justify-center mt-6">
      <CTA :button-name="data.buttonName" :link="data.link" />
    </div>
  </section>
</template>

<style scoped>
section {
  background: #fff;
}
@media (max-width: 640px) {
  h2 {
    font-size: 1.25rem;
  }
  p, h3 {
    font-size: 1rem;
  }
}
</style> 