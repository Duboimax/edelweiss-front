<template>
  <section class="py-16 md:py-24 bg-[#e6e2d7]">
    <div class="container mx-auto px-4 md:px-6">
      <div class="mx-auto max-w-6xl">
        <div class="aspect-[16/9] w-full bg-[#f5f2e9] flex items-center justify-center">
          <p class="text-[#5a5a52]">Interactive map would be displayed here</p>
          <!-- In a real implementation, you would embed a Google Maps or other map service here -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  address?: string
  zoom?: number
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  address: '123 Artisan Street, 75001 Paris, France',
  zoom: 15,
  height: 'aspect-[16/9]'
})

</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>