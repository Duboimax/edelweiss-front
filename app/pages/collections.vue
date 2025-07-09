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
      <!-- Hero Section des collections -->
      <section class="py-20 px-4">
        <div class="container mx-auto max-w-7xl text-center">
          
          <!-- Badge premium -->
          <div class="inline-flex items-center bg-white/80 backdrop-blur-sm border border-[#e6e2d7] rounded-full px-6 py-3 mb-8 shadow-lg">
            <Icon name="lucide:layers" class="h-5 w-5 text-[#FFB6B0] mr-2" />
            <span class="text-sm font-medium text-[#2a2a22]">Créations par univers</span>
          </div>

          <!-- Titre principal -->
          <h1 class="font-serif text-5xl md:text-6xl font-bold text-[#2a2a22] mb-6 leading-tight">
            Nos 
            <span class="relative">
              <span class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] bg-clip-text text-transparent">
                Collections
              </span>
              <div class="absolute -bottom-3 left-0 w-full h-4 bg-gradient-to-r from-[#FFB6B0]/30 to-[#ff8e7a]/20 transform -rotate-1 rounded-full"></div>
            </span>
          </h1>

          <!-- Sous-titre -->
          <p class="text-xl text-[#5a5a52] mb-12 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos univers créatifs, chacun racontent une histoire unique. 
            Des créations artisanales organisées par thème pour vous inspirer.
          </p>

          <!-- Statistiques -->
          <div class="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-16">
            <div class="text-center">
              <div class="text-2xl font-bold text-[#2a2a22]">{{ collections?.length || 0 }}</div>
              <div class="text-sm text-[#5a5a52]">Collections</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-[#2a2a22]">100%</div>
              <div class="text-sm text-[#5a5a52]">Fait main</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-[#2a2a22]">🇫🇷</div>
              <div class="text-sm text-[#5a5a52]">Made in France</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Collections -->
      <section class="pb-20">
        <div class="container mx-auto px-4 md:px-6 max-w-7xl">
          
          <!-- États de chargement -->
          <div v-if="pending" class="flex justify-center items-center min-h-[500px]">
            <div class="flex flex-col items-center gap-4">
              <div class="relative">
                <div class="animate-spin rounded-full h-16 w-16 border-4 border-[#FFB6B0]/20 border-t-[#FFB6B0]"></div>
                <div class="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/20 animate-pulse"></div>
              </div>
              <p class="text-[#5a5a52] font-medium">Chargement de nos collections...</p>
            </div>
          </div>

          <div v-else-if="error" class="text-center py-20">
            <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-[#e6e2d7] max-w-md mx-auto">
              <Icon name="lucide:alert-circle" class="h-16 w-16 text-red-400 mx-auto mb-6" />
              <h3 class="text-xl font-semibold text-[#2a2a22] mb-4">Oups ! Une erreur s'est produite</h3>
              <p class="text-[#5a5a52] mb-6">Impossible de charger nos collections pour le moment.</p>
              <button class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer">
                Réessayer
              </button>
            </div>
          </div>

          <div v-else-if="collections && collections.length > 0" class="space-y-20">
            <CollectionCard
              v-for="(col, index) in collections"
              :key="col.id"
              :title="col.collectionName"
              :description="col.description || ''"
              :image="col.image ? 'https://edelweiss-back-production.up.railway.app' + col.image.url : undefined"
              :link="col.slug ? `/collections/${col.slug}` : '#'"
              :index="index"
            />
          </div>

          <div v-else class="text-center py-20">
            <div class="bg-white/40 backdrop-blur-sm rounded-3xl p-16 border border-[#e6e2d7] max-w-lg mx-auto">
              <div class="relative mb-8">
                <Icon name="lucide:layers" class="h-20 w-20 text-[#FFB6B0] mx-auto mb-4" />
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-[#FFB6B0]/10 rounded-full blur-xl"></div>
              </div>
              <h3 class="text-2xl font-serif font-bold text-[#2a2a22] mb-4">Bientôt disponible</h3>
              <p class="text-[#5a5a52] mb-8 leading-relaxed">
                Nos collections sont en cours de préparation. 
                Revenez bientôt pour découvrir nos univers créatifs !
              </p>
              <NuxtLink 
                to="/shop"
                class="bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] hover:from-[#3a3a32] hover:to-[#4a4a42] text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl cursor-pointer"
              >
                <Icon name="lucide:shopping-bag" class="h-5 w-5 inline mr-2" />
                Voir tous nos produits
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import CollectionCard from '~/components/dynamic/CollectionCard.vue'
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

<style scoped>
/* Animation pour l'apparition des collections */
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

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
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
</style>