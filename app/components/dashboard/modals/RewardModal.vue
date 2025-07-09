<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Overlay avec effet blur -->
        <div 
          class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-500" 
          @click="closeModal"
        ></div>
        
        <!-- Modal Container -->
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 scale-90 translate-y-8"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-90 translate-y-8"
          >
            <div 
              v-if="isOpen" 
              class="relative w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-[#e6e2d7]"
              @click.stop
            >
              <!-- Décoration d'arrière-plan -->
              <div class="absolute inset-0 overflow-hidden">
                <div class="absolute -top-20 -right-20 w-40 h-40 bg-[#FFB6B0]/10 rounded-full blur-2xl animate-pulse"></div>
                <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-[#2a2a22]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>

              <!-- Canvas pour les confettis -->
              <canvas 
                ref="confettiCanvas"
                class="absolute inset-0 pointer-events-none z-10"
                :width="canvasSize.width"
                :height="canvasSize.height"
              ></canvas>
              
              <!-- Contenu de la modal -->
              <div class="relative z-20 p-8">
                <!-- Header avec fermeture -->
                <div class="absolute top-6 right-6">
                  <button 
                    @click="closeModal"
                    class="p-2 text-[#5a5a52] flex items-center cursor-pointer hover:text-[#2a2a22] rounded-full hover:bg-white/60 transition-all duration-200"
                  >
                    <Icon name="lucide:x" class="w-5 h-5" />
                  </button>
                </div>

                <!-- Icône de célébration centrale -->
                <div class="text-center mb-8">
                  <div class="relative inline-block">
                    <!-- Cercles animés autour de l'icône -->
                    <div class="absolute inset-0 animate-ping">
                      <div class="w-24 h-24 bg-[#FFB6B0]/20 rounded-full"></div>
                    </div>
                    <div class="absolute inset-2 animate-pulse delay-300">
                      <div class="w-20 h-20 bg-[#FFB6B0]/30 rounded-full"></div>
                    </div>
                    
                    <!-- Icône principale -->
                    <div class="relative w-24 h-24 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                      <Icon name="lucide:gift" class="w-12 h-12 text-white" />
                    </div>
                    
                    <!-- Étoiles décoratives -->
                    <div class="absolute -top-2 -right-2 text-yellow-400 animate-spin">
                      <Icon name="lucide:sparkles" class="w-6 h-6" />
                    </div>
                    <div class="absolute -bottom-2 -left-2 text-yellow-400 animate-spin delay-500">
                      <Icon name="lucide:star" class="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <!-- Titre et message -->
                <div class="text-center mb-8">
                  <h2 class="font-serif text-3xl font-bold text-[#2a2a22] mb-4">
                    🎉 Félicitations !
                  </h2>
                  <p class="text-lg text-[#5a5a52] max-w-sm mx-auto leading-relaxed">
                    Vous avez atteint <strong class="text-[#FFB6B0]">100 points</strong> ! 
                    Voici votre récompense exclusive
                  </p>
                </div>
                
                <!-- Carte code promo sophistiquée -->
                <div class="mb-8">
                  <div class="bg-gradient-to-r from-[#f9f7f2] via-white to-[#faf8f5] rounded-2xl p-6 border-2 border-dashed border-[#FFB6B0] shadow-lg relative overflow-hidden">
                    <!-- Décoration de la carte -->
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a]"></div>
                    <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff8e7a] to-[#FFB6B0]"></div>
                    
                    <div class="text-center">
                      <div class="flex items-center justify-center gap-2 mb-3">
                        <Icon name="lucide:ticket" class="h-5 w-5 text-[#FFB6B0]" />
                        <span class="text-sm font-semibold text-[#2a2a22] uppercase tracking-wider">Votre Code Promo</span>
                      </div>
                      
                      <!-- Code promo avec effet -->
                      <div class="bg-white rounded-xl p-4 border border-[#e6e2d7] shadow-md mb-4">
                        <div class="flex items-center justify-center gap-3">
                          <span class="font-mono text-2xl font-bold text-[#2a2a22] tracking-wider">
                            {{ promoCode }}
                          </span>
                          <button 
                            @click="copyPromoCode"
                            class="p-3 bg-gradient-to-r cursor-pointer from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl group"
                            :class="{ 'from-green-500 to-green-600': isCopied }"
                          >
                            <Icon 
                              :name="isCopied ? 'lucide:check' : 'lucide:copy'" 
                              class="w-5 h-5 group-hover:rotate-12 transition-transform" 
                            />
                          </button>
                        </div>
                        <p class="text-xs text-[#5a5a52] mt-2">
                          {{ isCopied ? '✓ Code copié dans le presse-papiers !' : 'Cliquez pour copier' }}
                        </p>
                      </div>

                      <!-- Valeur de la récompense -->
                      <div class="bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/20 rounded-xl p-3">
                        <span class="text-2xl font-bold text-[#2a2a22]">20€ de réduction</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Détails de la récompense -->
                <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#e6e2d7]/50 mb-8">
                  <h3 class="font-serif text-lg font-bold text-[#2a2a22] mb-4 flex items-center gap-2">
                    <Icon name="lucide:info" class="h-5 w-5 text-[#FFB6B0]" />
                    Conditions d'utilisation
                  </h3>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div class="flex items-center gap-2 text-[#5a5a52]">
                      <div class="w-2 h-2 bg-[#FFB6B0] rounded-full"></div>
                      <span><strong>Valeur :</strong> 20€</span>
                    </div>
                    <div class="flex items-center gap-2 text-[#5a5a52]">
                      <div class="w-2 h-2 bg-[#FFB6B0] rounded-full"></div>
                      <span><strong>Validité :</strong> 30 jours</span>
                    </div>
                    <div class="flex items-center gap-2 text-[#5a5a52]">
                      <div class="w-2 h-2 bg-[#FFB6B0] rounded-full"></div>
                      <span><strong>Usage :</strong> Toute commande</span>
                    </div>
                    <div class="flex items-center gap-2 text-[#5a5a52]">
                      <div class="w-2 h-2 bg-[#FFB6B0] rounded-full"></div>
                      <span><strong>Cumul :</strong> Possible</span>
                    </div>
                  </div>
                </div>
                
                <!-- Boutons d'action modernes -->
                <div class="flex gap-4">
                  <button 
                    @click="goToShopping"
                    class="flex-1 bg-gradient-to-r from-[#FFB6B0] cursor-pointer to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white rounded-2xl px-6 py-4 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
                  >
                    <span class="flex items-center justify-center gap-2">
                      <Icon name="lucide:shopping-bag" class="h-5 w-5 group-hover:rotate-12 transition-transform" />
                      Faire mes achats
                    </span>
                  </button>
                  <button 
                    @click="closeModal"
                    class="flex-1 border-2 border-[#2a2a22] cursor-pointer text-[#2a2a22] hover:bg-[#2a2a22] hover:text-white rounded-2xl px-6 py-4 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Plus tard
                  </button>
                </div>

                <!-- Message encourageant -->
                <div class="text-center mt-6 p-4 bg-gradient-to-r from-[#f9f7f2] to-[#faf8f5] rounded-2xl border border-[#e6e2d7]/50">
                  <p class="text-sm text-[#5a5a52] flex items-center justify-center gap-2">
                    <Icon name="lucide:sparkles" class="h-4 w-4 text-[#FFB6B0]" />
                    Continuez à gagner des points pour débloquer d'autres récompenses !
                  </p>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  promoCode: string
}

