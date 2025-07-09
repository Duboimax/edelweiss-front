<template>
  <div class="product-page bg-gradient-to-br from-[#fffafd] via-[#fff6fa] to-[#f9f7f2] min-h-screen py-10">
    <div class="container mx-auto px-4 max-w-5xl">
      <Breadcrumb :items="[
        { label: 'Accueil', to: '/' },
        { label: 'Boutique', to: '/shop' },
        { label: product?.productName || 'Produit', to: null }
      ]" />
      <div class="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
        <!-- Image produit -->
        <div class="flex-1 flex flex-col items-center md:items-start">
          <div class="relative group w-full max-w-md aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              v-if="product?.productImage?.url"
              :src="'https://edelweiss-back-production.up.railway.app' + product.productImage.url"
              :alt="product.productImage.alternativeText || product.productName"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">Aucune image</div>
          </div>
          <div v-if="product?.collection?.collectionName" class="mt-4 inline-block px-4 py-1 rounded-full bg-[#FFB6B0] text-white text-xs font-semibold tracking-wide">
            {{ product.collection.collectionName }}
          </div>
        </div>
        <!-- Infos produit -->
        <div class="flex-1 flex flex-col gap-6">
          <h1 class="font-serif text-3xl md:text-4xl font-bold text-[#2a2a22] mb-2">{{ product.productName }}</h1>
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl font-semibold text-[#2a2a22]">{{ product.price?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</span>
            <div class="flex items-center gap-1 ml-2">
              <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= averageStars }">★</span>
            </div>
            <span v-if="feedbacks.length" class="text-[#5a5a52] text-sm ml-2">({{ feedbacks.length }} avis)</span>
          </div>
          <div class="flex flex-col gap-2">
            <button
              class="w-full bg-[#FFB6B0] text-white font-bold py-3 rounded-full text-lg shadow-lg hover:bg-[#ff8e7a] transition-all duration-200 active:scale-95 cursor-pointer"
              @click="handleAddToCart"
              :disabled="added"
            >
              <span v-if="added">Ajouté !</span>
              <span v-else>Ajouter au panier</span>
            </button>
            <transition name='fade-slide-up'>
              <div v-if="added" class="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 bg-[#2a2a22] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-pop-in">
                <Icon name="lucide:check-circle" class="w-5 h-5 text-[#FFB6B0]" />
                Produit ajouté au panier !
              </div>
            </transition>
          </div>
          <div class="text-base text-neutral-700 leading-relaxed mt-4">
            <p v-if="!showFullDesc">
              {{ truncatedDescription }}<span v-if="isTruncated">…</span>
            </p>
            <p v-else>
              {{ product.productDescription }}
            </p>
            <button
              v-if="isTruncated"
              @click="showFullDesc = !showFullDesc"
              class="mt-2 text-sm text-[#FFB6B0] underline hover:opacity-70 transition cursor-pointer"
            >
              {{ showFullDesc ? 'Voir moins' : 'Voir plus' }}
            </button>
          </div>
        </div>
      </div>
      <!-- Section avis -->
      <div class="mt-16 max-w-2xl mx-auto w-full">
        <h2 class="font-serif text-2xl text-[#2a2a22] mb-4">Avis sur ce produit</h2>
        <div v-if="feedbacks.length === 0" class="text-[#5a5a52] mb-4">Aucun avis pour ce produit.</div>
        <div v-else class="space-y-4 mb-6">
          <div v-for="fb in feedbacks" :key="fb.id" class="bg-[#f5f2e9] rounded-xl p-5 flex flex-col gap-2 shadow-sm">
            <div class="flex items-center gap-2 mb-1">
              <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= fb.stars }">★</span>
            </div>
            <div class="text-[#2a2a22] text-lg font-medium">{{ fb.feedback }}</div>
            <div class="text-xs text-[#5a5a52]">Posté le {{ fb.feedDate }}</div>
          </div>
        </div>
        <div v-if="canLeaveFeedback">
          <form @submit.prevent="submitFeedback" class="bg-white border border-[#e6e2d7] rounded-xl p-6 flex flex-col gap-4 shadow">
            <div class="flex items-center gap-2 mb-2">
              <span v-for="n in 5" :key="n" class="star cursor-pointer" :class="{ filled: n <= feedbackStars }" @click="feedbackStars = n">★</span>
              <span class="text-[#FFB6B0] text-sm ml-2">{{ feedbackStars }}/5</span>
            </div>
            <textarea v-model="feedbackText" rows="3" class="border border-[#e6e2d7] rounded-lg p-2 focus:outline-none focus:border-[#FFB6B0] resize-none" placeholder="Laisse ton avis..." />
            <button type="submit" class="bg-[#FFB6B0] text-white font-semibold py-2 rounded-full hover:bg-[#ff8e7a] transition cursor-pointer" :disabled="feedbackLoading || !feedbackText || !feedbackStars">
              {{ feedbackLoading ? 'Envoi...' : 'Envoyer mon avis' }}
            </button>
            <div v-if="feedbackSuccess" class="text-green-600 text-sm">Merci pour ton avis !</div>
            <div v-if="feedbackError" class="text-red-600 text-sm">{{ feedbackError }}</div>
          </form>
        </div>
        <div v-else class="text-[#5a5a52] text-sm mt-2">Tu dois avoir acheté ce produit pour laisser un avis.</div>
      </div>
      <!-- Suggestions -->
      <div v-if="otherProducts.length" class="mt-20">
        <h2 class="font-serif text-2xl text-[#2a2a22] mb-8 text-center">Tu pourrais aussi aimer</h2>
        <div class="overflow-x-auto pb-2">
          <div class="flex gap-6 min-w-[320px]">
            <ProductCard
              v-for="p in otherProducts"
              :key="p.id"
              :productName="p.productName"
              :image="'https://edelweiss-back-production.up.railway.app' + p.productImage.url"
              :price="p.price"
              :slug="p.slug"
              :productId="p.id"
              :productImageObj="p.productImage"
              @click="$router.push(`/product/${p.slug}`)"
              @add-to-cart="() => handleAddToCartOther(p)"
              class="cursor-pointer transition hover:opacity-90 min-w-[220px]"
            />
          </div>
        </div>
        <transition name='fade-slide-up'>
          <div v-if="addedOther" class="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 bg-[#2a2a22] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-pop-in">
            <Icon name="lucide:check-circle" class="w-5 h-5 text-[#FFB6B0]" />
            Produit ajouté au panier !
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '~/components/cards/product/ProductCard.vue'
import { useCart } from '~/composables/useCart'
import { useOrder } from '~/composables/useOrder'
import { useAuth } from '~/composables/useAuth'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'
const route = useRoute()
const strapi = useStrapi()

