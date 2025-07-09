<template>
    <div class="bg-white text-neutral-900">
      <div class="container mx-auto px-4 py-12 max-w-2xl">
        <!-- Loading -->
        <div v-if="pending" class="flex justify-center items-center min-h-[300px]">
          <span class="text-sm text-neutral-500">Chargement du produit...</span>
        </div>
  
        <!-- Erreur -->
        <div v-else-if="!product" class="text-center py-20 text-neutral-500 text-lg">
          Produit introuvable.
        </div>
  
        <!-- Produit -->
        <div v-else class="flex flex-col items-center text-center">
          <!-- Titre -->
          <h1 class="text-2xl font-semibold tracking-tight mb-4">{{ product.productName }}</h1>
          <!-- Image centrée réduite -->
<!-- Image centrée, taille réduite et responsive -->
<div class="mb-6">
  <img
    :src="'https://edelweiss-back-production.up.railway.app' + product.productImage.url"
    :alt="product.productImage.alternativeText || product.productName"
    class="max-w-[240px] w-auto h-auto mx-auto rounded-md  bg-neutral-100"
  />
</div>
          <!-- Badge collection -->
          <div v-if="product.collection?.collectionName" class="inline-block mb-3 px-3 py-1 rounded-full bg-[#FFB6B0] text-white text-xs font-semibold tracking-wide">
            {{ product.collection.collectionName }}
          </div>

  
          <!-- Prix -->
          <p class="text-xl font-medium text-neutral-800 mb-4">
            {{ product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
          </p>
  
          <!-- Bouton ajouter au panier -->
          <div class="w-full">
            <button
              class="w-1/2 bg-[#FFB6B0] text-white font-semibold py-2 rounded-full hover:bg-[#ff8e7a] transition disabled:opacity-60 mb-4 md:mb-4"
              @click="handleAddToCart"
              :disabled="added"
            >
              {{ added ? 'Ajouté !' : 'Ajouter au panier' }}
            </button>
          </div>
          <transition name='fade-slide-up'>
            <div v-if="added" class="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 bg-[#2a2a22] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-pop-in">
              <Icon name="lucide:check-circle" class="w-5 h-5 text-[#FFB6B0]" />
              Produit ajouté au panier !
            </div>
          </transition>

          <!-- Description avec Voir plus -->
          <div class="text-base text-neutral-700 leading-relaxed mb-6">
            <p v-if="!showFullDesc">
              {{ truncatedDescription }}<span v-if="isTruncated">…</span>
            </p>
            <p v-else>
              {{ product.productDescription }}
            </p>
  
            <button
              v-if="isTruncated"
              @click="showFullDesc = !showFullDesc"
              class="mt-2 text-sm text-black underline hover:opacity-70 transition"
            >
              {{ showFullDesc ? 'Voir moins' : 'Voir plus' }}
            </button>
          </div>
        </div>
  
        <!-- Autres produits -->
        <div v-if="otherProducts.length" class="mt-24">
          <h2 class="text-2xl font-semibold text-center mb-10">Tu pourrais aussi aimer</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
              class="cursor-pointer transition hover:opacity-90"
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
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import ProductCard from '~/components/cards/product/ProductCard.vue'
  import { useCart } from '~/composables/useCart'
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
      pLevel: 5,
    }).then(res => res.data?.[0] || null)
  )

  console.log(product)
  
  const { data: allProducts } = await useAsyncData('all-products', () =>
    strapi.get<{ data: Product[] }>('products', { pLevel: 5 }).then(res => res.data || [])
  )

  
  const otherProducts = computed(() => {
    if (!allProducts.value || !product.value) return []
    const filtered = allProducts.value.filter(p => p.slug !== product.value.slug)
    return filtered.sort(() => 0.5 - Math.random()).slice(0, 3)
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
  function handleAddToCartOther(p) {
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
  </script>
  
  <style scoped>
  @media (max-width: 640px) {
    .sticky-buy-btn {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 50;
      background: #fff;
      box-shadow: 0 -2px 16px 0 rgba(0,0,0,0.06);
      padding: 1rem 1.5rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    }
  }
  .fade-slide-up-enter-active, .fade-slide-up-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  .fade-slide-up-enter-from, .fade-slide-up-leave-to {
    opacity: 0;
    transform: translateY(40px);
  }
  .fade-slide-up-enter-to, .fade-slide-up-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  @keyframes pop-in {
    0% { transform: scale(0.9); opacity: 0; }
    60% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  .animate-pop-in {
    animation: pop-in 0.4s;
  }
  </style>
  