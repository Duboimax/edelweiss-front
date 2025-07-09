<template>
  <section class="bg-white rounded-3xl py-16 md:py-24 shadow-xl border border-[#f5f2e9] mx-auto max-w-7xl my-16">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid gap-12 lg:grid-cols-2 items-center">
        <!-- Texte à gauche -->
        <div class="space-y-6">
          <div class="space-y-4">
            <h1
              v-if="data.title"
              class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2a2a22]"
            >
              {{ data.title }}
            </h1>
            <p
              v-if="data.description"
              class="text-base md:text-lg text-[#5a5a52] max-w-xl"
            >
              {{ data.description }}
            </p>
          </div>
          <div v-if="cta">
            <a
              :href="cta.link"
              class="inline-block bg-[#FFB6B0] hover:bg-[#ff8e7a] text-white px-8 py-3 text-lg font-semibold rounded-full shadow transition-colors duration-200"
            >
              {{ cta.buttonName }}
            </a>
          </div>
        </div>
        <!-- Image à droite -->
        <div class="flex justify-center items-center">
          <div class="w-[320px] h-[320px] bg-[#f5f2e9] rounded-2xl overflow-hidden shadow-md">
            <img
              v-if="data.image?.url"
              :src="'https://edelweiss-back-production.up.railway.app' + data.image.url"
              :alt="data.image.alternativeText || 'Hero Image'"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  data: {
    title?: string
    description?: string
    image?: {
      url: string
      alternativeText?: string
    }
    CTA?: {
      id: number
      buttonName: string
      link: string
    }[]
  }
}>()
const { data } = props
const cta = data.CTA?.[0]
</script>

<style scoped>
section {
  background: #fff;
}
@media (max-width: 640px) {
  h1 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
  }
}
</style>
