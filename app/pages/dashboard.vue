<template>
  <div class="min-h-screen bg-gradient-to-br from-[#f9f7f2] via-[#faf8f5] to-[#f5f2e9] relative overflow-hidden">
    <!-- Décoration d'arrière-plan sophistiquée -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-[#FFB6B0]/6 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2a2a22]/4 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Navigation Header -->
    <nav class="bg-white/90 backdrop-blur-sm border-b border-[#e6e2d7] px-6 py-4 mt-6 relative z-10 shadow-lg">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span class="font-serif text-white text-lg font-bold">A</span>
            </div>
            <span class="font-serif text-xl text-[#2a2a22] font-bold">Audelweiss</span>
          </NuxtLink>
          <div class="flex items-center gap-2 text-[#5a5a52]">
            <Icon name="lucide:chevron-right" class="h-4 w-4" />
            <span class="font-medium">Dashboard</span>
          </div>
        </div>
        
        <div class="flex items-center gap-6">
          <!-- Notifications -->
          <button class="relative p-2 text-[#5a5a52] hover:text-[#2a2a22] transition-colors">
            <Icon name="lucide:bell" class="h-5 w-5" />
            <span class="absolute -top-1 -right-1 h-3 w-3 bg-[#FFB6B0] rounded-full"></span>
          </button>
          
          <!-- User Menu -->
          <div class="flex items-center gap-3">
            <div class="text-right">
              <p class="text-sm font-medium text-[#2a2a22]">{{ displayName }}</p>
              <p class="text-xs text-[#5a5a52]">Membre Premium</p>
            </div>
            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-md">
              <Icon name="lucide:user" class="h-5 w-5 text-white" />
            </div>
            <button @click="handleLogout" class="text-sm text-[#5a5a52] cursor-pointer hover:text-[#2a2a22] transition-colors font-medium">
              <Icon name="lucide:log-out" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex relative z-10">
      <!-- Sidebar moderne -->
      <aside class="w-80 bg-white/80 backdrop-blur-sm border-r border-[#e6e2d7] min-h-[calc(100vh-89px)] shadow-xl">
        <div class="p-8">
          <!-- Navigation Menu -->
          <nav class="space-y-3">
            <p class="text-xs font-semibold text-[#5a5a52] uppercase tracking-wider mb-4">Navigation</p>
            <button
              v-for="item in menuItems"
              :key="item.id"
              @click="activeComponent = item.component"
              class="w-full flex items-center gap-4 px-6 py-4 text-left rounded-2xl transition-all duration-300 group cursor-pointer"
              :class="activeComponent === item.component 
                ? 'bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white shadow-lg transform scale-[1.02]' 
                : 'text-[#5a5a52] hover:bg-white/60 hover:text-[#2a2a22] hover:shadow-md hover:transform hover:scale-[1.01]'"
            >
              <div 
                class="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300"
                :class="activeComponent === item.component 
                  ? 'bg-white/20' 
                  : 'bg-[#f5f2e9] group-hover:bg-white/80'"
              >
                <Icon 
                  :name="item.icon" 
                  class="h-5 w-5 transition-all duration-300"
                  :class="activeComponent === item.component ? 'text-white' : 'text-[#2a2a22]'"
                />
              </div>
              <div>
                <p class="font-semibold">{{ item.name }}</p>
                <p 
                  class="text-xs transition-all duration-300"
                  :class="activeComponent === item.component ? 'text-white/80' : 'text-[#5a5a52]'"
                >
                  {{ item.description }}
                </p>
              </div>
            </button>
          </nav>

          <!-- Quick Actions -->
          <div class="mt-10 pt-8 border-t border-[#e6e2d7]">
            <p class="text-xs font-semibold text-[#5a5a52] uppercase tracking-wider mb-4">Actions Rapides</p>
            <div class="space-y-3">
              <button class="w-full flex items-center gap-3 px-4 py-3 text-[#5a5a52] hover:text-[#2a2a22] rounded-xl hover:bg-white/60 transition-all duration-200 group cursor-pointer">
                <Icon name="lucide:shopping-cart" class="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span class="text-sm font-medium">Nouvelle commande</span>
              </button>
              <button class="w-full flex items-center gap-3 px-4 py-3 text-[#5a5a52] hover:text-[#2a2a22] rounded-xl hover:bg-white/60 transition-all duration-200 group cursor-pointer">
                <Icon name="lucide:headphones" class="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span class="text-sm font-medium">Support client</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content avec effet glassmorphism -->
      <main class="flex-1 p-8">
        <div class="max-w-6xl mx-auto">
          <!-- Header de section -->
          

          <!-- Contenu dynamique avec transitions fluides -->
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-8 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 -translate-y-8 scale-95"
            mode="out-in"
          >
            <div 
              :key="activeComponent"
              class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#e6e2d7] overflow-hidden"
            >
              <!-- Contenu des composants -->
              <AccountSettings v-if="activeComponent === 'AccountSettings'" />
              <MyOrders v-else-if="activeComponent === 'MyOrders'" />
              <Wishlist v-else-if="activeComponent === 'Wishlist'" />
              <LoyaltyProgram v-else-if="activeComponent === 'LoyaltyProgram'" />
            </div>
          </Transition>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vérifier l'authentification
