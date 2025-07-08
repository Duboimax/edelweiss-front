<template>
  <div 
    class="group rounded-lg border transition-all duration-300 ease-out"
    :class="isOpen 
      ? 'border-[#2a2a22] bg-white shadow-lg transform scale-[1.02]' 
      : 'border-[#e6e2d7] bg-transparent hover:border-[#d4d0c5] hover:shadow-sm'"
  >
    <button
      @click="toggleAnswer"
      class="flex w-full items-center justify-between p-6 text-left transition-all duration-200"
      :class="isOpen ? 'pb-4' : 'pb-6'"
    >
      <h3 
        class="font-medium text-lg transition-colors duration-200"
        :class="isOpen ? 'text-[#2a2a22] font-semibold' : 'text-[#2a2a22] group-hover:text-[#1a1a15]'"
      >
        {{ title }}
      </h3>
      <div 
        class="ml-4 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
        :class="isOpen 
          ? 'bg-[#2a2a22] text-white rotate-180' 
          : 'bg-[#f5f2e9] text-[#5a5a52] group-hover:bg-[#e6e2d7] group-hover:text-[#2a2a22]'"
      >
        <Icon 
          name="lucide:chevron-down" 
          class="h-4 w-4 transition-transform duration-300"
        />
      </div>
    </button>
    
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 max-h-0 transform translate-y-2"
      enter-to-class="opacity-100 max-h-96 transform translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 max-h-96 transform translate-y-0"
      leave-to-class="opacity-0 max-h-0 transform translate-y-2"
    >
      <div v-if="isOpen" class="overflow-hidden">
        <div class="px-6 pb-6">
          <div class="h-px bg-gradient-to-r from-[#2a2a22] via-[#e6e2d7] to-transparent mb-4"></div>
          <p class="text-[#5a5a52] leading-relaxed animate-fade-in">{{ answer }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  answer: string
  defaultOpen?: boolean
}

const props = defineProps<Props>()

const isOpen = ref(props.defaultOpen || false)

const toggleAnswer = () => {
  isOpen.value = !isOpen.value
}
</script>
