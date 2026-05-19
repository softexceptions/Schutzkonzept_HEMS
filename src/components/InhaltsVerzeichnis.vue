<script setup lang="ts">
defineProps<{
  headings: { id: string; text: string }[]
}>()
</script>

<template>
  <nav
    v-if="headings.length"
    class="mb-8 rounded-lg border border-hems-glass/40 bg-white/60 px-5 py-4"
    aria-label="Inhaltsverzeichnis"
  >
    <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-hems-steel">Inhalt</p>
    <ol class="space-y-1.5">
      <li v-for="heading in headings" :key="heading.id" class="flex items-baseline gap-2">
        <span class="mt-px h-1 w-1 shrink-0 rounded-full bg-hems-sky"></span>
        <a
          :href="`#${heading.id}`"
          class="text-sm text-hems-blue leading-snug hover:underline"
        >{{ heading.text }}</a>
      </li>
    </ol>
  </nav>
</template>
