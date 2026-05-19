<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useKapitel } from '../composables/useKapitel'
import LadeIndikator from '../components/LadeIndikator.vue'
import FehlerMeldung from '../components/FehlerMeldung.vue'
import KontaktKarte from '../components/KontaktKarte.vue'
import InterventionsAkkordeon from '../components/InterventionsAkkordeon.vue'

const route = useRoute()
const slug = route.params.slug as string

const { aktuell, isLoading, error, laden } = useKapitel(slug)

const FAELLE_MARKER = '<!-- faelle -->'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

interface Abschnitt {
  id: string
  titel: string
  htmlVorher: string
  htmlNachher: string
  hatFaelleMarker: boolean
}

const seitenStruktur = computed(() => {
  const raw = aktuell.value?.html
  if (!raw) return { intro: '', abschnitte: [] as Abschnitt[] }

  const html = raw.replace(/<h2>([^<]*)<\/h2>/g, (_, text) =>
    `<h2 id="${slugify(text)}">${text}</h2>`
  )

  const h2Regex = /<h2 id="([^"]*)">(.*?)<\/h2>/g
  const h2s: { id: string; titel: string; start: number; end: number }[] = []
  let m
  while ((m = h2Regex.exec(html)) !== null) {
    h2s.push({ id: m[1], titel: m[2], start: m.index, end: m.index + m[0].length })
  }

  if (h2s.length === 0) return { intro: html, abschnitte: [] as Abschnitt[] }

  const intro = html.slice(0, h2s[0].start).trim()
  const abschnitte: Abschnitt[] = h2s.map((h2, i) => {
    const naechsterStart = i + 1 < h2s.length ? h2s[i + 1].start : html.length
    const content = html.slice(h2.end, naechsterStart).trim()
    const hasFaelle = content.includes(FAELLE_MARKER)
    const [htmlVorher = '', htmlNachher = ''] = hasFaelle
      ? content.split(FAELLE_MARKER)
      : [content, '']
    return {
      id: h2.id,
      titel: h2.titel,
      htmlVorher: htmlVorher.trim(),
      htmlNachher: htmlNachher.trim(),
      hatFaelleMarker: hasFaelle,
    }
  })

  return { intro, abschnitte }
})

const offen = ref<string | null>(null)

function toggle(id: string) {
  offen.value = offen.value === id ? null : id
}


const proseKlassen = `prose prose-sm max-w-none break-words hyphens-auto
  prose-headings:font-semibold prose-headings:text-hems-navy
  prose-p:text-hems-steel prose-p:leading-relaxed
  prose-li:text-hems-steel
  prose-a:text-hems-blue prose-a:no-underline hover:prose-a:underline
  prose-strong:text-hems-navy
  prose-h3:text-sm prose-h3:text-hems-steel
  dark:prose-invert
  dark:prose-headings:text-white dark:prose-p:text-gray-300
  dark:prose-li:text-gray-300 dark:prose-strong:text-white
  dark:prose-h3:text-gray-400`
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-10">
    <LadeIndikator v-if="isLoading" />

    <FehlerMeldung
      v-else-if="error"
      :message="error.message"
      @retry="laden"
    />

    <div v-else-if="aktuell">
      <RouterLink
        to="/"
        class="mb-6 flex items-center gap-1.5 text-xs text-hems-muted transition-colors hover:text-hems-blue dark:text-gray-400 dark:hover:text-hems-sky"
      >
        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Übersicht
      </RouterLink>

      <article>
        <header class="mb-8 border-b border-hems-glass/40 pb-6">
          <p class="mb-1 text-xs font-semibold uppercase tracking-widest text-hems-steel dark:text-gray-400">
            Kapitel {{ String(aktuell.nr).padStart(2, '0') }}
          </p>
          <h1 class="text-2xl font-semibold text-hems-navy dark:text-white">{{ aktuell.titel }}</h1>
        </header>

        <!-- Intro-Text vor dem ersten H2 -->
        <div
          v-if="seitenStruktur.intro"
          :class="proseKlassen"
          class="mb-6"
          lang="de"
          v-html="seitenStruktur.intro"
        />

        <!-- Akkordeon für H2-Abschnitte -->
        <div
          v-if="seitenStruktur.abschnitte.length"
          class="divide-y divide-hems-glass/40 rounded-lg border border-hems-glass/40 dark:divide-gray-700 dark:border-gray-700"
        >
          <div v-for="(abschnitt, i) in seitenStruktur.abschnitte" :key="abschnitt.id">

            <!-- Abschnitt 1.4 mit Fälle-Grid: immer sichtbar, kein Akkordeon -->
            <div v-if="abschnitt.hatFaelleMarker" class="px-5 py-5">
              <h2 :id="abschnitt.id" class="mb-4 text-base font-semibold text-hems-navy">
                {{ abschnitt.titel }}
              </h2>
              <div v-if="abschnitt.htmlVorher" :class="proseKlassen" lang="de" v-html="abschnitt.htmlVorher" />
              <InterventionsAkkordeon
                v-if="aktuell.faelle?.length"
                :faelle="aktuell.faelle"
                class="my-6"
              />
              <div v-if="abschnitt.htmlNachher" :class="proseKlassen" v-html="abschnitt.htmlNachher" />
            </div>

            <!-- Alle anderen Abschnitte: Akkordeon -->
            <div v-else>
              <button
                class="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-hems-bg dark:hover:bg-gray-800"
                :class="offen === abschnitt.id ? 'text-hems-blue' : 'text-hems-navy dark:text-gray-200'"
                :aria-expanded="offen === abschnitt.id"
                @click="toggle(abschnitt.id)"
              >
                <span class="flex items-center gap-2.5">
                  <span
                    v-if="aktuell.abschnittsEmoji?.[i]"
                    class="shrink-0 text-base leading-none transition-opacity"
                    :class="offen === abschnitt.id ? 'opacity-100' : 'opacity-60'"
                    aria-hidden="true"
                  >{{ aktuell.abschnittsEmoji[i] }}</span>
                  <span class="font-medium">{{ abschnitt.titel }}</span>
                </span>
                <svg
                  class="h-4 w-4 shrink-0 transition-transform duration-200"
                  :class="offen === abschnitt.id ? 'rotate-180 text-hems-blue' : 'text-hems-glass'"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </button>
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-[2000px]"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 max-h-[2000px]"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="offen === abschnitt.id" class="overflow-hidden px-5 pb-6 pt-1">
                  <div :class="proseKlassen" v-html="abschnitt.htmlVorher" />
                </div>
              </Transition>
            </div>

          </div>
        </div>

        <!-- Kontaktkarten -->
        <section v-if="aktuell.kontakte?.length" class="mt-10">
          <h2 class="mb-4 text-sm font-semibold uppercase tracking-widest text-hems-steel">
            Kontakt
          </h2>
          <div class="grid gap-3 sm:grid-cols-2">
            <KontaktKarte
              v-for="kontakt in aktuell.kontakte"
              :key="kontakt.name"
              :kontakt="kontakt"
            />
          </div>
        </section>
      </article>
    </div>

    <div v-else class="py-16 text-center">
      <p class="text-sm text-hems-muted">Kapitel nicht gefunden.</p>
      <RouterLink to="/" class="mt-3 inline-block text-sm text-hems-blue hover:underline">
        Zur Übersicht
      </RouterLink>
    </div>
  </div>
</template>
