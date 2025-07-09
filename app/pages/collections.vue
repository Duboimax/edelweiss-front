<script setup lang="ts">
import CollectionCard from '~/components/dynamic/CollectionCard.vue'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'
const strapi = useStrapi()

interface Collection {
  id: number
  collectionName: string
  description?: string
  image?: { url: string, alternativeText?: string }
  slug?: string
}

const { data: collections, pending, error } = await useAsyncData('collections', () =>
  strapi.get<{ data: Collection[] }>('collections', { populate: '*', pLevel: 5 }).then(res => res.data || [])
)
</script>

<template>
  <div>
    <div class="container mx-auto px-4 max-w-5xl mt-8">
      <Breadcrumb :items="[
        { label: 'Accueil', to: '/' },
        { label: 'Collections', to: null }
      ]" />
    </div>
    <div class="bg-gradient-to-br from-[#fffafd] via-[#fff6fa] to-[#f9f7f2] min-h-screen">
      <div class="container mx-auto px-4 md:px-6 py-12">
        <h1 class="font-serif text-4xl font-medium tracking-tight text-[#2a2a22] mb-8 text-center">Nos collections</h1>
        <div v-if="pending" class="flex justify-center items-center min-h-[300px]">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a2a22]"></div>
        </div>
        <div v-else-if="error" class="text-center text-red-600 py-12">
          Erreur lors du chargement des collections.
        </div>
        <div v-else-if="collections && collections.length > 0" class="space-y-16">
          <CollectionCard
            v-for="col in collections"
            :key="col.id"
            :title="col.collectionName"
            :description="col.description || ''"
            :image="col.image ? 'https://edelweiss-back-production.up.railway.app' + col.image.url : undefined"
            :link="col.slug ? `/collections/${col.slug}` : '#'"
          />
        </div>
        <div v-else class="text-center py-12">
          <p class="text-gray-600">Aucune collection disponible pour le moment.</p>
        </div>
      </div>
    </div>
  </div>
</template> 