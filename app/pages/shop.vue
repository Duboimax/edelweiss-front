<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted, watch, watchEffect } from 'vue'
import ProductCard from '~/components/cards/product/ProductCard.vue'
import { useCart } from '~/composables/useCart'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'

const strapi = useStrapi()

interface Product {
  id: number
  productName: string
  productImage: {
    url: string
    alternativeText?: string
  }
  price: number
  slug: string
  collection?: {
    collectionName: string
  }
}

const { data: products, pending, error } = useLazyAsyncData('products', () =>
  strapi.get<{ data: Product[] }>('products', { pLevel: 5 }).then((res) => res.data || [])
)

// Fetch collections (catégories)
const { data: collections } = useLazyAsyncData('collections', () =>
  strapi.get<{ data: { id: number, collectionName: string }[] }>('collections', {})
    .then(res => res.data || [])
)

const selectedCollection = ref<string | null>(null)
const route = useRoute()

// Synchronise le filtre avec l'URL et les collections chargées
watchEffect(() => {
  const collectionParam = route.query.collection
  if (collectionParam && typeof collectionParam === 'string' && collections.value) {
    // On ne sélectionne que si la collection existe dans la liste
    const found = collections.value.find(c => c.collectionName === collectionParam)
    if (found) {
      selectedCollection.value = found.collectionName
    } else {
      selectedCollection.value = null
    }
  }
})

const sortOrder = ref<'asc' | 'desc' | null>(null)
const filteredProducts = computed(() => {
  if (!products.value) return []
  if (!selectedCollection.value) return products.value
  return products.value.filter(p => p.collection?.collectionName === selectedCollection.value)
})
const sortedProducts = computed(() => {
  if (!filteredProducts.value) return []
  if (!sortOrder.value) return filteredProducts.value
  return [...filteredProducts.value].sort((a, b) =>
    sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price
  )
})

const router = useRouter()
const { addToCart } = useCart()

function goToProduct(slug: string) {
  router.push(`/product/${slug}`)
}

function getBadge(product: Product, index: number) {
  if (index === 0) return 'Coup de cœur'
  if (index < 3) return 'Nouveau'
  return ''
}
</script>

