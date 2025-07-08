<script setup lang="ts">
import { useCart } from '~/composables/useCart'
const { cart, updateQuantity, removeFromCart, clearCart, total } = useCart()
</script>

<template>
  <div class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
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
          <button class="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Continuer mes achats
          </button>
        </div>
      </div>

      <!-- Panier rempli -->
      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- Liste des articles -->
        <div class="lg:col-span-2">
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
                  <span class="text-2xl font-bold text-gray-900">{{ total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</span>
                </div>
              </div>

              <!-- Boutons d'action -->
              <div class="space-y-3">
                <button class="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg">
                  Commander maintenant
                </button>
                <a href="/shop">
                <button class="w-full border-2 border-gray-200 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  Continuer mes achats
                </button>
            </a>
              </div>

              <!-- Codes promo -->
              <div class="mt-6 pt-6 border-t">
                <div class="flex gap-2">
                  <input
                    type="text"
                    placeholder="Code promo"
                    class="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                  <button class="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    Appliquer
                  </button>
                </div>
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