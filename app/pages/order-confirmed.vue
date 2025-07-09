<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
    <div class="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
      <svg class="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 class="text-3xl font-bold text-green-700 mb-2">
        Commande confirmée !
      </h1>
      <p class="text-lg text-gray-700 mb-6">
        Merci pour votre achat. Un email de confirmation vous a été envoyé.
      </p>
      <div v-if="orderError" class="text-red-600 text-center font-semibold mb-4">
        {{ orderError }}
      </div>
      <NuxtLink to="/dashboard" class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition">Voir mes commandes</NuxtLink>
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