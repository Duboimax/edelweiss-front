<template>
  <div class="min-h-screen bg-gradient-to-br from-[#fffafd] via-[#fff6fa] to-[#f9f7f2] flex flex-col items-center py-12 px-4">
    <div class="bg-white rounded-3xl shadow-2xl border border-[#f5f2e9] max-w-xl w-full p-8 md:p-12 animate-pop-in">
      <h1 class="font-serif text-3xl md:text-4xl font-bold text-[#2a2a22] mb-6 text-center">Adresse de livraison</h1>
      <div v-if="loading" class="text-center py-8 text-[#2a2a22]">Chargement...</div>
      <div v-else>
        <div v-if="addresses.length">
          <h2 class="text-lg font-semibold text-[#2a2a22] mb-2">Mes adresses</h2>
          <div class="space-y-4 mb-6">
            <label v-for="addr in addresses" :key="addr.id" class="flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all"
              :class="selectedAddressId === addr.id ? 'border-[#FFB6B0] bg-[#fffafd]' : 'border-[#e6e2d7] bg-white'">
              <input type="radio" v-model="selectedAddressId" :value="addr.id" class="mt-1 accent-[#FFB6B0]" />
              <div>
                <div class="font-medium text-[#2a2a22]">{{ addr.adresse }}, {{ addr.number }}</div>
                <div class="text-[#5a5a52] text-sm">{{ addr.postal_code }} {{ addr.town }}, {{ addr.country }}</div>
                <div class="text-xs text-[#5a5a52]">{{ addr.instruction }}</div>
              </div>
            </label>
          </div>
        </div>
        <button @click="showNewForm = !showNewForm" class="mb-4 text-[#FFB6B0] hover:underline font-medium">{{ showNewForm ? 'Annuler' : 'Ajouter une nouvelle adresse' }}</button>
        <form v-if="showNewForm" @submit.prevent="handleAddAddress" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="col-span-2">
            <label class="block text-sm font-medium text-[#2a2a22] mb-1">Adresse *</label>
            <input v-model="addressForm.adresse" type="text" class="w-full border border-[#e6e2d7] rounded-lg px-4 py-3 focus:border-[#2a2a22] focus:outline-none" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-[#2a2a22] mb-1">Code postal *</label>
            <input v-model="addressForm.postal_code" type="text" class="w-full border border-[#e6e2d7] rounded-lg px-4 py-3 focus:border-[#2a2a22] focus:outline-none" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-[#2a2a22] mb-1">Ville *</label>
            <input v-model="addressForm.town" type="text" class="w-full border border-[#e6e2d7] rounded-lg px-4 py-3 focus:border-[#2a2a22] focus:outline-none" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-[#2a2a22] mb-1">Pays *</label>
            <input v-model="addressForm.country" type="text" class="w-full border border-[#e6e2d7] rounded-lg px-4 py-3 focus:border-[#2a2a22] focus:outline-none" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-[#2a2a22] mb-1">Numéro *</label>
            <input v-model="addressForm.number" type="text" class="w-full border border-[#e6e2d7] rounded-lg px-4 py-3 focus:border-[#2a2a22] focus:outline-none" required />
          </div>
          <div class="col-span-2">
            <label class="block text-sm font-medium text-[#2a2a22] mb-1">Instructions de livraison</label>
            <input v-model="addressForm.instruction" type="text" class="w-full border border-[#e6e2d7] rounded-lg px-4 py-3 focus:border-[#2a2a22] focus:outline-none" />
          </div>
          <div class="col-span-2 mt-2">
            <button type="submit" class="w-full bg-[#FFB6B0] hover:bg-[#ff8e7a] text-white font-semibold py-3 rounded-lg text-lg transition">Ajouter l'adresse</button>
            <div v-if="addressError" class="text-red-600 text-center font-semibold mt-2">{{ addressError }}</div>
          </div>
        </form>
        <button 
          class="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-neutral-800 transition mb-2 mt-4"
          :disabled="!selectedAddressId || orderLoading"
          @click="handleCheckout"
        >
          {{ orderLoading ? 'Paiement en cours...' : 'Payer et valider la commande' }}
        </button>
        <div v-if="orderError" class="text-red-600 text-center font-semibold mt-2">{{ orderError }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'
import { useAuth } from '~/composables/useAuth'
import { useStrapi } from '~/composables/useStrapi'
import { ref, reactive, onMounted } from 'vue'

const { cart } = useCart()
const { currentUser } = useAuth()
const strapi = useStrapi()

const addresses = ref<any[]>([])
const selectedAddressId = ref<number|null>(null)
const showNewForm = ref(false)
const addressForm = reactive({
  adresse: '',
  postal_code: '',
  town: '',
  country: '',
  number: '',
  instruction: ''
})
const addressError = ref('')
const orderError = ref('')
const orderLoading = ref(false)
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  try {
    if (!currentUser.value) throw new Error('Utilisateur non connecté')
    const res = await strapi.get('adresses', {
      'filters[users_permissions_user][id]': currentUser.value.id
    })
    addresses.value = res.data || []
    if (addresses.value.length) selectedAddressId.value = addresses.value[0].id
  } catch (e) {
    addressError.value = (e instanceof Error ? e.message : 'Erreur lors du chargement des adresses.')
  } finally {
    loading.value = false
  }
})

async function handleAddAddress() {
  addressError.value = ''
  try {
    if (!currentUser.value) throw new Error('Utilisateur non connecté')
    const res = await strapi.post('adresses', {
      data: {
        ...addressForm,
        users_permissions_user: currentUser.value.id
      }
    })
    addresses.value.push(res.data)
    selectedAddressId.value = res.data.id
    showNewForm.value = false
    // reset form
    Object.keys(addressForm).forEach(k => addressForm[k] = '')
  } catch (e) {
    addressError.value = (e instanceof Error ? e.message : 'Erreur lors de l\'ajout de l\'adresse.')
  }
}

async function handleCheckout() {
  orderError.value = ''
  orderLoading.value = true
  try {
    if (!currentUser.value) throw new Error('Utilisateur non connecté')
    if (!cart.value.length) throw new Error('Votre panier est vide.')
    const address = addresses.value.find(a => a.id === selectedAddressId.value)
    if (!address) throw new Error('Aucune adresse sélectionnée')
    const response = await $fetch('/api/stripe', {
      method: 'POST',
      body: {
        products: cart.value.map(item => ({
          id: item.id,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
        })),
        userId: currentUser.value.id,
        address,
      },
    })
    if (response.url) {
      window.location.href = response.url
    } else {
      orderError.value = response.error || 'Erreur lors de la création de la session de paiement.'
    }
  } catch (e) {
    orderError.value = (e instanceof Error ? e.message : 'Erreur lors de la commande.')
  } finally {
    orderLoading.value = false
  }
}
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