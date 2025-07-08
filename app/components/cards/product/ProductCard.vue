<script setup lang="ts">
import { useCart } from '~/composables/useCart'
import { defineEmits } from 'vue'

const props = defineProps<{
  productName: string,
  image: string,
  price: number,
  slug?: string,
  productId?: number,
  productImageObj?: { url: string, alternativeText?: string },
  badge?: string,
  onAddToCart?: () => void
}>()

const { addToCart } = useCart()
const added = ref(false)
const emit = defineEmits(['add-to-cart'])

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
</script>

<template>
  <div class="bg-white overflow-hidden w-full max-w-[300px] mx-auto flex flex-col">
    <div class="relative w-full border-b border-[#000000] " style="padding-top: 100%;">
      <NuxtImg
        :src="props.image || '/placeholder.svg'"
        :alt="props.productName"
        class="absolute top-0 left-0 w-full h-full object-cover"
        width="300"
        height="300"
      />
      <span v-if="props.badge" class="absolute top-2 left-2 bg-[#FFB6B0] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">{{ props.badge }}</span>
    </div>
    <div class="p-5 flex-1 flex flex-col justify-between text-center">
      <h3 class="font-serif text-lg font-medium text-[#2a2a22] mb-1">{{ props.productName }}</h3>
      <div class="text-base font-semibold text-[#5a5a52]">{{ props.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</div>
      <button
        class="mt-4 w-full bg-[#FFB6B0] text-white font-semibold py-2 rounded-full hover:bg-[#ff8e7a] transition disabled:opacity-60"
        @click.stop="handleAddToCart"
        :disabled="added"
      >
        {{ added ? 'Ajouté !' : 'Ajouter au panier' }}
      </button>
    </div>
    <!-- Notification ajout panier SUPPRIMÉE pour gestion par parent -->
  </div>
</template>

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