<script setup lang="ts">
import { computed } from 'vue'
import type { QuizFrage } from '../types/quiz'

const props = defineProps<{
  frage: QuizFrage
  gewaehlt: number | null
  nummer: number
  gesamt: number
}>()

const emit = defineEmits<{
  waehlen: [index: number]
}>()

const anzeigeText = computed(() => props.frage.aussage ?? props.frage.frage ?? '')

const fortschritt = computed(() => Math.round((props.nummer / props.gesamt) * 100))

const typLabel: Record<string, string> = {
  'multiple-choice': 'Multiple Choice',
  'szenario': 'Fallbeispiel',
  'richtig-falsch': 'Richtig oder Falsch?',
  'zuordnung': 'Zuordnung',
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Fortschritt -->
    <div>
      <div class="mb-1.5 flex items-center justify-between text-sm text-hems-steel dark:text-gray-400">
        <span>Frage {{ nummer }} von {{ gesamt }}</span>
        <span class="rounded-full bg-hems-blue/10 px-2 py-0.5 text-xs font-medium text-hems-blue dark:bg-hems-blue/20 dark:text-hems-sky">
          {{ typLabel[frage.typ] }}
        </span>
      </div>
      <div class="h-1.5 w-full overflow-hidden rounded-full bg-hems-glass/40 dark:bg-gray-700">
        <div
          class="h-full rounded-full bg-hems-blue transition-all duration-500 dark:bg-hems-sky"
          :style="{ width: fortschritt + '%' }"
        ></div>
      </div>
    </div>

    <!-- Fragen-Karte -->
    <div class="rounded-xl border border-hems-glass/60 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <!-- Szenario-Block (nur bei Typ szenario) -->
      <div
        v-if="frage.szenario"
        class="mb-5 rounded-lg bg-hems-bg p-4 text-sm leading-relaxed text-hems-steel dark:bg-gray-800 dark:text-gray-300"
      >
        <p class="mb-1 text-xs font-semibold uppercase tracking-wider text-hems-blue dark:text-hems-sky">Situation</p>
        <p>{{ frage.szenario }}</p>
      </div>

      <!-- Frage -->
      <p class="mb-6 text-base font-semibold leading-snug text-hems-navy dark:text-white">
        {{ anzeigeText }}
      </p>

      <!-- Antwortoptionen -->
      <ul class="flex flex-col gap-2.5">
        <li v-for="(option, i) in frage.optionen" :key="i">
          <button
            class="w-full rounded-lg border-2 px-4 py-3 text-left text-sm leading-snug transition-all"
            :class="gewaehlt === i
              ? 'border-hems-blue bg-hems-blue/8 font-medium text-hems-blue dark:border-hems-sky dark:bg-hems-sky/10 dark:text-hems-sky'
              : 'border-hems-glass/60 bg-white text-hems-steel hover:border-hems-blue/50 hover:bg-hems-blue/4 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-hems-sky/50 dark:hover:bg-gray-700'"
            :disabled="gewaehlt !== null"
            @click="emit('waehlen', i)"
          >
            {{ option }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
