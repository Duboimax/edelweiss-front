<script setup lang="ts">
const props = defineProps<{
  data: {
    artisanImage: {
      url: string
      alternativeText?: string
    }
    artisanName: string
    artisanRole: string
    description: string
  }
}>()
const { data } = props
</script>

<template>
  <section class="bg-white rounded-3xl py-8 px-6 max-w-3xl w-full mx-auto my-16 flex flex-col items-center shadow-xl border border-[#f5f2e9]">
    <h2 class="font-serif text-2xl md:text-3xl font-bold text-[#2a2a22] mb-8">
      Rencontrer Nos Artisans
    </h2>
    <div class="flex flex-col items-center gap-6">
      <div class="w-36 h-36 rounded-full overflow-hidden bg-[#f5f2e9] flex items-center justify-center shadow-md">
        <img
          :src="'https://edelweiss-back-production.up.railway.app' + data.artisanImage.url || '/placeholder.svg'"
          :alt="data.artisanName"
          class="object-cover w-full h-full"
        />
      </div>
      <div class="text-center mt-2">
        <div class="font-serif text-lg md:text-xl font-bold text-[#2a2a22] mb-1">
          {{ data.artisanName }}
        </div>
        <div class="text-base text-[#FFB6B0] mb-1 font-semibold">
          {{ data.artisanRole }}
        </div>
        <div class="text-sm text-[#5a5a52] max-w-md mx-auto mt-2">
          {{ data.description }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  background: #fff;
}
@media (max-width: 640px) {
  h2 {
    font-size: 1.25rem;
  }
  .text-lg, .text-xl {
    font-size: 1rem;
  }
  .text-base, .text-sm {
    font-size: 0.9rem;
  }
}
</style>