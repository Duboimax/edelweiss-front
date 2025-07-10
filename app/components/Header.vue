<script setup lang="ts">
import { useCart } from '~/composables/useCart'

interface NavigationItem {
  name: string
  path: string
}

// Auth
const { isLoggedIn } = useAuth()

const isMobileMenuOpen = ref<boolean>(false)
const isScrolled = ref<boolean>(false)

const { count } = useCart()

const navigationItems: NavigationItem[] = [
  { name: 'Accueil', path: '/' },
  { name: 'Boutique', path: '/shop' },
  { name: 'Collections', path: '/collections' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
  { name: 'À propos', path: '/about' },
]

// Auth items conditionnels
const authItems = computed((): NavigationItem[] => {
  if (isLoggedIn.value) {
    return [
      { name: 'Dashboard', path: '/dashboard' },
    ]
  } else {
    return [
      { name: 'Login', path: '/login' },
      { name: 'Register', path: '/register' },
    ]
  }
})

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false
}

const route = useRoute()
watch(() => route.path, () => {
  closeMobileMenu()
})

// Gestion du scroll pour l'effet sticky
onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }
  
  window.addEventListener('scroll', handleScroll)
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

watchEffect(() => {
  if (typeof window !== 'undefined') {
    if (isMobileMenuOpen.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})
</script>

<template>
  <!-- Header sticky avec effets -->
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
          :class="[
            isScrolled 
              ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-[#e6e2d7]/50' 
              : 'bg-gradient-to-r from-[#fdfcfc] via-[#faf8f5] to-[#f5f2e9] shadow-lg'
          ]">
    
    <!-- Bannière promo avec animation -->
    <div class="w-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white text-center py-3 px-4 font-semibold text-sm tracking-wide relative overflow-hidden">
      <!-- Effet de brillance animé -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shine"></div>
      <div class="relative flex items-center justify-center gap-2">
        <Icon name="lucide:gift" class="h-4 w-4 animate-bounce" />
        <span>Livraison offerte dès 60€ d'achat ! Profitez-en aujourd'hui</span>
        <Icon name="lucide:sparkles" class="h-4 w-4 animate-pulse" />
      </div>
    </div>

    <!-- Navigation principale -->
    <div class="container mx-auto flex items-center justify-between px-4 md:px-8 py-4 md:py-6">
      
      <!-- Logo avec effets -->
      <div class="flex items-center gap-3">
        <NuxtLink to="/" class="group flex items-center">
          <div class="relative h-12 w-12 md:h-14 md:w-14 overflow-hidden rounded-2xl border-2 border-[#2a2a22] bg-gradient-to-br from-white to-[#f5f2e9] shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <div class="flex h-full w-full items-center justify-center text-lg md:text-xl font-bold text-[#2a2a22] group-hover:text-[#FFB6B0] transition-colors">
              A
            </div>
            <!-- Effet de halo au survol -->
            <div class="absolute inset-0 bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
          </div>
          <div class="ml-3 flex flex-col">
            <span class="font-serif text-xl md:text-2xl font-bold uppercase tracking-wide text-[#2a2a22] group-hover:text-[#FFB6B0] transition-colors">
              Audelweiss
            </span>
            <span class="text-xs md:text-sm text-[#5a5a52] group-hover:text-[#2a2a22] transition-colors">
              L'art du fait-main
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Navigation desktop -->
      <nav class="hidden lg:flex items-center gap-8">
        <NuxtLink 
          v-for="item in navigationItems" 
          :key="item.name" 
          :to="item.path"
          class="relative group text-base font-medium text-[#2a2a22] transition-all duration-300 hover:text-[#FFB6B0] py-2"
          :class="{ 'text-[#FFB6B0]': $route.path === item.path }"
        >
          {{ item.name }}
          <!-- Underline animé -->
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] transition-all duration-300 group-hover:w-full"
                :class="{ 'w-full': $route.path === item.path }"></span>
        </NuxtLink>
      </nav>

      <!-- Actions à droite -->
      <div class="flex items-center gap-4 md:gap-6">
        <!-- Bouton Dashboard/Login -->
        <NuxtLink 
          :to="isLoggedIn ? '/dashboard' : '/login'" 
          class="group relative p-2 md:p-3 flex items-center rounded-full bg-white/80 backdrop-blur-sm border border-[#e6e2d7] text-[#2a2a22] hover:text-[#FFB6B0] hover:border-[#FFB6B0]/50 transition-all duration-300 hover:shadow-lg hover:scale-105" 
          :aria-label="isLoggedIn ? 'Mon dashboard' : 'Se connecter'"
        >
          <Icon :name="isLoggedIn ? 'lucide:layout-dashboard' : 'lucide:user'" class="h-5 w-5 md:h-6 md:w-6" />
          <!-- Tooltip -->
          <div class="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-[#2a2a22] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {{ isLoggedIn ? 'Dashboard' : 'Connexion' }}
          </div>
        </NuxtLink>

        <!-- Bouton Panier avec compteur animé -->
        <NuxtLink 
          to="/cart" 
          class="group relative p-2 md:p-3 rounded-full flex items-center bg-white/80 backdrop-blur-sm border border-[#e6e2d7] text-[#2a2a22] hover:text-[#FFB6B0] hover:border-[#FFB6B0]/50 transition-all duration-300 hover:shadow-lg hover:scale-105" 
          aria-label="Panier"
        >
          <Icon name="lucide:shopping-bag" class="h-5 w-5 md:h-6 md:w-6" />
          <!-- Badge compteur avec animation -->
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="scale-0 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition-all duration-200"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-0 opacity-0"
          >
            <span 
              v-if="count > 0"
              class="absolute -top-1 -right-1 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-[10px] md:text-xs font-bold text-white shadow-lg animate-pulse"
            >
              {{ count > 99 ? '99+' : count }}
            </span>
          </Transition>
          <!-- Tooltip -->
          <div class="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-[#2a2a22] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Panier ({{ count }})
          </div>
        </NuxtLink>

        <!-- Menu burger mobile avec animation -->
        <button 
          @click="toggleMobileMenu"
          class="group lg:hidden relative p-2 md:p-3 rounded-full bg-white/80 backdrop-blur-sm border border-[#e6e2d7] text-[#2a2a22] hover:text-[#FFB6B0] hover:border-[#FFB6B0]/50 transition-all duration-300 hover:shadow-lg"
          aria-label="Menu de navigation"
        >
          <Transition
            enter-active-class="transition-all duration-200"
            enter-from-class="rotate-90 opacity-0"
            enter-to-class="rotate-0 opacity-100"
            leave-active-class="transition-all duration-200"
            leave-from-class="rotate-0 opacity-100"
            leave-to-class="-rotate-90 opacity-0"
            mode="out-in"
          >
            <Icon v-if="!isMobileMenuOpen" name="lucide:menu" class="h-5 w-5 md:h-6 md:w-6" />
            <Icon v-else name="lucide:x" class="h-5 w-5 md:h-6 md:w-6" />
          </Transition>
        </button>
      </div>
    </div>
  </header>

  <!-- Overlay mobile -->
  <Transition 
    enter-active-class="transition-opacity duration-300 ease-out" 
    enter-from-class="opacity-0"
    enter-to-class="opacity-100" 
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100" 
    leave-to-class="opacity-0"
  >
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
      @click="closeMobileMenu" 
    />
  </Transition>

  <!-- Menu mobile -->
  <Transition 
    enter-active-class="transition-transform duration-300 ease-out" 
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0" 
    leave-active-class="transition-transform duration-200 ease-in"
    leave-from-class="translate-x-0" 
    leave-to-class="translate-x-full"
  >
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed right-0 top-0 z-50 h-full w-80 bg-gradient-to-b from-white to-[#faf8f5] shadow-2xl lg:hidden border-l border-[#e6e2d7]"
    >
      <!-- Header du menu mobile -->
      <div class="bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-serif text-xl font-bold">Navigation</h3>
            <p class="text-sm text-white/80">Audelweiss</p>
          </div>
          <button 
            @click="closeMobileMenu"
            class="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Fermer le menu"
          >
            <Icon name="lucide:x" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Navigation mobile -->
      <div class="p-6 space-y-2">
        <nav class="space-y-1">
          <NuxtLink 
            v-for="(item, index) in navigationItems" 
            :key="item.name" 
            :to="item.path"
            class="group flex items-center px-4 py-3 text-lg font-medium text-[#2a2a22] rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-[#FFB6B0]/10 hover:to-[#ff8e7a]/5 hover:text-[#FFB6B0]"
            :class="{ 'bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/10 text-[#FFB6B0]': $route.path === item.path }"
            :style="{ animationDelay: `${index * 50}ms` }"
            @click="closeMobileMenu"
          >
            <span>{{ item.name }}</span>
            <Icon name="lucide:chevron-right" class="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </nav>

        <!-- Séparateur -->
        <div class="my-6 h-px bg-gradient-to-r from-transparent via-[#e6e2d7] to-transparent" />

        <!-- Menu auth -->
        <div class="space-y-1">
          <NuxtLink 
            v-for="item in authItems" 
            :key="item.name" 
            :to="item.path"
            class="group flex items-center px-4 py-2 text-lg font-medium text-[#2a2a22] rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-[#FFB6B0]/10 hover:to-[#ff8e7a]/5 hover:text-[#FFB6B0]"
            :class="{ 'bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/10 text-[#FFB6B0]': $route.path === item.path }"
            @click="closeMobileMenu"
          >
            <Icon :name="item.name === 'Dashboard' ? 'lucide:layout-dashboard' : item.name === 'Login' ? 'lucide:log-in' : 'lucide:user-plus'" class="h-5 w-5 mr-3" />
            <span>{{ item.name }}</span>
          </NuxtLink>

          <NuxtLink 
            to="/cart"
            class="group flex items-center px-4 py-3 text-lg font-medium text-[#2a2a22] rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-[#FFB6B0]/10 hover:to-[#ff8e7a]/5 hover:text-[#FFB6B0]"
            :class="{ 'bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/10 text-[#FFB6B0]': $route.path === '/cart' }"
            @click="closeMobileMenu"
          >
            <Icon name="lucide:shopping-bag" class="h-5 w-5 mr-3" />
            <span>Panier</span>
            <span v-if="count > 0" class="ml-auto bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white text-sm px-2 py-1 rounded-full font-bold">
              {{ count }}
            </span>
          </NuxtLink>
        </div>
      </div>

      <!-- Footer du menu mobile -->
      <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#f5f2e9] to-transparent">
        <div class="text-center">
          <p class="text-sm text-[#5a5a52] mb-2">Suivez-nous</p>
          <div class="flex justify-center gap-4">
            <div class="w-8 h-8 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center">
              <Icon name="lucide:instagram" class="h-4 w-4 text-white" />
            </div>
            <div class="w-8 h-8 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center">
              <Icon name="lucide:facebook" class="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Spacer pour compenser le header fixed -->
  <div class="h-[100px] md:h-[120px]"></div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}

/* Animation brillance pour la bannière */
@keyframes shine {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}

.animate-shine {
  animation: shine 3s ease-in-out infinite;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>