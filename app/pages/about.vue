<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-4 max-w-5xl mt-8">
      <Breadcrumb :items="[
        { label: 'Accueil', to: '/' },
        { label: 'À propos', to: null }
      ]" />
    </div>
    <div class="bg-gradient-to-br from-[#fffafd] via-[#fff6fa] to-[#f9f7f2] w-full pb-24">
      <div class="container mx-auto px-4 md:px-8 pt-8">
        <div v-if="pending" class="flex justify-center items-center min-h-[300px]">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB6B0]"></div>
        </div>
        <div v-else-if="error" class="text-center text-red-600 py-12">
          <div class="inline-flex flex-col items-center gap-2">
            <Icon name="lucide:alert-circle" class="w-8 h-8 text-[#FFB6B0]" />
            <span>Erreur lors du chargement de la page.</span>
          </div>
        </div>
        <div v-else-if="pageData">
          <!-- HERO SECTION dynamique ou fallback -->
          <section class="flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-20">
            <div class="flex-1 flex flex-col items-start justify-center">
              <h1 class="font-serif text-5xl md:text-6xl font-bold text-[#2a2a22] mb-6 leading-tight">
                {{ pageData.dynamicZone?.[0]?.title || 'Notre Histoire' }}
              </h1>
              <p class="text-lg md:text-xl text-[#5a5a52] mb-8 max-w-xl leading-relaxed">
                {{ pageData.dynamicZone?.[0]?.description || 'Créer des pièces uniques faites main avec amour et souci du détail.' }}
              </p>
              <a v-if="pageData.dynamicZone?.[0]?.CTA?.[0]?.link" :href="pageData.dynamicZone[0].CTA[0].link" class="inline-block bg-[#FFB6B0] hover:bg-[#ff8e7a] text-white px-8 py-3 text-lg font-semibold rounded-full shadow transition-colors duration-200">
                {{ pageData.dynamicZone[0].CTA[0].buttonName || 'Voir notre boutique' }}
              </a>
            </div>
            <div class="flex-1 flex justify-center">
              <img v-if="pageData.dynamicZone?.[0]?.image" :src="getImageUrl(pageData.dynamicZone[0].image)" alt="Notre Histoire" class="rounded-2xl w-80 h-[420px] object-cover shadow-none border-4 border-[#fff6fa]" />
            </div>
          </section>

          <!-- TRIPLE CONTENT dynamique ou fallback -->
          <section class="mb-20">
            <div class="grid md:grid-cols-3 gap-12">
              <div>
                <h2 class="font-serif text-2xl md:text-3xl font-bold text-[#2a2a22] mb-4">
                  {{ pageData.dynamicZone?.[1]?.title1 || 'Le Voyage Audelweiss' }}
                </h2>
                <p class="text-base md:text-lg text-[#5a5a52] leading-relaxed">
                  {{ pageData.dynamicZone?.[1]?.content1 || '...' }}
                </p>
              </div>
              <div>
                <h2 class="font-serif text-2xl md:text-3xl font-bold text-[#2a2a22] mb-4">
                  {{ pageData.dynamicZone?.[1]?.title2 || 'Notre Philosophie' }}
                </h2>
                <p class="text-base md:text-lg text-[#5a5a52] leading-relaxed">
                  {{ pageData.dynamicZone?.[1]?.content2 || '...' }}
                </p>
              </div>
              <div>
                <h2 class="font-serif text-2xl md:text-3xl font-bold text-[#2a2a22] mb-4">
                  {{ pageData.dynamicZone?.[1]?.title3 || 'Notre Savoir-Faire' }}
                </h2>
                <p class="text-base md:text-lg text-[#5a5a52] leading-relaxed">
                  {{ pageData.dynamicZone?.[1]?.content3 || '...' }}
                </p>
              </div>
            </div>
          </section>

          <!-- PORTRAIT ARTISANE dynamique ou fallback -->
          <section class="flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-20">
            <div class="flex-1 flex justify-center order-2 md:order-1">
              <img v-if="pageData.dynamicZone?.[2]?.artisanImage" :src="getImageUrl(pageData.dynamicZone[2].artisanImage)" alt="Audrey, créatrice" class="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-[#FFB6B0]" />
            </div>
            <div class="flex-1 flex flex-col items-start order-1 md:order-2">
              <h2 class="font-serif text-3xl md:text-4xl font-bold text-[#2a2a22] mb-2">
                {{ pageData.dynamicZone?.[2]?.artisanName || 'Audrey' }}
              </h2>
              <div class="text-[#FFB6B0] text-lg font-semibold mb-4">
                {{ pageData.dynamicZone?.[2]?.artisanRole || 'Créatrice' }}
              </div>
              <p class="text-base md:text-lg text-[#5a5a52] leading-relaxed mb-2">
                {{ pageData.dynamicZone?.[2]?.description || '...' }}
              </p>
            </div>
          </section>

          <!-- APPEL À L'ACTION FINAL dynamique ou fallback -->
          <section class="flex flex-col items-center text-center mt-16">
            <h2 class="font-serif text-2xl md:text-3xl font-bold text-[#2a2a22] mb-2">
              {{ pageData.dynamicZone?.[3]?.title || 'Envie d’en savoir plus sur notre processus ?' }}
            </h2>
            <p class="text-base md:text-lg text-[#5a5a52] mb-6">
              {{ pageData.dynamicZone?.[3]?.subtitle || 'Contactez-nous pour organiser une visite d’atelier ou pour discuter d’une commande sur mesure.' }}
            </p>
            <a v-if="pageData.dynamicZone?.[3]?.CTA?.[0]?.link" :href="pageData.dynamicZone[3].CTA[0].link" class="inline-block bg-[#FFB6B0] hover:bg-[#ff8e7a] text-white px-8 py-3 text-lg font-semibold rounded-full shadow transition-colors duration-200">
              {{ pageData.dynamicZone[3].CTA[0].buttonName || 'Nous contacter' }}
            </a>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '~/components/ui/Breadcrumb.vue'
const strapi = useStrapi()

interface AboutPageData {
  title?: string
  dynamicZone?: any[]
}

const { data: pageData, pending, error } = await useAsyncData('page', () =>
  strapi.get<{ data: AboutPageData[] }>('pages', {
    'filters[slug][$eq]': 'about',
    pLevel: 3,
  }).then(res => res.data?.[0] || null)
)

function getImageUrl(img: any): string {
  if (!img) return ''
  if (img.url) return img.url.startsWith('/') ? `https://edelweiss-back-production.up.railway.app${img.url}` : img.url
  if (img.data?.attributes?.url) return img.data.attributes.url.startsWith('/') ? `https://edelweiss-back-production.up.railway.app${img.data.attributes.url}` : img.data.attributes.url
  return ''
}
</script>

<style scoped>
img[alt] {
  box-shadow: none;
}
</style>