<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Arrière-plan avec dégradés animés -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#fdfcfc] via-[#faf8f5] to-[#f5f2e9]">
      <div class="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#FFB6B0]/15 to-[#ff8e7a]/8 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-[#2a2a22]/8 to-[#3a3a32]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-r from-[#FFB6B0]/10 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- Contenu principal -->
    <div class="relative z-10">
      <!-- Hero Section du panier -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-7xl">
          <!-- Breadcrumb moderne -->
          <div class="mb-8">
            <Breadcrumb :items="[
              { label: 'Accueil', to: '/' },
              { label: 'Mon Panier', to: null }
            ]" />
          </div>

          <!-- Header avec badge -->
          <div class="text-center mb-12">
            <div class="inline-flex items-center bg-white/80 backdrop-blur-sm border border-[#e6e2d7] rounded-full px-6 py-3 mb-6 shadow-lg">
              <Icon name="lucide:shopping-cart" class="h-5 w-5 text-[#FFB6B0] mr-2" />
              <span class="text-sm font-medium text-[#2a2a22]">{{ cart.length }} article{{ cart.length > 1 ? 's' : '' }} dans votre panier</span>
            </div>

            <h1 class="font-serif text-4xl md:text-5xl font-bold text-[#2a2a22] mb-4 leading-tight">
              Mon 
              <span class="relative">
                <span class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] bg-clip-text text-transparent">
                  Panier
                </span>
                <div class="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-[#FFB6B0]/30 to-[#ff8e7a]/20 transform -rotate-1 rounded-full"></div>
              </span>
            </h1>
          </div>
        </div>
      </section>

      <!-- Contenu principal -->
      <section class="pb-20">
        <div class="container mx-auto px-4 md:px-6 max-w-7xl">
          
          <!-- Panier vide -->
          <div v-if="cart.length === 0" class="text-center py-20">
            <div class="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-16 border border-[#e6e2d7] max-w-lg mx-auto">
              <div class="relative mb-8">
                <Icon name="lucide:shopping-cart" class="h-24 w-24 text-[#FFB6B0] mx-auto mb-6" />
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-[#FFB6B0]/10 rounded-full blur-2xl"></div>
              </div>
              <h2 class="text-2xl font-serif font-bold text-[#2a2a22] mb-4">Votre panier est vide</h2>
              <p class="text-[#5a5a52] mb-8 leading-relaxed">
                Découvrez nos créations artisanales uniques et ajoutez vos coups de cœur à votre panier.
              </p>
              <NuxtLink 
                to="/shop" 
                class="inline-flex items-center bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] hover:from-[#3a3a32] hover:to-[#4a4a42] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl cursor-pointer"
              >
                <Icon name="lucide:sparkles" class="h-5 w-5 mr-2" />
                Découvrir nos créations
              </NuxtLink>
            </div>
          </div>

          <!-- Panier rempli -->
          <div v-else class="grid lg:grid-cols-3 gap-12">
            <!-- Articles du panier -->
            <div class="lg:col-span-2 space-y-8">
              
              <!-- Header articles -->
              <div class="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#e6e2d7]">
                <div class="flex items-center justify-between">
                  <h2 class="text-2xl font-serif font-bold text-[#2a2a22] flex items-center gap-3">
                    <Icon name="lucide:package" class="h-6 w-6 text-[#FFB6B0]" />
                    Vos articles ({{ cart.length }})
                  </h2>
                  <button 
                    @click="clearCart"
                    class="group flex items-center gap-2 text-sm text-[#5a5a52] hover:text-red-500 transition-all duration-200 px-4 py-2 rounded-xl hover:bg-red-50 cursor-pointer"
                  >
                    <Icon name="lucide:trash-2" class="h-4 w-4 group-hover:animate-pulse" />
                    Vider le panier
                  </button>
                </div>
              </div>

              <!-- Liste des articles -->
              <div class="space-y-6">
                <div
                  v-for="(item, index) in cart"
                  :key="item.id"
                  class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#e6e2d7] p-8 hover:shadow-2xl transition-all duration-300 group"
                  :style="{ animationDelay: `${index * 100}ms` }"
                >
                  <div class="flex flex-col md:flex-row gap-6">
                    <!-- Image produit -->
                    <div class="relative flex-shrink-0">
                      <div class="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-[#e6e2d7] group-hover:border-[#FFB6B0]/50 transition-colors">
                        <img
                          :src="'https://edelweiss-back-production.up.railway.app' + item.productImage.url"
                          :alt="item.productName"
                          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <!-- Badge quantité -->
                      <div class="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {{ item.quantity }}
                      </div>
                      <!-- Badge "Made in France" -->
                      <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#0055A4] to-[#EF4135] text-white px-2 py-1 rounded-lg text-xs font-semibold">
                        🇫🇷 Made in France
                      </div>
                    </div>

                    <!-- Détails produit -->
                    <div class="flex-1 space-y-4">
                      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div class="space-y-2">
                          <h3 class="text-xl font-serif font-bold text-[#2a2a22] leading-tight group-hover:text-[#FFB6B0] transition-colors">
                            {{ item.productName }}
                          </h3>
                          <div class="flex items-center gap-2 text-sm text-[#5a5a52]">
                            <Icon name="lucide:tag" class="h-4 w-4" />
                            <span>Réf. #{{ item.id }}</span>
                          </div>
                          <div class="flex items-center gap-2">
                            <div class="flex text-yellow-400">
                              <Icon name="lucide:star" class="h-4 w-4 fill-current" />
                              <Icon name="lucide:star" class="h-4 w-4 fill-current" />
                              <Icon name="lucide:star" class="h-4 w-4 fill-current" />
                              <Icon name="lucide:star" class="h-4 w-4 fill-current" />
                              <Icon name="lucide:star" class="h-4 w-4 fill-current" />
                            </div>
                            <span class="text-sm text-[#5a5a52]">(4.9)</span>
                          </div>
                        </div>

                        <!-- Prix et actions -->
                        <div class="text-right space-y-3">
                          <div class="space-y-1">
                            <div class="text-sm text-[#5a5a52]">Prix unitaire</div>
                            <div class="text-2xl font-bold text-[#2a2a22]">
                              {{ item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
                            </div>
                          </div>
                          
                          <button
                            @click="removeFromCart(item.id)"
                            class="p-3 text-[#5a5a52] hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group cursor-pointer"
                          >
                            <Icon name="lucide:trash-2" class="h-5 w-5 group-hover:animate-pulse" />
                          </button>
                        </div>
                      </div>

                      <!-- Contrôles quantité et sous-total -->
                      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-[#e6e2d7]">
                        <!-- Contrôles quantité -->
                        <div class="flex items-center gap-3">
                          <span class="text-sm font-medium text-[#2a2a22]">Quantité :</span>
                          <div class="flex items-center bg-white rounded-2xl border-2 border-[#e6e2d7] overflow-hidden shadow-sm">
                            <button
                              @click="updateQuantity(item.id, item.quantity - 1)"
                              :disabled="item.quantity <= 1"
                              class="w-12 h-12 flex items-center justify-center text-[#5a5a52] hover:bg-[#FFB6B0] hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Icon name="lucide:minus" class="h-4 w-4" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              v-model.number="item.quantity"
                              @change="updateQuantity(item.id, item.quantity)"
                              class="w-16 h-12 text-center font-bold text-[#2a2a22] border-0 focus:outline-none bg-transparent"
                            />
                            <button
                              @click="updateQuantity(item.id, item.quantity + 1)"
                              class="w-12 h-12 flex items-center justify-center text-[#5a5a52] hover:bg-[#FFB6B0] hover:text-white transition-all duration-200 cursor-pointer"
                            >
                              <Icon name="lucide:plus" class="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <!-- Sous-total -->
                        <div class="text-right">
                          <div class="text-sm text-[#5a5a52] mb-1">Sous-total</div>
                          <div class="text-2xl font-bold text-[#FFB6B0]">
                            {{ (item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Avantages -->
              <div class="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#e6e2d7]">
                <h3 class="text-xl font-serif font-bold text-[#2a2a22] mb-6 text-center">Vos avantages Audelweiss</h3>
                <div class="grid md:grid-cols-3 gap-6">
                  <div class="group text-center">
                    <div class="w-16 h-16 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="lucide:truck" class="h-8 w-8 text-white" />
                    </div>
                    <h4 class="font-semibold text-[#2a2a22] mb-2">Livraison gratuite</h4>
                    <p class="text-sm text-[#5a5a52]">Dès 60€ d'achat partout en France</p>
                  </div>
                  
                  <div class="group text-center">
                    <div class="w-16 h-16 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="lucide:shield-check" class="h-8 w-8 text-white" />
                    </div>
                    <h4 class="font-semibold text-[#2a2a22] mb-2">Retour 30 jours</h4>
                    <p class="text-sm text-[#5a5a52]">Satisfait ou 100% remboursé</p>
                  </div>
                  
                  <div class="group text-center">
                    <div class="w-16 h-16 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="lucide:award" class="h-8 w-8 text-white" />
                    </div>
                    <h4 class="font-semibold text-[#2a2a22] mb-2">Qualité artisanale</h4>
                    <p class="text-sm text-[#5a5a52]">Créations uniques faites main</p>
                  </div>
                </div>
              </div>

              <!-- Cross-sell -->
              <div v-if="crossSellProduct" class="bg-gradient-to-r from-[#FFB6B0]/10 to-[#ff8e7a]/5 backdrop-blur-sm rounded-3xl border border-[#FFB6B0]/20 p-8">
                <div class="flex flex-col md:flex-row items-center gap-6">
                  <div class="relative group cursor-pointer" @click="$router.push(`/product/${crossSellProduct.slug}`)">
                    <div class="w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#FFB6B0]/30 group-hover:border-[#FFB6B0] transition-colors">
                      <img 
                        :src="'https://edelweiss-back-production.up.railway.app' + crossSellProduct.productImage.url" 
                        :alt="crossSellProduct.productName" 
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <div class="absolute -top-2 -right-2 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Nouveau !
                    </div>
                  </div>
                  
                  <div class="flex-1 text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <Icon name="lucide:heart" class="h-5 w-5 text-[#FFB6B0]" />
                      <span class="text-sm font-medium text-[#2a2a22]">Vous pourriez aussi aimer</span>
                    </div>
                    <h4 class="text-xl font-serif font-bold text-[#2a2a22] mb-2 cursor-pointer hover:text-[#FFB6B0] transition-colors" @click="$router.push(`/product/${crossSellProduct.slug}`)">
                      {{ crossSellProduct.productName }}
                    </h4>
                    <div class="text-lg font-bold text-[#FFB6B0] mb-4">
                      {{ crossSellProduct.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
                    </div>
                    <button 
                      @click="handleAddToCartCrossSell" 
                      class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
                    >
                      <Icon name="lucide:plus" class="h-4 w-4 inline mr-2" />
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Récapitulatif commande -->
            <div class="lg:col-span-1">
              <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#e6e2d7] sticky top-24 overflow-hidden">
                
                <!-- Header -->
                <div class="bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] p-6">
                  <h2 class="text-xl font-serif font-bold text-white flex items-center gap-3">
                    <Icon name="lucide:calculator" class="h-6 w-6 text-[#FFB6B0]" />
                    Récapitulatif
                  </h2>
                </div>

                <!-- Détails -->
                <div class="p-6 space-y-6">
                  <!-- Sous-total -->
                  <div class="flex justify-between items-center py-3">
                    <span class="text-[#5a5a52] font-medium">Sous-total ({{ cart.length }} articles)</span>
                    <span class="text-xl font-bold text-[#2a2a22]">
                      {{ total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
                    </span>
                  </div>
                  
                  <!-- Livraison -->
                  <div class="flex justify-between items-center py-3 border-t border-[#e6e2d7]">
                    <div class="flex items-center gap-2">
                      <Icon name="lucide:truck" class="h-4 w-4 text-[#FFB6B0]" />
                      <span class="text-[#5a5a52] font-medium">Livraison</span>
                    </div>
                    <div class="text-right">
                      <span class="text-green-600 font-bold">Gratuite</span>
                      <div class="text-xs text-[#5a5a52]">🎉 Économisez 9,90€</div>
                    </div>
                  </div>
                  
                  <!-- TVA -->
                  <div class="flex justify-between items-center py-3">
                    <span class="text-[#5a5a52] font-medium">TVA (20%)</span>
                    <span class="font-semibold text-[#2a2a22]">
                      {{ (total * 0.2).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
                    </span>
                  </div>

                  <!-- Code promo -->
                  <div class="border-t border-[#e6e2d7] pt-6">
                    <div class="flex items-center gap-2 mb-3">
                      <Icon name="lucide:percent" class="h-5 w-5 text-[#FFB6B0]" />
                      <span class="font-semibold text-[#2a2a22]">Code promo / Bon d'achat</span>
                    </div>
                    
                    <div class="flex gap-2 mb-3">
                      <input
                        type="text"
                        v-model="promoCodeInput"
                        placeholder="Entrez votre code"
                        class="flex-1 px-4 py-3 border-2 border-[#e6e2d7] rounded-xl focus:outline-none focus:border-[#FFB6B0] transition-colors text-sm"
                      />
                      <button 
                        @click="applyPromoCode" 
                        class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer"
                      >
                        <Icon name="lucide:check" class="h-4 w-4" />
                      </button>
                    </div>
                    
                    <!-- Messages promo -->
                    <Transition
                      enter-active-class="transition-all duration-300"
                      enter-from-class="opacity-0 -translate-y-2"
                      enter-to-class="opacity-100 translate-y-0"
                    >
                      <div v-if="promoSuccess" class="flex items-center gap-2 text-green-600 text-sm font-medium mb-2">
                        <Icon name="lucide:check-circle" class="h-4 w-4" />
                        {{ promoSuccess }}
                      </div>
                    </Transition>
                    
                    <Transition
                      enter-active-class="transition-all duration-300"
                      enter-from-class="opacity-0 -translate-y-2"
                      enter-to-class="opacity-100 translate-y-0"
                    >
                      <div v-if="promoError" class="flex items-center gap-2 text-red-500 text-sm font-medium mb-2">
                        <Icon name="lucide:alert-circle" class="h-4 w-4" />
                        {{ promoError }}
                      </div>
                    </Transition>
                    
                    <!-- Réduction appliquée -->
                    <div v-if="appliedPromo" class="flex justify-between items-center py-2 bg-green-50 rounded-xl px-3">
                      <span class="text-green-700 text-sm font-medium">Réduction ({{ appliedPromo }})</span>
                      <span class="text-green-700 font-bold">-{{ promoDiscount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</span>
                    </div>
                  </div>

                  <!-- Total -->
                  <div class="border-t-2 border-[#FFB6B0]/30 pt-6">
                    <div class="flex justify-between items-center mb-8">
                      <span class="text-2xl font-bold text-[#2a2a22]">Total</span>
                      <div class="text-right">
                        <div class="text-3xl font-bold bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] bg-clip-text text-transparent">
                          {{ totalWithPromo.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
                        </div>
                        <div class="text-xs text-[#5a5a52]">TTC, livraison incluse</div>
                      </div>
                    </div>

                    <!-- Bouton commander -->
                    <button
                      @click="handleCommander"
                      :disabled="orderLoading"
                      class="w-full bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] hover:from-[#3a3a32] hover:to-[#4a4a42] text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mb-4"
                    >
                      <div v-if="orderLoading" class="flex items-center justify-center gap-2">
                        <div class="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                        <span>Chargement...</span>
                      </div>
                      <div v-else class="flex items-center justify-center gap-2">
                        <Icon :name="isLoggedIn ? 'lucide:credit-card' : 'lucide:log-in'" class="h-5 w-5" />
                        <span>{{ isLoggedIn ? 'Procéder au paiement' : 'Se connecter pour commander' }}</span>
                      </div>
                    </button>

                    <!-- Messages d'état -->
                    <Transition
                      enter-active-class="transition-all duration-300"
                      enter-from-class="opacity-0 translate-y-2"
                      enter-to-class="opacity-100 translate-y-0"
                    >
                      <div v-if="orderSuccess" class="flex items-center gap-2 text-green-600 text-center font-semibold mb-4">
                        <Icon name="lucide:check-circle" class="h-5 w-5" />
                        Commande passée avec succès !
                      </div>
                    </Transition>
                    
                    <Transition
                      enter-active-class="transition-all duration-300"
                      enter-from-class="opacity-0 translate-y-2"
                      enter-to-class="opacity-100 translate-y-0"
                    >
                      <div v-if="orderError" class="flex items-center gap-2 text-red-500 text-center font-semibold mb-4">
                        <Icon name="lucide:alert-circle" class="h-5 w-5" />
                        {{ orderError }}
                      </div>
                    </Transition>

                    <!-- Informations sécurité -->
                    <div class="text-center text-xs text-[#5a5a52] space-y-2">
                      <div class="flex items-center justify-center gap-4">
                        <div class="flex items-center gap-1">
                          <Icon name="lucide:shield-check" class="h-4 w-4 text-green-500" />
                          <span>Paiement 100% sécurisé</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <Icon name="lucide:truck" class="h-4 w-4 text-blue-500" />
                          <span>Expédition rapide</span>
                        </div>
                      </div>
                      
                      <!-- Moyens de paiement -->
                      <div class="flex items-center justify-center gap-2 pt-4">
                        <div class="w-8 h-5 bg-green-500 rounded text-white text-[10px] flex items-center justify-center font-bold">SSL</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
      <div v-if="showFeedback" 
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
import { useCart } from '~/composables/useCart'
import { useProduct } from '~/composables/useProduct'
import { useAuth } from '~/composables/useAuth'

const { cart, updateQuantity, removeFromCart, clearCart, total, addToCart } = useCart()
const { products, fetchAllProducts } = useProduct()
const { currentUser, isLoggedIn } = useAuth()

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

onMounted(async () => {
  try {
    await fetchAllProducts()
    console.log('✅ Cart: Products loaded from cache')
  } catch (error) {
    console.error('❌ Cart: Error loading products:', error)
  }
})

const crossSellProduct = computed<Product | null>(() => {
  if (!products.value) return null
  return products.value.find(p => !cart.value.some(c => c.id === p.id)) || null
})

const showFeedback = ref(false)

function showAddFeedback() {
  showFeedback.value = true;
  setTimeout(() => { showFeedback.value = false; }, 3000);
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

const promoCodeInput = ref('')
const appliedPromo = ref('')
const promoError = ref('')
const promoSuccess = ref('')
const promoDiscount = ref(0)

function loadLoyaltyPromoCodes() {
  if (typeof window === 'undefined') return []
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
  const code = promoCodeInput.value.trim().toUpperCase()
  
  if (!code) {
    promoError.value = 'Veuillez entrer un code.'
    return
  }

  // Codes promo par défaut pour demo
  const defaultCodes = ['WELCOME20', 'FIRST10', 'LOYALTY15']
  const allCodes = [...codes, ...defaultCodes]
  
  if (allCodes.includes(code)) {
    appliedPromo.value = code
    
    // Différentes réductions selon le code
    switch(code) {
      case 'WELCOME20':
        promoDiscount.value = 20
        promoSuccess.value = 'Code promo appliqué : -20€ sur votre commande'
        break
      case 'FIRST10':
        promoDiscount.value = 10
        promoSuccess.value = 'Code promo appliqué : -10€ sur votre première commande'
        break
      case 'LOYALTY15':
        promoDiscount.value = 15
        promoSuccess.value = 'Code fidélité appliqué : -15€ sur votre commande'
        break
      default:
        promoDiscount.value = 20
        promoSuccess.value = 'Code promo appliqué : -20€ sur votre commande'
    }
    
    promoError.value = ''
    promoCodeInput.value = ''
  } else {
    promoError.value = 'Code promo invalide ou expiré.'
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

<style scoped>
/* Animation pour l'apparition des articles */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation au chargement */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Glassmorphisme */
.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Hover effects */
.btn-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Container responsive */
.container {
  max-width: 1400px;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  h1 {
    font-size: 2.5rem;
    line-height: 1.2;
  }
}

/* Focus states pour l'accessibilité */
.focus-visible {
  outline: 2px solid #FFB6B0;
  outline-offset: 2px;
}

/* Animation shimmer pour les loading states */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}

/* Smooth transitions */
* {
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #FFB6B0;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ff8e7a;
}
</style>