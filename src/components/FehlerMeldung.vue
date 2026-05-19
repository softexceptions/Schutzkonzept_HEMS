<script setup lang="ts">
defineProps<{ message: string }>()
const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="flex flex-col items-center gap-4 py-16 text-center">
    <svg class="h-8 w-8 text-hems-steel dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
    <p class="text-sm text-hems-muted dark:text-gray-400">{{ message }}</p>
    <button
      class="rounded border border-hems-glass px-4 py-1.5 text-sm text-hems-steel transition-colors hover:border-hems-blue hover:text-hems-blue dark:border-gray-700 dark:text-gray-400 dark:hover:border-hems-blue dark:hover:text-hems-sky"
      @click="emit('retry')"
    >
      Erneut versuchen
    </button>
  </div>
</template>
