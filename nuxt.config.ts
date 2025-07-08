// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: true,
  future: {
    compatibilityVersion: 4,
  },
  pages: true,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  runtimeConfig: {
    apiUrl: 'NUXT_API_URL'
  },
  css: ['~/assets/css/main.css'],
  eslint: {
    config: {
      stylistic: true
    }
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/eslint'
  ]
})