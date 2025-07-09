<script setup lang="ts">
interface NavigationItem {
  name: string
  path: string
}

// Auth
const { isLoggedIn, currentUser } = useAuth()

const isMobileMenuOpen = ref<boolean>(false)

const cartCount = ref<number>(3)

const navigationItems: NavigationItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Shop', path: '/shop' },
  { name: 'Collections', path: '/collections' },
  { name: 'Contact', path: '/contact' }
]

// Auth items conditionnels
const authItems = computed((): NavigationItem[] => {
  if (isLoggedIn.value) {
    return [
      { name: 'Dashboard', path: '/dashboard' }
    ]
  } else {
    return [
      { name: 'Login', path: '/login' },
      { name: 'Register', path: '/register' }
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
  <header class="w-full bg-[#f5f2e9] pt-0">
    <!-- Bannière promo -->
    <div class="w-full bg-[#FFB6B0] text-white text-center py-2 px-4 font-semibold text-sm tracking-wide shadow-sm fixed top-0 left-0 right-0 z-50" style="margin-top:0;">
      🎁 Livraison offerte dès 60€ d’achat ! Profitez-en aujourd’hui 💝
    </div>
    <div style="height:40px;"></div>
    <div class="container mx-auto flex items-center justify-between px-4 md:px-6">
      <div class="flex items-center gap-2">
        <NuxtLink to="/" class="flex items-center">
          <div class="relative h-10 w-10 overflow-hidden rounded-full border border-[#2a2a22]">
            <div class="flex h-full w-full items-center justify-center text-xs">A</div>
          </div>
          <div class="ml-2 flex flex-col">
            <span class="font-serif text-lg uppercase tracking-wide text-[#2a2a22]">Audelweiss</span>
            <span class="text-xs text-[#5a5a52]">Unique</span>
          </div>
        </NuxtLink>
      </div>

      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink v-for="item in navigationItems" :key="item.name" :to="item.path"
          class="text-sm font-medium text-[#2a2a22] transition-colors hover:underline underline-offset-4"
          :class="{ 'underline': $route.path === item.path }">
          {{ item.name }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-4">
        <!-- Icône conditionnelle: Dashboard si connecté, Login si pas connecté -->
        <NuxtLink 
          :to="isLoggedIn ? '/dashboard' : '/login'" 
          class="text-[#2a2a22] transition-colors hover:text-[#5a5a52]" 
          :aria-label="isLoggedIn ? 'Mon dashboard' : 'Se connecter'"
        >
          <Icon :name="isLoggedIn ? 'lucide:layout-dashboard' : 'lucide:user'" class="h-5 w-5" />
        </NuxtLink>

        <NuxtLink to="/cart" class="relative text-[#2a2a22] transition-colors hover:text-[#5a5a52]" aria-label="Panier">
          <Icon name="lucide:shopping-bag" class="h-5 w-5" />
          <span v-if="cartCount > 0"
            class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2a2a22] text-[10px] font-medium text-white">
            {{ cartCount }}
          </span>
        </NuxtLink>

        <button @click="toggleMobileMenu"
          class="rounded border border-[#2a2a22] p-2 text-[#2a2a22] transition-colors hover:bg-[#e6e2d7] md:hidden"
          aria-label="Menu de navigation">
          <Icon name="lucide:menu" class="h-5 w-5" />
        </button>
      </div>
    </div>

    <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        @click="closeMobileMenu" />
    </Transition>

    <Transition enter-active-class="transition-transform duration-300 ease-out" enter-from-class="translate-x-full"
      enter-to-class="translate-x-0" leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0" leave-to-class="translate-x-full">
      <div v-if="isMobileMenuOpen" class="fixed right-0 top-0 z-50 h-full w-80 bg-[#f5f2e9] shadow-2xl md:hidden">
        <div class="p-6">
          <button @click="closeMobileMenu"
            class="absolute right-4 top-4 rounded p-2 text-[#2a2a22] transition-colors hover:bg-[#e6e2d7]"
            aria-label="Fermer le menu">
            <Icon name="lucide:x" class="h-5 w-5" />
          </button>

          <nav class="mt-8 flex flex-col gap-4">
            <NuxtLink v-for="item in navigationItems" :key="item.name" :to="item.path"
              class="text-lg font-medium text-[#2a2a22] transition-colors hover:underline underline-offset-4"
              :class="{ 'underline': $route.path === item.path }" @click="closeMobileMenu">
              {{ item.name }}
            </NuxtLink>

            <div class="my-2 h-px bg-[#e6e2d7]" />

            <!-- Menu auth conditionnel -->
            <NuxtLink v-for="item in authItems" :key="item.name" :to="item.path"
              class="text-lg font-medium text-[#2a2a22] transition-colors hover:underline underline-offset-4"
              :class="{ 'underline': $route.path === item.path }" @click="closeMobileMenu">
              {{ item.name }}
            </NuxtLink>

            <NuxtLink to="/cart"
              class="text-lg font-medium text-[#2a2a22] transition-colors hover:underline underline-offset-4"
              :class="{ 'underline': $route.path === '/cart' }" @click="closeMobileMenu">
              Panier ({{ cartCount }})
            </NuxtLink>
          </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>