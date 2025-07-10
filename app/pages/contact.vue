<template>
  <div>
    <Head>
      <title>{{ pageData?.title || 'À propos' }}</title>
      <meta 
        name="description" 
        :content="pageData?.seo?.metaDescription || 'Page à propos'" 
      />
      <meta 
        property="og:title" 
        :content="pageData?.seo?.metaTitle || pageData?.title" 
      />
      <meta 
        property="og:description" 
        :content="pageData?.seo?.metaDescription" 
      />
      <meta 
        property="og:image" 
        :content="pageData?.seo?.metaImage ? getStrapiMedia(pageData.seo.metaImage) : ''" 
      />
    </Head>
    
    <div v-if="pending" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a2a22]"></div>
    </div>
    
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
        <p class="text-gray-600">{{ error.message || 'Impossible de charger la page' }}</p>
      </div>
    </div>
    
    <div v-else-if="pageData">
      <template v-if="pageData.dynamicZone && pageData.dynamicZone.length > 0">
        <DynamicZone :components="pageData.dynamicZone" />
        <QuestionBloc :questions="faqQuestions" />
      </template>
      <template v-else>
        <div class="container px-4 md:px-6 py-20">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl font-bold mb-6 text-[#2a2a22]">
              {{ pageData.title || 'Page sans titre' }}
            </h1>
            <p class="text-lg text-gray-600">
              Cette page n'a pas encore de contenu configuré.
            </p>
          </div>
        </div>
        <QuestionBloc :questions="faqQuestions" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionBloc from '~/components/dynamic/QuestionBloc.vue'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'

const strapi = useStrapi()

const { data: pageData, pending, error, refresh } = await useAsyncData('page', () =>
  strapi.get('pages', {
    'filters[slug][$eq]': 'contact',
     pLevel: '5',
  }).then((res) => res.data?.[0] || null)
)


console.log('Pagse data:', pageData.value)

const getStrapiMedia = (media) => {
  if (!media) return ''
  
  if (media.data?.attributes) {
    const { url } = media.data.attributes
    return url.startsWith('/') ? `${useRuntimeConfig().public.strapi.url}${url}` : url
  }
  
  if (media.url) {
    return media.url.startsWith('/') ? `${useRuntimeConfig().public.strapi.url}${media.url}` : media.url
  }
  
  return ''
}

const refreshData = () => {
  refresh()
}

if (error.value) {
  console.error('Erreur lors du chargement de la page About:', error.value)
}

if (process.dev) {
  console.log('Page About data:', pageData.value)
}

const faqQuestions = [
  {
    question: 'Combien de temps prend la livraison ?',
    answer: 'La livraison standard prend généralement 3 à 5 jours ouvrés en France et 7 à 14 jours ouvrés à l\'international. Des options express sont disponibles lors du paiement.'
  },
  {
    question: 'Acceptez-vous les retours ?',
    answer: 'Nous acceptons les retours sous 14 jours après réception pour les articles non utilisés et dans leur emballage d\'origine. Les commandes personnalisées ne sont pas retournables sauf en cas de défaut.'
  },
  {
    question: 'Puis-je demander une commande personnalisée ?',
    answer: 'Oui ! Nous adorons créer des pièces sur-mesure. Merci d\'utiliser le formulaire de contact ci-dessus pour décrire votre projet, nous reviendrons vers vous avec les détails.'
  },
  {
    question: 'Comment entretenir mes articles en crochet ?',
    answer: 'La plupart de nos créations en crochet doivent être lavées à la main à l\'eau froide avec un savon doux, puis séchées à plat. Des instructions spécifiques sont fournies avec chaque produit.'
  },
  {
    question: 'Proposez-vous des options pour les professionnels ?',
    answer: 'Oui, nous proposons des tarifs professionnels pour certains produits. Merci de nous contacter pour en savoir plus sur notre programme de vente en gros.'
  }
]
</script>