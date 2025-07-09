<template>
  <div class="space-y-6">
    <div>
      <h1 class="font-serif text-3xl font-medium text-[#2a2a22] mb-2">Mes Commandes</h1>
      <p class="text-[#5a5a52]">Suivez le statut de vos commandes et consultez l'historique.</p>
    </div>

    <div class="grid gap-4">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white p-6 border border-[#e6e2d7] rounded-lg hover:shadow-sm transition-shadow"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-medium text-[#2a2a22]">Commande #{{ order.id }}</h3>
            <p class="text-sm text-[#5a5a52]">{{ order.date }}</p>
          </div>
          <span 
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="getStatusClass(order.status)"
          >
            {{ order.status }}
          </span>
        </div>
        
        <div class="space-y-2">
          <div v-for="item in order.items" :key="item.id" class="flex justify-between">
            <span class="text-[#5a5a52]">{{ item.name }} x{{ item.quantity }}</span>
            <span class="text-[#2a2a22]">{{ item.price }}€</span>
          </div>
        </div>
        
        <div class="flex justify-between items-center mt-4 pt-4 border-t border-[#e6e2d7]">
          <span class="font-medium text-[#2a2a22]">Total: {{ order.total }}€</span>
          <button class="text-sm text-[#2a2a22] hover:underline">
            Voir détails
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const orders = ref([
  {
    id: '12345',
    date: '15 Décembre 2024',
    status: 'Livrée',
    total: 89.90,
    items: [
      { id: 1, name: 'Écharpe en laine', quantity: 1, price: 45.00 },
      { id: 2, name: 'Bonnet artisanal', quantity: 2, price: 22.45 }
    ]
  },
  {
    id: '12344',
    date: '10 Décembre 2024',
    status: 'En transit',
    total: 156.50,
    items: [
      { id: 3, name: 'Sac brodé main', quantity: 1, price: 156.50 }
    ]
  }
])

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
