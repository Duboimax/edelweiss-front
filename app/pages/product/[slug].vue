<template>
  <div class="product-page relative min-h-screen overflow-hidden">
    <!-- Arrière-plan avec dégradés animés -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#fdfcfc] via-[#faf8f5] to-[#f5f2e9]">
      <div class="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#FFB6B0]/15 to-[#ff8e7a]/8 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-[#2a2a22]/8 to-[#3a3a32]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-r from-[#FFB6B0]/10 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- Contenu principal -->
    <div class="relative z-10 py-12">
      <div class="container mx-auto px-4 max-w-7xl">
        
        <!-- Breadcrumb moderne -->
        <div class="mb-8">
          <Breadcrumb :items="[
            { label: 'Accueil', to: '/' },
            { label: 'Boutique', to: '/shop' },
            { label: product?.productName || 'Produit', to: null }
          ]" />
        </div>

        <!-- Contenu produit -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <!-- Section Image -->
          <div class="space-y-6">
            <!-- Image principale -->
            <div class="relative group">
              <div class="aspect-square bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-[#e6e2d7] transform group-hover:scale-[1.02] transition-all duration-500">
                <img
                  v-if="product?.productImage?.url"
                  :src="'https://edelweiss-back-production.up.railway.app' + product.productImage.url"
                  :alt="product.productImage.alternativeText || product.productName"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-[#5a5a52]">
                  <div class="text-center">
                    <Icon name="lucide:image" class="h-16 w-16 mx-auto mb-4 text-[#FFB6B0]" />
                    <p>Aucune image disponible</p>
                  </div>
                </div>
                
                <!-- Overlay gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-[#2a2a22]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <!-- Badge collection flottant -->
              <div v-if="product?.collection?.collectionName" 
                   class="absolute -top-4 -right-4 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white px-6 py-3 rounded-2xl font-semibold shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Icon name="lucide:tag" class="h-4 w-4 inline mr-2" />
                {{ product.collection.collectionName }}
              </div>

              <!-- Badge Made in France -->
              <div class="absolute -top-4 -left-4 bg-gradient-to-r from-[#0055A4] to-[#EF4135] text-white px-6 py-3 rounded-2xl font-semibold shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <Icon name="lucide:map-pin" class="h-4 w-4 inline mr-2" />
                Made in France 🇫🇷
              </div>
            </div>

            <!-- Galerie thumbnails (placeholder pour futures images) -->
            <div class="flex gap-4">
              <div class="w-20 h-20 bg-white/60 backdrop-blur-sm rounded-xl border border-[#e6e2d7] flex items-center justify-center opacity-50">
                <Icon name="lucide:plus" class="h-6 w-6 text-[#5a5a52]" />
              </div>
              <div class="w-20 h-20 bg-white/60 backdrop-blur-sm rounded-xl border border-[#e6e2d7] flex items-center justify-center opacity-50">
                <Icon name="lucide:plus" class="h-6 w-6 text-[#5a5a52]" />
              </div>
              <div class="w-20 h-20 bg-white/60 backdrop-blur-sm rounded-xl border border-[#e6e2d7] flex items-center justify-center opacity-50">
                <Icon name="lucide:plus" class="h-6 w-6 text-[#5a5a52]" />
              </div>
            </div>
          </div>

          <!-- Section Informations -->
          <div class="space-y-8">
            
            <!-- Header produit -->
            <div class="space-y-4">
              <h1 class="font-serif text-4xl md:text-5xl font-bold text-[#2a2a22] leading-tight">
                {{ product?.productName }}
              </h1>
              
              <!-- Prix et étoiles -->
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="text-3xl font-bold text-[#2a2a22]">
                  {{ product?.price?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
                </div>
                
                <div class="flex items-center gap-3">
                  <div class="flex items-center gap-1">
                    <span v-for="n in 5" :key="n" class="star text-2xl" :class="{ filled: n <= averageStars }">★</span>
                  </div>
                  <span v-if="feedbacks.length" class="text-[#5a5a52] font-medium">
                    ({{ feedbacks.length }} avis)
                  </span>
                </div>
              </div>
            </div>

            <!-- Actions principales -->
            <div class="space-y-4">
              <button
                @click="handleAddToCart"
                :disabled="added"
                class="group w-full bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] hover:from-[#3a3a32] hover:to-[#4a4a42] text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div class="flex items-center justify-center gap-3">
                  <Icon v-if="added" name="lucide:check" class="h-6 w-6 text-green-400" />
                  <Icon v-else name="lucide:shopping-cart" class="h-6 w-6 group-hover:animate-bounce" />
                  <span>{{ added ? 'Ajouté au panier !' : 'Ajouter au panier' }}</span>
                </div>
              </button>

              <!-- Boutons secondaires -->
              <div class="grid grid-cols-2 gap-4">
                <button 
                  @click="handleWishlistToggle"
                  :disabled="!isLoggedIn"
                  class="flex items-center justify-center gap-2 py-3 px-6 border-2 border-[#FFB6B0] text-[#FFB6B0] hover:bg-[#FFB6B0] hover:text-white rounded-2xl font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  :class="{ 'bg-[#FFB6B0] text-white': product?.id && isInWishlist(product.id) }"
                >
                  <Icon 
                    name="lucide:heart" 
                    class="h-5 w-5 transition-all duration-200"
                    :class="{ 'fill-current': product?.id && isInWishlist(product.id) }"
                  />
                  <span>{{ product?.id && isInWishlist(product.id) ? 'Dans ma wishlist' : 'Ajouter à ma wishlist' }}</span>
                </button>
                <button 
                  @click="handleShare"
                  class="flex items-center justify-center gap-2 py-3 px-6 border-2 border-[#2a2a22] text-[#2a2a22] hover:bg-[#2a2a22] hover:text-white rounded-2xl font-semibold transition-all duration-300 cursor-pointer"
                  :class="{ 'bg-green-500 border-green-500 text-white': justShared }"
                >
                  <Icon v-if="justShared" name="lucide:check" class="h-5 w-5" />
                  <Icon v-else name="lucide:share-2" class="h-5 w-5" />
                  <span>{{ justShared ? 'Copié !' : 'Partager' }}</span>
                </button>
              </div>
            </div>

            <!-- Description -->
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#e6e2d7]">
              <h3 class="font-serif text-xl font-semibold text-[#2a2a22] mb-4 flex items-center">
                <Icon name="lucide:file-text" class="h-5 w-5 mr-2 text-[#FFB6B0]" />
                Description
              </h3>
              <div class="text-[#5a5a52] leading-relaxed">
                <p v-if="!showFullDesc">
                  {{ truncatedDescription }}<span v-if="isTruncated">…</span>
                </p>
                <p v-else>{{ product?.productDescription }}</p>
                <button
                  v-if="isTruncated"
                  @click="showFullDesc = !showFullDesc"
                  class="mt-3 text-[#FFB6B0] hover:text-[#ff8e7a] font-semibold transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>{{ showFullDesc ? 'Voir moins' : 'Voir plus' }}</span>
                  <Icon :name="showFullDesc ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="h-4 w-4" />
                </button>
              </div>
            </div>

            <!-- Caractéristiques -->
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#e6e2d7]">
              <h3 class="font-serif text-xl font-semibold text-[#2a2a22] mb-4 flex items-center">
                <Icon name="lucide:info" class="h-5 w-5 mr-2 text-[#FFB6B0]" />
                Caractéristiques
              </h3>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:palette" class="h-4 w-4 text-[#FFB6B0]" />
                  <span class="text-[#5a5a52]">Fait main</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:leaf" class="h-4 w-4 text-[#FFB6B0]" />
                  <span class="text-[#5a5a52]">Éco-responsable</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:award" class="h-4 w-4 text-[#FFB6B0]" />
                  <span class="text-[#5a5a52]">Qualité premium</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:truck" class="h-4 w-4 text-[#FFB6B0]" />
                  <span class="text-[#5a5a52]">Livraison rapide</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Avis -->
        <div class="mt-20">
          <div class="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-[#e6e2d7] shadow-xl">
            <div class="max-w-4xl mx-auto">
              <h2 class="font-serif text-3xl font-bold text-[#2a2a22] mb-8 text-center flex items-center justify-center gap-3">
                <Icon name="lucide:star" class="h-8 w-8 text-[#FFB6B0]" />
                Avis clients
              </h2>

              <!-- Statistiques des avis -->
              <div v-if="feedbacks.length > 0" class="text-center mb-8">
                <div class="text-4xl font-bold text-[#2a2a22] mb-2">{{ averageStars }}/5</div>
                <div class="flex items-center justify-center gap-1 mb-2">
                  <span v-for="n in 5" :key="n" class="star text-xl" :class="{ filled: n <= averageStars }">★</span>
                </div>
                <p class="text-[#5a5a52]">Basé sur {{ feedbacks.length }} avis</p>
              </div>

              <!-- Liste des avis -->
              <div v-if="feedbacks.length === 0" class="text-center py-12">
                <Icon name="lucide:message-circle" class="h-16 w-16 text-[#FFB6B0] mx-auto mb-4" />
                <p class="text-[#5a5a52] text-lg">Aucun avis pour ce produit.</p>
                <p class="text-[#5a5a52]">Soyez le premier à donner votre avis !</p>
              </div>

              <div v-else class="grid gap-6 mb-8">
                <div v-for="fb in feedbacks" :key="fb.id" 
                     class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#e6e2d7] hover:shadow-lg transition-shadow duration-300">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-1">
                      <span v-for="n in 5" :key="n" class="star text-lg" :class="{ filled: n <= fb.stars }">★</span>
                    </div>
                    <span class="text-sm text-[#5a5a52]">{{ fb.feedDate }}</span>
                  </div>
                  <p class="text-[#2a2a22] leading-relaxed">{{ fb.feedback }}</p>
                </div>
              </div>

              <!-- Formulaire d'avis -->
              <div v-if="canLeaveFeedback" class="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#e6e2d7]">
                <h3 class="font-serif text-xl font-semibold text-[#2a2a22] mb-4 flex items-center">
                  <Icon name="lucide:pen-tool" class="h-5 w-5 mr-2 text-[#FFB6B0]" />
                  Laissez votre avis
                </h3>
                <form @submit.prevent="submitFeedback" class="space-y-4">
                  <div class="flex items-center gap-2 mb-4">
                    <span class="text-[#2a2a22] font-medium">Note :</span>
                    <div class="flex items-center gap-1">
                      <span v-for="n in 5" :key="n" 
                            class="star text-2xl cursor-pointer hover:scale-110 transition-transform" 
                            :class="{ filled: n <= feedbackStars }" 
                            @click="feedbackStars = n">★</span>
                    </div>
                    <span class="text-[#FFB6B0] font-bold ml-2">{{ feedbackStars }}/5</span>
                  </div>
                  
                  <textarea 
                    v-model="feedbackText" 
                    rows="4" 
                    class="w-full border border-[#e6e2d7] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#FFB6B0]/50 focus:border-[#FFB6B0] transition-all resize-none" 
                    placeholder="Partagez votre expérience avec ce produit..."
                  />
                  
                  <button 
                    type="submit" 
                    :disabled="feedbackLoading || !feedbackText || !feedbackStars"
                    class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div class="flex items-center gap-2">
                      <Icon v-if="feedbackLoading" name="lucide:loader-2" class="h-5 w-5 animate-spin" />
                      <Icon v-else name="lucide:send" class="h-5 w-5" />
                      <span>{{ feedbackLoading ? 'Envoi...' : 'Envoyer mon avis' }}</span>
                    </div>
                  </button>
                  
                  <div v-if="feedbackSuccess" class="flex items-center gap-2 text-green-600 font-medium">
                    <Icon name="lucide:check-circle" class="h-5 w-5" />
                    <span>Merci pour votre avis !</span>
                  </div>
                  <div v-if="feedbackError" class="flex items-center gap-2 text-red-600 font-medium">
                    <Icon name="lucide:alert-circle" class="h-5 w-5" />
                    <span>{{ feedbackError }}</span>
                  </div>
                </form>
              </div>
              <div v-else class="text-center py-6">
                <Icon name="lucide:lock" class="h-8 w-8 text-[#5a5a52] mx-auto mb-2" />
                <p class="text-[#5a5a52]">Vous devez avoir acheté ce produit pour laisser un avis.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Suggestions produits -->
        <div v-if="otherProducts.length" class="mt-20">
          <div class="text-center mb-12">
            <h2 class="font-serif text-3xl md:text-4xl font-bold text-[#2a2a22] mb-4">
              Vous pourriez aussi aimer
            </h2>
            <p class="text-lg text-[#5a5a52] max-w-2xl mx-auto">
              Découvrez d'autres créations uniques de notre collection artisanale
            </p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard
              v-for="p in otherProducts.slice(0, 4)"
              :key="p.id"
              :product="p"
              :index="0"
              @product-click="$router.push(`/product/${p.slug}`)"
              @add-to-cart="() => handleAddToCartOther(p)"
              class="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications toast -->
    <Transition 
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-8 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-8 scale-95"
    >
      <div v-if="added || addedOther" 
           class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#e6e2d7]">
        <div class="w-8 h-8 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center">
          <Icon name="lucide:check" class="h-5 w-5 text-white" />
        </div>
        <span class="font-semibold">Produit ajouté au panier avec succès !</span>
      </div>
    </Transition>
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
  setTimeout(() => { added.value = false }, 3000)
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
  setTimeout(() => { addedOther.value = false }, 3000)
}

const { fetchUserOrders } = useOrder()
const { currentUser, isLoggedIn } = useAuth()
const { isInWishlist, toggleWishlist } = useWishlist()

const feedbacks = ref<any[]>([])
const feedbackText = ref('')
const feedbackLoading = ref(false)
const feedbackError = ref('')
const feedbackSuccess = ref(false)
const canLeaveFeedback = ref(false)
const feedbackStars = ref(0)
const justShared = ref(false)

const averageStars = computed(() => {
  if (!feedbacks.value.length) return 0
  return Math.round(
    feedbacks.value.reduce((sum, fb) => sum + (fb.stars || 0), 0) / feedbacks.value.length
  )
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
    setTimeout(() => { feedbackSuccess.value = false }, 3000)
  } catch (e) {
    feedbackError.value = 'Erreur lors de l\'envoi de l\'avis.'
  } finally {
    feedbackLoading.value = false
  }
}

// Gestion de la wishlist
async function handleWishlistToggle() {
  if (!isLoggedIn.value || !product.value?.id) return
  
  try {
    await toggleWishlist(product.value.id)
  } catch (error) {
    console.error('Erreur wishlist:', error)
  }
}

// Gestion du partage
async function handleShare() {
  try {
    const currentUrl = window.location.href
    await navigator.clipboard.writeText(currentUrl)
    
    justShared.value = true
    setTimeout(() => {
      justShared.value = false
    }, 2000)
  } catch (error) {
    console.error('Erreur lors de la copie:', error)
    // Fallback pour les navigateurs qui ne supportent pas l'API clipboard
    const textArea = document.createElement('textarea')
    textArea.value = window.location.href
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    
    justShared.value = true
    setTimeout(() => {
      justShared.value = false
    }, 2000)
  }
}
</script>

<style scoped>
.product-page {
  font-family: 'Inter', 'Helvetica Neue', Arial, 'sans-serif';
}

.star {
  color: #e5e5e5;
  transition: color 0.2s, transform 0.2s;
  user-select: none;
}

.star.filled {
  color: #FFB6B0;
  text-shadow: 0 2px 8px rgba(255, 182, 176, 0.3);
}

.star.cursor-pointer:hover {
  transform: scale(1.1);
}

.container {
  max-width: 1200px;
}

/* Animation pour les éléments */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  h1 {
    font-size: 2rem;
    line-height: 1.2;
  }
}
</style>