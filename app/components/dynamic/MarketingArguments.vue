<template>
  <section class="py-16 md:py-24 bg-[#f5f2e9]">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex flex-col items-center justify-center space-y-8 text-center">
        <h2 class="font-serif text-4xl font-medium tracking-tight text-[#2a2a22] sm:text-5xl">
          {{ title }}
        </h2>
        <div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-3">
          <HomeItem
            v-for="item in homeItems"
            :key="item.id"
            :number="item.number"
            :title="item.title"
            :information="item.information" 
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import HomeItem from '~/components/dynamic/HomeItem.vue'

interface HomeItemData {
  id: number
  number: string
  title: string
  information: string
}

const props = defineProps<{
  title: string
  homeItems: HomeItemData[]
}>()
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>