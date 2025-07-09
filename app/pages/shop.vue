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
  <div class="bg-gradient-to-br from-[#fffafd] via-[#fff6fa] to-[#f9f7f2] min-h-screen">
    <div class="container mx-auto px-4 md:px-6 py-12">
      <div class="container mx-auto px-4 max-w-5xl mt-8">
        <Breadcrumb :items="[
          { label: 'Accueil', to: '/' },
          { label: 'Boutique', to: null }
        ]" />
      </div>
      <h1 class="font-serif text-4xl font-medium tracking-tight text-[#2a2a22] mb-8 text-center">Boutique</h1>

      <div class="flex flex-col md:flex-row gap-10">
        <!-- Sidebar filtres -->
        <aside class="md:w-1/4 w-full">
          <div class="bg-white rounded-xl shadow-md p-6 border border-[#dcdcd4]">
            <!-- Catégories -->
            <div class="mb-6">
              <h2 class="text-lg font-semibold text-[#2a2a22] mb-2">Catégories</h2>
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm text-[#2a2a22]">
                  <input type="radio" v-model="selectedCollection" :value="null" class="form-radio text-[#FFB6B0]" />
                  Toutes les catégories
                </label>
                <label
                  v-for="cat in collections"
                  :key="cat.id"
                  class="flex items-center gap-2 text-sm text-[#2a2a22]"
                >
                  <input type="radio" v-model="selectedCollection" :value="cat.collectionName" class="form-radio text-[#FFB6B0]" />
                  {{ cat.collectionName }}
                </label>
              </div>
            </div>

            <!-- Tri par prix -->
            <div class="mb-6">
              <h2 class="text-lg font-semibold text-[#2a2a22] mb-2">Trier par prix</h2>
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm text-[#2a2a22]">
                  <input type="radio" v-model="sortOrder" :value="null" class="form-radio text-[#FFB6B0]" />
                  Par défaut
                </label>
                <label class="flex items-center gap-2 text-sm text-[#2a2a22]">
                  <input type="radio" v-model="sortOrder" value="asc" class="form-radio text-[#FFB6B0]" />
                  Prix croissant
                </label>
                <label class="flex items-center gap-2 text-sm text-[#2a2a22]">
                  <input type="radio" v-model="sortOrder" value="desc" class="form-radio text-[#FFB6B0]" />
                  Prix décroissant
                </label>
              </div>
            </div>
          </div>
        </aside>

        <!-- Liste des produits -->
        <main class="md:w-3/4 w-full">
          <div v-if="pending" class="flex justify-center items-center min-h-[300px]">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a2a22]"></div>
          </div>

          <div v-else-if="error" class="text-center text-red-600 py-12">
            Erreur lors du chargement des produits.
          </div>

          <div v-else>
            <div class="mb-4 text-sm text-[#2a2a22] font-medium">
              {{ sortedProducts.length }} produit{{ sortedProducts.length > 1 ? 's' : '' }} trouvé{{ sortedProducts.length > 1 ? 's' : '' }}.
            </div>

            <div
              v-if="sortedProducts.length > 0"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <div
                v-for="(product, i) in sortedProducts"
                :key="product.id"
                @click="goToProduct(product.slug)"
                class="cursor-pointer"
              >
                <ProductCard
                  :productName="product.productName"
                  :image="'https://edelweiss-back-production.up.railway.app' + product.productImage.url"
                  :price="product.price"
                  :slug="product.slug"
                  :productId="product.id"
                  :productImageObj="product.productImage"
                  :badge="getBadge(product, i)"
                  @click.stop="goToProduct(product.slug)"
                />
              </div>
            </div>

            <div v-else class="text-center py-12">
              <p class="text-gray-600">Aucun produit disponible dans cette sélection.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
