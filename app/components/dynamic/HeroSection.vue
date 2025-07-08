<template>
  <section class="bg-[#f5f2e9] py-20 md:py-32">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid gap-12 lg:grid-cols-2 items-center">
        <!-- Texte à gauche -->
        <div class="space-y-6">
          <div class="space-y-4">
            <h1
              v-if="data.title"
              class="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-[#2a2a22]"
            >
              {{ data.title }}
            </h1>
            <p
              v-if="data.description"
              class="text-lg md:text-xl text-[#2a2a22] max-w-xl"
            >
              {{ data.description }}
            </p>
          </div>
          <div v-if="cta">
            <a
              :href="cta.link"
              class="inline-block bg-[#2a2a22] hover:bg-[#3a3a32] text-white px-6 py-3 text-base font-semibold transition-colors duration-200"
            >
              {{ cta.buttonName }}
            </a>
          </div>
        </div>

        <!-- Image à droite -->
        <div class="flex justify-center items-center">
          <div class="w-[400px] h-[400px] bg-[#eeeeee] rounded-lg overflow-hidden shadow-md">
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
