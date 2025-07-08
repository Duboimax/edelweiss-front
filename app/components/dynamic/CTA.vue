<template>
    <NuxtLink :to="props.link">
        <button class="bg-[#2a2a22] hover:bg-[#3a3a32] text-white cursor-pointer rounded-none px-6 py-3 transition-colors">
            {{  props.buttonName }}
        </button>
    </NuxtLink>
</template>

<script setup lang="ts">

const props = defineProps<{
    buttonName: string,
    link: string
}>()
</script>