<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppNavigation from './components/AppNavigation.vue'
import { useDarkMode } from './composables/useDarkMode'

const mainRef = ref<HTMLElement | null>(null)
const route = useRoute()
const { dunkel, init } = useDarkMode()

onMounted(() => init())

watch(() => route.fullPath, () => {
  mainRef.value?.scrollTo({ top: 0, behavior: 'instant' })
})

const hintergrundStyle = computed(() => {
  const overlay = dunkel.value
    ? 'rgba(10,12,15,0.90)'
    : 'rgba(240,243,245,0.88)'
  return {
    backgroundImage: `linear-gradient(${overlay}, ${overlay}), url('/hems-bild3.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
})
</script>

<template>
  <div class="flex h-svh flex-col md:flex-row" :style="hintergrundStyle">
    <AppNavigation :main-ref="mainRef" />
    <main ref="mainRef" class="flex-1 overflow-x-hidden overflow-y-auto">
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>
