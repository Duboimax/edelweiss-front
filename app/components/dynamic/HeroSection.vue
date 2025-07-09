<template>
  <section class="relative overflow-hidden my-16 md:my-24">
    <!-- Arrière-plan avec dégradés animés -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FFB6B0]/15 to-[#ff8e7a]/8 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#2a2a22]/8 to-[#3a3a32]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#FFB6B0]/8 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- Contenu principal -->
    <div class="relative bg-white/80 backdrop-blur-sm rounded-3xl py-16 md:py-24 shadow-2xl border border-[#e6e2d7] mx-auto max-w-7xl">
      <div class="container mx-auto px-4 md:px-6">
        <div class="grid gap-12 lg:grid-cols-2 items-center">
          
          <!-- Texte à gauche -->
          <div class="space-y-8">
            <!-- Badge décoratif -->
            <div class="inline-flex items-center bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/10 border border-[#FFB6B0]/30 rounded-full px-4 py-2 mb-2">
              <div class="w-2 h-2 bg-[#FFB6B0] rounded-full mr-2 animate-pulse"></div>
              <span class="text-sm font-medium text-[#2a2a22]">Notre histoire</span>
            </div>

            <div class="space-y-6">
              <h1
                v-if="data.title"
                class="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a2a22] leading-tight"
              >
                <span class="relative inline-block">
                  {{ data.title }}
                  <div class="absolute -bottom-3 left-0 w-full h-4 bg-gradient-to-r from-[#FFB6B0]/30 to-[#ff8e7a]/20 transform -rotate-1 rounded-full"></div>
                </span>
              </h1>
              
              <p
                v-if="data.description"
                class="text-lg md:text-xl text-[#5a5a52] leading-relaxed max-w-2xl"
              >
                {{ data.description }}
              </p>
            </div>

            <!-- Bouton CTA amélioré -->
            <div v-if="cta" class="pt-4">
              <a
                :href="cta.link"
                class="group inline-flex items-center bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] hover:from-[#3a3a32] hover:to-[#4a4a42] text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span>{{ cta.buttonName }}</span>
                <svg 
                  class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>

            <!-- Éléments décoratifs -->
            <div class="flex items-center space-x-8 pt-8">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center mr-3">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-semibold text-[#2a2a22]">Authentique</div>
                  <div class="text-xs text-[#5a5a52]">Fait main</div>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center mr-3">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-semibold text-[#2a2a22]">Passionné</div>
                  <div class="text-xs text-[#5a5a52]">Depuis 2020</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Image à droite avec effets -->
          <div class="flex justify-center items-center relative">
            <!-- Cercles décoratifs -->
            <div class="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/10 rounded-full blur-sm"></div>
            <div class="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-r from-[#2a2a22]/10 to-[#3a3a32]/5 rounded-full blur-sm"></div>
            
            <!-- Conteneur image principal -->
            <div class="relative group">
              <div class="w-[380px] h-[380px] bg-gradient-to-br from-[#f5f2e9] to-[#faf8f5] rounded-3xl overflow-hidden shadow-2xl border border-[#e6e2d7] transform group-hover:scale-105 transition-all duration-500">
                <!-- Overlay gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-[#2a2a22]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                
                <img
                  v-if="data.image?.url"
                  :src="'https://edelweiss-back-production.up.railway.app' + data.image.url"
                  :alt="data.image.alternativeText || 'Hero Image'"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                <!-- Placeholder si pas d'image -->
                <div v-else class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-16 h-16 text-[#FFB6B0] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-[#5a5a52] font-medium">Image à venir</p>
                  </div>
                </div>
              </div>
              
              <!-- Badge flottant -->
              <div class="absolute -top-6 -left-6 bg-white rounded-full p-4 shadow-lg border border-[#e6e2d7] transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                <svg class="w-6 h-6 text-[#FFB6B0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
            </div>
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

<style scoped>
/* Animations personnalisées */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Responsive design */
@media (max-width: 640px) {
  h1 {
    font-size: 1.875rem;
    line-height: 1.2;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.6;
  }
  
  .w-[380px] {
    width: 280px;
  }
  
  .h-[380px] {
    height: 280px;
  }
}

@media (max-width: 768px) {
  .w-[380px] {
    width: 320px;
  }
  
  .h-[380px] {
    height: 320px;
  }
}

/* Smooth scrolling pour les ancres */
html {
  scroll-behavior: smooth;
}
</style>