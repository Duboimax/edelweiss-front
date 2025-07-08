<script setup lang="ts">
import CTA from '~/components/dynamic/CTA.vue'

const props = defineProps<{
  data: {
  title: string,
  subtitle: string,
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
  <section class="bg-[#f5f2e9] rounded-xl p-8 w-full mx-auto my-12 text-center">
    <h2 class="font-serif text-4xl font-medium tracking-tight text-[#2a2a22] sm:text-5xl max-w-[800px] mx-auto mb-4">{{ data.title }}</h2>
    <p class="text-lg text-[#5a5a52] mb-8">{{ data.subtitle }}</p>
    <CTA v-if="data.CTA" :button-name="data.CTA.buttonName" :link="data.CTA.link" />
  </section>
</template> 