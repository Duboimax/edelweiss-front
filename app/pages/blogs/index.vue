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
      <!-- Hero Section du blog -->
      <section class="py-16 px-4">
        <div class="container mx-auto max-w-7xl text-center">
          
          <!-- Badge premium -->
          <div class="inline-flex items-center bg-white/80 backdrop-blur-sm border border-[#e6e2d7] rounded-full px-6 py-3 mb-8 shadow-lg">
            <Icon name="lucide:pen-tool" class="h-5 w-5 text-[#FFB6B0] mr-2" />
            <span class="text-sm font-medium text-[#2a2a22]">Actualités & Inspirations</span>
          </div>

          <!-- Titre principal -->
          <h1 class="font-serif text-5xl md:text-6xl font-bold text-[#2a2a22] mb-6 leading-tight">
            Notre 
            <span class="relative">
              <span class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] bg-clip-text text-transparent">
                Blog
              </span>
              <div class="absolute -bottom-3 left-0 w-full h-4 bg-gradient-to-r from-[#FFB6B0]/30 to-[#ff8e7a]/20 transform -rotate-1 rounded-full"></div>
            </span>
          </h1>

          <!-- Sous-titre -->
          <p class="text-xl text-[#5a5a52] mb-12 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos dernières créations, nos techniques artisanales et laissez-vous inspirer 
            par notre passion pour l'art du fait-main.
          </p>

          <!-- Statistiques -->
          <div class="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-16">
            <div class="text-center">
              <div class="text-2xl font-bold text-[#2a2a22]">{{ blogs?.length || 0 }}</div>
              <div class="text-sm text-[#5a5a52]">Articles</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-[#2a2a22]">🎨</div>
              <div class="text-sm text-[#5a5a52]">Inspirations</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-[#2a2a22]">✨</div>
              <div class="text-sm text-[#5a5a52]">Créativité</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Articles -->
      <section class="pb-20">
        <div class="container mx-auto px-4 md:px-6 max-w-7xl">
          
          <!-- États de chargement -->
          <div v-if="pending" class="flex justify-center items-center min-h-[500px]">
            <div class="flex flex-col items-center gap-4">
              <div class="relative">
                <div class="animate-spin rounded-full h-16 w-16 border-4 border-[#FFB6B0]/20 border-t-[#FFB6B0]"></div>
                <div class="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/20 animate-pulse"></div>
              </div>
              <p class="text-[#5a5a52] font-medium">Chargement de nos articles...</p>
            </div>
          </div>

          <div v-else-if="error" class="text-center py-20">
            <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-[#e6e2d7] max-w-md mx-auto">
              <Icon name="lucide:alert-circle" class="h-16 w-16 text-red-400 mx-auto mb-6" />
              <h3 class="text-xl font-semibold text-[#2a2a22] mb-4">Oups ! Une erreur s'est produite</h3>
              <p class="text-[#5a5a52] mb-6">Impossible de charger nos articles pour le moment.</p>
              <button class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer">
                Réessayer
              </button>
            </div>
          </div>

          <div v-else-if="blogs?.length === 0" class="text-center py-20">
            <div class="bg-white/40 backdrop-blur-sm rounded-3xl p-16 border border-[#e6e2d7] max-w-lg mx-auto">
              <div class="relative mb-8">
                <Icon name="lucide:pen-tool" class="h-20 w-20 text-[#FFB6B0] mx-auto mb-4" />
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-[#FFB6B0]/10 rounded-full blur-xl"></div>
              </div>
              <h3 class="text-2xl font-serif font-bold text-[#2a2a22] mb-4">Bientôt des articles passionnants</h3>
              <p class="text-[#5a5a52] mb-8 leading-relaxed">
                Nos artisans préparent de nouveaux contenus inspirants. 
                Revenez bientôt pour découvrir nos dernières créations !
              </p>
              <NuxtLink 
                to="/shop"
                class="bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] hover:from-[#3a3a32] hover:to-[#4a4a42] text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl cursor-pointer"
              >
                <Icon name="lucide:shopping-bag" class="h-5 w-5 inline mr-2" />
                Découvrir nos créations
              </NuxtLink>
            </div>
          </div>

          <!-- Grille d'articles -->
          <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <article 
              v-for="(blog, index) in blogs || []" 
              :key="blog.id" 
              class="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#e6e2d7] overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              :style="{ animationDelay: `${index * 150}ms` }"
            >
              <!-- Image avec overlay -->
              <div class="relative aspect-[4/3] overflow-hidden">
                <NuxtLink :to="`/blogs/${blog.slug}`" class="block h-full">
                  <img 
                    v-if="blog.image" 
                    :src="'https://edelweiss-back-production.up.railway.app' + blog.image.url" 
                    :alt="blog.image.alternativeText || blog.title" 
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div 
                    v-else 
                    class="w-full h-full bg-gradient-to-br from-[#FFB6B0]/20 to-[#ff8e7a]/10 flex items-center justify-center"
                  >
                    <div class="text-center">
                      <Icon name="lucide:pen-tool" class="h-16 w-16 text-[#FFB6B0] mx-auto mb-2" />
                      <span class="text-sm font-medium text-[#2a2a22]">Article</span>
                    </div>
                  </div>
                </NuxtLink>
                
                <!-- Overlay gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-[#2a2a22]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- Badge catégorie -->
                <div class="absolute top-4 left-4 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  <Icon name="lucide:bookmark" class="h-3 w-3 inline mr-1" />
                  Blog
                </div>
                
                <!-- Date flottante -->
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#2a2a22] px-3 py-2 rounded-xl text-xs font-medium shadow-lg">
                  {{ new Date(blog.datePublish).toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'short' 
                  }) }}
                </div>
              </div>

              <!-- Contenu -->
              <div class="p-6 space-y-4">
                <!-- Métadonnées -->
                <div class="flex items-center gap-3 text-xs text-[#5a5a52]">
                  <div class="flex items-center gap-1">
                    <Icon name="lucide:calendar" class="h-3 w-3 text-[#FFB6B0]" />
                    <span>{{ new Date(blog.datePublish).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="lucide:clock" class="h-3 w-3 text-[#FFB6B0]" />
                    <span>{{ Math.max(1, Math.ceil(blog.content.length / 1000)) }} min</span>
                  </div>
                </div>

                <!-- Titre -->
                <NuxtLink 
                  :to="`/blogs/${blog.slug}`" 
                  class="block font-serif text-xl font-bold text-[#2a2a22] leading-tight hover:text-[#FFB6B0] transition-colors duration-200 line-clamp-2"
                >
                  {{ blog.title }}
                </NuxtLink>

                <!-- Extrait -->
                <p class="text-[#5a5a52] leading-relaxed line-clamp-3">
                  {{ blog.content.replace(/<[^>]*>/g, '').slice(0, 150) }}{{ blog.content.length > 150 ? '...' : '' }}
                </p>

                <!-- CTA -->
                <div class="pt-4">
                  <NuxtLink 
                    :to="`/blogs/${blog.slug}`" 
                    class="group inline-flex items-center gap-2 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <span>Lire l'article</span>
                    <Icon name="lucide:arrow-right" class="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </NuxtLink>
                </div>

                <!-- Tags fictifs pour plus de richesse -->
                <div class="flex flex-wrap gap-2 pt-4 border-t border-[#e6e2d7]">
                  <span class="bg-[#FFB6B0]/10 text-[#FFB6B0] px-3 py-1 rounded-full text-xs font-medium">
                    #artisanat
                  </span>
                  <span class="bg-[#FFB6B0]/10 text-[#FFB6B0] px-3 py-1 rounded-full text-xs font-medium">
                    #inspiration
                  </span>
                </div>
              </div>
            </article>
          </div>

          <!-- Newsletter section -->
          <div v-if="blogs?.length > 0" class="mt-20">
            <div class="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-[#e6e2d7] text-center">
              <div class="max-w-2xl mx-auto">
                <Icon name="lucide:mail" class="h-12 w-12 text-[#FFB6B0] mx-auto mb-6" />
                <h3 class="text-2xl font-serif font-bold text-[#2a2a22] mb-4">
                  Ne manquez aucun article
                </h3>
                <p class="text-[#5a5a52] mb-8 leading-relaxed">
                  Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et inspirations artisanales directement dans votre boîte mail.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Votre adresse email"
                    class="flex-1 px-6 py-4 border-2 border-[#e6e2d7] rounded-2xl focus:outline-none focus:border-[#FFB6B0] transition-colors text-[#2a2a22]"
                  />
                  <button class="bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] hover:from-[#3a3a32] hover:to-[#4a4a42] text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
                    S'inscrire
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStrapi } from '~/composables/useStrapi'
import { computed } from 'vue'
import Breadcrumb from '~/components/ui/Breadcrumb'

const strapi = useStrapi()

interface Blog {
  id: number
  title: string
  slug: string
  content: string
  datePublish: string
  image?: { url: string; alternativeText?: string }
  users_permissions_user?: any
}

const { data: blogs, pending, error } = await useAsyncData('blogs', () =>
  strapi.get<{ data: Blog[] }>('articles?sort=datePublish:desc', { pLevel: 5 }).then(res => res.data || [])
)
</script>

<style scoped>
/* Animation pour l'apparition des articles */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

article {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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