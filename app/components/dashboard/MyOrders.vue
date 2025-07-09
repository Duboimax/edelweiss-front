<template>
  <div class="space-y-6">
    <div>
      <h1 class="font-serif text-3xl font-medium text-[#2a2a22] mb-2">Mes Commandes</h1>
      <p class="text-[#5a5a52]">Suivez le statut de vos commandes et consultez l'historique.</p>
    </div>
    <div v-if="loading" class="text-center py-8 text-[#2a2a22]">Chargement...</div>
    <div v-else-if="error" class="text-center text-red-600 py-8">{{ error }}</div>
    <div v-else class="grid gap-6">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white p-6 border border-[#e6e2d7] rounded-2xl shadow-sm hover:shadow-lg transition-shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div class="flex-1 flex flex-col gap-2">
          <div class="flex items-center gap-3">
            <h3 class="font-medium text-[#2a2a22] text-lg">Commande #{{ order.id }}</h3>
            <span class="px-3 py-1 rounded-full text-xs font-medium" :class="getStatusClass(order.status)">
              {{ order.status }}
            </span>
          </div>
          <p class="text-sm text-[#5a5a52]">Passée le {{ order.date || '—' }}</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <div v-for="item in order.items" :key="item.id" class="flex items-center gap-2 bg-[#f5f2e9] rounded-lg px-3 py-1">
              <img v-if="item.image" :src="'https://edelweiss-back-production.up.railway.app' + item.image" :alt="item.name" class="w-8 h-8 object-cover rounded-md border" />
              <span class="text-[#2a2a22] font-medium">{{ item.name }}</span>
              <span class="text-[#5a5a52]">x{{ item.quantity }}</span>
              <span class="text-[#2a2a22]">{{ item.price }}€</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end gap-2 min-w-[140px]">
          <span class="font-serif text-xl text-[#2a2a22]">Total : {{ order.total }}€</span>
          <button @click="openDetail(order)" class="text-sm text-[#2a2a22] cursor-pointer hover:underline font-medium mt-2">Voir détails</button>
        </div>
      </div>
      <div v-if="orders.length === 0" class="text-center text-[#5a5a52] py-8">Aucune commande pour le moment.</div>
    </div>

    <!-- Drawer/Modal détail commande -->
    <transition name="fade-slide-up">
      <div v-if="showDetail && selectedOrder" class="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/30 backdrop-blur-sm">
        <div class="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full max-w-lg mx-auto p-8 relative animate-pop-in">
          <button @click="closeDetail" class="absolute top-4 right-4 text-[#2a2a22] hover:text-[#FFB6B0] text-xl cursor-pointer font-bold">&times;</button>
          <h2 class="font-serif text-2xl text-[#2a2a22] mb-2">Commande #{{ selectedOrder.id }}</h2>
          <p class="text-[#5a5a52] mb-4">Passée le {{ selectedOrder.date || '—' }}</p>
          <div class="flex flex-col gap-4 mb-6">
            <div v-for="item in selectedOrder.items" :key="item.id" class="flex items-center gap-4 bg-[#f5f2e9] rounded-lg p-3">
              <img v-if="item.image" :src="'https://edelweiss-back-production.up.railway.app' + item.image" :alt="item.name" class="w-14 h-14 object-cover rounded-md border" />
              <div class="flex-1">
                <div class="font-medium text-[#2a2a22]">{{ item.name }}</div>
                <div class="text-[#5a5a52] text-sm">x{{ item.quantity }}</div>
              </div>
              <div class="font-semibold text-[#2a2a22]">{{ item.price }}€</div>
            </div>
          </div>
          <div class="flex justify-between items-center border-t pt-4 mt-4">
            <span class="font-serif text-lg text-[#2a2a22]">Total :</span>
            <span class="font-serif text-2xl text-[#2a2a22]">{{ selectedOrder.total }}€</span>
          </div>
          <div class="mt-4 flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-medium" :class="getStatusClass(selectedOrder.status)">
              {{ selectedOrder.status }}
            </span>
            <span class="text-[#5a5a52] text-sm">Commande #{{ selectedOrder.id }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useOrder } from '~/composables/useOrder'
import { onMounted, ref } from 'vue'

const { fetchUserOrders } = useOrder()
const orders = ref<any[]>([])
const loading = ref(true)
const error = ref('')

const showDetail = ref(false)
const selectedOrder = ref<any | null>(null)

function openDetail(order: any) {
  selectedOrder.value = order
  showDetail.value = true
}
function closeDetail() {
  showDetail.value = false
  selectedOrder.value = null
}

onMounted(async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await fetchUserOrders()
    orders.value = (res.data || []).map((order: any) => ({
      id: order.id,
      date: order.orderDate,
      status: order.statut,
      total: order.price,
      items: Array.isArray(order.products)
        ? order.products.map((p: any) => ({
            id: p.id,
            name: p.productName,
            price: p.price,
            image: p.productImage?.url,
            quantity: 1
          }))
        : [],
    }))
  } catch (e) {
    error.value = (e instanceof Error ? e.message : 'Erreur lors du chargement des commandes.')
  } finally {
    loading.value = false
  }
})

const getStatusClass = (status: string) => {
  const classes = {
    'Livrée': 'bg-green-100 text-green-800',
    'En transit': 'bg-blue-100 text-blue-800',
    'En préparation': 'bg-yellow-100 text-yellow-800',
    'Annulée': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>

<style scoped>
.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-slide-up-enter-from,
.fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
.animate-pop-in {
  animation: pop-in 0.25s cubic-bezier(.4,1.6,.6,1) both;
}
@keyframes pop-in {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
</style>
