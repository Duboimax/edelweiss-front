<script setup lang="ts">
import { useRoute } from 'vue-router'
import ContactSection from '~/components/sections/ContactSection.vue'

const route = useRoute()


</script>


<template>
  <HomePage />

  <ContactSection />
</template>
