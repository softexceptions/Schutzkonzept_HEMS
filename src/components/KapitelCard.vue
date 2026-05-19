<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { KapitelMeta } from '../types/kapitel'
defineProps<{ meta: KapitelMeta }>()
</script>

<template>
  <RouterLink
    :to="`/kapitel/${meta.slug}`"
    class="group flex flex-col gap-3 rounded-lg border border-hems-glass/40 bg-white p-5 transition-all duration-200 hover:border-hems-blue/40 hover:shadow-md dark:bg-gray-900 dark:border-gray-700 dark:hover:border-hems-blue/60"
  >
    <div class="flex items-start justify-between">
      <span class="text-3xl font-light tabular-nums text-hems-blue/60 transition-colors group-hover:text-hems-blue">
        {{ String(meta.nr).padStart(2, '0') }}
      </span>
      <span v-if="meta.emoji" class="text-2xl leading-none opacity-60 transition-opacity group-hover:opacity-100" aria-hidden="true">{{ meta.emoji }}</span>
    </div>
    <span class="text-sm font-medium leading-snug text-hems-navy group-hover:text-hems-blue dark:text-gray-200 dark:group-hover:text-hems-sky">
      {{ meta.titel }}
    </span>
    <span v-if="meta.beschreibung" class="text-xs leading-relaxed text-hems-muted dark:text-gray-500">
      {{ meta.beschreibung }}
    </span>
    <span class="mt-auto flex items-center gap-1 text-xs text-hems-glass transition-colors group-hover:text-hems-blue dark:text-gray-600 dark:group-hover:text-hems-sky">
      Öffnen
      <svg class="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    </span>
  </RouterLink>
</template>
