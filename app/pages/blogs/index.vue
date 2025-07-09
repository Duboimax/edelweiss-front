<script setup lang="ts">
import { useStrapi } from '~/composables/useStrapi'
import { computed } from 'vue'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'
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

// SUPPRESSION de blogsWithExcerpt et getExcerptMarkdown
</script>

<template>
  <div>
    <div class="container mx-auto px-4 max-w-5xl mt-8">
      <Breadcrumb :items="[
        { label: 'Accueil', to: '/' },
        { label: 'Blog', to: null }
      ]" />
    </div>
    <div class="bg-gradient-to-br from-[#fffafd] via-[#fff6fa] to-[#f9f7f2] min-h-screen py-16">
      <div class="container mx-auto px-4 md:px-8">
        <h1 class="font-serif text-5xl md:text-6xl font-bold text-center text-[#2a2a22] mb-12 tracking-tight">Blogs</h1>
        <div v-if="pending" class="flex justify-center items-center min-h-[300px]">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a2a22]"></div>
        </div>
        <div v-else-if="error" class="text-center text-red-600 py-12">
          Erreur lors du chargement des articles.
        </div>
        <div v-else-if="blogs?.length === 0" class="text-center text-gray-500 py-12">
          Aucun article pour le moment.
        </div>
        <div v-else class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="blog in blogs || []" :key="blog.id" class="bg-white shadow-lg overflow-hidden flex flex-col group hover:shadow-2xl transition-shadow border border-[#f3e7e7]">
            <NuxtLink :to="`/blogs/${blog.slug}`" class="block">
              <img v-if="blog.image" :src="'https://edelweiss-back-production.up.railway.app' + blog.image.url" :alt="blog.image.alternativeText || blog.title" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 border-b border-[#f3e7e7]" />
              <div v-else class="w-full h-64 bg-[#fff0f6] flex items-center justify-center text-4xl text-[#FFB6B0] font-serif border-b border-[#f3e7e7]">A</div>
            </NuxtLink>
            <div class="flex-1 flex flex-col p-6">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs bg-[#fff0f6] text-[#FFB6B0] px-3 py-1 font-semibold uppercase tracking-wider border border-[#ffe3ed]">Blog</span>
                <span class="text-xs text-gray-400">{{ new Date(blog.datePublish).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
              </div>
              <NuxtLink :to="`/blogs/${blog.slug}`" class="font-serif text-2xl font-bold text-[#2a2a22] mb-3 hover:underline">{{ blog.title }}</NuxtLink>
              <div class="text-[#5a5a52] text-base mb-6 line-clamp-3">
                {{ blog.content.slice(0, 200) }}<span v-if="blog.content.length > 200">... <NuxtLink :to="`/blogs/${blog.slug}`" class="underline text-[#FFB6B0]">Voir plus</NuxtLink></span>
              </div>
              <NuxtLink :to="`/blogs/${blog.slug}`" class="mt-auto inline-block bg-[#FFB6B0] text-white px-6 py-2 font-medium hover:bg-[#ff8e7a] transition shadow">Lire l'article</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 