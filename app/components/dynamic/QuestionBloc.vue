<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl py-16 md:py-24 shadow-2xl border border-[#e6e2d7] mx-auto max-w-6xl my-16">
    <!-- Décoration d'arrière-plan sophistiquée -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-20 -right-20 w-40 h-40 bg-[#FFB6B0]/8 rounded-full blur-2xl animate-pulse"></div>
      <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-[#2a2a22]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-[#FFB6B0]/5 to-[#ff8e7a]/5 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-4 md:px-6 relative z-10">
      <div class="mx-auto max-w-4xl space-y-12">
        
        <!-- Header Section -->
        <div class="text-center space-y-6">
          <!-- Icône décorative -->
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full shadow-xl mb-6 animate-bounce">
            <Icon name="lucide:help-circle" class="h-8 w-8 text-white" />
          </div>
          
          <!-- Titre principal -->
          <div class="space-y-4">
            <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a2a22] leading-tight">
              <span class="inline-block relative">
                {{ title }}
                <!-- Effet de soulignement décoratif -->
                <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full"></div>
              </span>
            </h2>
            
            <!-- Sous-titre -->
            <p v-if="subtitle" class="text-lg md:text-xl lg:text-2xl text-[#5a5a52] max-w-3xl mx-auto leading-relaxed font-light">
              {{ subtitle }}
            </p>
          </div>

          <!-- Statistiques de la FAQ -->
          <div class="flex items-center justify-center space-x-8 mt-8">
            <!-- Ligne décorative gauche -->
            <div class="hidden sm:block w-16 h-px bg-gradient-to-r from-transparent to-[#e6e2d7]"></div>
            
            <!-- Compteur de questions -->
            <div class="bg-white/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-[#e6e2d7] shadow-lg">
              <div class="flex items-center gap-3">
                <div class="h-8 w-8 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center">
                  <Icon name="lucide:message-circle" class="h-4 w-4 text-white" />
                </div>
                <span class="text-sm font-semibold text-[#2a2a22]">
                  {{ questions.length }} question{{ questions.length > 1 ? 's' : '' }}
                </span>
              </div>
            </div>
            
            <!-- Ligne décorative droite -->
            <div class="hidden sm:block w-16 h-px bg-gradient-to-l from-transparent to-[#e6e2d7]"></div>
          </div>
        </div>
        
        <!-- Questions Container -->
        <div class="space-y-6">
          <!-- Boucle des questions avec animation décalée -->
          <Question
            v-for="(faq, index) in questions"
            :key="index"
            :title="faq.question"
            :answer="faq.answer"
            :default-open="index === 0"
            :style="{ 
              animationDelay: `${index * 100}ms`,
              '--index': index 
            }"
            class="animate-slide-up"
          />
        </div>

        <!-- Section d'aide supplémentaire -->
        <div class="mt-16 text-center">
          <div class="bg-gradient-to-r from-[#f9f7f2] via-white to-[#faf8f5] rounded-3xl p-8 border border-[#e6e2d7] shadow-xl">
            <div class="space-y-4">
              <div class="flex items-center justify-center gap-3 mb-4">
                <div class="h-10 w-10 bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] rounded-full flex items-center justify-center">
                  <Icon name="lucide:headphones" class="h-5 w-5 text-white" />
                </div>
                <h3 class="font-serif text-xl font-bold text-[#2a2a22]">Besoin d'aide supplémentaire ?</h3>
              </div>
              
              <p class="text-[#5a5a52] mb-6 max-w-lg mx-auto">
                Vous ne trouvez pas la réponse à votre question ? Notre équipe est là pour vous aider.
              </p>
              
              <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <a 
                  href="/contact"
                  class="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <Icon name="lucide:message-circle" class="h-4 w-4" />
                  Nous contacter
                </a>
                
                <a 
                  href="mailto:hello@audelweiss.com"
                  class="inline-flex items-center gap-2 border-2 border-[#2a2a22] text-[#2a2a22] hover:bg-[#2a2a22] hover:text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <Icon name="lucide:mail" class="h-4 w-4" />
                  hello@audelweiss.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Effet de brillance animé -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent transform rotate-12 scale-150 animate-shine"></div>
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
  title: 'Questions Fréquentes',
  subtitle: 'Trouvez rapidement les réponses à vos questions les plus courantes',
})

const { title, subtitle, questions } = props
</script>

<style scoped>
/* Animation de brillance */
@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(12deg) scale(1.5);
    opacity: 0;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(12deg) scale(1.5);
    opacity: 0;
  }
}

.animate-shine {
  animation: shine 4s ease-in-out infinite;
}

/* Animation de slide-up pour les questions */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
  opacity: 0;
}

/* Animation de bounce améliorée */
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

/* Animation de pulsation pour les éléments d'arrière-plan */
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
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.delay-1000 {
  animation-delay: 1s;
}

/* Responsive typography */
@media (max-width: 640px) {
  h2 {
    font-size: 2rem;
    line-height: 1.2;
  }
}
</style>