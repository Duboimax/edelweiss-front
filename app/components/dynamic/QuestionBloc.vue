<template>
  <section class="py-12 md:py-16 bg-white rounded-3xl shadow-xl border border-[#f5f2e9] mx-auto max-w-5xl my-16">
    <div class="container mx-auto px-4 md:px-6">
      <div class="mx-auto max-w-3xl space-y-8">
        <div class="text-center">
          <h2 class="font-serif text-2xl md:text-3xl font-medium text-[#2a2a22]">
            {{ title }}
          </h2>
          <p v-if="subtitle" class="mt-2 text-[#5a5a52] text-base md:text-lg">
            {{ subtitle }}
          </p>
        </div>
        <div class="space-y-4">
          <Question
            v-for="(faq, i) in questions"
            :key="i"
            :title="faq.question"
            :answer="faq.answer"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Question from '~/components/dynamic/Question.vue'

interface FaqData {
  question: string
  answer: string
}

interface Props {
  title?: string
  subtitle?: string
  questions: FaqData[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Frequently Asked Questions',
  subtitle: '',
})

const questions = props.questions
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
