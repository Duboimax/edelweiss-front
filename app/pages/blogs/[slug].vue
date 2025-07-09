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
      <div v-if="pending" class="flex justify-center items-center min-h-screen">
        <div class="flex flex-col items-center gap-4">
          <div class="relative">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-[#FFB6B0]/20 border-t-[#FFB6B0]"></div>
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/20 animate-pulse"></div>
          </div>
          <p class="text-[#5a5a52] font-medium">Chargement de l'article...</p>
        </div>
      </div>

      <div v-else-if="error || !blog" class="flex justify-center items-center min-h-screen">
        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-[#e6e2d7] max-w-md mx-auto text-center">
          <Icon name="lucide:file-x" class="h-16 w-16 text-red-400 mx-auto mb-6" />
          <h3 class="text-xl font-semibold text-[#2a2a22] mb-4">Article introuvable</h3>
          <p class="text-[#5a5a52] mb-6">Cet article n'existe pas ou a été supprimé.</p>
          <NuxtLink 
            to="/blogs"
            class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            Retour au blog
          </NuxtLink>
        </div>
      </div>

      <div v-else class="py-12">
        <!-- Navigation de retour -->
        <div class="container mx-auto px-4 max-w-4xl mb-8">
          <NuxtLink 
            to="/blogs"
            class="inline-flex items-center gap-2 text-[#5a5a52] hover:text-[#FFB6B0] transition-colors font-medium cursor-pointer"
          >
            <Icon name="lucide:arrow-left" class="h-4 w-4" />
            Retour au blog
          </NuxtLink>
        </div>

        <!-- Image hero -->
        <div v-if="blog.image && blog.image.url" class="mb-12">
          <div class="container mx-auto px-4 max-w-6xl">
            <div class="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-2xl border border-[#e6e2d7]">
              <img 
                :src="'https://edelweiss-back-production.up.railway.app' + blog.image.url" 
                :alt="blog.image.alternativeText || blog.title" 
                class="w-full h-full object-cover"
              />
              <!-- Overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#2a2a22]/40 via-transparent to-transparent"></div>
              
              <!-- Badge flottant -->
              <div class="absolute top-6 left-6 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] text-white px-6 py-3 rounded-2xl font-semibold shadow-xl">
                <Icon name="lucide:bookmark" class="h-4 w-4 inline mr-2" />
                Article de blog
              </div>
              
              <!-- Date flottante -->
              <div class="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-[#2a2a22] px-4 py-3 rounded-2xl font-medium shadow-xl">
                <Icon name="lucide:calendar" class="h-4 w-4 inline mr-2 text-[#FFB6B0]" />
                {{ new Date(blog.datePublish).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Contenu article -->
        <div class="container mx-auto px-4 max-w-4xl">
          <!-- Header article -->
          <header class="mb-12 text-center">
            <!-- Métadonnées -->
            <div class="flex items-center justify-center gap-6 mb-8 text-sm text-[#5a5a52]">
              <div class="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[#e6e2d7]">
                <Icon name="lucide:calendar" class="h-4 w-4 text-[#FFB6B0]" />
                <span>{{ new Date(blog.datePublish).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) }}</span>
              </div>
              
              <div class="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[#e6e2d7]">
                <Icon name="lucide:clock" class="h-4 w-4 text-[#FFB6B0]" />
                <span>{{ Math.max(1, Math.ceil(blog.content.length / 1000)) }} min de lecture</span>
              </div>
              
              <div v-if="blog.users_permissions_user?.username" class="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[#e6e2d7]">
                <Icon name="lucide:user" class="h-4 w-4 text-[#FFB6B0]" />
                <span>Par {{ blog.users_permissions_user.username }}</span>
              </div>
            </div>

            <!-- Titre -->
            <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a2a22] mb-6 leading-tight">
              {{ blog.title }}
            </h1>

            <!-- Actions sociales -->
            <div class="flex items-center justify-center gap-4">
              <button class="group flex items-center gap-2 bg-white/60 backdrop-blur-sm hover:bg-[#FFB6B0] hover:text-white px-4 py-2 rounded-full border border-[#e6e2d7] transition-all duration-300 cursor-pointer">
                <Icon name="lucide:heart" class="h-4 w-4 group-hover:fill-current" />
                <span class="text-sm font-medium">J'aime</span>
              </button>
              
              <button class="group flex items-center gap-2 bg-white/60 backdrop-blur-sm hover:bg-[#FFB6B0] hover:text-white px-4 py-2 rounded-full border border-[#e6e2d7] transition-all duration-300 cursor-pointer">
                <Icon name="lucide:share-2" class="h-4 w-4" />
                <span class="text-sm font-medium">Partager</span>
              </button>
              
              <button class="group flex items-center gap-2 bg-white/60 backdrop-blur-sm hover:bg-[#FFB6B0] hover:text-white px-4 py-2 rounded-full border border-[#e6e2d7] transition-all duration-300 cursor-pointer">
                <Icon name="lucide:bookmark" class="h-4 w-4" />
                <span class="text-sm font-medium">Sauvegarder</span>
              </button>
            </div>
          </header>

          <!-- Contenu principal -->
          <article class="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#e6e2d7] p-8 md:p-12">
            <div class="prose prose-lg max-w-none">
              <div class="text-[#2a2a22] leading-relaxed space-y-6">
                <template v-if="blog && blog.content">
                  <p 
                    v-for="(para, i) in blog.content.split(/\n\n+/)" 
                    :key="i" 
                    class="text-lg leading-8 whitespace-pre-line first-letter:text-4xl first-letter:font-bold first-letter:text-[#FFB6B0] first-letter:float-left first-letter:mr-2 first-letter:leading-[0.8]"
                    :class="{ 'first-letter:text-[#2a2a22]': i > 0 }"
                  >
                    {{ para }}
                  </p>
                </template>
                <template v-else>
                  <p class="italic text-[#5a5a52] text-center py-12">
                    Aucun contenu à afficher.
                  </p>
                </template>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-3 pt-8 mt-8 border-t border-[#e6e2d7]">
              <span class="bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/10 text-[#FFB6B0] px-4 py-2 rounded-full text-sm font-medium border border-[#FFB6B0]/20">
                #inspiration
              </span>
              <span class="bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/10 text-[#FFB6B0] px-4 py-2 rounded-full text-sm font-medium border border-[#FFB6B0]/20">
                #madeinfrance
              </span>
              <span class="bg-gradient-to-r from-[#FFB6B0]/20 to-[#ff8e7a]/10 text-[#FFB6B0] px-4 py-2 rounded-full text-sm font-medium border border-[#FFB6B0]/20">
                #créativité
              </span>
            </div>
          </article>

          <!-- Section auteur -->
          <div v-if="blog.users_permissions_user?.username" class="mt-12">
            <div class="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#e6e2d7]">
              <div class="flex items-center gap-6">
                <div class="w-20 h-20 bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {{ blog.users_permissions_user.username.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <h3 class="text-xl font-serif font-bold text-[#2a2a22] mb-2">
                    {{ blog.users_permissions_user.username }}
                  </h3>
                  <p class="text-[#5a5a52] leading-relaxed">
                    Artisan passionné chez Audelweiss, créateur de pièces uniques alliant tradition et modernité. 
                    Chaque création raconte une histoire, chaque détail exprime notre amour du fait-main.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation vers d'autres articles -->
          <div class="mt-12">
            <div class="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#e6e2d7] text-center">
              <Icon name="lucide:compass" class="h-12 w-12 text-[#FFB6B0] mx-auto mb-6" />
              <h3 class="text-2xl font-serif font-bold text-[#2a2a22] mb-4">
                Découvrez d'autres articles
              </h3>
              <p class="text-[#5a5a52] mb-8 leading-relaxed">
                Explorez notre univers créatif et laissez-vous inspirer par nos dernières créations et techniques artisanales.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <NuxtLink 
                  to="/blogs"
                  class="inline-flex items-center gap-2 bg-gradient-to-r from-[#2a2a22] to-[#3a3a32] hover:from-[#3a3a32] hover:to-[#4a4a42] text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl cursor-pointer"
                >
                  <Icon name="lucide:arrow-left" class="h-5 w-5" />
                  Tous les articles
                </NuxtLink>
                
                <NuxtLink 
                  to="/shop"
                  class="inline-flex items-center gap-2 border-2 border-[#FFB6B0] text-[#FFB6B0] hover:bg-[#FFB6B0] hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <Icon name="lucide:shopping-bag" class="h-5 w-5" />
                  Voir nos créations
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="mt-12">
            <div class="bg-gradient-to-r from-[#FFB6B0]/10 to-[#ff8e7a]/5 backdrop-blur-sm rounded-3xl border border-[#FFB6B0]/20 p-8 text-center">
              <Icon name="lucide:mail" class="h-10 w-10 text-[#FFB6B0] mx-auto mb-4" />
              <h4 class="text-xl font-serif font-bold text-[#2a2a22] mb-3">
                Restez inspiré(e)
              </h4>
              <p class="text-[#5a5a52] mb-6">
                Recevez nos derniers articles et créations directement dans votre boîte mail.
              </p>
              <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Votre adresse email"
                  class="flex-1 px-4 py-3 border-2 border-[#FFB6B0]/30 rounded-xl focus:outline-none focus:border-[#FFB6B0] transition-colors bg-white/80"
                />
                <button class="bg-gradient-to-r from-[#FFB6B0] to-[#ff8e7a] hover:from-[#ff8e7a] hover:to-[#ff6b5a] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useStrapi } from '~/composables/useStrapi'

const route = useRoute()
const strapi = useStrapi()

interface Blog {
  id: number
  title: string
  slug: string
  content: string
  datePublish: string
  image?: { url: string; alternativeText?: string }
  users_permissions_user?: { username?: string } | null
}

const { data: blog, pending, error } = await useAsyncData('blog', () =>
  strapi.get<{ data: Blog[] }>('articles', {
    'filters[slug][$eq]': route.params.slug,
    pLevel: 5
  }).then(res => res.data?.[0] || null)
)
</script>

<style scoped>
/* Animation pour le contenu */
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

article {
  animation: fadeInUp 0.8s ease-out;
}

/* Style pour la première lettre */
.prose p:first-of-type::first-letter {
  float: left;
  font-size: 4rem;
  line-height: 0.8;
  margin-right: 0.5rem;
  font-weight: bold;
  color: #FFB6B0;
}

/* Container responsive */
.container {
  max-width: 1200px;
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
  
  .prose p:first-of-type::first-letter {
    font-size: 3rem;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>