<template>
  <div
    class="group cursor-pointer"
    :style="{ animationDelay: `${index * 100}ms` }"
    @click="$emit('product-click', product.slug)"
  >
    <!-- Container avec hauteur fixe réduite -->
    <div class="relative h-[360px] overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group-hover:scale-[1.02] flex flex-col">
      
      <!-- Image produit avec taille fixe réduite -->
      <div class="relative h-[200px] overflow-hidden flex-shrink-0">
        <NuxtImg
          :src="'https://edelweiss-back-production.up.railway.app' + product.productImage.url"
          :alt="product.productName"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width="400"
          height="200"
        />
        
        <!-- Overlay hover -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <!-- Badge nouveau -->
        <div v-if="index < 3" class="absolute top-3 left-3 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
          Nouveau
        </div>

        <!-- Bouton wishlist -->
        <button
          v-if="product.id && isLoggedIn"
          @click.stop="handleWishlistToggle"
          class="absolute top-3 right-3 p-2 bg-white/90 flex items-center cursor-pointer backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          :class="{ 'text-red-500': isInWishlist(product.id), 'text-gray-400': !isInWishlist(product.id) }"
        >
          <Icon 
            name="lucide:heart" 
            class="h-5 w-5 transition-all duration-200"
            :class="{ 'fill-current': isInWishlist(product.id) }"
          />
        </button>
      </div>

      <!-- Contenu produit avec hauteur flexible mais compacte -->
      <div class="flex-1 p-3 flex flex-col">
        <!-- Titre plus petit -->
        <h3 class="font-serif text-base font-semibold text-[#2a2a22] mb-2 line-clamp-2 group-hover:text-[#FFB6B0] transition-colors min-h-[2.5rem] flex items-start">
          {{ product.productName }}
        </h3>
        
        <!-- Prix et étoiles plus petits -->
        <div class="flex items-center justify-between mb-2">
          <span class="text-lg font-bold text-[#2a2a22]">
            {{ product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
          </span>
          <div class="flex items-center space-x-0.5">
            <template v-for="i in 5" :key="i">
              <span v-if="i <= rating">
                <!-- Étoile pleine -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#facc15" class="h-4 w-4">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              </span>
              <span v-else>
                <!-- Étoile vide -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="#facc15" class="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              </span>
            </template>
          </div>
        </div>
        
        <!-- Bouton ajout panier toujours visible en bas -->
        <div class="mt-auto pt-2 flex-shrink-0">
          <button
            @click.stop="handleAddToCart"
            class="w-full bg-gradient-to-r cursor-pointer from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 opacity-100 group-hover:opacity-100 translate-y-0"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWishlist } from '~/composables/useWishlist'
import { useAuth } from '~/composables/useAuth'

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

const props = defineProps<{
  product: Product
  index: number
  rating?: number // optionnel, par défaut 5
}>()

const emit = defineEmits<{
  'product-click': [slug: string]
  'add-to-cart': [product: Product]
  'wishlist-toggle': [message: string]
}>()

const { isInWishlist, toggleWishlist } = useWishlist()
const { isLoggedIn } = useAuth()

// Nombre d'étoiles à afficher (par défaut 5)
const rating = computed(() => props.rating ?? 5)

function handleAddToCart() {
  emit('add-to-cart', props.product)
}

async function handleWishlistToggle() {
  if (!isLoggedIn.value) return
  
  try {
    const wasInWishlist = isInWishlist(props.product.id)
    await toggleWishlist(props.product.id)
    
    const message = wasInWishlist ? 'Retiré de la wishlist' : 'Ajouté à la wishlist'
    emit('wishlist-toggle', message)
    
  } catch (error) {
    console.error('Erreur wishlist:', error)
    emit('wishlist-toggle', 'Erreur lors de la mise à jour')
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>