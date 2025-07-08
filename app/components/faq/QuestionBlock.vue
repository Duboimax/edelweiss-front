<template>
  <section class="py-16 md:py-24 bg-[#f9f7f2]">
    <div class="container mx-auto px-4 md:px-6">
      <div class="mx-auto max-w-4xl space-y-8">
        <div class="text-center">
          <h2 class="font-serif text-3xl font-medium text-[#2a2a22]">
            {{ title }}
          </h2>
          <p class="mt-2 text-[#5a5a52]">
            {{ subtitle }}
          </p>
        </div>
        <div class="space-y-4">
          <Question
            v-for="faq in faqs"
            :key="faq.id"
            :question="faq.question"
            :answer="faq.answer"
            :default-open="faq.defaultOpen"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import Question from '~/components/faq/Question.vue'

interface FaqData {
  id: number
  question: string
  answer: string
  defaultOpen?: boolean
}

interface Props {
  title?: string
  subtitle?: string
  faqs: FaqData[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Frequently Asked Questions',
  subtitle: 'Find answers to common questions about our products and services.'
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>