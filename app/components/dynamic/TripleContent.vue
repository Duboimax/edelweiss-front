<script setup lang="ts">
import CTA from '~/components/dynamic/CTA.vue'

const props = defineProps<{
  data: {
  title: string,
  subtitle: string,
  title1: string,
  content1: string,
  title2: string,
  content2: string,
  title3: string,
  content3: string,
  buttonName: string,
  link: string,
  };
}>()

const { data } = props


</script>

<template>
  <section class="bg-[#f5f2e9] rounded-xl p-8 max-w-5xl mx-auto my-12 shadow-lg">
    <div class="mb-6 text-center">
      <h2 class="font-serif text-4xl font-bold text-[#2a2a22]">{{ data.title }}</h2>
      <p class="text-lg text-[#5a5a52] mt-2">{{ data.subtitle }}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div>
        <h3 class="font-serif text-2xl text-[#2a2a22] mb-2">{{ data.title1 }}</h3>
        <p class="text-[#5a5a52]">{{ data.content1 }}</p>
      </div>
      <div>
        <h3 class="font-serif text-2xl text-[#2a2a22] mb-2">{{ data.title2 }}</h3>
        <p class="text-[#5a5a52]">{{ data.content2 }}</p>
      </div>
      <div>
        <h3 class="font-serif text-2xl text-[#2a2a22] mb-2">{{ data.title3 }}</h3>
        <p class="text-[#5a5a52]">{{ data.content3 }}</p>
      </div>
    </div>
  </section>
</template> 