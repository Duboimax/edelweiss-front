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

<template>
  <div class="bg-gradient-to-br from-[#fffafd] via-[#fff6fa] to-[#f9f7f2] min-h-screen py-12">
    <div class="container mx-auto px-4 md:px-8 max-w-3xl">
      <div v-if="pending" class="flex justify-center items-center min-h-[300px]">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a2a22]"></div>
      </div>
      <div v-else-if="error || !blog" class="text-center text-red-600 py-20 text-lg">
        Article introuvable.
      </div>
      <div v-else>
        <div class="mb-10">
          <img v-if="blog.image && blog.image.url" :src="'https://edelweiss-back-production.up.railway.app' + blog.image.url" :alt="blog.image.alternativeText || blog.title" class="w-full h-80 object-cover border border-[#f3e7e7] mb-8" />
          <div class="flex items-center gap-4 mb-4">
            <span class="text-xs bg-[#fff0f6] text-[#FFB6B0] px-3 py-1 font-semibold uppercase tracking-wider border border-[#ffe3ed]">Blog</span>
            <span class="text-xs text-gray-400">{{ new Date(blog.datePublish).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
            <span v-if="blog.users_permissions_user && blog.users_permissions_user.username" class="text-xs text-[#2a2a22] ml-auto">Par {{ blog.users_permissions_user.username }}</span>
          </div>
          <h1 class="font-serif text-4xl font-bold text-[#2a2a22] mb-6 leading-tight">{{ blog.title }}</h1>
        </div>
        <div class="prose prose-lg max-w-none text-[#2a2a22] prose-headings:font-serif prose-headings:text-2xl prose-p:leading-relaxed prose-a:text-[#FFB6B0] prose-a:underline prose-img:my-6 prose-img:border prose-img:border-[#f3e7e7] prose-blockquote:border-l-4 prose-blockquote:border-[#FFB6B0] prose-blockquote:bg-[#fff0f6]/40 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic prose-blockquote:text-[#5a5a52] prose-strong:text-[#2a2a22] prose-code:bg-[#fff0f6] prose-code:text-[#FFB6B0] prose-code:px-1 prose-code:rounded-none">
          <template v-if="blog && blog.content">
            <p v-for="(para, i) in blog.content.split(/\n\n+/)" :key="i" class="mb-6 whitespace-pre-line">{{ para }}</p>
          </template>
          <template v-else>
            <p class="italic text-gray-400">Aucun contenu à afficher.</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose {
  font-family: 'Inter', 'serif', serif;
}
</style> 