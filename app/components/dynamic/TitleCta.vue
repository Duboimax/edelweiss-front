<script setup lang="ts">
import CTA from '~/components/dynamic/CTA.vue'

const props = defineProps<{
  data: {
    title: string
    subtitle: string
    CTA?: {
      id: number
      buttonName: string
      link: string
    }
  }
}>()
const { data } = props
</script>

<template>
  <section class="bg-white rounded-3xl py-8 px-6 max-w-4xl w-full mx-auto my-16 text-center shadow-xl border border-[#f5f2e9]">
    <h2 class="font-serif text-3xl md:text-4xl font-bold text-[#2a2a22] mb-4">
      {{ data.title }}
    </h2>
    <p class="text-base md:text-lg text-[#5a5a52] mb-8">
      {{ data.subtitle }}
    </p>
    <CTA v-if="data.CTA" :button-name="data.CTA.buttonName" :link="data.CTA.link" />
  </section>
</template>

<style scoped>
section {
  background: #fff;
}
@media (max-width: 640px) {
  h2 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
  }
}
</style> 