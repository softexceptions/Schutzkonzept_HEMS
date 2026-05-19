<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useDarkMode } from '../composables/useDarkMode'

const props = defineProps<{ mainRef?: HTMLElement | null }>()
const menuOffen = ref(false)
const { dunkel, umschalten } = useDarkMode()
const router = useRouter()
const route = useRoute()

function scrollNachOben() {
  props.mainRef?.scrollTo({ top: 0, behavior: 'smooth' })
  menuOffen.value = false
}

let letzterScroll = 0

function beimScrollen(e: WheelEvent) {
  const jetzt = Date.now()
  if (jetzt - letzterScroll < 600) return
  letzterScroll = jetzt

  const aktuell = kapitel.findIndex(k => route.path.includes(k.slug))
  const naechster = aktuell + (e.deltaY > 0 ? 1 : -1)
  if (naechster >= 0 && naechster < kapitel.length) {
    router.push(`/kapitel/${kapitel[naechster].slug}`)
  }
}

const kapitel = [
  { slug: 'verdacht',                nr: '01', emoji: '🔍', label: 'Vorgehen bei Verdacht' },
  { slug: 'handlungsmoeglichkeiten', nr: '02', emoji: '🛡️', label: 'Handlungsmöglichkeiten' },
  { slug: 'verhaltenskodex',         nr: '03', emoji: '📋', label: 'Verhaltenskodex' },
  { slug: 'ansprechpersonen',        nr: '04', emoji: '💬', label: 'Ansprechpersonen' },
  { slug: 'kooperationspartner',     nr: '05', emoji: '🤝', label: 'Kooperationspartner' },
]
</script>

