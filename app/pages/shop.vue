<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Arrière-plan avec dégradés animés -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#fdfcfc] via-[#faf8f5] to-[#f5f2e9]">
      <div class="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#FFB6B0]/15 to-[#ff8e7a]/8 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-[#2a2a22]/8 to-[#3a3a32]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-r from-[#FFB6B0]/10 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- Contenu principal -->
    <div class="relative z-10">
      <!-- Hero Section de la boutique -->
      <section class="py-20 px-4">
        <div class="container mx-auto max-w-7xl text-center">
          <!-- Badge premium -->
          <div class="inline-flex items-center bg-white/80 backdrop-blur-sm border border-[#e6e2d7] rounded-full px-6 py-3 mb-8 shadow-lg">
            <Icon name="lucide:shopping-bag" class="h-5 w-5 text-[#FFB6B0] mr-2" />
            <span class="text-sm font-medium text-[#2a2a22]">Collection exclusive</span>
          </div>

          <!-- Titre principal -->
          <h1 class="font-serif text-5xl md:text-6xl font-bold text-[#2a2a22] mb-6 leading-tight">
            Notre 
            <span class="relative">
              <span class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] bg-clip-text text-transparent">
                Boutique
              </span>
              <div class="absolute -bottom-3 left-0 w-full h-4 bg-gradient-to-r from-[#FFB6B0]/30 to-[#ff8e7a]/20 transform -rotate-1 rounded-full"></div>
            </span>
          </h1>

          <!-- Sous-titre -->
          <p class="text-xl text-[#5a5a52] mb-12 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre collection complète de créations artisanales. Chaque pièce est unique, 
            fabriquée avec amour dans nos ateliers des Alpes françaises.
          </p>

          <!-- Statistiques rapides -->
          <div class="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-12">
            <div class="text-center">
              <div class="text-2xl font-bold text-[#2a2a22]">{{ sortedProducts.length }}+</div>
              <div class="text-sm text-[#5a5a52]">Créations</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-[#2a2a22]">{{ collections?.length || 0 }}</div>
              <div class="text-sm text-[#5a5a52]">Collections</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-[#2a2a22]">100%</div>
              <div class="text-sm text-[#5a5a52]">Artisanal</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section principale -->
      <section class="pb-20">
        <div class="container mx-auto px-4 md:px-6 max-w-7xl">
          <div class="flex flex-col xl:flex-row gap-12">
            
            <!-- Sidebar filtres moderne -->
            <aside class="xl:w-80 w-full">
              <div class="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-[#e6e2d7] sticky top-24">
                
                <!-- Header filtres -->
                <div class="flex items-center justify-between mb-8">
                  <h2 class="font-serif text-2xl font-bold text-[#2a2a22]">Filtres</h2>
                  <button 
                    v-if="selectedCollection || sortOrder"
                    @click="clearFilters"
                    class="text-sm text-[#FFB6B0] hover:text-[#ff8e7a] font-medium transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Icon name="lucide:x" class="h-4 w-4" />
                    Effacer
                  </button>
                </div>

                <!-- Collections avec design moderne -->
                <div class="mb-10">
                  <h3 class="flex items-center gap-2 text-lg font-semibold text-[#2a2a22] mb-6">
                    <Icon name="lucide:tag" class="h-5 w-5 text-[#FFB6B0]" />
                    Collections
                  </h3>
                  <div class="space-y-3">
                    <label class="group flex items-center gap-3 text-base text-[#2a2a22] cursor-pointer p-3 rounded-2xl hover:bg-[#FFB6B0]/10 transition-all duration-200" :class="{ 'bg-[#FFB6B0]/20 ring-2 ring-[#FFB6B0]/30': !selectedCollection }">
                      <div class="relative">
                        <input type="radio" v-model="selectedCollection" :value="null" class="sr-only" />
                        <div class="w-5 h-5 rounded-full border-2 border-[#e6e2d7] group-hover:border-[#FFB6B0] transition-colors" :class="{ 'bg-[#FFB6B0] border-[#FFB6B0]': !selectedCollection }">
                          <div v-if="!selectedCollection" class="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                      </div>
                      <span class="font-medium" :class="{ 'text-[#FFB6B0]': !selectedCollection }">Toutes les collections</span>
                      <span v-if="!selectedCollection" class="ml-auto bg-[#FFB6B0] text-white text-xs px-2 py-1 rounded-full">{{ products?.length || 0 }}</span>
                    </label>
                    
                    <label
                      v-for="cat in collections"
                      :key="cat.id"
                      class="group flex items-center gap-3 text-base text-[#2a2a22] cursor-pointer p-3 rounded-2xl hover:bg-[#FFB6B0]/10 transition-all duration-200"
                      :class="{ 'bg-[#FFB6B0]/20 ring-2 ring-[#FFB6B0]/30': selectedCollection === cat.collectionName }"
                    >
                      <div class="relative">
                        <input type="radio" v-model="selectedCollection" :value="cat.collectionName" class="sr-only" />
                        <div class="w-5 h-5 rounded-full border-2 border-[#e6e2d7] group-hover:border-[#FFB6B0] transition-colors" :class="{ 'bg-[#FFB6B0] border-[#FFB6B0]': selectedCollection === cat.collectionName }">
                          <div v-if="selectedCollection === cat.collectionName" class="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                      </div>
                      <span class="font-medium" :class="{ 'text-[#FFB6B0]': selectedCollection === cat.collectionName }">{{ cat.collectionName }}</span>
                      <span class="ml-auto bg-[#e6e2d7] text-[#5a5a52] text-xs px-2 py-1 rounded-full">{{ getCollectionCount(cat.collectionName) }}</span>
                    </label>
                  </div>
                </div>

                <!-- Tri par prix moderne -->
                <div>
                  <h3 class="flex items-center gap-2 text-lg font-semibold text-[#2a2a22] mb-6">
                    <Icon name="lucide:arrow-up-down" class="h-5 w-5 text-[#FFB6B0]" />
                    Trier par prix
                  </h3>
                  <div class="space-y-3">
                    <label class="group flex items-center gap-3 text-base text-[#2a2a22] cursor-pointer p-3 rounded-2xl hover:bg-[#FFB6B0]/10 transition-all duration-200" :class="{ 'bg-[#FFB6B0]/20 ring-2 ring-[#FFB6B0]/30': !sortOrder }">
                      <div class="relative">
                        <input type="radio" v-model="sortOrder" :value="null" class="sr-only" />
                        <div class="w-5 h-5 rounded-full border-2 border-[#e6e2d7] group-hover:border-[#FFB6B0] transition-colors" :class="{ 'bg-[#FFB6B0] border-[#FFB6B0]': !sortOrder }">
                          <div v-if="!sortOrder" class="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                      </div>
                      <Icon name="lucide:shuffle" class="h-4 w-4 text-[#5a5a52]" />
                      <span class="font-medium" :class="{ 'text-[#FFB6B0]': !sortOrder }">Par défaut</span>
                    </label>
                    
                    <label class="group flex items-center gap-3 text-base text-[#2a2a22] cursor-pointer p-3 rounded-2xl hover:bg-[#FFB6B0]/10 transition-all duration-200" :class="{ 'bg-[#FFB6B0]/20 ring-2 ring-[#FFB6B0]/30': sortOrder === 'asc' }">
                      <div class="relative">
                        <input type="radio" v-model="sortOrder" value="asc" class="sr-only" />
                        <div class="w-5 h-5 rounded-full border-2 border-[#e6e2d7] group-hover:border-[#FFB6B0] transition-colors" :class="{ 'bg-[#FFB6B0] border-[#FFB6B0]': sortOrder === 'asc' }">
                          <div v-if="sortOrder === 'asc'" class="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                      </div>
                      <Icon name="lucide:trending-up" class="h-4 w-4 text-green-500" />
                      <span class="font-medium" :class="{ 'text-[#FFB6B0]': sortOrder === 'asc' }">Prix croissant</span>
                    </label>
                    
                    <label class="group flex items-center gap-3 text-base text-[#2a2a22] cursor-pointer p-3 rounded-2xl hover:bg-[#FFB6B0]/10 transition-all duration-200" :class="{ 'bg-[#FFB6B0]/20 ring-2 ring-[#FFB6B0]/30': sortOrder === 'desc' }">
                      <div class="relative">
                        <input type="radio" v-model="sortOrder" value="desc" class="sr-only" />
                        <div class="w-5 h-5 rounded-full border-2 border-[#e6e2d7] group-hover:border-[#FFB6B0] transition-colors" :class="{ 'bg-[#FFB6B0] border-[#FFB6B0]': sortOrder === 'desc' }">
                          <div v-if="sortOrder === 'desc'" class="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                      </div>
                      <Icon name="lucide:trending-down" class="h-4 w-4 text-red-500" />
                      <span class="font-medium" :class="{ 'text-[#FFB6B0]': sortOrder === 'desc' }">Prix décroissant</span>
                    </label>
                  </div>
                </div>

                <!-- Section découverte -->
                <div class="mt-10 p-6 bg-gradient-to-r from-[#FFB6B0]/10 to-[#ff8e7a]/5 rounded-2xl border border-[#FFB6B0]/20">
                  <div class="text-center">
                    <Icon name="lucide:sparkles" class="h-8 w-8 text-[#FFB6B0] mx-auto mb-3" />
                    <h4 class="font-serif text-lg font-semibold text-[#2a2a22] mb-2">Pièce du jour</h4>
                    <p class="text-sm text-[#5a5a52] mb-4">Découvrez notre création mise en avant</p>
                    <button class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      Découvrir
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            <main class="flex-1">
              
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div class="flex items-center gap-4">
                  <div class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white px-6 py-3 rounded-2xl font-bold shadow-lg">
                    {{ sortedProducts.length }} 
                    <span class="font-normal">produit{{ sortedProducts.length > 1 ? 's' : '' }}</span>
                  </div>
                  
                  <div v-if="selectedCollection" class="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[#e6e2d7]">
                    <Icon name="lucide:filter" class="h-4 w-4 text-[#FFB6B0]" />
                    <span class="text-sm font-medium text-[#2a2a22]">{{ selectedCollection }}</span>
                  </div>
                </div>
                
              </div>

              <div v-if="pending" class="flex justify-center items-center min-h-[500px]">
                <div class="flex flex-col items-center gap-4">
                  <div class="relative">
                    <div class="animate-spin rounded-full h-16 w-16 border-4 border-[#FFB6B0]/20 border-t-[#FFB6B0]"></div>
                    <div class="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/20 animate-pulse"></div>
                  </div>
                  <p class="text-[#5a5a52] font-medium">Chargement de nos merveilles...</p>
                </div>
              </div>

              <div v-else-if="error" class="text-center py-20">
                <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-[#e6e2d7] max-w-md mx-auto">
                  <Icon name="lucide:alert-circle" class="h-16 w-16 text-red-400 mx-auto mb-6" />
                  <h3 class="text-xl font-semibold text-[#2a2a22] mb-4">Oups ! Une erreur s'est produite</h3>
                  <p class="text-[#5a5a52] mb-6">Impossible de charger nos créations pour le moment.</p>
                  <button class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    Réessayer
                  </button>
                </div>
              </div>

              <!-- Grille de produits -->
              <div v-else-if="sortedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProductCard
                  v-for="(product, index) in sortedProducts"
                  :key="product.id"
                  :product="product"
                  :index="index"
                  :rating="productRatings[product.id] ?? 0"
                  @product-click="goToProduct"
                  @add-to-cart="handleAddToCart"
                  @wishlist-toggle="handleWishlistToggle"
                  class="transform hover:scale-[1.02] transition-all duration-300"
                  :style="{ animationDelay: `${(index % 12) * 100}ms` }"
                />
              </div>

              <div v-else class="text-center py-20">
                <div class="bg-white/40 backdrop-blur-sm rounded-3xl p-16 border border-[#e6e2d7] max-w-lg mx-auto">
                  <div class="relative mb-8">
                    <Icon name="lucide:package" class="h-20 w-20 text-[#FFB6B0] mx-auto mb-4" />
                    <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-[#FFB6B0]/10 rounded-full blur-xl"></div>
                  </div>
                  <h3 class="text-2xl font-serif font-bold text-[#2a2a22] mb-4">Aucun produit trouvé</h3>
                  <p class="text-[#5a5a52] mb-8 leading-relaxed">
                    Nous n'avons pas trouvé de produits correspondant à vos critères. 
                    Essayez de modifier vos filtres ou explorez toute notre collection.
                  </p>
                  <button 
                    @click="clearFilters"
                    class="bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] hover:from-[#3a3a32] hover:to-[#4a4a42] text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl cursor-pointer"
                  >
                    <Icon name="lucide:refresh-cw" class="h-5 w-5 inline mr-2" />
                    Voir tous les produits
                  </button>
                </div>
              </div>

              <!-- Pagination (pour plus tard) -->
              <div v-if="sortedProducts.length > 0" class="mt-16 flex justify-center">
                <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-[#e6e2d7] flex items-center gap-2">
                  <button class="p-3 rounded-xl bg-[#FFB6B0] text-white transition-all cursor-pointer">
                    <Icon name="lucide:chevron-left" class="h-4 w-4" />
                  </button>
                  <div class="flex items-center gap-2 px-4">
                    <span class="w-8 h-8 bg-[#FFB6B0] text-white rounded-lg flex items-center justify-center text-sm font-semibold">1</span>
                    <span class="w-8 h-8 hover:bg-[#FFB6B0]/10 rounded-lg flex items-center justify-center text-sm font-medium cursor-pointer transition-colors">2</span>
                    <span class="w-8 h-8 hover:bg-[#FFB6B0]/10 rounded-lg flex items-center justify-center text-sm font-medium cursor-pointer transition-colors">3</span>
                  </div>
                  <button class="p-3 rounded-xl hover:bg-[#FFB6B0]/10 text-[#5a5a52] transition-all cursor-pointer">
                    <Icon name="lucide:chevron-right" class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>

    <!-- Notifications (reprendre celles de la homepage) -->
    <Transition 
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-8 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-8 scale-95"
    >
      <div v-if="showCartNotification" 
           class="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#e6e2d7]">
        <div class="w-8 h-8 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center">
          <Icon name="lucide:check" class="h-5 w-5 text-white" />
        </div>
        <span class="font-semibold">{{ lastAddedProduct }} ajouté au panier !</span>
      </div>
    </Transition>

    <Transition 
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-8 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-8 scale-95"
    >
      <div v-if="showWishlistNotification" 
           class="fixed bottom-8 left-8 z-50 bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#e6e2d7]">
        <div class="w-8 h-8 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center">
          <Icon name="lucide:heart" class="h-5 w-5 text-white" />
        </div>
        <span class="font-semibold">{{ wishlistMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted, watchEffect } from 'vue'
import ProductCard from '~/components/cards/product/ProductCard.vue'
import { useCart } from '~/composables/useCart'
import { useProduct } from '~/composables/useProduct'
import { useWishlist } from '~/composables/useWishlist'

interface Product {
  id: number
  productName: string
  productImage: {
    url: string
    alternativeText?: string
  }
  price: number
  slug: string
  collection?: {
    collectionName: string
  }
}

// 🚀 Utilisation du système optimisé
const { 
  products, 
  isLoading: productsLoading, 
  fetchAllProducts 
} = useProduct()

const { toggleWishlist } = useWishlist()
const { addToCart } = useCart()

// Fetch collections séparé (plus petit cache spécifique)
const strapi = useStrapi()

const { data: collections, pending: collectionsLoading } = useLazyAsyncData('collections', () =>
  strapi.get<{ data: { id: number, collectionName: string }[] }>('collections', {})
    .then(res => res.data || [])
)

const selectedCollection = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc' | null>(null)
const route = useRoute()
const router = useRouter()

// 🎯 Chargement initial optimisé
const pending = ref(true)
const error = ref(false)

// Gestion des notes moyennes par produit
const { getProductFeedbacks } = useProduct()
const productRatings = ref<Record<number, number>>({})

async function fetchAllRatings() {
  if (!products.value) return
  const ratings: Record<number, number> = {}
  await Promise.all(products.value.map(async (p) => {
    const feedbacks = await getProductFeedbacks(p.id)
    if (feedbacks.length) {
      const avg = Math.round(feedbacks.reduce((sum, fb) => sum + (fb.stars || 0), 0) / feedbacks.length)
      ratings[p.id] = avg
    } else {
      ratings[p.id] = 0
    }
  }))
  productRatings.value = ratings
}

onMounted(async () => {
  try {
    await fetchAllProducts()
    await fetchAllRatings()
    console.log('✅ Shop: Products loaded from cache')
  } catch (err) {
    console.error('❌ Shop: Error loading products:', err)
    error.value = true
  } finally {
    pending.value = false
  }
})

// Synchronise le filtre avec l'URL et les collections chargées
watchEffect(() => {
  const collectionParam = route.query.collection
  if (collectionParam && typeof collectionParam === 'string' && collections.value) {
    const found = collections.value.find(c => c.collectionName === collectionParam)
    if (found) {
      selectedCollection.value = found.collectionName
    } else {
      selectedCollection.value = null
    }
  }
})

// 🎪 Produits filtrés et triés depuis le cache
const filteredProducts = computed(() => {
  if (!products.value) return []
  if (!selectedCollection.value) return products.value
  return products.value.filter(p => p.collection?.collectionName === selectedCollection.value)
})

const sortedProducts = computed(() => {
  if (!filteredProducts.value) return []
  if (!sortOrder.value) return filteredProducts.value
  return [...filteredProducts.value].sort((a, b) =>
    sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price
  )
})

// États notifications
const showCartNotification = ref(false)
const showWishlistNotification = ref(false)
const lastAddedProduct = ref('')
const wishlistMessage = ref('')

function goToProduct(slug: string) {
  router.push(`/product/${slug}`)
}

function handleAddToCart(product: Product) {
  addToCart({
    id: product.id,
    productName: product.productName,
    price: product.price,
    slug: product.slug,
    productImage: product.productImage
  })
  
  lastAddedProduct.value = product.productName
  showCartNotification.value = true
  setTimeout(() => {
    showCartNotification.value = false
  }, 3000)
}

async function handleWishlistToggle(message: string) {
  wishlistMessage.value = message
  showWishlistNotification.value = true
  setTimeout(() => {
    showWishlistNotification.value = false
  }, 3000)
}

function clearFilters() {
  selectedCollection.value = null
  sortOrder.value = null
}

function getCollectionCount(collectionName: string) {
  if (!products.value) return 0
  return products.value.filter(p => p.collection?.collectionName === collectionName).length
}

function getBadge(product: Product, index: number) {
  if (index === 0) return 'Coup de cœur'
  if (index < 3) return 'Nouveau'
  return ''
}

// 🔄 Fonction retry pour l'état d'erreur
async function retryLoadProducts() {
  error.value = false
  pending.value = true
  try {
    await fetchAllProducts(true) // Force refresh
    console.log('✅ Shop: Products reloaded successfully')
  } catch (err) {
    console.error('❌ Shop: Retry failed:', err)
    error.value = true
  } finally {
    pending.value = false
  }
}
</script>

<style scoped>
/* Animation pour l'apparition des cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation au chargement des cards */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Animation pour les filtres */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Smooth transitions pour les radios custom */
.radio-custom {
  transition: all 0.2s ease;
}

.radio-custom:hover {
  transform: scale(1.05);
}

/* Glassmorphisme pour les cards */
.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Animation pour les notifications */
.notification-enter-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(50px) scale(0.9);
}

/* Hover effects pour les boutons */
.btn-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Container responsive */
.container {
  max-width: 1400px;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  h1 {
    font-size: 2.5rem;
    line-height: 1.2;
  }
  
  .xl:w-80 {
    width: 100%;
  }
}

/* Animation des éléments au scroll */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(50px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05) translateY(-10px);
  }
  70% {
    transform: scale(0.9) translateY(0);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.bounce-in {
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Focus states pour l'accessibilité */
.focus-visible {
  outline: 2px solid #FFB6B0;
  outline-offset: 2px;
}

/* Loading shimmer effect */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}

</style>