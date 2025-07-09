<template>
  <div class="bg-[#f9f7f2]">
    <!-- Navigation Header -->
    <nav class="bg-white border-b border-[#e6e2d7] px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-full bg-[#2a2a22] flex items-center justify-center">
              <span class="font-serif text-white text-sm">A</span>
            </div>
            <span class="font-serif text-lg text-[#2a2a22]">Audelweiss</span>
          </NuxtLink>
          <span class="text-[#5a5a52]">/ Dashboard</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-[#5a5a52]">Hello, {{ displayName }}</span>
          <button @click="handleLogout" class="text-sm text-[#2a2a22] cursor-pointer hover:underline">
            Logout
          </button>
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-[#e6e2d7] min-h-[calc(100vh-73px)]">
        <div class="p-6">
          <nav class="space-y-2">
            <button
              v-for="item in menuItems"
              :key="item.id"
              @click="activeComponent = item.component"
              class="w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors"
              :class="activeComponent === item.component 
                ? 'bg-[#2a2a22] text-white' 
                : 'text-[#5a5a52] hover:bg-[#f5f2e9] hover:text-[#2a2a22]'"
            >
              <Icon :name="item.icon" class="h-5 w-5" />
              {{ item.name }}
            </button>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-x-4"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 -translate-x-4"
          mode="out-in"
        >
          <!-- Rendre les composants selon l'état actif -->
          <AccountSettings v-if="activeComponent === 'AccountSettings'" :key="'account'" />
          <MyOrders v-else-if="activeComponent === 'MyOrders'" :key="'orders'" />
          <Wishlist v-else-if="activeComponent === 'Wishlist'" :key="'wishlist'" />
          <AddressBook v-else-if="activeComponent === 'AddressBook'" :key="'addresses'" />
        </Transition>
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

// État actif avec string
const activeComponent = ref('AccountSettings')

// Menu items avec strings
const menuItems = [
  {
    id: 'account',
    name: 'Mon Compte',
    icon: 'lucide:user',
    component: 'AccountSettings'
  },
  {
    id: 'orders',
    name: 'Mes Commandes',
    icon: 'lucide:shopping-bag',
    component: 'MyOrders'
  },
  {
    id: 'wishlist',
    name: 'Ma Wishlist',
    icon: 'lucide:heart',
    component: 'Wishlist'
  },
]

// Logout
const handleLogout = () => {
  logout()
}
</script>