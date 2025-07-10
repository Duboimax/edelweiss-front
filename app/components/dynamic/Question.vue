<template>
  <div 
    class="group bg-white/70 backdrop-blur-sm rounded-2xl border overflow-hidden transition-all duration-500 ease-out hover:shadow-xl"
    :class="isOpen 
      ? 'border-[#FFB6B0] shadow-2xl transform scale-[1.02] bg-gradient-to-br from-white/90 to-white/70' 
      : 'border-[#e6e2d7] shadow-lg hover:border-[#FFB6B0]/50 hover:shadow-xl'"
  >
    <!-- Header de la question -->
    <button
      @click="toggleAnswer"
      class="flex w-full items-center  cursor-pointer justify-between p-6 text-left transition-all duration-300"
      :class="isOpen ? 'pb-4' : 'pb-6'"
    >
      <!-- Contenu de la question -->
      <div class="flex items-center gap-4 flex-1">
        <!-- Icône décorative -->
        <div 
          class="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md"
          :class="isOpen 
            ? 'bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white scale-110' 
            : 'bg-white border-2 border-[#e6e2d7] text-[#5a5a52] group-hover:border-[#FFB6B0] group-hover:text-[#FFB6B0] group-hover:scale-105'"
        >
          <Icon name="lucide:help-circle" class="h-5 w-5 transition-transform duration-300" />
        </div>
        
        <!-- Titre de la question -->
        <h3 
          class="font-serif text-lg md:text-xl font-bold transition-all duration-300 flex-1"
          :class="isOpen 
            ? 'text-[#2a2a22] transform translate-x-1' 
            : 'text-[#2a2a22] group-hover:text-[#FFB6B0] group-hover:transform group-hover:translate-x-1'"
        >
          {{ title }}
        </h3>
      </div>
      
      <!-- Bouton toggle -->
      <div 
        class="ml-4 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500 shadow-md"
        :class="isOpen 
          ? 'bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white rotate-180 scale-110' 
          : 'bg-gradient-to-r from-[#f5f2e9] to-[#e6e2d7] text-[#5a5a52] group-hover:from-[#FFB6B0] group-hover:to-[#ff8e7a] group-hover:text-white group-hover:scale-105'"
      >
        <Icon 
          name="lucide:chevron-down" 
          class="h-5 w-5 transition-transform duration-500"
        />
      </div>
    </button>
    
    <!-- Contenu de la réponse avec transition fluide -->
    <Transition
      enter-active-class="transition-all duration-700 ease-out"
      enter-from-class="opacity-0 max-h-0 transform translate-y-4"
      enter-to-class="opacity-100 max-h-96 transform translate-y-0"
      leave-active-class="transition-all duration-400 ease-in"
      leave-from-class="opacity-100 max-h-96 transform translate-y-0"
      leave-to-class="opacity-0 max-h-0 transform translate-y-4"
    >
      <div v-if="isOpen" class="overflow-hidden">
        <div class="px-6 pb-6">
          <!-- Séparateur décoratif -->
          <div class="relative mb-6">
            <div class="h-px bg-gradient-to-r from-[#FFB6B0] via-[#ff8e7a] to-transparent"></div>
            <div class="absolute left-0 top-0 w-8 h-px bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] animate-pulse"></div>
          </div>
          
          <!-- Réponse avec style -->
          <div class="relative">
            <!-- Icône de citation décorative -->
            <div class="absolute -left-2 -top-2 text-[#FFB6B0]/30">
              <Icon name="lucide:quote" class="h-6 w-6" />
            </div>
            
            <!-- Texte de la réponse -->
            <p class="text-[#5a5a52] leading-relaxed text-base md:text-lg pl-6 animate-fade-in">
              {{ answer }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  answer: string
  defaultOpen?: boolean
}

const props = defineProps<Props>()

const isOpen = ref(props.defaultOpen || false)

const toggleAnswer = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
@keyframes fade-in {
  from { 
    opacity: 0; 
    transform: translateY(10px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

/* Effet de hover personnalisé */
.group:hover .h-10 {
  box-shadow: 0 8px 25px rgba(255, 182, 176, 0.2);
}

/* Animation de pulsation pour le séparateur */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scaleX(1);
  }
  50% {
    opacity: 0.7;
    transform: scaleX(1.1);
  }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
</style>