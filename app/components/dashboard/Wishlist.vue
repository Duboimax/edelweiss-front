<template>
  <div class="space-y-6">
    <div>
      <h1 class="font-serif text-3xl font-medium text-[#2a2a22] mb-2">Ma Wishlist</h1>
      <p class="text-[#5a5a52]">Vos articles favoris sauvegardés pour plus tard.</p>
    </div>

    <div v-if="wishlistItems.length === 0" class="text-center py-12">
      <div class="max-w-md mx-auto">
        <div class="mb-6">
          <Icon name="lucide:heart" class="h-24 w-24 text-[#e6e2d7] mx-auto mb-4" />
          <h3 class="font-serif text-xl text-[#2a2a22] mb-2">Votre wishlist est vide</h3>
          <p class="text-[#5a5a52] leading-relaxed">
            Vous n'avez pas encore ajouté d'articles à votre liste de souhaits. 
            Découvrez nos créations artisanales et ajoutez vos favoris !
          </p>
        </div>
        
        <div class="space-y-3">
          <NuxtLink 
            to="/shop" 
            class="inline-block bg-[#2a2a22] text-white px-6 py-3 rounded-none hover:bg-[#3a3a32] transition-colors font-medium"
          >
            Parcourir la boutique
          </NuxtLink>
          
          <div class="text-sm text-[#5a5a52]">
            ou découvrez nos 
            <NuxtLink to="/collections" class="text-[#2a2a22] hover:underline font-medium">
              collections
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in wishlistItems"
        :key="item.id"
        class="bg-white border border-[#e6e2d7] rounded-lg overflow-hidden group hover:shadow-sm transition-shadow"
      >
        <div class="aspect-square bg-[#f5f2e9] relative">
          <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
          <button 
            @click="removeFromWishlist(item.id)"
            class="absolute top-2 right-2 bg-white p-1 rounded-full cursor-pointer shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Icon name="lucide:x" class=" text-[#5a5a52]" />
          </button>
        </div>
        
        <div class="p-4">
          <h3 class="font-medium text-[#2a2a22] mb-2">{{ item.name }}</h3>
          <p class="text-[#5a5a52] text-sm mb-3">{{ item.description }}</p>
          <div class="flex justify-between items-center">
            <span class="font-semibold text-[#2a2a22]">{{ item.price }}€</span>
            <button class="bg-[#2a2a22] text-white cursor-pointer px-4 py-2 rounded-none text-sm hover:bg-[#3a3a32] transition-colors">
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const wishlistItems = ref([
  
  {
    id: 1,
    name: 'Écharpe en laine merino',
    description: 'Écharpe tricotée main en laine merino douce',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Sac brodé artisanal',
    description: 'Sac en toile avec broderie florale unique',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop'
  }
])

const removeFromWishlist = (id: number) => {
  wishlistItems.value = wishlistItems.value.filter(item => item.id !== id)
}
</script>