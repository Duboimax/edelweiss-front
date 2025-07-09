<template>
  <section class="py-12 md:py-16 bg-white rounded-3xl shadow-xl border border-[#f5f2e9] mx-auto max-w-5xl my-16">
    <div class="container mx-auto px-4 md:px-6">
      <div class="mx-auto max-w-4xl relative">
        <div class="aspect-[16/9] w-full bg-[#f5f2e9] flex items-center justify-center rounded-2xl border border-[#e6e2d7] shadow-sm relative overflow-hidden">
          <img
            src="/france-south.webp"
            alt="Carte de France"
            class="absolute inset-0 w-full h-full object-contain rounded-2xl pointer-events-none"
          />
          <!-- Marker Nord-Ouest de la France -->
          <div class="absolute" style="left:16%;top:18%;">
            <div class="group relative flex flex-col items-center">
              <div class="w-5 h-5 bg-[#FFB6B0] rounded-full shadow-lg border-2 border-white animate-pulse"></div>
              <span class="opacity-0 group-hover:opacity-100 transition bg-[#2a2a22] text-white text-xs rounded px-2 py-1 mt-2 absolute z-10 whitespace-nowrap" style="bottom:-2.5rem;left:50%;transform:translateX(-50%);">
                Atelier Audelweiss
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Plus aucun import leaflet/vue3-leaflet
</script>

<style scoped>
section {
  background: #fff;
}
</style>