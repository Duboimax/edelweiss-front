<template>
  <div>
    <HomePage />
  </div>
</template>

<script setup lang="ts">
import HomePage from '~/components/HomePage.vue'

useHead({
  title: 'Audelweiss - Artisanat d\'exception des Alpes',
  meta: [
    { name: 'description', content: 'Découvrez des créations uniques, faites main dans les Alpes françaises. Artisanat authentique et éco-responsable.' },
    { property: 'og:title', content: 'Audelweiss - Artisanat d\'exception des Alpes' },
    { property: 'og:description', content: 'Créations uniques faites main dans les Alpes françaises' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>