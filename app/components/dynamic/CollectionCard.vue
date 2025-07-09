<template>
  <div class="collection-card" :style="{ animationDelay: `${index * 200}ms` }">
    <!-- Layout alternatif selon l'index -->
    <div 
      class="grid gap-12 lg:gap-16 items-center"
      :class="index % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'"
    >
      
      <!-- Image (à gauche pour pair, à droite pour impair) -->
      <div 
        class="relative group"
        :class="index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'"
      >
        <div class="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-[#f5f2e9] to-[#faf8f5] shadow-2xl border border-[#e6e2d7] transform group-hover:scale-[1.02] transition-all duration-500">
          <NuxtImg
            :src="props.image || '/placeholder.svg'"
            :alt="props.title"
            width="600"
            height="600"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <!-- Overlay gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-[#2a2a22]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <!-- Badge flottant -->
        <div class="absolute -top-4 -right-4 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white px-6 py-3 rounded-2xl font-semibold shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
          <Icon name="lucide:sparkles" class="h-4 w-4 inline mr-2" />
          Collection
        </div>
        
        <!-- Badge Made in France -->
        <div class="absolute -bottom-4 -left-4 bg-gradient-to-r from-[#0055A4] to-[#EF4135] text-white px-4 py-2 rounded-2xl font-semibold shadow-xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
          <Icon name="lucide:map-pin" class="h-4 w-4 inline mr-1" />
          Made in France 🇫🇷
        </div>
      </div>

      <!-- Contenu (à droite pour pair, à gauche pour impair) -->
      <div 
        class="space-y-8"
        :class="index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'"
      >
        
        <!-- Badge numéro -->
        <div class="inline-flex items-center bg-white/80 backdrop-blur-sm border border-[#e6e2d7] rounded-full px-4 py-2 shadow-lg">
          <span class="w-6 h-6 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
            {{ (index + 1).toString().padStart(2, '0') }}
          </span>
          <span class="text-sm font-medium text-[#2a2a22]">Collection</span>
        </div>

        <!-- Titre -->
        <h2 class="font-serif text-4xl md:text-5xl font-bold text-[#2a2a22] leading-tight">
          {{ props.title }}
        </h2>

        <!-- Description -->
        <p class="text-lg text-[#5a5a52] leading-relaxed max-w-2xl">
          {{ props.description }}
        </p>

        <!-- Caractéristiques -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#e6e2d7]">
            <div class="w-10 h-10 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-xl flex items-center justify-center">
              <Icon name="lucide:palette" class="h-5 w-5 text-white" />
            </div>
            <div>
              <div class="text-sm font-semibold text-[#2a2a22]">Fait main</div>
              <div class="text-xs text-[#5a5a52]">Artisanal</div>
            </div>
          </div>
          
          <div class="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#e6e2d7]">
            <div class="w-10 h-10 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-xl flex items-center justify-center">
              <Icon name="lucide:leaf" class="h-5 w-5 text-white" />
            </div>
            <div>
              <div class="text-sm font-semibold text-[#2a2a22]">Éco-responsable</div>
              <div class="text-xs text-[#5a5a52]">Durable</div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="pt-4">
          <CTA 
            button-name="Explorer la collection" 
            :link="`/shop?collection=${encodeURIComponent(props.title)}`" 
          />
        </div>

        <!-- Infos supplémentaires -->
        <div class="flex items-center gap-6 pt-4 text-sm text-[#5a5a52]">
          <div class="flex items-center gap-2">
            <Icon name="lucide:clock" class="h-4 w-4 text-[#FFB6B0]" />
            <span>Livraison 48h</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon name="lucide:shield-check" class="h-4 w-4 text-[#FFB6B0]" />
            <span>Garantie 2 ans</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CTA from '~/components/dynamic/CTA.vue'

const props = defineProps<{
    title: string,
    description: string,
    image?: string,
    link: string,
    index: number
}>()
</script>

<style scoped>
.collection-card {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 1024px) {
  .lg\:order-1 {
    order: 1;
  }
  
  .lg\:order-2 {
    order: 2;
  }
}
</style>