<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-4 max-w-5xl mt-8">
      <Breadcrumb :items="[
        { label: 'Accueil', to: '/' },
        { label: 'Boutique', to: null }
      ]" />
    </div>
    <div class="bg-gradient-to-br from-[#fffafd] via-[#fff6fa] to-[#f9f7f2] w-full">
      <div class="container mx-auto px-4 md:px-6 py-12">
        <h1 class="font-serif text-4xl font-bold tracking-tight text-[#2a2a22] mb-10 text-center drop-shadow-sm">Boutique</h1>
        <div class="flex flex-col md:flex-row gap-10">
          <!-- Sidebar filtres -->
          <aside class="md:w-1/4 w-full">
            <div class="bg-white rounded-2xl shadow-xl p-8 border border-[#f3e7e7] mt-4 sticky top-10">
              <!-- Catégories -->
              <div class="mb-8">
                <h2 class="text-xs font-bold text-[#FFB6B0] uppercase tracking-widest mb-4">Catégories</h2>
                <div class="space-y-3">
                  <label class="flex items-center gap-3 text-base text-[#2a2a22] cursor-pointer">
                    <input type="radio" v-model="selectedCollection" :value="null" class="accent-[#FFB6B0] w-4 h-4" />
                    <span :class="{'font-semibold text-[#FFB6B0]': !selectedCollection}">Toutes les catégories</span>
                  </label>
                  <label
                    v-for="cat in collections"
                    :key="cat.id"
                    class="flex items-center gap-3 text-base text-[#2a2a22] cursor-pointer"
                  >
                    <input type="radio" v-model="selectedCollection" :value="cat.collectionName" class="accent-[#FFB6B0] w-4 h-4" />
                    <span :class="{'font-semibold text-[#FFB6B0]': selectedCollection === cat.collectionName}">{{ cat.collectionName }}</span>
                  </label>
                </div>
              </div>

              <!-- Tri par prix -->
              <div class="mb-2">
                <h2 class="text-xs font-bold text-[#FFB6B0] uppercase tracking-widest mb-4">Trier par prix</h2>
                <div class="space-y-3">
                  <label class="flex items-center gap-3 text-base text-[#2a2a22] cursor-pointer">
                    <input type="radio" v-model="sortOrder" :value="null" class="accent-[#FFB6B0] w-4 h-4" />
                    <span :class="{'font-semibold text-[#FFB6B0]': !sortOrder}">Par défaut</span>
                  </label>
                  <label class="flex items-center gap-3 text-base text-[#2a2a22] cursor-pointer">
                    <input type="radio" v-model="sortOrder" value="asc" class="accent-[#FFB6B0] w-4 h-4" />
                    <span :class="{'font-semibold text-[#FFB6B0]': sortOrder === 'asc'}">Prix croissant</span>
                  </label>
                  <label class="flex items-center gap-3 text-base text-[#2a2a22] cursor-pointer">
                    <input type="radio" v-model="sortOrder" value="desc" class="accent-[#FFB6B0] w-4 h-4" />
                    <span :class="{'font-semibold text-[#FFB6B0]': sortOrder === 'desc'}">Prix décroissant</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <!-- Liste des produits -->
          <main class="md:w-3/4 w-full">
            <div v-if="pending" class="flex justify-center items-center min-h-[300px]">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB6B0]"></div>
            </div>

            <div v-else-if="error" class="text-center text-red-600 py-12">
              <div class="inline-flex flex-col items-center gap-2">
                <Icon name="lucide:alert-circle" class="w-8 h-8 text-[#FFB6B0]" />
                <span>Erreur lors du chargement des produits.</span>
              </div>
            </div>

            <div v-else>
              <div class="mb-6 flex items-center gap-3">
                <span class="inline-block bg-[#FFB6B0]/10 text-[#FFB6B0] font-semibold px-4 py-1 rounded-full text-xs">
                  {{ sortedProducts.length }} produit{{ sortedProducts.length > 1 ? 's' : '' }} trouvé{{ sortedProducts.length > 1 ? 's' : '' }}
                </span>
              </div>

              <div
                v-if="sortedProducts.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <div
                  v-for="(product, i) in sortedProducts"
                  :key="product.id"
                  @click="goToProduct(product.slug)"
                  class="cursor-pointer group"
                >
                  <div class="bg-white rounded-2xl shadow-lg border border-[#f3e7e7] flex flex-col transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 h-full min-h-[420px]">
                    <div class="relative w-full aspect-square overflow-hidden rounded-t-2xl">
                      <img
                        :src="'https://edelweiss-back-production.up.railway.app' + product.productImage.url"
                        :alt="product.productName"
                        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span v-if="getBadge(product, i)" class="absolute top-4 left-4 bg-[#FFB6B0] text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
                        {{ getBadge(product, i) }}
                      </span>
                    </div>
                    <div class="flex-1 flex flex-col justify-between p-6 min-h-[120px]">
                      <h3 class="font-serif text-lg font-bold text-[#2a2a22] mb-2 line-clamp-2 min-h-[48px]">{{ product.productName }}</h3>
                      <div class="text-base font-semibold text-[#5a5a52] mb-4">{{ product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</div>
                      <button
                        class="w-full bg-[#FFB6B0] text-white font-semibold py-2 rounded-full shadow-md hover:bg-[#ff8e7a] transition-all duration-200 active:scale-95"
                        @click.stop="addToCart(product)"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-16 flex flex-col items-center gap-4">
                <Icon name="lucide:package" class="w-12 h-12 text-[#FFB6B0]" />
                <p class="text-[#5a5a52] text-lg">Aucun produit disponible dans cette sélection.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
