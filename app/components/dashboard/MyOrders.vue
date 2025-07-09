<template>
  <div class="p-8 space-y-8">
    <!-- Header Section avec effet glassmorphism -->
    <div class="relative overflow-hidden bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-sm rounded-3xl p-8 border border-[#e6e2d7]/50">
      <!-- Décoration subtile -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-[#FFB6B0]/10 rounded-full blur-2xl"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-[#2a2a22]/5 rounded-full blur-xl"></div>
      
      <div class="relative z-10 flex items-center justify-between">
        <div>
          <h1 class="font-serif text-4xl font-bold text-[#2a2a22] mb-3">Mes Commandes</h1>
          <p class="text-lg text-[#5a5a52] max-w-lg">
            Suivez le statut de vos commandes et consultez votre historique d'achats
          </p>
        </div>
        <div class="hidden md:flex items-center space-x-4">
          <div class="h-20 w-20 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-xl">
            <Icon name="lucide:shopping-bag" class="h-10 w-10 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- États de chargement et erreur -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FFB6B0] mb-6"></div>
      <p class="text-lg text-[#5a5a52] font-medium">Chargement de vos commandes...</p>
    </div>

    <div v-else-if="error" class="bg-red-50/80 backdrop-blur-sm rounded-3xl p-8 border border-red-200 text-center">
      <Icon name="lucide:alert-circle" class="h-16 w-16 text-red-500 mx-auto mb-4" />
      <h3 class="text-xl font-bold text-red-700 mb-2">Erreur de chargement</h3>
      <p class="text-red-600 mb-6">{{ error }}</p>
      <button 
        @click="$emit('retry')"
        class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-medium transition-colors"
      >
        Réessayer
      </button>
    </div>

    <!-- Liste des commandes -->
    <div v-else class="space-y-6">
      <!-- Commande card -->
      <div
        v-for="order in orders"
        :key="order.id"
        class="group bg-white/70 backdrop-blur-sm rounded-3xl border border-[#e6e2d7] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
      >
        <!-- Header de la commande -->
        <div class="p-6 border-b border-[#e6e2d7]/50 bg-gradient-to-r from-[#f9f7f2] to-[#faf8f5]">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="h-12 w-12 rounded-full bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] flex items-center justify-center shadow-lg">
                <Icon name="lucide:package" class="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 class="font-serif text-xl font-bold text-[#2a2a22]">Commande #{{ order.id }}</h3>
                <p class="text-sm text-[#5a5a52] flex items-center gap-2">
                  <Icon name="lucide:calendar" class="h-4 w-4" />
                  Passée le {{ order.date || '—' }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span 
                class="px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                :class="getStatusClass(order.status)"
              >
                {{ order.status }}
              </span>
              <div class="text-right">
                <p class="text-sm text-[#5a5a52]">Total</p>
                <p class="font-serif text-2xl font-bold text-[#2a2a22]">{{ order.total }}€</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Produits de la commande -->
        <div class="p-6">
          <div class="grid gap-4">
            <div 
              v-for="item in order.items" 
              :key="item.id"
              class="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-[#e6e2d7]/30 hover:bg-white/80 transition-all duration-300"
            >
              <!-- Image produit -->
              <div class="relative">
                <img 
                  v-if="item.image" 
                  :src="'https://edelweiss-back-production.up.railway.app' + item.image" 
                  :alt="item.name" 
                  class="w-16 h-16 object-cover rounded-xl border-2 border-white shadow-lg"
                />
                <div v-else class="w-16 h-16 bg-[#f5f2e9] rounded-xl flex items-center justify-center">
                  <Icon name="lucide:image" class="h-8 w-8 text-[#5a5a52]" />
                </div>
                <!-- Badge quantité -->
                <div class="absolute -top-2 -right-2 h-6 w-6 bg-[#FFB6B0] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                  {{ item.quantity }}
                </div>
              </div>

              <!-- Infos produit -->
              <div class="flex-1">
                <h4 class="font-semibold text-[#2a2a22] text-lg mb-1">{{ item.name }}</h4>
                <div class="flex items-center gap-4 text-sm text-[#5a5a52]">
                  <span class="flex items-center gap-1">
                    <Icon name="lucide:package" class="h-4 w-4" />
                    Quantité: {{ item.quantity }}
                  </span>
                  <span class="flex items-center gap-1">
                    <Icon name="lucide:euro" class="h-4 w-4" />
                    {{ item.price }}€ / unité
                  </span>
                </div>
              </div>

              <!-- Prix total item -->
              <div class="text-right">
                <p class="text-sm text-[#5a5a52]">Sous-total</p>
                <p class="font-bold text-[#2a2a22] text-lg">{{ (item.price * item.quantity).toFixed(2) }}€</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-6 pt-6 border-t border-[#e6e2d7]/50 flex justify-between items-center">
            <div class="flex items-center gap-2">
              <div 
                class="h-3 w-3 rounded-full"
                :class="getStatusDotClass(order.status)"
              ></div>
              <span class="text-sm font-medium text-[#5a5a52]">
                Statut: {{ order.status }}
              </span>
            </div>
            <button 
              @click="openDetail(order)"
              class="group/btn bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] hover:from-[#3a3a32] hover:to-[#4a4a42] text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
            >
              <span class="flex items-center gap-2">
                Voir détails
                <Icon name="lucide:external-link" class="h-4 w-4 group-hover/btn:rotate-45 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- État vide -->
      <div v-if="orders.length === 0" class="text-center py-16">
        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-[#e6e2d7] shadow-xl max-w-md mx-auto">
          <div class="h-24 w-24 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Icon name="lucide:shopping-cart" class="h-12 w-12 text-white" />
          </div>
          <h3 class="font-serif text-2xl font-bold text-[#2a2a22] mb-3">Aucune commande</h3>
          <p class="text-[#5a5a52] mb-6">Vous n'avez pas encore passé de commande</p>
          <button 
            @click="$emit('go-shopping')"
            class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white px-8 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <span class="flex items-center gap-2">
              <Icon name="lucide:shopping-bag" class="h-5 w-5" />
              Découvrir nos produits
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal détail commande -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="showDetail && selectedOrder" 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        @click.self="closeDetail"
      >
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-auto overflow-hidden">
          <!-- Header modal -->
          <div class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="font-serif text-2xl font-bold">Commande #{{ selectedOrder.id }}</h2>
                <p class="text-white/90 flex items-center gap-2 mt-1">
                  <Icon name="lucide:calendar" class="h-4 w-4" />
                  {{ selectedOrder.date || '—' }}
                </p>
              </div>
              <button 
                @click="closeDetail" 
                class="p-2 hover:bg-white/20 rounded-full flex items-center transition-colors cursor-pointer"
              >
                <Icon name="lucide:x" class="h-6 w-6" />
              </button>
            </div>
          </div>

          <!-- Contenu modal -->
          <div class="p-6 max-h-[60vh] overflow-y-auto">
            <!-- Produits -->
            <div class="space-y-4 mb-6">
              <h3 class="font-serif text-lg font-bold text-[#2a2a22] flex items-center gap-2">
                <Icon name="lucide:package" class="h-5 w-5" />
                Produits commandés
              </h3>
              <div class="space-y-3">
                <div 
                  v-for="item in selectedOrder.items" 
                  :key="item.id"
                  class="flex items-center gap-4 p-4 bg-[#f9f7f2] rounded-2xl"
                >
                  <img 
                    v-if="item.image" 
                    :src="'https://edelweiss-back-production.up.railway.app' + item.image" 
                    :alt="item.name" 
                    class="w-16 h-16 object-cover rounded-xl border-2 border-white shadow-md"
                  />
                  <div class="flex-1">
                    <h4 class="font-semibold text-[#2a2a22]">{{ item.name }}</h4>
                    <p class="text-sm text-[#5a5a52]">Quantité: {{ item.quantity }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-[#5a5a52]">Prix unitaire</p>
                    <p class="font-bold text-[#2a2a22]">{{ item.price }}€</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Résumé -->
            <div class="bg-gradient-to-r from-[#f9f7f2] to-[#faf8f5] rounded-2xl p-6">
              <div class="flex justify-between items-center mb-4">
                <span class="font-serif text-lg font-bold text-[#2a2a22]">Total de la commande</span>
                <span class="font-serif text-3xl font-bold text-[#2a2a22]">{{ selectedOrder.total }}€</span>
              </div>
              <div class="flex items-center justify-center gap-3">
                <span 
                  class="px-4 py-2 rounded-full text-sm font-bold"
                  :class="getStatusClass(selectedOrder.status)"
                >
                  {{ selectedOrder.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
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

// Événements
const emit = defineEmits(['retry', 'go-shopping'])

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
    'Livrée': 'bg-green-100 text-green-800 border-green-200',
    'En transit': 'bg-blue-100 text-blue-800 border-blue-200',
    'En préparation': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Annulée': 'bg-red-100 text-red-800 border-red-200'
  }
  return (classes[status] || 'bg-gray-100 text-gray-800 border-gray-200') + ' border'
}

const getStatusDotClass = (status: string) => {
  const classes = {
    'Livrée': 'bg-green-500',
    'En transit': 'bg-blue-500',
    'En préparation': 'bg-yellow-500',
    'Annulée': 'bg-red-500'
  }
  return classes[status] || 'bg-gray-500'
}
</script>

<style scoped>
/* Animation personnalisée pour les cards */
.group:hover {
  transform: translateY(-4px);
}

/* Scrollbar personnalisée pour la modal */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #FFB6B0;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ff8e7a;
}
</style>