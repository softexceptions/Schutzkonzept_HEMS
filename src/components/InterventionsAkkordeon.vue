<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { marked } from 'marked'
import type { InterventionsFall } from '../types/kapitel'

defineProps<{ faelle: InterventionsFall[] }>()

const ausgewaehlt = ref<number | null>(null)
const panel = ref<HTMLElement | null>(null)
const kartenRefs = ref<HTMLElement[]>([])
const triggerBestaetigt = ref<Set<number>>(new Set())
const triggerAusgeklappt = ref<Set<number>>(new Set())
const gespielt = ref<Set<number>>(new Set())
const transkriptOffen = ref<Set<number>>(new Set())

function transkriptUmschalten(index: number) {
  const neu = new Set(transkriptOffen.value)
  neu.has(index) ? neu.delete(index) : neu.add(index)
  transkriptOffen.value = neu
}

function abgespielt(index: number) {
  gespielt.value = new Set([...gespielt.value, index])
}

async function waehlen(index: number) {
  if (ausgewaehlt.value === index) {
    schliessen()
  } else {
    ausgewaehlt.value = index
    await nextTick()
    panel.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}

function schliessen() {
  const idx = ausgewaehlt.value
  ausgewaehlt.value = null
  nextTick(() => {
    if (idx !== null) {
      kartenRefs.value[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  })
}

function triggerAusklappen(index: number) {
  triggerAusgeklappt.value = new Set([...triggerAusgeklappt.value, index])
}

function triggerBestaetigen(index: number) {
  triggerBestaetigt.value = new Set([...triggerBestaetigt.value, index])
}

function triggerEinklappen(index: number) {
  const neu = new Set(triggerAusgeklappt.value)
  neu.delete(index)
  triggerAusgeklappt.value = neu
}

const alleTranskripte = import.meta.glob('../content/transcripts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function transkriptHtml(dateiname: string): string {
  const raw = alleTranskripte[`../content/transcripts/${dateiname}.md`]
  if (!raw) return ''
  return marked(raw) as string
}

const buchstaben = ['A', 'B', 'C', 'D']

function kurzTitel(titel: string): string {
  return titel.replace(/^Fall [A-D]:\s*/, '')
}

const farben = [
  { karte: 'border-sky-200 bg-sky-50 dark:border-gray-700 dark:bg-gray-800',         karteAktiv: 'border-sky-400 bg-sky-100 dark:border-gray-500 dark:bg-gray-700',         buchstabe: 'text-sky-300',    buchstabeAktiv: 'text-sky-500',    panel: 'border-sky-200 bg-sky-50 dark:border-gray-700 dark:bg-gray-800',     badge: 'text-sky-600 dark:text-sky-400',    nummer: 'text-sky-500 dark:text-sky-400',    emoji: '🏠' },
  { karte: 'border-orange-200 bg-orange-50 dark:border-gray-700 dark:bg-gray-800',   karteAktiv: 'border-orange-400 bg-orange-100 dark:border-gray-500 dark:bg-gray-700',   buchstabe: 'text-orange-300', buchstabeAktiv: 'text-orange-500', panel: 'border-orange-200 bg-orange-50 dark:border-gray-700 dark:bg-gray-800', badge: 'text-orange-600 dark:text-orange-400', nummer: 'text-orange-500 dark:text-orange-400', emoji: '👥' },
  { karte: 'border-blue-200 bg-blue-50 dark:border-gray-700 dark:bg-gray-800',       karteAktiv: 'border-blue-400 bg-blue-100 dark:border-gray-500 dark:bg-gray-700',       buchstabe: 'text-blue-300',   buchstabeAktiv: 'text-blue-500',   panel: 'border-blue-200 bg-blue-50 dark:border-gray-700 dark:bg-gray-800',   badge: 'text-blue-600 dark:text-blue-400',   nummer: 'text-blue-500 dark:text-blue-400',   emoji: '👨‍🏫' },
  { karte: 'border-yellow-200 bg-yellow-50 dark:border-gray-700 dark:bg-gray-800',   karteAktiv: 'border-yellow-400 bg-yellow-100 dark:border-gray-500 dark:bg-gray-700',   buchstabe: 'text-yellow-300', buchstabeAktiv: 'text-yellow-500', panel: 'border-yellow-200 bg-yellow-50 dark:border-gray-700 dark:bg-gray-800', badge: 'text-yellow-600 dark:text-yellow-400', nummer: 'text-yellow-500 dark:text-yellow-400', emoji: '🪪' },
]
</script>

<template>
  <div>
    <!-- 2×2 Karten-Grid -->
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        v-for="(fall, index) in faelle"
        :key="index"
        :ref="(el) => { if (el) kartenRefs[index] = el as HTMLElement }"
        class="rounded-lg border p-4 text-left transition-all duration-150"
        :class="ausgewaehlt === index ? farben[index].karteAktiv : farben[index].karte"
        :aria-pressed="ausgewaehlt === index"
        @click="waehlen(index)"
      >
        <div class="flex items-start justify-between gap-2">
          <span
            class="text-xl font-bold leading-none"
            :class="ausgewaehlt === index ? farben[index].buchstabeAktiv : farben[index].buchstabe"
          >Fall {{ buchstaben[index] }}</span>
          <div class="flex items-center gap-1.5">
            <span class="text-lg leading-none opacity-70" aria-hidden="true">{{ farben[index].emoji }}</span>
            <svg
              v-if="ausgewaehlt === index"
              class="h-4 w-4 shrink-0 rotate-180 text-hems-muted"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p class="mt-2 text-sm font-medium leading-snug text-hems-navy dark:text-gray-100">
          {{ kurzTitel(fall.titel) }}
        </p>
        <p class="mt-2 line-clamp-2 text-xs leading-relaxed text-hems-muted dark:text-gray-400">
          {{ fall.schritte[0] }}
        </p>
        <span
          v-if="fall.podcast"
          class="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-hems-blue dark:text-hems-sky"
        >
          🎧 Podcast verfügbar
        </span>
      </button>
    </div>

    <!-- Detail-Panel -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="ausgewaehlt !== null"
        ref="panel"
        class="mt-4 rounded-lg border px-5 py-4"
        :class="farben[ausgewaehlt].panel"
      >
        <div class="mb-3 flex items-start justify-between gap-4">
          <div>
            <p class="mb-0.5 text-xs font-semibold uppercase tracking-widest" :class="farben[ausgewaehlt].badge">
              Fall {{ buchstaben[ausgewaehlt] }}
            </p>
            <p class="font-medium text-hems-navy dark:text-gray-100">
              {{ kurzTitel(faelle[ausgewaehlt].titel) }}
            </p>
          </div>
          <button
            class="shrink-0 rounded p-1 text-hems-muted transition-colors hover:text-hems-navy"
            aria-label="Zuklappen"
            @click="schliessen"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Podcast-Bereich -->
        <div v-if="faelle[ausgewaehlt].podcast" class="mb-5 border-b border-black/10 pb-4">

          <!-- Triggerwarnung -->
          <div v-if="!triggerBestaetigt.has(ausgewaehlt)">
            <!-- Kompakte Zeile -->
            <button
              v-if="!triggerAusgeklappt.has(ausgewaehlt)"
              class="flex w-full items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-left transition-colors hover:bg-amber-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
              @click="triggerAusklappen(ausgewaehlt)"
            >
              <span class="text-sm font-semibold text-amber-800 dark:text-amber-300">⚠️ Triggerwarnung</span>
              <span class="ml-auto text-xs text-amber-600 dark:text-amber-400">Lesen &amp; Podcast freischalten →</span>
            </button>
            <!-- Ausgeklappter Volltext -->
            <div
              v-else
              class="rounded-md border border-amber-200 bg-amber-50 p-4 dark:border-gray-600 dark:bg-gray-700"
            >
              <div class="flex items-center justify-between gap-2">
                <p class="text-sm font-semibold text-amber-800 dark:text-amber-300">⚠️ Triggerwarnung</p>
                <button
                  class="rounded p-1 text-amber-600 transition-colors hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200"
                  aria-label="Triggerwarnung zuklappen"
                  @click="triggerEinklappen(ausgewaehlt)"
                >
                  <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p class="mt-1.5 text-sm leading-relaxed text-amber-700 dark:text-gray-200" lang="de">
                {{ faelle[ausgewaehlt].podcast!.triggerwarnung }}
              </p>
              <button
                class="mt-3 rounded-md bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-200 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                @click="triggerBestaetigen(ausgewaehlt)"
              >
                Ich habe die Warnung gelesen — Podcast abspielen
              </button>
            </div>
          </div>

          <!-- Player + Transkript -->
          <template v-else>
            <p class="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest" :class="farben[ausgewaehlt].badge">
              🎧 Podcast
            </p>
            <audio
              controls
              :src="faelle[ausgewaehlt].podcast!.datei"
              class="w-full rounded"
              preload="none"
              @play="abgespielt(ausgewaehlt)"
            ></audio>
            <Transition
              enter-active-class="transition-opacity duration-300"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-300"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <p
                v-if="!gespielt.has(ausgewaehlt)"
                class="mt-1.5 text-xs text-hems-muted dark:text-gray-500"
              >
                ▶ Drücken Sie Play, um den Podcast zu starten.
              </p>
            </Transition>

            <!-- Transkript -->
            <div v-if="faelle[ausgewaehlt].podcast!.transkriptDatei" class="mt-4">
              <button
                class="flex w-full items-center justify-between text-xs font-medium text-hems-steel transition-colors hover:text-hems-blue dark:text-gray-400 dark:hover:text-hems-sky"
                @click="transkriptUmschalten(ausgewaehlt)"
              >
                <span>Transkript</span>
                <svg
                  class="h-3.5 w-3.5 shrink-0 transition-transform duration-200"
                  :class="transkriptOffen.has(ausgewaehlt) ? 'rotate-180' : ''"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25L12 15.75 4.5 8.25" />
                </svg>
              </button>
              <div
                v-if="transkriptOffen.has(ausgewaehlt)"
                class="mt-3 space-y-2 text-sm leading-relaxed text-hems-navy dark:text-gray-200"
                v-html="transkriptHtml(faelle[ausgewaehlt].podcast!.transkriptDatei!)"
                lang="de"
              ></div>
            </div>
          </template>
        </div>

        <ol class="space-y-3" lang="de">
          <li
            v-for="(schritt, i) in faelle[ausgewaehlt].schritte"
            :key="i"
            class="flex gap-3 text-sm leading-relaxed text-hems-steel dark:text-gray-300"
          >
            <span class="mt-px shrink-0 text-xs font-semibold" :class="farben[ausgewaehlt].nummer">{{ i + 1 }}.</span>
            <span class="min-w-0 break-words hyphens-auto">{{ schritt }}</span>
          </li>
        </ol>
      </div>
    </Transition>
  </div>
</template>
