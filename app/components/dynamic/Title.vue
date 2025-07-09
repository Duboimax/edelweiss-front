<template>
  <section class="bg-white rounded-3xl py-12 md:py-16 shadow-xl border border-[#f5f2e9] max-w-5xl mx-auto">
    <div class="container mx-auto px-4 md:px-6 max-w-3xl">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 class="font-serif text-3xl md:text-4xl font-bold text-[#2a2a22]">
          {{ data.title }}
        </h1>
        <p class="text-base md:text-lg text-[#5a5a52] max-w-[700px]">
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

<style scoped>
section {
  background: #fff;
}
</style>