interface Emits {
  (e: 'close'): void
  (e: 'goToShopping'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const confettiCanvas = ref<HTMLCanvasElement | null>(null)
const isCopied = ref(false)
const canvasSize = reactive({ width: 500, height: 600 })

// Animation des confettis améliorée
const confetti: Array<{
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  shape: 'circle' | 'square' | 'triangle'
}> = []

const colors = ['#FFB6B0', '#ff8e7a', '#2a2a22', '#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#FF4500']

const createConfetti = () => {
  const shapes = ['circle', 'square', 'triangle'] as const
  
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvasSize.width,
      y: -20,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
      shape: shapes[Math.floor(Math.random() * shapes.length)]
    })
  }
}

const drawShape = (ctx: CanvasRenderingContext2D, particle: any) => {
  ctx.fillStyle = particle.color
  
  switch (particle.shape) {
    case 'circle':
      ctx.beginPath()
      ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
      ctx.fill()
      break
    case 'square':
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
      break
    case 'triangle':
      ctx.beginPath()
      ctx.moveTo(0, -particle.size / 2)
      ctx.lineTo(-particle.size / 2, particle.size / 2)
      ctx.lineTo(particle.size / 2, particle.size / 2)
      ctx.closePath()
      ctx.fill()
      break
  }
}

const animateConfetti = () => {
  const canvas = confettiCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = confetti.length - 1; i >= 0; i--) {
    const particle = confetti[i]
    
    // Mise à jour de la position
    particle.x += particle.vx
    particle.y += particle.vy
    particle.rotation += particle.rotationSpeed
    
    // Gravité et résistance de l'air
    particle.vy += 0.15
    particle.vx *= 0.995
    
    // Supprimer les particules qui sortent du canvas
    if (particle.y > canvas.height + 20 || particle.x < -20 || particle.x > canvas.width + 20) {
      confetti.splice(i, 1)
      continue
    }
    
    // Dessiner la particule
    ctx.save()
    ctx.translate(particle.x, particle.y)
    ctx.rotate(particle.rotation * Math.PI / 180)
    drawShape(ctx, particle)
    ctx.restore()
  }
  
  // Continuer l'animation s'il reste des particules
  if (confetti.length > 0) {
    requestAnimationFrame(animateConfetti)
  }
}

