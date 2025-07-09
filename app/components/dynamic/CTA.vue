<template>
  <NuxtLink :to="props.link" class="inline-block">
    <button class="group relative bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] hover:from-[#3a3a32] hover:to-[#4a4a42] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden">
      
      <!-- Effet de brillance animé -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      
      <!-- Contenu du bouton -->
      <div class="relative flex items-center gap-3">
        <Icon name="lucide:arrow-right" class="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        <span>{{ props.buttonName }}</span>
        <Icon name="lucide:sparkles" class="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <!-- Border animé -->
      <div class="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style="mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask-composite: subtract;"></div>
    </button>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
    buttonName: string,
    link: string
}>()
</script>

<style scoped>
/* Animation pour l'effet de brillance */
@keyframes shine {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

/* Focus states pour l'accessibilité */
button:focus-visible {
  outline: 2px solid #FFB6B0;
  outline-offset: 2px;
}

/* Animation bounce subtile */
button:active {
  transform: scale(0.98);
}

/* Glow effect au survol */
button:hover {
  box-shadow: 
    0 10px 25px rgba(42, 42, 34, 0.3),
    0 0 0 1px rgba(255, 182, 176, 0.2),
    0 0 20px rgba(255, 182, 176, 0.1);
}
</style>