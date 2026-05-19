<script setup lang="ts">
import { computed } from 'vue'
import type { QuizFrage, QuizAntwort } from '../types/quiz'

const props = defineProps<{
  fragen: QuizFrage[]
  antworten: QuizAntwort[]
  punkte: number
}>()

const emit = defineEmits<{
  nochmal: []
}>()

const gesamt = computed(() => props.fragen.length)
const prozent = computed(() => Math.round((props.punkte / gesamt.value) * 100))

const bewertung = computed(() => {
  if (prozent.value >= 80) return { text: 'Sehr gut!', klasse: 'text-green-600 dark:text-green-400' }
  if (prozent.value >= 60) return { text: 'Gut!', klasse: 'text-amber-600 dark:text-amber-400' }
  return { text: 'Noch Luft nach oben!', klasse: 'text-red-600 dark:text-red-400' }
})

const ringFarbe = computed(() => {
  if (prozent.value >= 80) return 'stroke-green-500'
  if (prozent.value >= 60) return 'stroke-amber-500'
  return 'stroke-red-500'
})

// Umfang des SVG-Kreises (r=40 → 2π·40 ≈ 251)
const umfang = 251
const strich = computed(() => umfang - (umfang * prozent.value) / 100)

function antwortFuerFrage(frage: QuizFrage): QuizAntwort | undefined {
  return props.antworten.find(a => a.frageId === frage.id)
}

const anzeigeText = (frage: QuizFrage) => frage.aussage ?? frage.frage ?? ''
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- Score-Anzeige -->
    <div class="flex flex-col items-center gap-3 rounded-xl border border-hems-glass/60 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <svg class="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke-width="10" class="stroke-hems-glass/40 dark:stroke-gray-700" />
        <circle
          cx="50" cy="50" r="40" fill="none" stroke-width="10" stroke-linecap="round"
          :class="ringFarbe"
          :stroke-dasharray="umfang"
          :stroke-dashoffset="strich"
          class="transition-all duration-700"
        />
      </svg>
      <div class="text-center">
        <p class="text-3xl font-bold text-hems-navy dark:text-white">{{ punkte }} <span class="text-xl font-normal text-hems-steel dark:text-gray-400">/ {{ gesamt }}</span></p>
        <p class="text-sm text-hems-steel dark:text-gray-400">Fragen korrekt beantwortet</p>
        <p class="mt-1 text-lg font-semibold" :class="bewertung.klasse">{{ bewertung.text }}</p>
      </div>
    </div>

    <!-- Detailauswertung -->
    <div class="flex flex-col gap-4">
      <h2 class="text-sm font-semibold uppercase tracking-wider text-hems-steel dark:text-gray-400">Auswertung im Detail</h2>

      <div
        v-for="(frage, i) in fragen"
        :key="frage.id"
        class="rounded-xl border bg-white p-5 shadow-sm dark:bg-gray-900"
        :class="antwortFuerFrage(frage)?.korrekt
          ? 'border-green-200 dark:border-green-800'
          : 'border-red-200 dark:border-red-900'"
      >
        <!-- Header -->
        <div class="mb-3 flex items-start gap-3">
          <span class="mt-0.5 text-xl leading-none" aria-hidden="true">
            {{ antwortFuerFrage(frage)?.korrekt ? '✅' : '❌' }}
          </span>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-medium text-hems-steel dark:text-gray-400">Frage {{ i + 1 }}</p>
            <p v-if="frage.szenario" class="mt-1 mb-2 rounded bg-hems-bg p-2 text-xs text-hems-steel dark:bg-gray-800 dark:text-gray-400 italic">
              {{ frage.szenario }}
            </p>
            <p class="text-sm font-semibold leading-snug text-hems-navy dark:text-white">{{ anzeigeText(frage) }}</p>
          </div>
        </div>

        <!-- Antworten -->
        <div class="ml-9 flex flex-col gap-1.5 text-sm">
          <!-- Gewählte Antwort -->
          <div
            class="flex items-start gap-2 rounded-md px-3 py-2"
            :class="antwortFuerFrage(frage)?.korrekt
              ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300'"
          >
            <span class="mt-0.5 shrink-0 text-xs font-bold">{{ antwortFuerFrage(frage)?.korrekt ? '✓' : '✗' }}</span>
            <span>{{ frage.optionen[antwortFuerFrage(frage)?.gewaehlt ?? 0] }}</span>
          </div>

          <!-- Richtige Antwort (nur wenn falsch) -->
          <div
            v-if="!antwortFuerFrage(frage)?.korrekt"
            class="flex items-start gap-2 rounded-md bg-green-50 px-3 py-2 text-green-800 dark:bg-green-900/30 dark:text-green-300"
          >
            <span class="mt-0.5 shrink-0 text-xs font-bold">✓</span>
            <span>{{ frage.optionen[frage.richtig] }}</span>
          </div>

          <!-- Erklärung -->
          <p class="mt-1.5 rounded-md bg-hems-bg px-3 py-2 text-xs leading-relaxed text-hems-steel dark:bg-gray-800 dark:text-gray-400">
            {{ frage.erklaerung }}
          </p>
        </div>
      </div>
    </div>

    <!-- Nochmal-Button -->
    <button
      class="w-full rounded-xl bg-hems-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-hems-blue/90 dark:bg-hems-blue/80 dark:hover:bg-hems-blue"
      @click="emit('nochmal')"
    >
      🔄 Nochmal starten
    </button>
  </div>
</template>
