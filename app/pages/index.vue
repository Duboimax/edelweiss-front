<script setup lang="ts">
import ProductCard from '~/components/cards/product/ProductCard.vue'
import { useCart } from '~/composables/useCart'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'
const strapi = useStrapi()

const { data: products, pending } = await useAsyncData('home-products', () =>
  strapi.get<{ data: any[] }>('products', { pLevel: 5 }).then(res => res.data?.slice(0, 6) || [])
)

function formatEuro(price: number) {
  return price?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

const { addToCart } = useCart()
const showNotif = ref(false)
function handleAddToCart(product) {
  addToCart({
    id: product.id,
    productName: product.productName,
    price: product.price,
    slug: product.slug,
    productImage: product.productImage
  })
  showNotif.value = true
  setTimeout(() => { showNotif.value = false }, 1200)
}
</script>

<template>
  <div class="bg-gradient-to-br from-[#fffafd] via-[#fff6fa] to-[#f9f7f2] min-h-screen">
    <div class="container mx-auto px-4 max-w-5xl mt-8">
      <Breadcrumb :items="[
        { label: 'Accueil', to: null }
      ]" />
    </div>
    <!-- HERO -->
    <section class="relative flex flex-col items-center justify-center text-center py-28 px-4 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none z-0">
        <div class="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#fff0f6] opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#fff0f6] opacity-5 rounded-full blur-2xl animate-pulse"></div>
      </div>
      <h1 class="relative z-10 font-serif text-5xl sm:text-6xl font-bold tracking-tight text-[#2a2a22] mb-6 drop-shadow-xl">L'artisanat qui fait battre le cœur</h1>
      <p class="relative z-10 text-xl sm:text-2xl text-[#5a5a52] max-w-2xl mx-auto mb-10">Des créations uniques, faites main dans les Alpes, pour offrir ou se faire plaisir. Découvrez l'univers Audelweiss, où chaque pièce raconte une histoire.</p>
      <NuxtLink to="/shop" class="relative z-10 inline-block bg-[#fff0f6] hover:bg-[#ffe3ed] text-[#2a2a22] text-lg font-semibold px-10 py-4 rounded-full shadow-lg border border-[#ffe3ed] transition-all duration-200">Découvrir la boutique</NuxtLink>
    </section>

    <!-- COUPS DE CŒUR PRODUITS -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="font-serif text-3xl sm:text-4xl font-medium text-[#2a2a22] text-center mb-10">Nos coups de cœur</h2>
        <div v-if="pending" class="flex justify-center items-center min-h-[200px]">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fff0f6]"></div>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :productName="product.productName"
            :image="'https://edelweiss-back-production.up.railway.app' + product.productImage.url"
            :price="formatEuro(product.price)"
            :slug="product.slug"
            :productId="product.id"
            :productImageObj="product.productImage"
            @click="$router.push(`/product/${product.slug}`)"
            @add-to-cart="() => handleAddToCart(product)"
            class="cursor-pointer transition hover:scale-105 hover:shadow-2xl duration-200 border border-[#fff0f6] bg-white/90"
          />
        </div>
        <transition name="fade-slide-up">
          <div v-if="showNotif" class="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 bg-[#2a2a22] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-pop-in">
            <Icon name="lucide:check-circle" class="w-5 h-5 text-[#FFB6B0]" />
            Produit ajouté au panier !
          </div>
        </transition>
      </div>
    </section>

    <!-- AVIS CLIENTS -->
    <section class="py-16 px-4 bg-white/80 border-t border-[#ffe3ed]">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-serif text-3xl sm:text-4xl font-medium text-[#2a2a22] text-center mb-10">Ils nous font confiance</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-[#fffafd] rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div class="text-3xl mb-2">⭐️⭐️⭐️⭐️⭐️</div>
            <p class="text-[#5a5a52] mb-4 italic">“Magnifiques créations, livraison rapide et emballage soigné. Je recommande à 100% !”</p>
            <div class="font-semibold text-[#2a2a22]">Camille D.</div>
          </div>
          <div class="bg-[#fffafd] rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div class="text-3xl mb-2">⭐️⭐️⭐️⭐️⭐️</div>
            <p class="text-[#5a5a52] mb-4 italic">“Un cadeau unique qui a fait sensation. Merci pour votre écoute et votre talent !”</p>
            <div class="font-semibold text-[#2a2a22]">Julien M.</div>
          </div>
          <div class="bg-[#fffafd] rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div class="text-3xl mb-2">⭐️⭐️⭐️⭐️⭐️</div>
            <p class="text-[#5a5a52] mb-4 italic">“J’ai commandé une pièce sur-mesure, le résultat est parfait. Je repasserai commande !”</p>
            <div class="font-semibold text-[#2a2a22]">Sophie L.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- APPEL À L'ACTION FINAL -->
    <section class="py-20 px-4 bg-gradient-to-r from-[#fff0f6]/10 to-[#fff1f7]/20 flex flex-col items-center text-center">
      <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#2a2a22] mb-4">Prêt·e à trouver le cadeau parfait ?</h2>
      <p class="text-lg text-[#5a5a52] mb-8 max-w-xl">Explore nos collections et découvre des créations personnalisées, pensées pour durer et faire plaisir.</p>
      <NuxtLink to="/shop" class="inline-block bg-[#fff0f6] hover:bg-[#ffe3ed] text-[#2a2a22] text-lg font-semibold px-10 py-4 rounded-full shadow-lg border border-[#ffe3ed] transition-all duration-200">Voir la boutique</NuxtLink>
    </section>
  </div>
</template>
