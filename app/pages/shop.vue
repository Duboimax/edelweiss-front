<script setup lang="ts">
import { useRouter } from 'vue-router'
import ProductCard from '~/components/cards/product/ProductCard.vue'
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
}

const { data: products, pending, error } = await useAsyncData('products', () =>
  strapi.get<{ data: Product[] }>('products', { pLevel: 10 }).then((res) => res.data || [])
)

const router = useRouter()

function goToProduct(slug: string) {
  router.push(`/product/${slug}`)
}
</script>

<template>
  <div class="bg-gradient-to-br from-[#fffafd] via-[#fff6fa] to-[#f9f7f2] min-h-screen">
    <div class="container mx-auto px-4 md:px-6 py-12">
      <h1 class="font-serif text-4xl font-medium tracking-tight text-[#2a2a22] mb-8 text-center">Boutique</h1>
      <div v-if="pending" class="flex justify-center items-center min-h-[300px]">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a2a22]"></div>
      </div>
      <div v-else-if="error" class="text-center text-red-600 py-12">
        Erreur lors du chargement des produits.
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div
          v-for="product in products"
          :key="product.id"
          @click="goToProduct(product.slug)"
          class="cursor-pointer"
        >
          <ProductCard
            :productName="product.productName"
            :image="'https://edelweiss-back-production.up.railway.app' + product.productImage.url"
            :price="product.price"
          />
        </div>
      </div>
    </div>
  </div>
</template>
