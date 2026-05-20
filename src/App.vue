<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
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
</script>

<template>
  <div class="flex h-svh flex-col md:flex-row">
    <div class="fixed inset-0 -z-10 bg-cover bg-center" style="background-image: url('/hems-bild3.jpg')" />
    <div class="fixed inset-0 -z-10" :class="dunkel ? 'bg-[rgba(10,12,15,0.90)]' : 'bg-[rgba(240,243,245,0.88)]'" />
    <AppNavigation :main-ref="mainRef" />
    <main ref="mainRef" class="flex-1 overflow-x-hidden overflow-y-auto">
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>
