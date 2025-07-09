<template>
  <div class="p-8 space-y-8">
    <!-- Header Section avec effet glassmorphism -->
    <div class="relative overflow-hidden bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-sm rounded-3xl p-8 border border-[#e6e2d7]/50">
      <!-- Décoration subtile -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-[#FFB6B0]/10 rounded-full blur-2xl"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-[#2a2a22]/5 rounded-full blur-xl"></div>
      
      <div class="relative z-10 flex items-center justify-between">
        <div>
          <h1 class="font-serif text-4xl font-bold text-[#2a2a22] mb-3">Programme de Fidélité</h1>
          <p class="text-lg text-[#5a5a52] max-w-lg">
            Gagnez des points à chaque commande et débloquez des récompenses exclusives
          </p>
        </div>
        <div class="hidden md:flex items-center space-x-4">
          <div class="h-20 w-20 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-xl">
            <Icon name="lucide:star" class="h-10 w-10 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- États de chargement et erreur -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FFB6B0] mb-6"></div>
      <p class="text-lg text-[#5a5a52] font-medium">Chargement de vos points...</p>
    </div>

    <div v-else-if="error" class="bg-red-50/80 backdrop-blur-sm rounded-3xl p-8 border border-red-200 text-center">
      <Icon name="lucide:alert-circle" class="h-16 w-16 text-red-500 mx-auto mb-4" />
      <h3 class="text-xl font-bold text-red-700 mb-2">Erreur de chargement</h3>
      <p class="text-red-600 mb-6">{{ error }}</p>
      <button 
        @click="initializeLoyaltyData"
        class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-medium transition-colors cursor-pointer"
      >
        Réessayer
      </button>
    </div>

    <!-- Contenu principal -->
    <div v-else>
      <!-- Modal de récompense -->
      <RewardModal 
        :is-open="showRewardModal"
        :promo-code="currentPromoCode"
        @close="showRewardModal = false"
        @go-to-shopping="goToShopping"
      />

      <!-- Barre de progression principale -->
      <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-[#e6e2d7] shadow-xl">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <div class="h-16 w-16 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-lg">
              <Icon name="lucide:gift" class="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 class="font-serif text-2xl font-bold text-[#2a2a22]">Vos Points de Fidélité</h2>
              <p class="text-[#5a5a52]">{{ loyaltyPoints }}/100 points pour votre prochaine récompense</p>
            </div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-[#2a2a22] mb-1">{{ loyaltyPoints }}</div>
            <div class="text-sm text-[#5a5a52] font-medium">Points</div>
          </div>
        </div>
        
        <!-- Barre de progression moderne -->
        <div class="relative mb-8">
          <div class="w-full bg-gradient-to-r from-[#f5f2e9] to-[#e6e2d7] rounded-full h-6 overflow-hidden shadow-inner">
            <div 
              class="bg-gradient-to-r from-[#FFB6B0] via-[#ff8e7a] to-[#ff6b5a] h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              :style="{ width: `${progressPercentage}%` }"
            >
              <!-- Effet de brillance animé -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              <!-- Effet de vague -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 animate-bounce"></div>
            </div>
          </div>
          
          <!-- Indicateurs de progression avec animations -->
          <div class="flex justify-between mt-4">
            <div v-for="milestone in [0, 25, 50, 75, 100]" :key="milestone" class="relative">
              <div 
                class="w-3 h-3 rounded-full border-2 transition-all duration-500"
                :class="loyaltyPoints >= milestone 
                  ? 'bg-[#FFB6B0] border-[#ff8e7a] shadow-lg scale-125' 
                  : 'bg-white border-[#e6e2d7]'"
              ></div>
              <span class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-[#5a5a52] font-medium">
                {{ milestone }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Message de progression avec animation -->
        <div class="text-center">
          <div v-if="loyaltyPoints < 100" class="bg-gradient-to-r from-[#f9f7f2] to-[#faf8f5] rounded-2xl p-6 border border-[#e6e2d7]/50">
            <h3 class="font-serif text-xl font-bold text-[#2a2a22] mb-2">
              Presque y êtes ! 🎯
            </h3>
            <p class="text-[#5a5a52] mb-4">
              Il vous reste <strong class="text-[#FFB6B0] text-xl">{{ remainingPoints }} points</strong> pour obtenir votre bon d'achat de 20€
            </p>
            <div class="flex items-center justify-center gap-2 text-sm text-[#5a5a52]">
              <Icon name="lucide:zap" class="h-4 w-4" />
              <span>1 point = 1€ dépensé</span>
            </div>
          </div>
          
          <div v-else class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <div class="flex items-center justify-center gap-3 mb-4">
              <div class="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <Icon name="lucide:party-popper" class="h-6 w-6 text-white" />
              </div>
              <h3 class="font-serif text-2xl font-bold text-green-700">
                Félicitations ! 🎉
              </h3>
            </div>
            <p class="text-green-600 font-medium mb-6">
              Vous avez gagné un bon d'achat de 20€ !
            </p>
            <button 
              @click="claimReward"
              :disabled="isClaimingReward"
              class="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 disabled:opacity-50 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
            >
              <span v-if="isClaimingReward" class="flex items-center gap-2">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Réclamation...
              </span>
              <span v-else class="flex items-center gap-2">
                <Icon name="lucide:gift" class="h-5 w-5" />
                Réclamer mon bon d'achat
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Grid de statistiques et informations -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        <!-- Statistiques détaillées -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Stats cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Points actuels -->
            <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#e6e2d7] shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div class="flex items-center justify-between mb-4">
                <div class="h-12 w-12 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Icon name="lucide:star" class="h-6 w-6 text-white" />
                </div>
                <div class="text-right">
                  <p class="text-sm text-[#5a5a52] font-medium">Points actuels</p>
                  <p class="text-3xl font-bold text-[#2a2a22]">{{ loyaltyPoints }}</p>
                </div>
              </div>
              <div class="h-2 bg-[#f5f2e9] rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full transition-all duration-1000"
                  :style="{ width: `${progressPercentage}%` }"
                ></div>
              </div>
            </div>

            <!-- Points mensuels -->
            <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#e6e2d7] shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div class="flex items-center justify-between mb-4">
                <div class="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Icon name="lucide:trending-up" class="h-6 w-6 text-white" />
                </div>
                <div class="text-right">
                  <p class="text-sm text-[#5a5a52] font-medium">Ce mois-ci</p>
                  <p class="text-3xl font-bold text-[#2a2a22]">{{ monthlyPoints }}</p>
                </div>
              </div>
              <p class="text-xs text-[#5a5a52]">Points gagnés</p>
            </div>

            <!-- Récompenses réclamées -->
            <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#e6e2d7] shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div class="flex items-center justify-between mb-4">
                <div class="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Icon name="lucide:gift" class="h-6 w-6 text-white" />
                </div>
                <div class="text-right">
                  <p class="text-sm text-[#5a5a52] font-medium">Récompenses</p>
                  <p class="text-3xl font-bold text-[#2a2a22]">{{ totalRewards }}</p>
                </div>
              </div>
              <p class="text-xs text-[#5a5a52]">Réclamées</p>
            </div>
          </div>

          <!-- Historique des récompenses -->
          <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-[#e6e2d7] shadow-xl">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] flex items-center justify-center">
                  <Icon name="lucide:history" class="h-5 w-5 text-white" />
                </div>
                <h3 class="font-serif text-xl font-bold text-[#2a2a22]">Historique des Récompenses</h3>
              </div>
            </div>
            
            <div v-if="rewardsHistory.length > 0" class="space-y-4">
              <div 
                v-for="reward in rewardsHistory" 
                :key="reward.id"
                class="flex items-center justify-between p-4 bg-gradient-to-r from-[#f9f7f2] to-[#faf8f5] rounded-2xl border border-[#e6e2d7]/50 hover:shadow-lg transition-all duration-300"
              >
                <div class="flex items-center gap-4">
                  <div class="h-12 w-12 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-lg">
                    <Icon name="lucide:gift" class="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p class="font-semibold text-[#2a2a22]">{{ reward.title }}</p>
                    <p class="text-sm text-[#5a5a52] flex items-center gap-1">
                      <Icon name="lucide:calendar" class="h-4 w-4" />
                      {{ reward.date }}
                    </p>
                    <p v-if="reward.code" class="text-xs font-mono bg-[#2a2a22] text-white px-2 py-1 rounded mt-1 inline-block">
                      {{ reward.code }}
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-bold text-[#2a2a22] text-lg">{{ reward.value }}</p>
                  <p class="text-xs text-[#5a5a52]">{{ reward.status }}</p>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-12">
              <div class="h-16 w-16 bg-[#f5f2e9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="lucide:gift" class="h-8 w-8 text-[#5a5a52]" />
              </div>
              <h4 class="font-serif text-lg font-bold text-[#2a2a22] mb-2">Aucune récompense réclamée</h4>
              <p class="text-[#5a5a52]">Continuez à gagner des points pour débloquer vos premières récompenses !</p>
            </div>
          </div>
        </div>

        <!-- Sidebar comment ça marche -->
        <div class="space-y-6">
          <!-- Comment ça marche -->
          <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#e6e2d7] shadow-xl">
            <div class="flex items-center gap-3 mb-6">
              <div class="h-10 w-10 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center">
                <Icon name="lucide:help-circle" class="h-5 w-5 text-white" />
              </div>
              <h3 class="font-serif text-xl font-bold text-[#2a2a22]">Comment ça marche ?</h3>
            </div>
            
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="h-10 w-10 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">1</div>
                <div>
                  <h4 class="font-semibold text-[#2a2a22] mb-2 flex items-center gap-2">
                    <Icon name="lucide:shopping-cart" class="h-4 w-4" />
                    Gagnez des points
                  </h4>
                  <p class="text-sm text-[#5a5a52]">1 point = 1€ dépensé sur toutes vos commandes</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="h-10 w-10 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">2</div>
                <div>
                  <h4 class="font-semibold text-[#2a2a22] mb-2 flex items-center gap-2">
                    <Icon name="lucide:target" class="h-4 w-4" />
                    Atteignez 100 points
                  </h4>
                  <p class="text-sm text-[#5a5a52]">Accumulez 100 points pour débloquer votre récompense</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="h-10 w-10 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">3</div>
                <div>
                  <h4 class="font-semibold text-[#2a2a22] mb-2 flex items-center gap-2">
                    <Icon name="lucide:gift" class="h-4 w-4" />
                    Réclamez votre bon
                  </h4>
                  <p class="text-sm text-[#5a5a52]">Obtenez un bon d'achat de 20€ à utiliser immédiatement</p>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-[#e6e2d7]">
              <div class="bg-gradient-to-r from-[#f9f7f2] to-[#faf8f5] rounded-2xl p-4">
                <div class="flex items-center gap-2 mb-2">
                  <Icon name="lucide:sparkles" class="h-4 w-4 text-[#FFB6B0]" />
                  <span class="text-sm font-semibold text-[#2a2a22]">Astuce</span>
                </div>
                <p class="text-xs text-[#5a5a52]">
                  Plus vous commandez, plus vous gagnez de points rapidement !
                </p>
              </div>
            </div>
          </div>

          <!-- Actions rapides -->
          <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#e6e2d7] shadow-xl">
            <h3 class="font-serif text-lg font-bold text-[#2a2a22] mb-4 flex items-center gap-2">
              <Icon name="lucide:zap" class="h-5 w-5" />
              Actions Rapides
            </h3>
            
            <div class="space-y-3">
              <button 
                @click="goToShopping"
                class="w-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white rounded-2xl px-4 py-3 font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer group"
              >
                <span class="flex items-center justify-center gap-2">
                  <Icon name="lucide:shopping-bag" class="h-4 w-4 group-hover:rotate-12 transition-transform" />
                  Gagner plus de points
                </span>
              </button>
              
              <button 
                @click="initializeLoyaltyData"
                class="w-full border-2 border-[#2a2a22] text-[#2a2a22] hover:bg-[#2a2a22] hover:text-white rounded-2xl px-4 py-3 font-medium transition-all duration-300 cursor-pointer group"
              >
                <span class="flex items-center justify-center gap-2">
                  <Icon name="lucide:refresh-cw" class="h-4 w-4 group-hover:rotate-180 transition-transform" />
                  Actualiser mes points
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoyalty } from '~/composables/useLoyalty'
import RewardModal from '~/components/dashboard/modals/RewardModal.vue'

const { 
  calculateLoyaltyPoints, 
  spendLoyaltyPoints,
  getRewardsHistory, 
  createReward,
  generatePromoCode,
  calculateMonthlyPoints
} = useLoyalty()

// États réactifs
const loyaltyData = ref({
  currentPoints: 0,
  earnedFromOrders: 0,
  pointsFromLoyalty: 0,
  loyaltyHistory: [],
  orders: []
})

const monthlyPoints = ref(0)
const totalRewards = ref(0)
const isClaimingReward = ref(false)
const showRewardModal = ref(false)
const currentPromoCode = ref('')
const rewardsHistory = ref<any[]>([])
const loading = ref(true)
const error = ref('')

// Calculs
const loyaltyPoints = computed(() => loyaltyData.value.currentPoints)

const progressPercentage = computed(() => {
  return Math.min((loyaltyPoints.value / 100) * 100, 100)
})

const remainingPoints = computed(() => {
  return Math.max(100 - loyaltyPoints.value, 0)
})

// Initialiser les données
const initializeLoyaltyData = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const [loyaltyDataResult, rewards] = await Promise.all([
      calculateLoyaltyPoints(),
      getRewardsHistory()
    ])
    
    loyaltyData.value = loyaltyDataResult
    rewardsHistory.value = rewards.map((reward: any) => ({
      id: reward.id,
      title: reward.title,
      date: new Date(reward.createdAt).toLocaleDateString('fr-FR'),
      value: reward.value,
      status: reward.status === 'available' ? 'Disponible' : 
              reward.status === 'used' ? 'Utilisé' : 'Expiré',
      code: reward.code
    }))
    
    monthlyPoints.value = calculateMonthlyPoints(loyaltyDataResult.orders)
    totalRewards.value = rewards.length
    
  } catch (err: any) {
    error.value = err.message || 'Erreur lors du chargement des données'
    console.error('Erreur initialisation données fidélité:', err)
  } finally {
    loading.value = false
  }
}

// Fonction pour réclamer la récompense
const claimReward = async () => {
  if (loyaltyPoints.value < 100) return
  
  isClaimingReward.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Générer code promo
    currentPromoCode.value = generatePromoCode()
    
    // Dépenser les points
    await spendLoyaltyPoints(100)
    
    // Créer la récompense
    await createReward(
      'Bon d\'achat 20€',
      '20€',
      currentPromoCode.value
    )
    
    // Recharger les données
    await initializeLoyaltyData()
    
    // Afficher modal
    showRewardModal.value = true
    
  } catch (err: any) {
    error.value = err.message || 'Erreur lors de la réclamation'
    console.error('Erreur lors de la réclamation:', err)
  } finally {
    isClaimingReward.value = false
  }
}

// Fonction pour aller faire du shopping
const goToShopping = () => {
  showRewardModal.value = false
  navigateTo('/shop')
}

// Initialiser au montage
onMounted(() => {
  initializeLoyaltyData()
})
</script>

<style scoped>
/* Animation pour la barre de progression */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Effet de glow pour les éléments actifs */
.glow-effect {
  box-shadow: 0 0 20px rgba(255, 182, 176, 0.3);
}
</style>