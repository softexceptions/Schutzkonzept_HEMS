<script setup lang="ts">
import type { KontaktInfo } from '../types/kapitel'
defineProps<{ kontakt: KontaktInfo }>()
</script>

<template>
  <div class="min-w-0 rounded-lg border border-hems-glass/50 bg-white px-5 py-4 shadow-sm dark:bg-gray-900 dark:border-gray-700">
    <p class="font-semibold text-hems-navy dark:text-white">{{ kontakt.name }}</p>

    <p v-if="kontakt.angebote" class="mt-1.5 text-sm leading-relaxed text-hems-muted dark:text-gray-400">
      {{ kontakt.angebote }}
    </p>

    <div class="mt-3 flex flex-col gap-1.5 text-sm">
      <a
        v-if="kontakt.email"
        :href="`mailto:${kontakt.email}`"
        class="flex items-center gap-2 text-hems-blue hover:underline"
      >
        <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
        {{ kontakt.email }}
      </a>

      <span v-if="kontakt.telefon" class="flex items-center gap-2 text-hems-steel dark:text-gray-400">
        <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75z" />
        </svg>
        {{ kontakt.telefon }}
      </span>

      <span v-if="kontakt.mobil" class="flex items-center gap-2 text-hems-steel dark:text-gray-400">
        <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3" />
        </svg>
        Mobil: {{ kontakt.mobil }}
      </span>

      <a
        v-if="kontakt.website"
        :href="kontakt.website.startsWith('http') ? kontakt.website : `https://${kontakt.website}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 text-hems-blue hover:underline"
      >
        <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
        </svg>
        <span class="break-all">{{ kontakt.website }}</span>
      </a>
    </div>
  </div>
</template>
