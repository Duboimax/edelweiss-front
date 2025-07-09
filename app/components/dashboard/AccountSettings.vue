<template>
  <div class="p-8 space-y-8">
    <!-- Header Section avec effet glassmorphism -->
    <div class="relative overflow-hidden bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-sm rounded-3xl p-8 border border-[#e6e2d7]/50">
      <!-- Décoration subtile -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-[#FFB6B0]/10 rounded-full blur-2xl"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-[#2a2a22]/5 rounded-full blur-xl"></div>
      
      <div class="relative z-10 flex items-center justify-between">
        <div>
          <h1 class="font-serif text-4xl font-bold text-[#2a2a22] mb-3">Mon Compte</h1>
          <p class="text-lg text-[#5a5a52] max-w-lg">
            Personnalisez votre profil et découvrez vos statistiques exclusives
          </p>
        </div>
        <div class="hidden md:flex items-center space-x-4">
          <div class="h-20 w-20 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-xl">
            <Icon name="lucide:user" class="h-10 w-10 text-white" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- Formulaire de profil - 2/3 de la largeur -->
      <div class="xl:col-span-2 space-y-6">
        <!-- Informations personnelles -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-[#e6e2d7] shadow-xl hover:shadow-2xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-8">
            <div class="h-12 w-12 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-lg">
              <Icon name="lucide:edit" class="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 class="font-serif text-2xl font-bold text-[#2a2a22]">Informations Personnelles</h2>
              <p class="text-[#5a5a52]">Mettez à jour vos données personnelles</p>
            </div>
          </div>
          
          <!-- Messages de feedback avec design moderne -->
          <div v-if="successMessage" class="mb-6 p-4 bg-green-50/80 border border-green-200 rounded-2xl text-green-700 animate-fade-in">
            <div class="flex items-center">
              <Icon name="lucide:check-circle" class="h-5 w-5 mr-3 flex-shrink-0" />
              <span class="font-medium">{{ successMessage }}</span>
            </div>
          </div>
          
          <div v-if="errorMessage" class="mb-6 p-4 bg-red-50/80 border border-red-200 rounded-2xl text-red-700 animate-fade-in">
            <div class="flex items-center">
              <Icon name="lucide:alert-circle" class="h-5 w-5 mr-3 flex-shrink-0" />
              <span class="font-medium">{{ errorMessage }}</span>
            </div>
          </div>
          
          <form @submit.prevent="updateProfile" class="space-y-6">
            <!-- Nom et Prénom -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <label class="text-sm font-semibold text-[#2a2a22] flex items-center">
                  <Icon name="lucide:user" class="h-4 w-4 mr-2" />
                  Prénom
                </label>
                <input
                  v-model="profile.firstName"
                  class="w-full rounded-2xl border-2 border-[#e6e2d7] bg-white/80 px-6 py-4 text-base focus:border-[#FFB6B0] focus:outline-none focus:ring-4 focus:ring-[#FFB6B0]/20 transition-all duration-300 placeholder:text-[#5a5a52]/50"
                  placeholder="Votre prénom"
                />
              </div>
              <div class="space-y-3">
                <label class="text-sm font-semibold text-[#2a2a22] flex items-center">
                  <Icon name="lucide:user" class="h-4 w-4 mr-2" />
                  Nom
                </label>
                <input
                  v-model="profile.lastName"
                  class="w-full rounded-2xl border-2 border-[#e6e2d7] bg-white/80 px-6 py-4 text-base focus:border-[#FFB6B0] focus:outline-none focus:ring-4 focus:ring-[#FFB6B0]/20 transition-all duration-300 placeholder:text-[#5a5a52]/50"
                  placeholder="Votre nom"
                />
              </div>
            </div>
            
            <!-- Email -->
            <div class="space-y-3">
              <label class="text-sm font-semibold text-[#2a2a22] flex items-center">
                <Icon name="lucide:mail" class="h-4 w-4 mr-2" />
                Adresse email
              </label>
              <div class="relative">
                <input
                  v-model="profile.email"
                  type="email"
                  class="w-full rounded-2xl border-2 border-[#e6e2d7] bg-white/80 px-6 py-4 text-base focus:border-[#FFB6B0] focus:outline-none focus:ring-4 focus:ring-[#FFB6B0]/20 transition-all duration-300 placeholder:text-[#5a5a52]/50"
                  placeholder="votre@email.com"
                  required
                />
                <div class="absolute inset-y-0 right-4 flex items-center">
                  <Icon name="lucide:at-sign" class="h-5 w-5 text-[#5a5a52]/40" />
                </div>
              </div>
            </div>

            <!-- Username -->
            <div class="space-y-3">
              <label class="text-sm font-semibold text-[#2a2a22] flex items-center">
                <Icon name="lucide:hash" class="h-4 w-4 mr-2" />
                Nom d'utilisateur
              </label>
              <div class="relative">
                <input
                  v-model="profile.username"
                  class="w-full rounded-2xl border-2 border-[#e6e2d7] bg-gray-50/80 px-6 py-4 text-base focus:border-[#FFB6B0] focus:outline-none focus:ring-4 focus:ring-[#FFB6B0]/20 transition-all duration-300 placeholder:text-[#5a5a52]/50"
                  placeholder="Votre nom d'utilisateur"
                  disabled
                />
                <div class="absolute inset-y-0 right-4 flex items-center">
                  <Icon name="lucide:lock" class="h-5 w-5 text-[#5a5a52]/40" />
                </div>
              </div>
              <p class="text-xs text-[#5a5a52]">Le nom d'utilisateur ne peut pas être modifié</p>
            </div>

            <!-- Bouton de mise à jour -->
            <button 
              type="submit" 
              :disabled="isUpdating"
              class="w-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white rounded-2xl px-8 py-4 text-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl"
            >
              <span v-if="isUpdating" class="flex items-center justify-center">
                <div class="animate-spin cursor-pointer rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Mise à jour...
              </span>
              <span v-else class="flex items-center justify-center">
                <Icon name="lucide:save" class="h-6 w-6 mr-2" />
                Mettre à jour le profil
              </span>
            </button>
          </form>
        </div>
      </div>

      <!-- Sidebar avec statistiques - 1/3 de la largeur -->
      <div class="space-y-6">
        <!-- Statistiques principales -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#e6e2d7] shadow-xl">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center">
                <Icon name="lucide:bar-chart" class="h-5 w-5 text-white" />
              </div>
              <h3 class="font-serif text-xl font-bold text-[#2a2a22]">Mes Statistiques</h3>
            </div>
            <button 
              @click="refreshStats" 
              :disabled="loadingStats"
              class="p-2 text-[#5a5a52] cursor-pointer hover:text-[#2a2a22] rounded-xl hover:bg-white/60 transition-all duration-200"
            >
              <Icon name="lucide:refresh-cw" class="h-4 w-4" :class="{'animate-spin': loadingStats}" />
            </button>
          </div>

          <div v-if="loadingStats" class="text-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFB6B0] mx-auto mb-3"></div>
            <p class="text-sm text-[#5a5a52]">Chargement...</p>
          </div>

          <div v-else class="space-y-4">
            <!-- Stat Card -->
            <div class="relative overflow-hidden bg-gradient-to-br from-[#FFB6B0]/10 to-[#ff8e7a]/5 rounded-2xl p-4 border border-[#FFB6B0]/20 hover:shadow-lg transition-all duration-300">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-xs font-medium text-[#5a5a52] mb-1">Commandes totales</p>
                  <p class="text-2xl font-bold text-[#2a2a22]">{{ stats.totalOrders }}</p>
                </div>
                <div class="h-12 w-12 rounded-full bg-white/50 flex items-center justify-center">
                  <Icon name="lucide:shopping-bag" class="h-6 w-6 text-[#FFB6B0]" />
                </div>
              </div>
            </div>
            
            <div class="relative overflow-hidden bg-gradient-to-br from-[#2a2a22]/10 to-[#2a2a22]/5 rounded-2xl p-4 border border-[#2a2a22]/20 hover:shadow-lg transition-all duration-300">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-xs font-medium text-[#5a5a52] mb-1">Montant dépensé</p>
                  <p class="text-2xl font-bold text-[#2a2a22]">{{ stats.totalSpent }}€</p>
                </div>
                <div class="h-12 w-12 rounded-full bg-white/50 flex items-center justify-center">
                  <Icon name="lucide:euro" class="h-6 w-6 text-[#2a2a22]" />
                </div>
              </div>
            </div>
            
            <div class="relative overflow-hidden bg-gradient-to-br from-green-500/10 to-green-400/5 rounded-2xl p-4 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-xs font-medium text-[#5a5a52] mb-1">Panier moyen</p>
                  <p class="text-2xl font-bold text-[#2a2a22]">{{ stats.averageOrderValue }}€</p>
                </div>
                <div class="h-12 w-12 rounded-full bg-white/50 flex items-center justify-center">
                  <Icon name="lucide:trending-up" class="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>

            <div class="relative overflow-hidden bg-gradient-to-br from-pink-500/10 to-pink-400/5 rounded-2xl p-4 border border-pink-200 hover:shadow-lg transition-all duration-300">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-xs font-medium text-[#5a5a52] mb-1">Ma Wishlist</p>
                  <p class="text-2xl font-bold text-[#2a2a22]">{{ stats.wishlistItems }}</p>
                </div>
                <div class="h-12 w-12 rounded-full bg-white/50 flex items-center justify-center">
                  <Icon name="lucide:heart" class="h-6 w-6 text-pink-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistiques mensuelles -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#e6e2d7] shadow-xl">
          <div class="flex items-center gap-3 mb-6">
            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] flex items-center justify-center">
              <Icon name="lucide:calendar" class="h-5 w-5 text-white" />
            </div>
            <h3 class="font-serif text-xl font-bold text-[#2a2a22]">Ce Mois-ci</h3>
          </div>
          
          <div class="space-y-4">
            <div class="flex justify-between items-center p-3 rounded-xl bg-[#f5f2e9]/50">
              <span class="text-sm font-medium text-[#5a5a52]">Commandes</span>
              <span class="text-lg font-bold text-[#2a2a22]">{{ monthlyStats.monthlyOrders }}</span>
            </div>
            <div class="flex justify-between items-center p-3 rounded-xl bg-[#f5f2e9]/50">
              <span class="text-sm font-medium text-[#5a5a52]">Dépenses</span>
              <span class="text-lg font-bold text-[#2a2a22]">{{ monthlyStats.monthlySpent }}€</span>
            </div>
          </div>
        </div>

        <!-- Informations supplémentaires -->
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#e6e2d7] shadow-xl">
          <div class="flex items-center gap-3 mb-6">
            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <Icon name="lucide:info" class="h-5 w-5 text-white" />
            </div>
            <h3 class="font-serif text-xl font-bold text-[#2a2a22]">Informations</h3>
          </div>
          
          <div class="space-y-4">
            <div v-if="stats.lastOrderDate" class="p-3 rounded-xl bg-[#f5f2e9]/50">
              <p class="text-xs font-medium text-[#5a5a52] mb-1">Dernière commande</p>
              <p class="text-sm font-semibold text-[#2a2a22]">{{ stats.lastOrderDate }}</p>
            </div>
            <div v-if="stats.mostOrderedProduct" class="p-3 rounded-xl bg-[#f5f2e9]/50">
              <p class="text-xs font-medium text-[#5a5a52] mb-1">Produit favori</p>
              <p class="text-sm font-semibold text-[#2a2a22]">{{ stats.mostOrderedProduct }}</p>
            </div>
            <div v-if="!stats.lastOrderDate && !stats.mostOrderedProduct" class="p-3 rounded-xl bg-[#f5f2e9]/50 text-center">
              <Icon name="lucide:package" class="h-8 w-8 text-[#5a5a52]/40 mx-auto mb-2" />
              <p class="text-sm text-[#5a5a52]">Aucune commande pour le moment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStats } from '~/composables/useStats'

const { currentUser, updateUser } = useAuth()
const { getUserStats, getMonthlyStats } = useStats()

// État du formulaire
const profile = reactive({
  firstName: currentUser.value?.firstName || '',
  lastName: currentUser.value?.lastName || '',
  email: currentUser.value?.email || '',
  username: currentUser.value?.username || ''
})

// États de feedback
const isUpdating = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// États des statistiques
const loadingStats = ref(true)
const stats = reactive({
  totalOrders: 0,
  totalSpent: 0,
  wishlistItems: 0,
  averageOrderValue: 0,
  lastOrderDate: null,
  mostOrderedProduct: null
})

const monthlyStats = reactive({
  monthlyOrders: 0,
  monthlySpent: 0
})

// Fonction pour charger les statistiques
const loadStats = async () => {
  loadingStats.value = true
  try {
    const [userStats, monthlyData] = await Promise.all([
      getUserStats(),
      getMonthlyStats()
    ])

    // Mettre à jour les statistiques
    Object.assign(stats, userStats)
    Object.assign(monthlyStats, monthlyData)

  } catch (error) {
    console.error('Erreur chargement statistiques:', error)
  } finally {
    loadingStats.value = false
  }
}

// Fonction pour actualiser les statistiques
const refreshStats = async () => {
  await loadStats()
}

// Fonction pour mettre à jour le profil
const updateProfile = async () => {
  isUpdating.value = true
  successMessage.value = ''
  errorMessage.value = ''
  
  try {
    const updateData: any = {}
    
    if (profile.email !== currentUser.value?.email) {
      updateData.email = profile.email
    }
    
    if (profile.username !== currentUser.value?.username) {
      updateData.username = profile.username
    }
    
    if (profile.firstName !== currentUser.value?.firstName) {
      updateData.firstName = profile.firstName
    }
    
    if (profile.lastName !== currentUser.value?.lastName) {
      updateData.lastName = profile.lastName
    }
    
    if (Object.keys(updateData).length === 0) {
      errorMessage.value = 'Aucune modification détectée'
      return
    }
    
    await updateUser(updateData)
    
    successMessage.value = 'Profil mis à jour avec succès !'
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (error: any) {
    errorMessage.value = error.message || 'Erreur lors de la mise à jour'
  } finally {
    isUpdating.value = false
  }
}

// Watcher pour mettre à jour le profil quand l'utilisateur change
watch(() => currentUser.value, (newUser) => {
  if (newUser) {
    profile.firstName = newUser.firstName || ''
    profile.lastName = newUser.lastName || ''
    profile.email = newUser.email || ''
    profile.username = newUser.username || ''
  }
}, { immediate: true })

// Charger les statistiques au montage
onMounted(() => {
  loadStats()
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Effet de focus personnalisé */
input:focus {
  transform: translateY(-2px);
}

/* Animation pour les cards de stats */
.stats-card:hover {
  transform: translateY(-4px);
}
</style>