interface Product {
  id: number
  productName: string
  productDescription: string
  price: number
  collection : {
    collectionName: string
  }
  productImage: {
    url: string
    alternativeText?: string
  }
  slug: string
}

const { data: product, pending } = await useAsyncData('product', () =>
  strapi.get<{ data: Product[] }>('products', {
    'filters[slug][$eq]': route.params.slug,
    pLevel: 4,
  }).then(res => res.data?.[0] || null)
)

const { data: allProducts } = await useAsyncData('all-products', () =>
  strapi.get<{ data: Product[] }>('products', { pLevel: 5 }).then(res => res.data || [])
)

const otherProducts = computed(() => {
  if (!allProducts.value || !product.value) return []
  const filtered = allProducts.value.filter(p => p.slug !== product.value.slug)
  return filtered.sort(() => 0.5 - Math.random()).slice(0, 8)
})

const showFullDesc = ref(false)
const isTruncated = computed(() => product.value?.productDescription.length > 400)
const truncatedDescription = computed(() =>
  product.value?.productDescription.slice(0, 400)
)

// Panier
const { addToCart } = useCart()
const added = ref(false)
function handleAddToCart() {
  if (!product.value) return
  addToCart({
    id: product.value.id,
    productName: product.value.productName,
    price: product.value.price,
    slug: product.value.slug,
    productImage: product.value.productImage
  })
  added.value = true
  setTimeout(() => { added.value = false }, 1200)
}

const addedOther = ref(false)
function handleAddToCartOther(p: any) {
  addToCart({
    id: p.id,
    productName: p.productName,
    price: p.price,
    slug: p.slug,
    productImage: p.productImage
  })
  addedOther.value = true
  setTimeout(() => { addedOther.value = false }, 1200)
}

const { fetchUserOrders } = useOrder()
const { currentUser } = useAuth()

const feedbacks = ref<any[]>([])
const feedbackText = ref('')
const feedbackLoading = ref(false)
const feedbackError = ref('')
const feedbackSuccess = ref(false)
const canLeaveFeedback = ref(false)
const feedbackStars = ref(0)

const averageStars = computed(() => {
  if (!feedbacks.value.length) return 0
  return (
    feedbacks.value.reduce((sum, fb) => sum + (fb.stars || 0), 0) / feedbacks.value.length
  ).toFixed(1)
})

// Récupérer les feedbacks du produit
async function fetchFeedbacks() {
  if (!product.value) return
  const res = await strapi.get<{ data: any[] }>('feedbacks', {
    'filters[product][id]': product.value.id,
    'sort': 'feedDate:desc',
  })
  feedbacks.value = (res.data || []).map(fb => ({
    id: fb.id,
    feedback: fb.feedback,
    feedDate: fb.feedDate,
    stars: fb.stars ?? 0,
  }))
}

// Vérifier si l'utilisateur a acheté ce produit
async function checkCanLeaveFeedback() {
  if (!currentUser.value || !product.value) return
  try {
    const res = await fetchUserOrders()
    const allProductIds = (res.data || []).flatMap((order: any) =>
      Array.isArray(order.products) ? order.products.map((p: any) => p.id) : []
    )
    canLeaveFeedback.value = allProductIds.includes(product.value.id)
  } catch {
    canLeaveFeedback.value = false
  }
}

onMounted(async () => {
  await fetchFeedbacks()
  await checkCanLeaveFeedback()
})

// Envoyer un feedback
async function submitFeedback() {
  if (!product.value || !feedbackText.value || !feedbackStars.value) return
  feedbackLoading.value = true
  feedbackError.value = ''
  try {
    await strapi.post('feedbacks', {
      data: {
        product: product.value.id,
        feedback: feedbackText.value,
        feedDate: new Date().toISOString().slice(0, 10),
        stars: feedbackStars.value,
      }
    })
    feedbackText.value = ''
    feedbackStars.value = 0
    feedbackSuccess.value = true
    await fetchFeedbacks()
    setTimeout(() => { feedbackSuccess.value = false }, 2000)
  } catch (e) {
    feedbackError.value = 'Erreur lors de l\'envoi de l\'avis.'
  } finally {
    feedbackLoading.value = false
  }
}
</script>

<style scoped>
.product-page {
  font-family: 'Inter', 'Helvetica Neue', Arial, 'sans-serif';
}
.star {
  font-size: 1.5rem;
  color: #e5e5e5;
  transition: color 0.2s;
  user-select: none;
}
.star.filled {
  color: #FFB6B0;
  text-shadow: 0 1px 4px #ffb6b055;
}
.star.cursor-pointer {
  cursor: pointer;
}
.container {
  max-width: 1200px;
}
</style>
  