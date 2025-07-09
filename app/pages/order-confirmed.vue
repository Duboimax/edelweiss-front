<template>
  <div class="min-h-screen bg-gradient-to-br from-[#fffafd] via-[#fff6fa] to-[#f9f7f2] flex flex-col items-center justify-center py-16 px-4">
    <div class="bg-white rounded-3xl shadow-2xl border border-[#f5f2e9] max-w-lg w-full flex flex-col items-center p-10 md:p-14 animate-pop-in">
      <div class="flex items-center justify-center mb-6">
        <div class="bg-[#FFB6B0]/10 rounded-full p-4 shadow">
          <svg class="w-16 h-16 text-[#FFB6B0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#FFB6B0" stroke-width="2" fill="#fffafd" />
            <path stroke="#FFB6B0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" />
          </svg>
        </div>
      </div>
      <h1 class="font-serif text-3xl md:text-4xl font-bold text-[#2a2a22] mb-3 text-center drop-shadow-xl">
        Merci pour votre commande !
      </h1>
      <p class="text-[#5a5a52] text-lg text-center mb-6 max-w-md">
        Votre paiement a bien été reçu. Nous préparons votre commande avec soin dans notre atelier des Alpes. Un email de confirmation vous a été envoyé.
      </p>
      <div v-if="orderError" class="text-red-600 text-center font-semibold mb-4">
        {{ orderError }}
      </div>
      <NuxtLink to="/shop" class="inline-block bg-[#fff0f6] hover:bg-[#ffe3ed] text-[#2a2a22] text-lg font-semibold px-8 py-3 rounded-full shadow-lg border border-[#ffe3ed] transition-all duration-200 mb-2">Retour à la boutique</NuxtLink>
      <NuxtLink to="/dashboard" class="inline-block text-[#FFB6B0] hover:underline text-base font-medium mt-2">Voir mes commandes</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useCart } from '~/composables/useCart'
import { useOrder } from '~/composables/useOrder'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const sessionId = route.query.session_id // eslint-disable-line @typescript-eslint/no-unused-vars
const { cart, clearCart, total } = useCart()
const { createOrder } = useOrder()
const { currentUser } = useAuth()
const orderError = ref('')

onMounted(async () => {
  // Si le panier est vide, ne rien faire
  if (!cart.value.length) return
  try {
    if (!currentUser.value) throw new Error('Utilisateur non connecté')
    const products = cart.value.map(item => item.id)
    const price = total.value
    const orderDate = new Date().toISOString().slice(0, 10)
    const statut = 'Payée'
    await createOrder({ products, price, orderDate, statut })
    clearCart()
  } catch (e) {
    orderError.value = (e instanceof Error ? e.message : 'Erreur lors de la création de la commande.')
  }
})
</script>

<style scoped>
.animate-pop-in {
  animation: pop-in 0.25s cubic-bezier(.4,1.6,.6,1) both;
}
@keyframes pop-in {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
</style> 