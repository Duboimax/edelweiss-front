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
              class="w-full rounded-none border border-[#e6e2d7] bg-gray-100  px-3 py-2 focus:border-[#2a2a22] focus:outline-none"
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
        <h2 class="font-serif text-xl text-[#2a2a22] mb-4">Statistiques</h2>
        
        <div class="space-y-4">
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
              <p class="text-sm text-[#5a5a52]">Wishlist</p>
              <p class="text-2xl font-semibold text-[#2a2a22]">{{ stats.wishlistItems }}</p>
            </div>
            <Icon name="lucide:heart" class="h-8 w-8 text-[#2a2a22]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { currentUser, updateUser } = useAuth()

// État du formulaire
const profile = reactive({
  firstName: currentUser.value?.username.split('_') || '',
  lastName: currentUser.value?.lastName || '',
  email: currentUser.value?.email || '',
  username: currentUser.value?.username || ''
})

// États de feedback
const isUpdating = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const stats = reactive({
  totalOrders: 12,
  totalSpent: 485,
  wishlistItems: 5
})

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

watch(() => currentUser.value, (newUser) => {
  if (newUser) {
    profile.firstName = newUser.firstName || ''
    profile.lastName = newUser.lastName || ''
    profile.email = newUser.email || ''
    profile.username = newUser.username || ''
  }
}, { immediate: true })
</script>