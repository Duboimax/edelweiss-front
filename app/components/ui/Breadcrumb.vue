<template>
  <nav class="flex items-center text-sm text-[#5a5a52] mb-8" aria-label="Fil d'Ariane">
    <template v-for="(item, i) in items" :key="i">
      <NuxtLink
        v-if="item.to && i !== items.length - 1"
        :to="item.to"
        class="hover:underline text-[#2a2a22] font-medium transition-colors"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else-if="i === items.length - 1" class="text-[#FFB6B0] font-semibold truncate max-w-[180px]">{{ item.label }}</span>
      <span v-if="i < items.length - 1" class="mx-2 select-none">/</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
// items: Array<{ label: string, to?: string | null }>
defineProps<{ items: { label: string, to?: string | null }[] }>()
</script>

<style scoped>
nav {
  white-space: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
}
nav::-webkit-scrollbar {
  display: none;
}
</style> 