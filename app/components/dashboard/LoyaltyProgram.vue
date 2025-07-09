<template>
  <div class="space-y-6">
    <div>
      <h1 class="font-serif text-3xl font-medium text-[#2a2a22] mb-2">Programme de Fidélité</h1>
      <p class="text-[#5a5a52]">Gagnez des points à chaque commande et obtenez des récompenses exclusives.</p>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a2a22] mx-auto"></div>
      <p class="mt-4 text-[#5a5a52]">Chargement de vos points...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-8 text-red-600">
      <p>{{ error }}</p>
      <button @click="initializeLoyaltyData" class="mt-4 px-4 py-2 bg-[#2a2a22] text-white rounded">
        Réessayer
      </button>
    </div>

    <!-- Main content -->
    <div v-else>
      <!-- Modal de récompense -->
      <RewardModal 
        :is-open="showRewardModal"
        :promo-code="currentPromoCode"
        @close="showRewardModal = false"
        @go-to-shopping="goToShopping"
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Barre de progression principale -->
        <div class="lg:col-span-2">
          <div class="bg-white p-6 border border-[#e6e2d7] rounded-lg">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-serif text-xl text-[#2a2a22]">Vos Points de Fidélité</h2>
              <div class="flex items-center gap-2">
                <Icon name="lucide:gift" class="h-5 w-5 text-[#2a2a22]" />
                <span class="text-sm font-medium text-[#2a2a22]">{{ loyaltyPoints }}/100 points</span>
              </div>
            </div>
            
            <!-- Barre de progression -->
            <div class="relative mb-6">
              <div class="w-full bg-[#f5f2e9] rounded-full h-4 overflow-hidden">
                <div 
                  class="bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] h-full rounded-full transition-all duration-1000 ease-out relative"
                  :style="{ width: `${progressPercentage}%` }"
                >
                  <!-- Effet de brillance -->
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
              
              <!-- Indicateurs de progression -->
              <div class="flex justify-between mt-2">
                <span class="text-xs text-[#5a5a52]">0</span>
                <span class="text-xs text-[#5a5a52]">25</span>
                <span class="text-xs text-[#5a5a52]">50</span>
                <span class="text-xs text-[#5a5a52]">75</span>
                <span class="text-xs text-[#5a5a52]">100</span>
              </div>
            </div>
            
            <!-- Message de progression -->
            <div class="text-center">
              <p class="text-sm text-[#5a5a52] mb-2">
                <span v-if="loyaltyPoints < 100">
                  Il vous reste <strong class="text-[#2a2a22]">{{ remainingPoints }} points</strong> pour obtenir votre bon d'achat de 20€
                </span>
                <span v-else class="text-green-600 font-medium">
                  🎉 Félicitations ! Vous avez gagné un bon d'achat de 20€
                </span>
              </p>
              
              <div v-if="loyaltyPoints >= 100" class="mt-4">
                <button 
                  @click="claimReward"
                  :disabled="isClaimingReward"
                  class="bg-[#2a2a22] text-white px-6 py-3 rounded-none hover:bg-[#3a3a32] transition-colors disabled:opacity-50"
                >
                  {{ isClaimingReward ? 'Réclamation...' : 'Réclamer mon bon d\'achat' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistiques détaillées -->
        <div class="bg-white p-6 border border-[#e6e2d7] rounded-lg">
          <h2 class="font-serif text-xl text-[#2a2a22] mb-4">Statistiques</h2>
          
          <div class="space-y-4">
            <div class="flex justify-between items-center p-4 bg-[#f5f2e9] rounded">
              <div>
                <p class="text-sm text-[#5a5a52]">Points actuels</p>
                <p class="text-2xl font-semibold text-[#2a2a22]">{{ loyaltyPoints }}</p>
              </div>
              <Icon name="lucide:star" class="h-8 w-8 text-[#2a2a22]" />
            </div>
            
            <div class="flex justify-between items-center p-4 bg-[#f5f2e9] rounded">
              <div>
                <p class="text-sm text-[#5a5a52]">Points gagnés ce mois</p>
                <p class="text-2xl font-semibold text-[#2a2a22]">{{ monthlyPoints }}</p>
              </div>
              <Icon name="lucide:trending-up" class="h-8 w-8 text-[#2a2a22]" />
            </div>
            
            <div class="flex justify-between items-center p-4 bg-[#f5f2e9] rounded">
              <div>
                <p class="text-sm text-[#5a5a52]">Récompenses réclamées</p>
                <p class="text-2xl font-semibold text-[#2a2a22]">{{ totalRewards }}</p>
              </div>
              <Icon name="lucide:gift" class="h-8 w-8 text-[#2a2a22]" />
            </div>
          </div>
        </div>

        <!-- Comment ça marche -->
        <div class="bg-white p-6 border border-[#e6e2d7] rounded-lg">
          <h2 class="font-serif text-xl text-[#2a2a22] mb-4">Comment ça marche ?</h2>
          
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-[#2a2a22] text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <div>
                <h3 class="font-medium text-[#2a2a22] mb-1">Gagnez des points</h3>
                <p class="text-sm text-[#5a5a52]">1 point = 1€ dépensé sur vos commandes</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-[#2a2a22] text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <div>
                <h3 class="font-medium text-[#2a2a22] mb-1">Atteignez 100 points</h3>
                <p class="text-sm text-[#5a5a52]">Accumulez 100 points pour débloquer votre récompense</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-[#2a2a22] text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <div>
                <h3 class="font-medium text-[#2a2a22] mb-1">Réclamez votre bon</h3>
                <p class="text-sm text-[#5a5a52]">Obtenez un bon d'achat de 20€ à utiliser sur votre prochaine commande</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Historique des récompenses -->
      <div class="bg-white p-6 border border-[#e6e2d7] rounded-lg">
        <h2 class="font-serif text-xl text-[#2a2a22] mb-4">Historique des Récompenses</h2>
        
        <div v-if="rewardsHistory.length > 0" class="space-y-3">
          <div 
            v-for="reward in rewardsHistory" 
            :key="reward.id"
            class="flex items-center justify-between p-4 bg-[#f5f2e9] rounded"
          >
            <div class="flex items-center gap-3">
              <Icon name="lucide:gift" class="h-5 w-5 text-[#2a2a22]" />
              <div>
                <p class="text-sm font-medium text-[#2a2a22]">{{ reward.title }}</p>
                <p class="text-xs text-[#5a5a52]">{{ reward.date }}</p>
                <p v-if="reward.code" class="text-xs font-mono text-[#2a2a22] mt-1">
                  Code: {{ reward.code }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-[#2a2a22]">{{ reward.value }}</p>
              <p class="text-xs text-[#5a5a52]">{{ reward.status }}</p>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-8">
          <Icon name="lucide:gift" class="h-12 w-12 text-[#5a5a52] mx-auto mb-2" />
          <p class="text-[#5a5a52]">Aucune récompense réclamée pour le moment</p>
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
      statut: reward.status === 'available' ? 'Disponible' : 
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

// Animation d'entrée pour la barre de progression
watch(loyaltyPoints, () => {
  nextTick(() => {
    const progressBar = document.querySelector('.bg-gradient-to-r')
    if (progressBar) {
      progressBar.style.transform = 'scaleX(1)'
    }
  })
})
</script>