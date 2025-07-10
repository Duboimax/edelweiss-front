<template>
  <section class="relative overflow-hidden backdrop-blur-sm rounded-3xl py-16 md:py-24 max-w-6xl mx-auto">
    <!-- Décoration d'arrière-plan sophistiquée -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-20 -right-20 w-40 h-40 bg-[#FFB6B0]/8 rounded-full blur-2xl animate-pulse"></div>
      <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-[#2a2a22]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-[#FFB6B0]/5 to-[#ff8e7a]/5 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
      <div class="flex flex-col items-center justify-center space-y-8 text-center">
        
        <!-- Icône décorative optionnelle -->
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full shadow-xl mb-4 animate-bounce">
          <Icon name="lucide:sparkles" class="h-8 w-8 text-white" />
        </div>

        <!-- Titre principal avec effet spectaculaire -->
        <div class="space-y-4">
          <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a2a22] leading-tight">
            <span class="inline-block relative">
              {{ data.title }}
              <!-- Effet de soulignement décoratif -->
              <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full"></div>
            </span>
          </h1>
          
          <!-- Sous-titre élégant -->
          <p class="text-lg md:text-xl lg:text-2xl text-[#5a5a52] max-w-4xl mx-auto leading-relaxed font-light">
            {{ data.subtitle }}
          </p>
        </div>

        <!-- Éléments décoratifs -->
        <div class="flex items-center justify-center space-x-8 mt-8">
          <!-- Ligne décorative gauche -->
          <div class="hidden sm:block w-16 h-px bg-gradient-to-r from-transparent to-[#e6e2d7]"></div>
          
          <!-- Ornement central -->
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-[#FFB6B0] rounded-full animate-pulse"></div>
            <div class="w-3 h-3 bg-[#ff8e7a] rounded-full animate-pulse delay-300"></div>
            <div class="w-2 h-2 bg-[#FFB6B0] rounded-full animate-pulse delay-700"></div>
          </div>
          
          <!-- Ligne décorative droite -->
          <div class="hidden sm:block w-16 h-px bg-gradient-to-l from-transparent to-[#e6e2d7]"></div>
        </div>
      </div>
    </div>

    <!-- Effet de brillance animé -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent transform rotate-12 scale-150 animate-shine"></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  data: {
    title?: string
    subtitle?: string
  }
}>()

const { data } = props

console.log('Title component data:', data)
</script>

<style scoped>
/* Animation de brillance */
@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(12deg) scale(1.5);
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(12deg) scale(1.5);
    opacity: 0;
  }
}

.animate-shine {
  animation: shine 3s ease-in-out infinite;
}

/* Animation de pulsation personnalisée */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Effet de bounce amélioré */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  40%, 43% {
    transform: translate3d(0, -10px, 0) scale(1.05);
  }
  70% {
    transform: translate3d(0, -5px, 0) scale(1.02);
  }
  90% {
    transform: translate3d(0, -2px, 0) scale(1.01);
  }
}

.animate-bounce {
  animation: bounce 3s ease-in-out infinite;
}

/* Délais pour les animations */
.delay-300 {
  animation-delay: 0.3s;
}

.delay-700 {
  animation-delay: 0.7s;
}

.delay-1000 {
  animation-delay: 1s;
}

/* Responsive typography */
@media (max-width: 640px) {
  h1 {
    font-size: 2rem;
    line-height: 1.2;
  }
  
  p {
    font-size: 1rem;
  }
}
</style>