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
    ],
    optimizeDeps: {
      include: ['leaflet'],
    },
  },
  runtimeConfig: {
    apiUrl: 'NUXT_API_URL',
    strapiToken: 'e647c2f006b9c96c5f5699c1f6237996b314b38c9c981dea62f24b1b8ce266f06f48b4289eb249bb804528d190fb122236f45aa31158efb2129c510b994724267d09651d3bcc673a6531d386120277897405c5be115d9d20ea0dc8bdf88fe8d2f17b13a3362ff5a9e7885579dadb7125836a044eae3d4944e5587992e5587459'
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