<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useKapitel } from '../composables/useKapitel'
import KapitelCard from '../components/KapitelCard.vue'
import LadeIndikator from '../components/LadeIndikator.vue'
import FehlerMeldung from '../components/FehlerMeldung.vue'

const { kapitelListe, isLoading, error, laden } = useKapitel()
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-10">
    <header class="mb-10 border-b border-hems-glass/40 pb-8 dark:border-gray-700">
      <p class="mb-2 text-xs font-semibold uppercase tracking-widest text-hems-steel dark:text-gray-500">
        Heinrich-Emanuel-Merck-Schule Darmstadt
      </p>
      <h1 class="text-2xl font-semibold text-hems-navy dark:text-white">
        Schutzkonzept gegen Gewalt und sexuellen Missbrauch
      </h1>
      <p class="mt-4 text-sm leading-relaxed text-hems-steel dark:text-gray-300">
        Dieses Schutzkonzept gibt Lehrkräften und Mitarbeitenden Orientierung und konkrete
        Handlungsmöglichkeiten im Umgang mit Grenzverletzungen, Gewalt und sexuellem Missbrauch.
        Es ist ein lebendes Dokument — Stand Mai 2026.
      </p>
    </header>

    <!-- Schnellzugriff Interventionsplan -->
    <RouterLink
      to="/kapitel/verdacht"
      class="group mb-8 flex items-start gap-4 rounded-xl border-2 border-hems-blue/30 bg-hems-blue/5 px-5 py-4 transition-colors hover:border-hems-blue/60 hover:bg-hems-blue/10 dark:border-hems-blue/20 dark:bg-hems-blue/10 dark:hover:border-hems-blue/50 dark:hover:bg-hems-blue/20"
    >
      <div class="mt-0.5 shrink-0 rounded-lg bg-hems-blue/10 p-2.5 text-xl leading-none transition-colors group-hover:bg-hems-blue/20 dark:bg-hems-blue/20 dark:group-hover:bg-hems-blue/30" aria-hidden="true">
        🗺️
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-xs font-semibold uppercase tracking-widest text-hems-blue dark:text-hems-sky">Schnellzugriff</p>
        <p class="mt-0.5 font-semibold text-hems-navy dark:text-white">Interventionsplan bei Verdacht</p>
        <p class="mt-1 text-sm leading-relaxed text-hems-steel dark:text-gray-300">
          Konkrete Schritte für vier Situationen: Übergriff von außen, zwischen Lernenden, durch Schulpersonal oder auf Beschäftigte.
        </p>
      </div>
      <svg class="mt-1 h-4 w-4 shrink-0 text-hems-glass transition-colors group-hover:text-hems-blue dark:text-gray-600 dark:group-hover:text-hems-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    </RouterLink>

    <LadeIndikator v-if="isLoading" />

    <FehlerMeldung
      v-else-if="error"
      :message="error.message"
      @retry="laden"
    />

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <KapitelCard v-for="meta in kapitelListe" :key="meta.slug" :meta="meta" />
    </div>
  </div>
</template>
