<template>
  <div class="min-h-screen bg-gradient-to-br from-[#fdfcfc] via-[#faf8f5] to-[#f5f2e9]">
    
    <!-- HERO SECTION ÉPOUSTOUFLANT -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Animations d'arrière-plan -->
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#2a2a22]/5 to-[#3a3a32]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#FFB6B0]/5 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="text-center max-w-4xl mx-auto">
          
          <!-- Badge premium -->
          <div class="inline-flex items-center bg-white/80 backdrop-blur-sm border border-[#e6e2d7] rounded-full px-6 py-2 mb-8 shadow-lg">
            <Icon name="lucide:sparkles" class="h-4 w-4 text-[#FFB6B0] mr-2" />
            <span class="text-sm font-medium text-[#2a2a22]">Créations artisanales d'exception</span>
          </div>

          <!-- Titre principal -->
          <h1 class="font-serif text-5xl md:text-7xl font-bold text-[#2a2a22] mb-6 tracking-tight leading-tight">
            L'art de 
            <span class="relative">
              <span class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] bg-clip-text text-transparent">
                créer
              </span>
              <div class="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-[#FFB6B0]/30 to-[#ff8e7a]/30 transform -rotate-1"></div>
            </span>
            l'unique
          </h1>

          <!-- Sous-titre -->
          <p class="text-xl md:text-2xl text-[#5a5a52] mb-10 leading-relaxed max-w-3xl mx-auto">
            Découvrez des créations uniques, faites main dans les Alpes françaises. Chaque pièce raconte une histoire, 
            chaque détail exprime une passion.
          </p>

          <!-- Boutons d'action -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NuxtLink 
              to="/shop" 
              class="group inline-flex items-center bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] hover:from-[#3a3a32] hover:to-[#4a4a42] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span>Découvrir la collection</span>
              <Icon name="lucide:arrow-right" class="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
            
            <NuxtLink 
              to="/about" 
              class="inline-flex items-center border-2 border-[#2a2a22] text-[#2a2a22] hover:bg-[#2a2a22] hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              <Icon name="lucide:play-circle" class="h-5 w-5 mr-2" />
              Notre histoire
            </NuxtLink>
          </div>

          <!-- Statistiques -->
          <div class="grid grid-cols-3 gap-8 mt-16 max-w-md mx-auto">
            <div class="text-center">
              <div class="text-2xl font-bold text-[#2a2a22]">500+</div>
              <div class="text-sm text-[#5a5a52]">Créations uniques</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-[#2a2a22]">100%</div>
              <div class="text-sm text-[#5a5a52]">Fait main</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-[#2a2a22]">1000+</div>
              <div class="text-sm text-[#5a5a52]">Clients satisfaits</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="lucide:chevron-down" class="h-6 w-6 text-[#5a5a52]" />
      </div>
    </section>

    <!-- SECTION PRODUITS VEDETTES -->
    <section class="py-24 px-4 md:px-6 relative">
      <div class="container mx-auto max-w-7xl">
        
        <!-- Header de section -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center bg-[#FFB6B0]/10 border border-[#FFB6B0]/20 rounded-full px-4 py-2 mb-6">
            <Icon name="lucide:star" class="h-4 w-4 text-[#FFB6B0] mr-2" />
            <span class="text-sm font-medium text-[#2a2a22]">Nos coups de cœur</span>
          </div>
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-[#2a2a22] mb-4">
            Créations d'exception
          </h2>
          <p class="text-lg text-[#5a5a52] max-w-2xl mx-auto">
            Une sélection de nos plus belles pièces, choisies avec amour pour leur caractère unique et leur qualité exceptionnelle.
          </p>
        </div>

        <!-- Grille de produits -->
        <div v-if="pending || productsLoading" class="flex justify-center items-center min-h-[400px]">
          <div class="flex flex-col items-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB6B0] mb-4"></div>
            <p class="text-[#5a5a52]">Chargement de nos merveilles...</p>
          </div>
        </div>

        <div v-else-if="error" class="text-center py-16">
          <Icon name="lucide:alert-circle" class="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p class="text-red-600">Oups ! Impossible de charger nos créations pour le moment.</p>
          <button 
            @click="fetchAllProducts(true)" 
            class="mt-4 bg-[#FFB6B0] hover:bg-[#ff8e7a] text-white px-6 py-2 rounded-full transition-colors cursor-pointer"
          >
            Réessayer
          </button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <ProductCard
            v-for="(product, index) in featuredProducts"
            :key="product.id"
            :product="product"
            :index="index"
            @product-click="goToProduct"
            @add-to-cart="handleAddToCart"
            @wishlist-toggle="handleWishlistToggle"
          />
        </div>

        <!-- Bouton voir plus -->
        <div class="text-center mt-16">
          <NuxtLink 
            to="/shop" 
            class="inline-flex items-center bg-white border-2 border-[#2a2a22] text-[#2a2a22] hover:bg-[#2a2a22] hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Voir toute la collection</span>
            <Icon name="lucide:arrow-right" class="h-5 w-5 ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- SECTION VALEURS -->
    <section class="py-24 bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] text-white relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-10 right-10 w-64 h-64 bg-[#FFB6B0]/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold mb-4">Pourquoi choisir Audelweiss ?</h2>
          <p class="text-xl text-white/80 max-w-2xl mx-auto">Des valeurs authentiques qui guident chacune de nos créations</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center group">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:heart-handshake" class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-xl font-serif font-semibold mb-4">Artisanat authentique</h3>
            <p class="text-white/70 leading-relaxed">Chaque pièce est créée à la main avec passion et savoir-faire traditionnel, dans le respect des techniques ancestrales.</p>
          </div>

          <div class="text-center group">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:leaf" class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-xl font-serif font-semibold mb-4">Démarche éco-responsable</h3>
            <p class="text-white/70 leading-relaxed">Nous privilégions les matériaux naturels et durables, dans une démarche respectueuse de l'environnement.</p>
          </div>

          <div class="text-center group">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:sparkles" class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-xl font-serif font-semibold mb-4">Pièces uniques</h3>
            <p class="text-white/70 leading-relaxed">Nos créations sont pensées pour être uniques, reflétant votre personnalité et vos goûts singuliers.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION TÉMOIGNAGES -->
    <section class="py-24 px-4 md:px-6">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-[#2a2a22] mb-4">Ils nous font confiance</h2>
          <p class="text-lg text-[#5a5a52] max-w-2xl mx-auto">Les mots de nos clients nous touchent et nous motivent à créer toujours plus beau</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#e6e2d7]">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
              </div>
            </div>
            <blockquote class="text-[#5a5a52] italic mb-6 leading-relaxed">
              "Des créations absolument magnifiques ! J'ai commandé une pièce personnalisée et le résultat a dépassé toutes mes attentes. Un vrai coup de cœur."
            </blockquote>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center text-white font-semibold mr-3">
                M
              </div>
              <div>
                <div class="font-semibold text-[#2a2a22]">Marie Dubois</div>
                <div class="text-sm text-[#5a5a52]">Cliente fidèle</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#e6e2d7]">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
              </div>
            </div>
            <blockquote class="text-[#5a5a52] italic mb-6 leading-relaxed">
              "Un service client exceptionnel et des produits d'une qualité rare. Je recommande les yeux fermés, c'est du très haut niveau !"
            </blockquote>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center text-white font-semibold mr-3">
                J
              </div>
              <div>
                <div class="font-semibold text-[#2a2a22]">Jean-Pierre Martin</div>
                <div class="text-sm text-[#5a5a52]">Collectionneur</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#e6e2d7]">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
                <Icon name="lucide:star" class="h-5 w-5 fill-current" />
              </div>
            </div>
            <blockquote class="text-[#5a5a52] italic mb-6 leading-relaxed">
              "Chaque achat est un plaisir renouvelé. L'emballage est soigné, la livraison rapide et les créations toujours surprenantes."
            </blockquote>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center text-white font-semibold mr-3">
                S
              </div>
              <div>
                <div class="font-semibold text-[#2a2a22]">Sophie Laurent</div>
                <div class="text-sm text-[#5a5a52]">Passionnée d'art</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CALL TO ACTION FINAL -->
    <section class="py-24 bg-gradient-to-br from-[#f5f2e9] to-[#faf8f5] relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-10 left-10 w-72 h-72 bg-[#FFB6B0]/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-80 h-80 bg-[#2a2a22]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div class="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h2 class="font-serif text-4xl md:text-5xl font-bold text-[#2a2a22] mb-6">
          Prêt à découvrir l'exception ?
        </h2>
        <p class="text-xl text-[#5a5a52] mb-10 max-w-2xl mx-auto leading-relaxed">
          Rejoignez notre communauté d'amoureux de l'artisanat et découvrez des créations qui transformeront votre quotidien.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink 
            to="/shop" 
            class="inline-flex items-center bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] hover:from-[#3a3a32] hover:to-[#4a4a42] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <Icon name="lucide:shopping-bag" class="h-5 w-5 mr-2" />
            Explorer la boutique
          </NuxtLink>
          
          <NuxtLink 
            to="/register" 
            class="inline-flex items-center border-2 border-[#FFB6B0] text-[#FFB6B0] hover:bg-[#FFB6B0] hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <Icon name="lucide:user-plus" class="h-5 w-5 mr-2" />
            Créer un compte
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Notifications -->
    <transition name="slide-up">
      <div 
        v-if="showCartNotification" 
        class="fixed bottom-6 right-6 z-50 bg-white border border-[#e6e2d7] rounded-2xl shadow-2xl p-4 flex items-center max-w-sm"
      >
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
          <Icon name="lucide:check" class="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p class="font-semibold text-[#2a2a22]">Ajouté au panier !</p>
          <p class="text-sm text-[#5a5a52]">{{ lastAddedProduct }}</p>
        </div>
      </div>
    </transition>

    <transition name="slide-up">
      <div 
        v-if="showWishlistNotification" 
        class="fixed bottom-6 left-6 z-50 bg-white border border-[#e6e2d7] rounded-2xl shadow-2xl p-4 flex items-center max-w-sm"
      >
        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3">
          <Icon name="lucide:heart" class="h-6 w-6 text-red-500 fill-current" />
        </div>
        <div>
          <p class="font-semibold text-[#2a2a22]">{{ wishlistMessage }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'
import { useAuth } from '~/composables/useAuth'
import { useProduct } from '~/composables/useProduct'
import ProductCard from '~/components/cards/product/ProductCard.vue'

const strapi = useStrapi()
const router = useRouter()
const { addToCart } = useCart()
const { isLoggedIn } = useAuth()

const { 
  products, 
  isLoading: productsLoading, 
  fetchAllProducts, 
  getFeaturedProducts 
} = useProduct()

interface Product {
  id: number
  productName: string
  productImage: {
    url: string
    alternativeText?: string
  }
  price: number
  slug: string
}

const pending = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    await fetchAllProducts()
    console.log('✅ Homepage: Products loaded from cache')
  } catch (err) {
    console.error('❌ Homepage: Error loading products:', err)
    error.value = true
  } finally {
    pending.value = false
  }
})

const featuredProducts = computed(() => {
  return getFeaturedProducts(8) // Prend les 8 premiers du cache
})

// États des notifications
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
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>