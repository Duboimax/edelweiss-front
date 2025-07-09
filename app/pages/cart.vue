<script setup lang="ts">
import { useCart } from '~/composables/useCart'
import { useStrapi } from '~/composables/useStrapi'
import { useAuth } from '~/composables/useAuth'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'
import { ref, computed, watch, onMounted } from 'vue'

const { cart, updateQuantity, removeFromCart, clearCart, total, addToCart } = useCart()
const strapi = useStrapi()
const { currentUser } = useAuth()

interface Product {
  id: number,
  productName: string,
  price: number,
  slug: string,
  productImage: { url: string, alternativeText?: string }
}

interface StripeResponse {
  url?: string | null;
  error?: string;
}

// Fetch un produit cross-sell (différent du panier)
const { data: allProducts } = await useAsyncData('all-products', () =>
  strapi.get<{ data: Product[] }>('products', { pLevel: 5 }).then(res => res.data || []),
)
const crossSellProduct = computed<Product | null>(() => {
  if (!allProducts.value) return null
  // Prend le premier produit qui n'est pas dans le panier
  return allProducts.value.find(p => !cart.value.some(c => c.id === p.id)) || null
})

const showFeedback = ref(false)
function showAddFeedback() {
  showFeedback.value = true;
  setTimeout(() => { showFeedback.value = false; }, 1500);
}
function handleAddToCartCrossSell() {
  const p = crossSellProduct.value;
  if (!p) return;
  if (!cart.value.find(c => c.id === p.id)) {
    addToCart({
      id: p.id,
      productName: p.productName,
      price: p.price,
      slug: p.slug,
      productImage: p.productImage,
    });
    showAddFeedback();
  }
}

const orderLoading = ref(false)
const orderSuccess = ref(false)
const orderError = ref('')

const isLoggedIn = computed(() => !!currentUser && !!currentUser.value)

// Gestion du code promo fidélité
const promoCodeInput = ref('')
const appliedPromo = ref('')
const promoError = ref('')
const promoSuccess = ref('')
const promoDiscount = ref(0)

function loadLoyaltyPromoCodes() {
  // Les codes promos fidélité sont stockés dans le localStorage (par le dashboard lors de la réclamation)
  const codes = localStorage.getItem('loyaltyPromoCodes')
  if (!codes) return []
  try {
    return JSON.parse(codes)
  } catch {
    return []
  }
}

function applyPromoCode() {
  promoError.value = ''
  promoSuccess.value = ''
  const codes = loadLoyaltyPromoCodes()
  const code = promoCodeInput.value.trim()
  if (!code) {
    promoError.value = 'Veuillez entrer un code.'
    return
  }
  if (codes.includes(code)) {
    appliedPromo.value = code
    promoDiscount.value = 20
    promoSuccess.value = 'Code promo appliqué : -20€ sur votre commande.'
    promoError.value = ''
  } else {
    promoError.value = 'Code promo invalide ou déjà utilisé.'
    appliedPromo.value = ''
    promoDiscount.value = 0
  }
}

const totalWithPromo = computed(() => {
  return Math.max(total.value - promoDiscount.value, 0)
})

async function handleOrder() {
  orderLoading.value = true
  orderError.value = ''
  try {
    if (!currentUser.value) throw new Error('Vous devez être connecté pour commander.')
    if (!cart.value.length) throw new Error('Votre panier est vide.')
    // Appel API Stripe
    const response = await $fetch<StripeResponse>('/api/stripe', {
      method: 'POST',
      body: {
        products: cart.value.map(item => ({
          id: item.id,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
        })),
        userId: currentUser.value.id,
      },
    })
    if (response.url) {
      window.location.href = response.url
      return
    } else {
      throw new Error(response.error || 'Erreur lors de la création de la session de paiement.')
    }
  } catch (e) {
    orderError.value = (e instanceof Error ? e.message : 'Erreur lors de la commande.')
  } finally {
    orderLoading.value = false
  }
}

function handleCommander() {
  if (!isLoggedIn.value) {
    window.location.href = '/login'
  } else {
    window.location.href = '/checkout'
  }
}
</script>

