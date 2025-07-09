<template>
  <div class="p-8 space-y-8">
    <!-- Header Section avec effet glassmorphism -->
    <div class="relative overflow-hidden bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-sm rounded-3xl p-8 border border-[#e6e2d7]/50">
      <!-- Décoration subtile -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-[#FFB6B0]/10 rounded-full blur-2xl"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-[#2a2a22]/5 rounded-full blur-xl"></div>
      
      <div class="relative z-10 flex items-center justify-between">
        <div>
          <h1 class="font-serif text-4xl font-bold text-[#2a2a22] mb-3">Ma Wishlist</h1>
          <p class="text-lg text-[#5a5a52] max-w-lg">
            Retrouvez tous vos produits favoris et créez votre collection de rêve
          </p>
        </div>
        <div class="hidden md:flex items-center space-x-4">
          <div class="h-20 w-20 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-xl">
            <Icon name="lucide:heart" class="h-10 w-10 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- État de chargement -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-16">
      <div class="relative">
        <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FFB6B0] mb-6"></div>
        <div class="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-[#FFB6B0]/30"></div>
      </div>
      <p class="text-lg text-[#5a5a52] font-medium">Chargement de votre wishlist...</p>
    </div>

    <!-- État vide -->
    <div v-else-if="wishlistItems.length === 0" class="text-center py-16">
      <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-[#e6e2d7] shadow-xl max-w-lg mx-auto">
        <div class="relative mb-8">
          <!-- Cœur principal -->
          <div class="h-24 w-24 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative">
            <Icon name="lucide:heart" class="h-12 w-12 text-white" />
            <!-- Petits cœurs flottants -->
            <div class="absolute -top-2 -right-2 text-pink-400 animate-bounce">
              <Icon name="lucide:heart" class="h-4 w-4" />
            </div>
            <div class="absolute -bottom-2 -left-2 text-pink-400 animate-bounce delay-300">
              <Icon name="lucide:heart" class="h-3 w-3" />
            </div>
          </div>
        </div>
        
        <h2 class="font-serif text-2xl font-bold text-[#2a2a22] mb-3">Votre wishlist est vide</h2>
        <p class="text-[#5a5a52] mb-8 leading-relaxed">
          Découvrez nos produits exceptionnels et créez votre collection de favoris
        </p>
        
        <NuxtLink 
          to="/shop" 
          class="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group cursor-pointer"
        >
          <Icon name="lucide:sparkles" class="h-5 w-5 group-hover:rotate-12 transition-transform" />
          Découvrir la boutique
        </NuxtLink>
      </div>
    </div>

    <!-- Contenu principal -->
    <div v-else class="space-y-8">
      <!-- Header avec statistiques et actions -->
      <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#e6e2d7] shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-lg">
              <Icon name="lucide:shopping-bag" class="h-6 w-6 text-white" />
            </div>
            <div>
              <p class="font-serif text-xl font-bold text-[#2a2a22]">
                {{ wishlistCount }} produit{{ wishlistCount > 1 ? 's' : '' }}
              </p>
              <p class="text-sm text-[#5a5a52]">dans votre collection</p>
            </div>
          </div>
          
          <button 
            @click="confirmClearWishlist"
            class="flex items-center gap-2 px-4 py-3 text-red-600 hover:text-white hover:bg-red-500 border border-red-300 hover:border-red-500 rounded-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
          >
            <Icon name="lucide:trash-2" class="h-4 w-4 group-hover:rotate-12 transition-transform" />
            <span class="font-medium">Vider la wishlist</span>
          </button>
        </div>
      </div>

      <!-- Grille des produits -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="item in wishlistItems" 
          :key="item.id"
        >
          <div 
            v-for="product in item.products"
            :key="product.id"
            class="group bg-white/70 backdrop-blur-sm border border-[#e6e2d7] rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <!-- Image container -->
            <div class="relative aspect-square overflow-hidden">
              <NuxtImg
                :src="getProductImage(product)"
                :alt="product.productName"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                width="300"
                height="300"
              />
              
              <!-- Overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Bouton supprimer avec style moderne -->
              <button
                @click="removeFromWishlist(product.id)"
                class="absolute top-4 right-4 p-3 flex items-center bg-white/90 backdrop-blur-sm rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-300 transform hover:scale-110 shadow-lg group/btn cursor-pointer"
              >
                <Icon name="lucide:heart-off" class="h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
              </button>

              <!-- Badge favori -->
              <div class="absolute top-4 left-4 px-3 py-1 bg-[#FFB6B0]/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                <Icon name="lucide:heart" class="h-3 w-3 inline mr-1" />
                Favori
              </div>
            </div>

            <!-- Informations du produit -->
            <div class="p-6 space-y-4">
              <div>
                <h3 class="font-serif text-lg font-bold text-[#2a2a22] mb-2 line-clamp-2 group-hover:text-[#FFB6B0] transition-colors">
                  {{ product.productName }}
                </h3>
                <p class="text-2xl font-bold text-[#2a2a22] flex items-center gap-1">
                  <Icon name="lucide:euro" class="h-5 w-5" />
                  {{ product.price.toLocaleString('fr-FR') }}
                </p>
              </div>
              
              <!-- Actions avec design moderne -->
              <div class="space-y-3">
                <button
                  @click="addToCart(product)"
                  class="w-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn cursor-pointer"
                >
                  <span class="flex items-center justify-center gap-2">
                    <Icon name="lucide:shopping-cart" class="h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                    Ajouter au panier
                  </span>
                </button>
                
                <NuxtLink
                  :to="`/product/${product.slug}`"
                  class="w-full flex items-center justify-center gap-2 border-2 border-[#2a2a22] text-[#2a2a22] hover:bg-[#2a2a22] hover:text-white py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn cursor-pointer"
                >
                  <Icon name="lucide:eye" class="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                  Voir le produit
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation moderne -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="showConfirmModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto shadow-2xl border border-[#e6e2d7]">
          <!-- Icône d'alerte -->
          <div class="text-center mb-6">
            <div class="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:alert-triangle" class="h-8 w-8 text-red-500" />
            </div>
            <h3 class="font-serif text-2xl font-bold text-[#2a2a22] mb-2">Vider la wishlist</h3>
            <p class="text-[#5a5a52] leading-relaxed">
              Êtes-vous sûr de vouloir supprimer tous vos produits favoris ? Cette action est irréversible.
            </p>
          </div>
          
          <!-- Actions -->
          <div class="flex gap-4">
            <button 
              @click="showConfirmModal = false"
              class="flex-1 border-2 border-[#2a2a22] text-[#2a2a22] hover:bg-[#2a2a22] hover:text-white py-3 rounded-2xl font-bold transition-all duration-300 cursor-pointer"
            >
              Annuler
            </button>
            <button 
              @click="handleClearWishlist"
              class="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Notification toast moderne -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div
        v-if="notification"
        class="fixed bottom-6 right-6 bg-white/90 backdrop-blur-sm text-[#2a2a22] px-6 py-4 rounded-2xl shadow-2xl z-50 border border-[#e6e2d7] max-w-sm"
      >
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center">
            <Icon name="lucide:check" class="h-4 w-4 text-white" />
          </div>
          <p class="font-medium">{{ notification }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useWishlist } from '~/composables/useWishlist'
import { useCart } from '~/composables/useCart'

const { 
  wishlistItems, 
  isLoading, 
  wishlistCount, 
  removeFromWishlist, 
  clearWishlist 
} = useWishlist()

const { addToCart: addToCartComposable } = useCart()

// États locaux
const showConfirmModal = ref(false)
const notification = ref('')

// Fonction pour obtenir l'image du produit
const getProductImage = (product: any) => {
  const baseUrl = 'https://edelweiss-back-production.up.railway.app'
  if (product.productImage?.url) {
    return baseUrl + product.productImage.url
  }
  return '/placeholder.svg'
}

// Fonction pour ajouter au panier
const addToCart = (product: any) => {
  addToCartComposable({
    id: product.id,
    productName: product.productName,
    price: product.price,
    slug: product.slug,
    productImage: product.productImage
  })
  
  showNotification(`${product.productName} ajouté au panier`)
}

// Fonction pour confirmer la suppression
const confirmClearWishlist = () => {
  showConfirmModal.value = true
}

// Fonction pour vider la wishlist
const handleClearWishlist = async () => {
  try {
    await clearWishlist()
    showConfirmModal.value = false
    showNotification('Wishlist vidée avec succès')
  } catch (error) {
    console.error('Erreur lors du vidage:', error)
    showNotification('Erreur lors du vidage de la wishlist')
  }
}

// Fonction pour afficher les notifications
const showNotification = (message: string) => {
  notification.value = message
  setTimeout(() => {
    notification.value = ''
  }, 4000)
}
</script>

<style scoped>
/* Animation pour les cards de produits */
.group:hover {
  transform: translateY(-8px);
}

/* Limitation du texte sur 2 lignes */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animation de pulsation pour le loading */
@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.animate-ping {
  animation: pulse-ring 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Effet de brillance sur les boutons */
.group.btn:hover {
  background-size: 200% 200%;
  animation: shimmer 1.5s ease-in-out;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>