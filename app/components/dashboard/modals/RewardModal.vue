<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black/50 transition-opacity" @click="closeModal"></div>
        
        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4"
          >
            <div 
              v-if="isOpen" 
              class="relative w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"
              @click.stop
            >
              <!-- Canvas pour les confettis -->
              <canvas 
                ref="confettiCanvas"
                class="absolute inset-0 pointer-events-none z-10"
                :width="canvasSize.width"
                :height="canvasSize.height"
              ></canvas>
              
              <!-- Contenu de la modal -->
              <div class="relative z-20 p-6 text-center">
                <!-- Icône de célébration -->
                <div class="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[#2a2a22] to-[#3a3a32] rounded-full flex items-center justify-center animate-bounce">
                  <Icon name="lucide:gift" class="w-8 h-8 text-white" />
                </div>
                
                <!-- Titre -->
                <h2 class="font-serif text-2xl font-bold text-[#2a2a22] mb-2">
                  🎉 Félicitations !
                </h2>
                
                <!-- Message -->
                <p class="text-[#5a5a52] mb-6">
                  Vous avez atteint 100 points ! Voici votre récompense exclusive :
                </p>
                
                <!-- Code promo -->
                <div class="bg-gradient-to-r from-[#f5f2e9] to-[#e6e2d7] p-4 rounded-lg mb-6 border-2 border-dashed border-[#2a2a22]">
                  <p class="text-sm text-[#5a5a52] mb-2">Votre code promo :</p>
                  <div class="flex items-center justify-center gap-2">
                    <span class="font-mono text-xl font-bold text-[#2a2a22] bg-white px-3 py-1 rounded border">
                      {{ promoCode }}
                    </span>
                    <button 
                      @click="copyPromoCode"
                      class="p-2 text-[#2a2a22] hover:bg-white rounded transition-colors"
                      :class="{ 'text-green-600': isCopied }"
                      :title="isCopied ? 'Copié !' : 'Copier le code'"
                    >
                      <Icon :name="isCopied ? 'lucide:check' : 'lucide:copy'" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <!-- Détails de la récompense -->
                <div class="bg-[#f5f2e9] p-4 rounded-lg mb-6">
                  <h3 class="font-medium text-[#2a2a22] mb-2">Détails de votre récompense :</h3>
                  <ul class="text-sm text-[#5a5a52] space-y-1">
                    <li>💰 Valeur : 20€ de réduction</li>
                    <li>⏰ Valable : 30 jours</li>
                    <li>🛒 Utilisable sur toute commande</li>
                    <li>🎁 Cumulable avec d'autres offres</li>
                  </ul>
                </div>
                
                <!-- Boutons d'action -->
                <div class="flex gap-3">
                  <button 
                    @click="goToShopping"
                    class="flex-1 bg-[#2a2a22] text-white py-3 px-4 rounded-none hover:bg-[#3a3a32] transition-colors font-medium"
                  >
                    Faire mes achats
                  </button>
                  <button 
                    @click="closeModal"
                    class="flex-1 border border-[#e6e2d7] text-[#2a2a22] py-3 px-4 rounded-none hover:bg-[#f5f2e9] transition-colors"
                  >
                    Plus tard
                  </button>
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
const canvasSize = reactive({ width: 400, height: 500 })

// Animation des confettis
const confetti: Array<{
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
}> = []

const colors = ['#2a2a22', '#3a3a32', '#f5f2e9', '#e6e2d7', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1']

const createConfetti = () => {
  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: Math.random() * canvasSize.width,
      y: -10,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    })
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
    
    // Gravité
    particle.vy += 0.1
    
    // Supprimer les particules qui sortent du canvas
    if (particle.y > canvas.height + 10) {
      confetti.splice(i, 1)
      continue
    }
    
    // Dessiner la particule
    ctx.save()
    ctx.translate(particle.x, particle.y)
    ctx.rotate(particle.rotation * Math.PI / 180)
    ctx.fillStyle = particle.color
    ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
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
    }, 2000)
  } catch (err) {
    console.error('Erreur lors de la copie:', err)
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
      startConfetti()
    })
  } else {
    // Vider les confettis quand la modal se ferme
    confetti.length = 0
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
/* Animation de pulsation pour l'icône */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -15px, 0);
  }
  70% {
    transform: translate3d(0, -7px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

.animate-bounce {
  animation: bounce 1.5s ease-in-out infinite;
}
</style>