<template>
  <div class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
    <div class="container mx-auto px-4 max-w-5xl mt-8">
      <Breadcrumb :items="[
        { label: 'Accueil', to: '/' },
        { label: 'Panier', to: null }
      ]" />
    </div>
    <!-- Header avec breadcrumb -->
    <div class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-4 py-4 max-w-7xl">
        <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Accueil</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-gray-900 font-medium">Panier</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Mon panier</h1>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Panier vide -->
      <div v-if="cart.length === 0" class="text-center py-20">
        <div class="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L19 18H7"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Votre panier est vide</h2>
          <p class="text-gray-600 mb-8">Découvrez nos produits et ajoutez-les à votre panier</p>
          <NuxtLink to="/shop" class="bg-black text-white cursor-pointer px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Continuer mes achats
          </NuxtLink>
        </div>
      </div>

      <!-- Panier rempli -->
      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- Liste des articles -->
        <div class="lg:col-span-2">
          <div v-if="showFeedback" class="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold shadow">Produit ajouté au panier !</div>
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- Header du panier -->
            <div class="bg-gray-50 px-6 py-4 border-b">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900">Articles ({{ cart.length }})</h2>
                <button 
                  @click="clearCart"
                  class="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Vider le panier
                </button>
              </div>
            </div>

            <!-- Articles -->
            <div class="divide-y divide-gray-100">
              <div
                v-for="item in cart"
                :key="item.id"
                class="p-6 hover:bg-gray-50 transition-colors group"
              >
                <div class="flex items-start gap-4">
                  <!-- Image avec badge -->
                  <div class="relative flex-shrink-0">
                    <img
                      :src="'https://edelweiss-back-production.up.railway.app' + item.productImage.url"
                      :alt="item.productName"
                      class="w-32 h-32 object-cover rounded-xl bg-gray-100 ring-1 ring-gray-200"
                    />
                    <div class="absolute -top-2 -right-2 w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {{ item.quantity }}
                    </div>
                  </div>

                  <!-- Détails produit -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between">
                      <div>
                        <h3 class="font-semibold text-gray-900 text-lg mb-1">{{ item.productName }}</h3>
                        <p class="text-sm text-gray-500 mb-3">Référence: #{{ item.id }}</p>
                        
                        <!-- Prix -->
                        <div class="flex items-center gap-3 mb-4">
                          <span class="text-2xl font-bold text-gray-900">
                            {{ item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
                          </span>
                          <span class="text-sm text-gray-500">par article</span>
                        </div>

                        <!-- Contrôles quantité -->
                        <div class="flex items-center gap-1">
                          <button
                            @click="updateQuantity(item.id, item.quantity - 1)"
                            :disabled="item.quantity <= 1"
                            class="w-10 h-10 rounded-lg border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            v-model.number="item.quantity"
                            @change="updateQuantity(item.id, item.quantity)"
                            class="w-16 h-10 border-2 border-gray-200 rounded-lg text-center font-semibold text-gray-900 focus:border-black focus:outline-none transition-colors"
                          />
                          <button
                            @click="updateQuantity(item.id, item.quantity + 1)"
                            class="w-10 h-10 rounded-lg border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center font-semibold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <!-- Actions -->
                      <div class="flex flex-col items-end gap-2">
                        <button
                          @click="removeFromCart(item.id)"
                          class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                        <div class="text-right">
                          <p class="text-sm text-gray-500">Sous-total</p>
                          <p class="text-xl font-bold text-gray-900">
                            {{ (item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Avantages -->
          <div class="mt-6 bg-white rounded-2xl shadow-lg p-6">
            <div class="grid md:grid-cols-3 gap-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Livraison gratuite</p>
                  <p class="text-sm text-gray-500">Dès 50€ d'achat</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Retour 30 jours</p>
                  <p class="text-sm text-gray-500">Satisfait ou remboursé</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Paiement sécurisé</p>
                  <p class="text-sm text-gray-500">SSL & cryptage</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Cross-sell -->
          <div v-if="crossSellProduct" class="mt-6 bg-[#fffafd] rounded-2xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
            <NuxtLink :to="`/product/${crossSellProduct.slug}`" class="block">
              <img :src="'https://edelweiss-back-production.up.railway.app' + crossSellProduct.productImage.url" alt="Produit suggéré" class="w-24 h-24 object-cover rounded-xl border transition hover:scale-105" />
            </NuxtLink>
            <div class="flex-1">
              <div class="font-semibold text-[#2a2a22] mb-1">Vous pourriez aimer aussi :</div>
              <NuxtLink :to="`/product/${crossSellProduct.slug}`" class="text-lg font-serif mb-2 block text-[#2a2a22] hover:underline">
                {{ crossSellProduct.productName }}
              </NuxtLink>
              <div class="text-[#5a5a52] mb-2">{{ crossSellProduct.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</div>
              <button @click="handleAddToCartCrossSell" class="inline-block bg-[#FFB6B0] text-white px-4 py-2 rounded-full font-medium hover:bg-[#ff8e7a] transition">Ajouter au panier</button>
            </div>
          </div>
          <transition name="fade-slide-up">
            <div v-if="showFeedback" class="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 bg-[#2a2a22] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-pop-in">
              <Icon name="lucide:check-circle" class="w-5 h-5 text-[#FFB6B0]" />
              Produit ajouté au panier !
            </div>
          </transition>
        </div>

        <!-- Résumé de commande -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
            <!-- Header -->
            <div class="bg-gray-50 px-6 py-4 border-b">
              <h2 class="text-lg font-semibold text-gray-900">Récapitulatif</h2>
            </div>

            <!-- Détails -->
            <div class="p-6 space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Sous-total</span>
                <span class="font-semibold text-gray-900">{{ total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Livraison</span>
                <span class="font-semibold text-green-600">Gratuite</span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-gray-600">TVA</span>
                <span class="font-semibold text-gray-900">{{ (total * 0.2).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</span>
              </div>

              <div class="border-t pt-4">
                <div class="flex justify-between items-center mb-6">
                  <span class="text-xl font-bold text-gray-900">Total</span>
                  <span class="text-2xl font-bold text-gray-900">{{ totalWithPromo.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</span>
                </div>
              </div>

              <!-- Boutons d'action -->
              <div class="space-y-3">
                <button
                  class="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-neutral-800 transition mb-2 flex items-center justify-center text-center"
                  @click="handleCommander"
                >
                  {{ isLoggedIn ? 'Commander' : 'Se connecter pour commander' }}
                </button>
                <div v-if="orderSuccess" class="text-green-600 text-center font-semibold mt-2">Commande passée avec succès !</div>
                <div v-if="orderError" class="text-red-600 text-center font-semibold mt-2">{{ orderError }}</div>
                <div class="text-xs text-gray-500 text-center mt-2">Paiement sécurisé • Retours sous 30 jours • Livraison offerte dès 60€</div>
              </div>

              <!-- Codes promo -->
              <div class="mt-6 pt-6 border-t">
                <div class="flex gap-2">
                  <input
                    type="text"
                    v-model="promoCodeInput"
                    placeholder="Code promo"
                    class="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                  <button @click="applyPromoCode" class="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    Appliquer
                  </button>
                </div>
                <div v-if="promoSuccess" class="text-green-600 text-center font-semibold mt-2">{{ promoSuccess }}</div>
                <div v-if="promoError" class="text-red-600 text-center font-semibold mt-2">{{ promoError }}</div>
                <div v-if="appliedPromo" class="text-xs text-center text-gray-500 mt-1">Code utilisé : {{ appliedPromo }}</div>
              </div>

              <!-- Paiement sécurisé -->
              <div class="mt-6 pt-6 border-t">
                <p class="text-sm text-gray-600 mb-3">Paiement 100% sécurisé</p>
                <div class="flex items-center gap-2">
                  <div class="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                  <div class="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                  <div class="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">PP</div>
                  <div class="w-8 h-5 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">SSL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>