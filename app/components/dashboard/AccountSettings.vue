<template>
  <div class="space-y-6">
    <div>
      <h1 class="font-serif text-3xl font-medium text-[#2a2a22] mb-2">Mon Compte</h1>
      <p class="text-[#5a5a52]">Gérez vos informations personnelles et vos préférences.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Informations personnelles -->
      <div class="bg-white p-6 border border-[#e6e2d7] rounded-lg">
        <h2 class="font-serif text-xl text-[#2a2a22] mb-4">Informations Personnelles</h2>
        
        <!-- Messages de feedback -->
        <div v-if="successMessage" class="mb-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-600">
          {{ successMessage }}
        </div>
        
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
          {{ errorMessage }}
        </div>
        
        <form @submit.prevent="updateProfile" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-[#2a2a22]">Prénom</label>
              <input
                v-model="profile.firstName"
                class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
                placeholder="Votre prénom"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-[#2a2a22]">Nom</label>
              <input
                v-model="profile.lastName"
                class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
                placeholder="Votre nom"
              />
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-[#2a2a22]">Email</label>
            <input
              v-model="profile.email"
              type="email"
              class="w-full rounded-none border border-[#e6e2d7] bg-transparent px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-[#2a2a22]">Nom d'utilisateur</label>
            <input
              v-model="profile.username"
              class="w-full rounded-none border border-[#e6e2d7] bg-gray-100 px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
              placeholder="Votre nom d'utilisateur"
              disabled
            />
          </div>

          <button 
            type="submit" 
            :disabled="isUpdating"
            class="bg-[#2a2a22] text-white px-6 py-3 rounded-none hover:bg-[#3a3a32] transition-colors disabled:opacity-50"
          >
            {{ isUpdating ? 'Mise à jour...' : 'Mettre à jour' }}
          </button>
        </form>
      </div>

      <!-- Statistiques -->
      <div class="bg-white p-6 border border-[#e6e2d7] rounded-lg">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-serif text-xl text-[#2a2a22]">Statistiques</h2>
          <button 
            @click="refreshStats" 
            :disabled="loadingStats"
            class="text-sm text-[#2a2a22] hover:underline"
          >
            {{ loadingStats ? 'Chargement...' : 'Actualiser' }}
          </button>
        </div>

        <div v-if="loadingStats" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2a2a22] mx-auto"></div>
          <p class="mt-2 text-sm text-[#5a5a52]">Chargement des statistiques...</p>
        </div>

        <div v-else class="space-y-4">
          <div class="flex justify-between items-center p-4 bg-[#f5f2e9] rounded">
            <div>
              <p class="text-sm text-[#5a5a52]">Commandes totales</p>
              <p class="text-2xl font-semibold text-[#2a2a22]">{{ stats.totalOrders }}</p>
            </div>
            <Icon name="lucide:shopping-bag" class="h-8 w-8 text-[#2a2a22]" />
          </div>
          
          <div class="flex justify-between items-center p-4 bg-[#f5f2e9] rounded">
            <div>
              <p class="text-sm text-[#5a5a52]">Montant dépensé</p>
              <p class="text-2xl font-semibold text-[#2a2a22]">{{ stats.totalSpent }}€</p>
            </div>
            <Icon name="lucide:euro" class="h-8 w-8 text-[#2a2a22]" />
          </div>
          
          <div class="flex justify-between items-center p-4 bg-[#f5f2e9] rounded">
            <div>
              <p class="text-sm text-[#5a5a52]">Panier moyen</p>
              <p class="text-2xl font-semibold text-[#2a2a22]">{{ stats.averageOrderValue }}€</p>
            </div>
            <Icon name="lucide:trending-up" class="h-8 w-8 text-[#2a2a22]" />
          </div>

          <div class="flex justify-between items-center p-4 bg-[#f5f2e9] rounded">
            <div>
              <p class="text-sm text-[#5a5a52]">Wishlist</p>
              <p class="text-2xl font-semibold text-[#2a2a22]">{{ stats.wishlistItems }}</p>
            </div>
            <Icon name="lucide:heart" class="h-8 w-8 text-[#2a2a22]" />
          </div>
        </div>
      </div>
    </div>

    <!-- Statistiques supplémentaires -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Statistiques mensuelles -->
      <div class="bg-white p-6 border border-[#e6e2d7] rounded-lg">
        <h3 class="font-serif text-lg text-[#2a2a22] mb-4">Ce mois-ci</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm text-[#5a5a52]">Commandes</span>
            <span class="font-semibold text-[#2a2a22]">{{ monthlyStats.monthlyOrders }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-[#5a5a52]">Dépenses</span>
            <span class="font-semibold text-[#2a2a22]">{{ monthlyStats.monthlySpent }}€</span>
          </div>
        </div>
      </div>

      <!-- Informations supplémentaires -->
      <div class="bg-white p-6 border border-[#e6e2d7] rounded-lg">
        <h3 class="font-serif text-lg text-[#2a2a22] mb-4">Informations</h3>
        <div class="space-y-3">
          <div v-if="stats.lastOrderDate">
            <p class="text-sm text-[#5a5a52]">Dernière commande</p>
            <p class="font-semibold text-[#2a2a22]">{{ stats.lastOrderDate }}</p>
          </div>
          <div v-if="stats.mostOrderedProduct">
            <p class="text-sm text-[#5a5a52]">Produit favori</p>
            <p class="font-semibold text-[#2a2a22]">{{ stats.mostOrderedProduct }}</p>
          </div>
          <div v-if="!stats.lastOrderDate && !stats.mostOrderedProduct">
            <p class="text-sm text-[#5a5a52]">Aucune commande pour le moment</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Debug info (à supprimer en production) -->
    <div v-if="false" class="bg-gray-100 p-4 rounded text-xs">
      <p><strong>Debug Stats:</strong></p>
      <pre>{{ JSON.stringify(stats, null, 2) }}</pre>
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