const { isLoggedIn, currentUser, logout } = useAuth()

if (!isLoggedIn.value) {
  await navigateTo('/login')
}

const displayName = computed(() => {
  if (!currentUser.value?.username) return ''
  
  const firstName = currentUser.value.username.split('_')[0]
  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
})

// SEO
useHead({
  title: 'Dashboard - Audelweiss',
  meta: [
    { name: 'description', content: 'Your Audelweiss account dashboard' }
  ]
})

// Import des composants
import AccountSettings from '~/components/dashboard/AccountSettings.vue'
import MyOrders from '~/components/dashboard/MyOrders.vue'
import Wishlist from '~/components/dashboard/Wishlist.vue'
import LoyaltyProgram from '~/components/dashboard/LoyaltyProgram.vue'

// État actif
const activeComponent = ref('AccountSettings')

// Menu items avec descriptions
const menuItems = [
  {
    id: 'account',
    name: 'Mon Compte',
    description: 'Paramètres et profil',
    icon: 'lucide:user',
    component: 'AccountSettings'
  },
  {
    id: 'orders',
    name: 'Mes Commandes',
    description: 'Historique et suivi',
    icon: 'lucide:shopping-bag',
    component: 'MyOrders'
  },
  {
    id: 'wishlist',
    name: 'Ma Wishlist',
    description: 'Produits favoris',
    icon: 'lucide:heart',
    component: 'Wishlist'
  },
  {
    id: 'loyalty',
    name: 'Fidélité',
    description: 'Points et récompenses',
    icon: 'lucide:star',
    component: 'LoyaltyProgram'
  },
]

// Fonctions pour le header dynamique
const getCurrentSectionTitle = () => {
  const current = menuItems.find(item => item.component === activeComponent.value)
  return current?.name || 'Dashboard'
}

const getCurrentSectionDescription = () => {
  const descriptions = {
    'AccountSettings': 'Gérez vos informations personnelles et préférences',
    'MyOrders': 'Consultez l\'historique et le statut de vos commandes',
    'Wishlist': 'Retrouvez tous vos produits favoris en un clin d\'œil',
    'LoyaltyProgram': 'Découvrez vos points et récompenses exclusives'
  }
  return descriptions[activeComponent.value] || 'Bienvenue dans votre espace personnel'
}

const getCurrentSectionIcon = () => {
  const current = menuItems.find(item => item.component === activeComponent.value)
  return current?.icon || 'lucide:layout-dashboard'
}

// Logout
const handleLogout = () => {
  logout()
}
</script>

<style scoped>
/* Animations personnalisées */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Effet de glow pour les éléments actifs */
.glow-effect {
  box-shadow: 0 0 20px rgba(255, 182, 176, 0.3);
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #FFB6B0;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ff8e7a;
}
</style>