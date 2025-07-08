<script setup lang="ts">
import CTA from '~/components/buttons/CTA.vue'

const props = defineProps<{
  title: string,
  subtitle: string,
  buttonName: string,
  link: string,
}>()
</script>

<template>
  <section class="bg-[#f5f2e9] rounded-xl p-8 w-full mx-auto my-12 text-center">
    <h2 class="font-serif text-4xl font-medium tracking-tight text-[#2a2a22] sm:text-5xl max-w-[800px] mx-auto mb-4">{{ props.title }}</h2>
    <p class="text-lg text-[#5a5a52] mb-8">{{ props.subtitle }}</p>
    <CTA :button-name="props.buttonName" :link="props.link" />
  </section>
</template> 