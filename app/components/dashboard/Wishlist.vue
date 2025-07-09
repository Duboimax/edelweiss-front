<template>
  <div class="space-y-6">
    <div>
      <h1 class="font-serif text-3xl font-medium text-[#2a2a22] mb-2">Ma Wishlist</h1>
      <p class="text-[#5a5a52]">Retrouvez tous vos produits favoris en un seul endroit.</p>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a2a22] mx-auto"></div>
      <p class="mt-4 text-[#5a5a52]">Chargement de votre wishlist...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="wishlistItems.length === 0" class="text-center py-12">
      <Icon name="lucide:heart" class="h-16 w-16 text-[#5a5a52] mx-auto mb-4" />
      <h2 class="text-xl font-serif text-[#2a2a22] mb-2">Votre wishlist est vide</h2>
      <p class="text-[#5a5a52] mb-6">Découvrez nos produits et ajoutez vos favoris à votre wishlist</p>
      <NuxtLink 
        to="/shop" 
        class="inline-block bg-[#2a2a22] text-white px-6 py-3 rounded-none hover:bg-[#3a3a32] transition-colors"
      >
        Découvrir la boutique
      </NuxtLink>
    </div>

    <!-- Wishlist items -->
    <div v-else class="space-y-6">
      <!-- Header avec actions -->
      <div class="flex items-center justify-between">
        <p class="text-[#5a5a52]">{{ wishlistCount }} produit{{ wishlistCount > 1 ? 's' : '' }} dans votre wishlist</p>
        <button 
          @click="confirmClearWishlist"
          class="text-sm text-red-600 hover:text-red-800 transition-colors cursor-pointer"
        >
          Vider la wishlist
        </button>
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
            class="bg-white border border-[#e6e2d7] rounded-lg overflow-hidden hover:shadow-lg transition-shadow mb-4"
          >
            <div class="relative aspect-square">
              <NuxtImg
                :src="getProductImage(product)"
                :alt="product.productName"
                class="w-full h-full object-cover"
                width="300"
                height="300"
              />
              
              <!-- Bouton supprimer -->
              <button
                @click="removeFromWishlist(product.id)"
                class="absolute top-2 right-2 p-2 flex items-center bg-white/80 backdrop-blur-sm  cursor-pointer rounded-full hover:bg-white transition-all duration-200 text-red-500 hover:text-red-700"
              >
                <Icon name="lucide:x" class="h-4 w-4" />
              </button>
            </div>

            <!-- Informations du produit -->
            <div class="p-4">
              <h3 class="font-serif text-lg font-medium text-[#2a2a22] mb-2">{{ product.productName }}</h3>
              <p class="text-[#5a5a52] font-semibold mb-3">{{ product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</p>
              
              <!-- Actions -->
              <div class="flex flex-col gap-2">
                <button
                  @click="addToCart(product)"
                  class="w-full bg-[#FFB6B0] text-white cursor-pointer py-2 rounded-full hover:bg-[#ff8e7a] transition-colors font-semibold"
                >
                  Ajouter au panier
                </button>
                <NuxtLink
                  :to="`/product/${product.slug}`"
                  class="w-full text-center border border-[#2a2a22] cursor-pointer text-[#2a2a22] py-2 rounded-full hover:bg-[#2a2a22] hover:text-white transition-colors"
                >
                  Voir le produit
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation -->
    <div v-if="showConfirmModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white p-6 rounded-lg max-w-md mx-4">
        <h3 class="text-lg font-serif text-[#2a2a22] mb-4">Vider la wishlist</h3>
        <p class="text-[#5a5a52] mb-6">Êtes-vous sûr de vouloir supprimer tous les produits de votre wishlist ? Cette action est irréversible.</p>
        <div class="flex gap-3 justify-end">
          <button 
            @click="showConfirmModal = false"
            class="px-4 py-2 text-[#2a2a22] border border-[#2a2a22] rounded hover:bg-[#2a2a22] hover:text-white transition-colors"
          >
            Annuler
          </button>
          <button 
            @click="handleClearWishlist"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <div
      v-if="notification"
      class="fixed bottom-4 right-4 bg-[#2a2a22] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pop-in"
    >
      {{ notification }}
    </div>
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
  }, 3000)
}
</script>