<template>
  <section class="bg-[#f5f2e9] py-16 md:py-24">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 class="font-serif text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl text-[#2a2a22]">
          {{ data.title }}
        </h1>
        <p class="text-lg text-[#5a5a52] md:text-xl max-w-[700px]">
          {{ data.subtitle }}
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  data: {
    title?: string
    subtitle?: string
  }
}>()

const { data } = props

console.log('Title component data:', data)
</script>