<template>
  <!-- Desktop Sidebar -->
  <aside class="hidden md:flex md:w-64 md:shrink-0 md:flex-col md:border-r md:border-hems-glass/70 md:bg-hems-bg dark:md:bg-gray-900 dark:md:border-gray-700">
    <div class="h-1 shrink-0 bg-hems-blue dark:bg-hems-blue/60"></div>
    <div class="border-b border-hems-glass/40 bg-white px-6 py-5 dark:border-gray-700 dark:bg-transparent">
      <RouterLink to="/" class="flex items-center gap-3" @click="scrollNachOben">
        <img src="/hems-logo.svg" alt="HEMS Logo" class="h-8 w-auto shrink-0 rounded bg-white" />
        <p class="whitespace-nowrap text-sm font-semibold tracking-wide text-hems-navy dark:text-white">Schutzkonzept</p>
      </RouterLink>
    </div>

    <nav class="flex-1 overflow-y-auto px-3 py-4" @wheel.prevent="beimScrollen">
      <p class="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-hems-muted dark:text-gray-400">Kapitel</p>
      <ul class="space-y-0.5">
        <li v-for="k in kapitel" :key="k.slug">
          <RouterLink
            :to="`/kapitel/${k.slug}`"
            class="flex items-center gap-3 rounded-md border-l-2 border-transparent px-3 py-2.5 text-sm text-hems-steel transition-colors hover:bg-white/70 hover:text-hems-navy dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            active-class="border-hems-blue bg-white text-hems-blue font-medium dark:bg-gray-800 dark:text-hems-sky"
          >
            <span class="text-base leading-none" aria-hidden="true">{{ k.emoji }}</span>
            <span class="tabular-nums text-xs text-hems-steel/50 dark:text-gray-400">{{ k.nr }}</span>
            {{ k.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div class="border-t border-hems-glass/40 px-3 py-3 dark:border-gray-700">
      <RouterLink
        to="/quiz"
        class="flex items-center gap-3 rounded-md border-l-2 border-transparent px-3 py-2.5 text-sm text-hems-steel transition-colors hover:bg-white/70 hover:text-hems-navy dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        active-class="border-hems-blue bg-white text-hems-blue font-medium dark:bg-gray-800 dark:text-hems-sky"
      >
        <span class="text-base leading-none" aria-hidden="true">🧠</span>
        <span class="tabular-nums text-xs text-hems-steel/50 dark:text-gray-400">—</span>
        Wissen testen
      </RouterLink>
    </div>

    <div class="border-t border-hems-glass/40 px-6 py-4 flex items-center justify-between dark:border-gray-700">
      <p class="text-xs text-hems-steel dark:text-gray-500">Stand: Mai 2026</p>
      <button
        class="rounded-md p-1.5 text-hems-steel transition-colors hover:bg-white/70 dark:text-gray-400 dark:hover:bg-gray-800"
        :aria-label="dunkel ? 'Helles Design' : 'Dunkles Design'"
        @click="umschalten"
      >
        <span class="text-base leading-none" aria-hidden="true">{{ dunkel ? '☀️' : '🌙' }}</span>
      </button>
    </div>
  </aside>

  <!-- Mobile Top Bar -->
  <header class="sticky top-0 z-50 md:hidden border-b border-hems-glass/40 bg-hems-bg dark:bg-gray-900 dark:border-gray-700">
    <div class="flex items-center justify-between px-4 py-3">
      <RouterLink to="/" class="flex items-center gap-3" @click="scrollNachOben">
        <img src="/hems-logo.svg" alt="HEMS Logo" class="h-8 w-auto shrink-0 rounded bg-white" />
        <p class="whitespace-nowrap text-sm font-semibold tracking-wide text-hems-navy dark:text-white">Schutzkonzept</p>
      </RouterLink>

      <div class="flex items-center gap-1">
        <button
          class="rounded-md p-1.5 text-hems-steel transition-colors hover:bg-white/70 dark:text-gray-400 dark:hover:bg-gray-800"
          :aria-label="dunkel ? 'Helles Design' : 'Dunkles Design'"
          @click="umschalten"
        >
          <span class="text-base leading-none" aria-hidden="true">{{ dunkel ? '☀️' : '🌙' }}</span>
        </button>

      <button
        class="rounded-md p-1.5 text-hems-steel transition-colors hover:bg-white/70 dark:text-gray-400 dark:hover:bg-gray-800"
        :aria-expanded="menuOffen"
        aria-label="Menü"
        @click="menuOffen = !menuOffen"
      >
        <svg v-if="!menuOffen" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav v-if="menuOffen" class="border-t border-hems-glass/40 px-3 pb-3 pt-2 dark:border-gray-700">
        <p class="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-hems-muted dark:text-gray-400">Kapitel</p>
        <ul class="space-y-0.5">
          <li v-for="k in kapitel" :key="k.slug">
            <RouterLink
              :to="`/kapitel/${k.slug}`"
              class="flex items-center gap-3 rounded-md border-l-2 border-transparent px-3 py-2.5 text-sm text-hems-steel hover:bg-white/70 hover:text-hems-navy dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              active-class="border-hems-blue bg-white text-hems-blue font-medium dark:bg-gray-800 dark:text-hems-sky"
              @click="menuOffen = false"
            >
              <span class="text-base leading-none" aria-hidden="true">{{ k.emoji }}</span>
              <span class="tabular-nums text-xs text-hems-steel/50 dark:text-gray-400">{{ k.nr }}</span>
              {{ k.label }}
            </RouterLink>
          </li>
        </ul>
        <div class="mt-2 border-t border-hems-glass/40 pt-2 dark:border-gray-700">
          <RouterLink
            to="/quiz"
            class="flex items-center gap-3 rounded-md border-l-2 border-transparent px-3 py-2.5 text-sm text-hems-steel hover:bg-white/70 hover:text-hems-navy dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            active-class="border-hems-blue bg-white text-hems-blue font-medium dark:bg-gray-800 dark:text-hems-sky"
            @click="menuOffen = false"
          >
            <span class="text-base leading-none" aria-hidden="true">🧠</span>
            <span class="tabular-nums text-xs text-hems-steel/50 dark:text-gray-400">—</span>
            Wissen testen
          </RouterLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>
