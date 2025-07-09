<template>
  <div class="bg-white overflow-hidden w-full max-w-[300px] mx-auto flex flex-col">
    <div class="relative w-full border-b border-[#000000]" style="padding-top: 100%;">
      <NuxtImg
        :src="props.image || '/placeholder.svg'"
        :alt="props.productName"
        class="absolute top-0 left-0 w-full h-full object-cover"
        width="300"
        height="300"
      />
      <span v-if="props.badge" class="absolute top-2 left-2 bg-[#FFB6B0] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">{{ props.badge }}</span>
      
      <!-- Bouton wishlist -->
      <button
        v-if="props.productId && isLoggedIn"
        @click.stop="handleWishlistToggle"
        :disabled="isWishlistLoading"
        class="absolute top-2 right-2 p-2 flex items-center cursor-pointer bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 disabled:opacity-50"
        :class="{ 'text-red-500': isInWishlist(props.productId), 'text-gray-400': !isInWishlist(props.productId) }"
      >
        <Icon 
          :name="isInWishlist(props.productId) ? 'lucide:heart' : 'lucide:heart'" 
          class="h-5 w-5 transition-all duration-200"
          :class="{ 'fill-current': isInWishlist(props.productId) }"
        />
      </button>
     
    </div>
    
    <div class="p-5 flex-1 flex flex-col justify-between text-center">
      <h3 class="font-serif text-lg font-medium text-[#2a2a22] mb-1">{{ props.productName }}</h3>
      <div v-if="props.description" class="text-[#5a5a52] text-base mb-6 text-left">
        <p
          v-for="(para, i) in props.description.split(/(\r\n|\n|\r){2,}/).filter(p => p.trim() !== '')"
          :key="i"
          class="mb-3 whitespace-pre-line"
        >{{ para }}</p>
      </div>
      
      <div class="text-base font-semibold text-[#5a5a52]">{{ props.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</div>
      
      <button
        class="mt-4 w-full bg-[#FFB6B0] text-white font-semibold py-2 rounded-full hover:bg-[#ff8e7a] transition disabled:opacity-60"
        @click.stop="handleAddToCart"
        :disabled="added"
      >
        {{ added ? 'Ajouté !' : 'Ajouter au panier' }}
      </button>
    </div>

    <!-- Notification wishlist -->
    <div
      v-if="wishlistNotification"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm pointer-events-none animate-pop-in"
    >
      {{ wishlistNotification }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'
import { useWishlist } from '~/composables/useWishlist'
import { useAuth } from '~/composables/useAuth'
import { defineEmits } from 'vue'

const props = defineProps<{
  productName: string,
  image: string,
  price: number,
  slug?: string,
  productId?: number,
  productImageObj?: { url: string, alternativeText?: string },
  badge?: string,
  onAddToCart?: () => void,
  description?: string
}>()

const { addToCart } = useCart()
const { isInWishlist, toggleWishlist, isLoading: isWishlistLoading } = useWishlist()
const { isLoggedIn } = useAuth()

const added = ref(false)
const wishlistNotification = ref('')
const emit = defineEmits(['add-to-cart'])

// Fonction pour ajouter au panier
function handleAddToCart() {
  if (props.onAddToCart) {
    props.onAddToCart()
    added.value = true
    setTimeout(() => { added.value = false }, 1200)
    emit('add-to-cart')
    return
  }
  if (props.productId && props.productName && props.price && props.slug && props.productImageObj) {
    addToCart({
      id: props.productId,
      productName: props.productName,
      price: props.price,
      slug: props.slug,
      productImage: props.productImageObj
    })
    added.value = true
    setTimeout(() => { added.value = false }, 1200)
    emit('add-to-cart')
  }
}

// Fonction pour toggle la wishlist
async function handleWishlistToggle() {
  if (!props.productId || !isLoggedIn.value) return
  
  try {
    const wasInWishlist = isInWishlist(props.productId)
    await toggleWishlist(props.productId)
    
    // Afficher notification
    wishlistNotification.value = wasInWishlist ? 'Retiré de la wishlist' : 'Ajouté à la wishlist'
    setTimeout(() => {
      wishlistNotification.value = ''
    }, 2000)
    
  } catch (error) {
    console.error('Erreur wishlist:', error)
    wishlistNotification.value = 'Erreur lors de la mise à jour'
    setTimeout(() => {
      wishlistNotification.value = ''
    }, 2000)
  }
}
</script>

<style scoped>
.fade-slide-up-enter-active, .fade-slide-up-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-slide-up-enter-from, .fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
.fade-slide-up-enter-to, .fade-slide-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
@keyframes pop-in {
  0% { transform: scale(0.9); opacity: 0; }
  60% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-pop-in {
  animation: pop-in 0.4s;
}
</style>