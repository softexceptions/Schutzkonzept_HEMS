import { ref, computed } from 'vue'
import type { QuizFrage, QuizAntwort } from '../types/quiz'
import type { IQuizService } from '../services/interfaces/IQuizService'
import { StaticQuizService } from '../services/StaticQuizService'

export type QuizPhase = 'start' | 'frage' | 'auswertung'

export function useQuiz(service?: IQuizService) {
  const resolvedService = service ?? new StaticQuizService()

  const phase = ref<QuizPhase>('start')
  const fragen = ref<QuizFrage[]>([])
  const aktuelleIndex = ref(0)
  const antworten = ref<QuizAntwort[]>([])
  const gewaehlt = ref<number | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const aktuelleFrage = computed(() => fragen.value[aktuelleIndex.value] ?? null)
  const punkte = computed(() => antworten.value.filter(a => a.korrekt).length)

  async function starten() {
    isLoading.value = true
    error.value = null
    try {
      const anzahl = Math.floor(Math.random() * 5) + 3 // 3–7 Fragen
      fragen.value = await resolvedService.getFragenSet(anzahl)
      aktuelleIndex.value = 0
      antworten.value = []
      gewaehlt.value = null
      phase.value = 'frage'
    } catch (e) {
      error.value = e as Error
    } finally {
      isLoading.value = false
    }
  }

  function antwortWaehlen(index: number) {
    if (gewaehlt.value !== null) return
    gewaehlt.value = index
  }

  function weiter() {
    if (gewaehlt.value === null || !aktuelleFrage.value) return
    antworten.value.push({
      frageId: aktuelleFrage.value.id,
      gewaehlt: gewaehlt.value,
      korrekt: gewaehlt.value === aktuelleFrage.value.richtig,
    })
    if (aktuelleIndex.value < fragen.value.length - 1) {
      aktuelleIndex.value++
      gewaehlt.value = null
    } else {
      phase.value = 'auswertung'
    }
  }

  function zuruecksetzen() {
    phase.value = 'start'
    fragen.value = []
    antworten.value = []
    gewaehlt.value = null
    aktuelleIndex.value = 0
  }

  return {
    phase,
    fragen,
    aktuelleIndex,
    aktuelleFrage,
    antworten,
    gewaehlt,
    isLoading,
    error,
    punkte,
    starten,
    antwortWaehlen,
    weiter,
    zuruecksetzen,
  }
}
