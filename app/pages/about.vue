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
      
<DynamicZone 
  v-if="pageData.dynamicZone && pageData.dynamicZone.length > 0" 
  :components="pageData.dynamicZone" 
/>

      
      <div v-else class="container px-4 md:px-6 py-20">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl font-bold mb-6 text-[#2a2a22]">
{{ pageData.title || 'Page sans titre' }}
          </h1>
          <p class="text-lg text-gray-600">
            Cette page n'a pas encore de contenu configuré.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const strapi = useStrapi()

const { data: pageData, pending, error, refresh } = await useAsyncData('page', () =>
  strapi.get('pages', {
    'filters[slug][$eq]': 'about',
    populate: '*',
    pLevel: '10',
  }).then((res) => res.data?.[0] || null)
)


console.log('Page data:', pageData.value.dynamicZone)

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
</script>