const startConfetti = () => {
  if (!confettiCanvas.value) return
  
  // Ajuster la taille du canvas
  const canvas = confettiCanvas.value
  const rect = canvas.getBoundingClientRect()
  canvasSize.width = rect.width
  canvasSize.height = rect.height
  
  createConfetti()
  animateConfetti()
}

const copyPromoCode = async () => {
  try {
    await navigator.clipboard.writeText(props.promoCode)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 3000)
  } catch (err) {
    console.error('Erreur lors de la copie:', err)
    // Fallback pour les navigateurs plus anciens
    const textArea = document.createElement('textarea')
    textArea.value = props.promoCode
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 3000)
  }
}

const closeModal = () => {
  emit('close')
}

const goToShopping = () => {
  emit('goToShopping')
}

// Lancer les confettis quand la modal s'ouvre
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    nextTick(() => {
      setTimeout(() => {
        startConfetti()
      }, 300) // Délai pour que l'animation d'ouverture soit terminée
    })
  } else {
    // Vider les confettis quand la modal se ferme
    confetti.length = 0
    isCopied.value = false
  }
})

// Fermer avec Escape
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeModal()
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
/* Animation de pulsation améliorée */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  40%, 43% {
    transform: translate3d(0, -20px, 0) scale(1.1);
  }
  70% {
    transform: translate3d(0, -10px, 0) scale(1.05);
  }
  90% {
    transform: translate3d(0, -4px, 0) scale(1.02);
  }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}

/* Animation de rotation pour les étoiles */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 3s linear infinite;
}

.delay-500 {
  animation-delay: 0.5s;
}

/* Effet de brillance sur le code promo */
.font-mono:hover {
  background: linear-gradient(45deg, transparent 30%, rgba(255, 182, 176, 0.3) 50%, transparent 70%);
  background-size: 200% 200%;
  animation: shimmer 1.5s ease-in-out;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>