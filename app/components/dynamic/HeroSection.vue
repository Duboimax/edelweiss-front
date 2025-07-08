<template>
  <section class="bg-[#f5f2e9] py-20 md:py-32">
    <div class="container px-4 md:px-6 ml-20">
      <div class="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div class="flex flex-col justify-center space-y-6">
          <div class="space-y-4">
            <h1
              v-if="data.title"
              class="font-serif text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl text-[#2a2a22]"
            >
              {{ data.title }}
            </h1>
            <p
              v-if="data.description"
              class="text-lg text-[#2a2a22] md:text-xl max-w-[500px]"
            >
              {{ data.description }}
            </p>
          </div>
          <div v-if="cta">
            <a
              :href="cta.link"
              class="bg-[#2a2a22] hover:bg-[#3a3a32] text-white rounded-none px-8 py-3 text-lg font-medium transition-colors duration-200"
            >
              {{ cta.buttonName }}
            </a>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <img
            v-if="data.image?.url"
            :src="data.image.url"
            :alt="data.image.alternativeText || 'Hero Image'"
            class="w-full h-auto rounded-lg shadow-lg object-cover"
          />
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
