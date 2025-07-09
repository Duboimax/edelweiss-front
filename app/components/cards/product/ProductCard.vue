<template>
  <div
    class="group cursor-pointer"
    :style="{ animationDelay: `${index * 100}ms` }"
    @click="$emit('product-click', product.slug)"
  >
    <!-- Container avec hauteur fixe -->
    <div class="relative h-[420px] overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group-hover:scale-[1.02] flex flex-col">
      
      <!-- Image produit avec taille fixe -->
      <div class="relative h-[280px] overflow-hidden flex-shrink-0">
        <NuxtImg
          :src="'https://edelweiss-back-production.up.railway.app' + product.productImage.url"
          :alt="product.productName"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width="400"
          height="280"
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

      <!-- Contenu produit avec hauteur flexible mais contrôlée -->
      <div class="flex-1 p-5 flex flex-col">
        <!-- Titre avec hauteur fixe pour 2 lignes max -->
        <h3 class="font-serif text-lg font-semibold text-[#2a2a22] mb-3 line-clamp-2 group-hover:text-[#FFB6B0] transition-colors min-h-[3.5rem] flex items-start">
          {{ product.productName }}
        </h3>
        
        <!-- Prix et étoiles -->
        <div class="flex items-center justify-between mb-4">
          <span class="text-xl font-bold text-[#2a2a22]">
            {{ product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
          </span>
          <div class="flex items-center text-yellow-400">
            <Icon name="lucide:star" class="h-4 w-4 fill-current" />
            <Icon name="lucide:star" class="h-4 w-4 fill-current" />
            <Icon name="lucide:star" class="h-4 w-4 fill-current" />
            <Icon name="lucide:star" class="h-4 w-4 fill-current" />
            <Icon name="lucide:star" class="h-4 w-4 fill-current" />
          </div>
        </div>
        
        <!-- Bouton ajout panier - toujours en bas -->
        <div class="mt-auto">
          <button
            @click.stop="handleAddToCart"
            class="w-full bg-gradient-to-r cursor-pointer from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
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
}>()

const emit = defineEmits<{
  'product-click': [slug: string]
  'add-to-cart': [product: Product]
  'wishlist-toggle': [message: string]
}>()

const { isInWishlist, toggleWishlist } = useWishlist()
const { isLoggedIn } = useAuth()

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