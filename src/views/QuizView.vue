<script setup lang="ts">
import { useQuiz } from '../composables/useQuiz'
import QuizFrage from '../components/QuizFrage.vue'
import QuizAuswertung from '../components/QuizAuswertung.vue'
import LadeIndikator from '../components/LadeIndikator.vue'
import FehlerMeldung from '../components/FehlerMeldung.vue'

const {
  phase, fragen, aktuelleIndex, aktuelleFrage, antworten,
  gewaehlt, isLoading, error, punkte,
  starten, antwortWaehlen, weiter, zuruecksetzen,
} = useQuiz()
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-8">
    <!-- Startseite -->
    <div v-if="phase === 'start'" class="flex flex-col items-center gap-6 text-center">
      <div class="rounded-2xl border border-hems-glass/60 bg-white p-10 shadow-sm dark:border-gray-700 dark:bg-gray-900 w-full">
        <p class="mb-2 text-5xl" aria-hidden="true">🧠</p>
        <h1 class="mb-3 text-2xl font-bold text-hems-navy dark:text-white">Wissen testen</h1>
        <p class="mb-2 text-hems-steel dark:text-gray-300">
          Wie gut kennen Sie das Schutzkonzept der HEMS?
        </p>
        <p class="mb-8 text-sm text-hems-muted dark:text-gray-500">
          Es werden zufällig 3–7 Fragen aus 50 ausgewählt — jeder Durchlauf ist anders.
        </p>
        <LadeIndikator v-if="isLoading" />
        <FehlerMeldung v-else-if="error" :message="error.message" @retry="starten" />
        <button
          v-else
          class="rounded-xl bg-hems-blue px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-hems-blue/90 dark:bg-hems-blue/80 dark:hover:bg-hems-blue"
          @click="starten"
        >
          Quiz starten →
        </button>
      </div>
    </div>

    <!-- Fragen-Phase -->
    <div v-else-if="phase === 'frage' && aktuelleFrage">
      <QuizFrage
        :frage="aktuelleFrage"
        :gewaehlt="gewaehlt"
        :nummer="aktuelleIndex + 1"
        :gesamt="fragen.length"
        @waehlen="antwortWaehlen"
      />

      <div class="mt-6 flex items-center justify-between">
        <button
          class="rounded-xl px-4 py-3 text-sm text-hems-muted transition-colors hover:text-hems-steel dark:text-gray-500 dark:hover:text-gray-300"
          @click="zuruecksetzen"
        >
          ✕ Abbrechen
        </button>
        <button
          class="rounded-xl px-6 py-3 text-sm font-semibold transition-all"
          :class="gewaehlt !== null
            ? 'bg-hems-blue text-white shadow-sm hover:bg-hems-blue/90 dark:bg-hems-blue/80 dark:hover:bg-hems-blue'
            : 'cursor-not-allowed bg-hems-glass/40 text-hems-muted dark:bg-gray-700 dark:text-gray-500'"
          :disabled="gewaehlt === null"
          @click="weiter"
        >
          {{ aktuelleIndex < fragen.length - 1 ? 'Weiter →' : 'Auswertung →' }}
        </button>
      </div>
    </div>

    <!-- Auswertung -->
    <div v-else-if="phase === 'auswertung'">
      <QuizAuswertung
        :fragen="fragen"
        :antworten="antworten"
        :punkte="punkte"
        @nochmal="zuruecksetzen"
      />
    </div>
  </div>
</template>
