<template>
  <div>
    <component
      v-for="(component, index) in components"
      :key="`${component.__component}-${index}`"
      :is="resolveComponent(component.__component)"
      :data="component"
    />
  </div>
</template>

<script setup>
import { defineProps, shallowRef, defineAsyncComponent } from 'vue'

const props = defineProps({
  components: {
    type: Array,
    default: () => []
  }
})

const formatComponentName = (componentType) => {
  const kebab = componentType.split('.').pop() 
  return kebab
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

const componentCache = shallowRef({})

const resolveComponent = (componentType) => {
  const name = formatComponentName(componentType)
  
  if (!componentCache.value[name]) {
    try {
      componentCache.value[name] = defineAsyncComponent(() =>
        import(`~/components/dynamic/${name}.vue`)
      )
    } catch (e) {
      console.warn(`Composant non trouvé : ${name}`, e)
    }
  }

  return componentCache.value[name]
}
</script>
