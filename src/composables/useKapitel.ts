import { ref, onMounted } from 'vue'
import type { Kapitel, KapitelMeta } from '../types/kapitel'
import type { IKapitelService } from '../services/interfaces/IKapitelService'
import { StaticKapitelService } from '../services/StaticKapitelService'

export function useKapitel(slug?: string, service?: IKapitelService) {
  const resolvedService = service ?? new StaticKapitelService()

  const kapitelListe = ref<KapitelMeta[]>([])
  const aktuell = ref<Kapitel | undefined>()
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  async function laden() {
    isLoading.value = true
    error.value = null
    try {
      kapitelListe.value = await resolvedService.getAll()
      if (slug) {
        aktuell.value = await resolvedService.getBySlug(slug)
      }
    } catch (e) {
      error.value = e as Error
    } finally {
      isLoading.value = false
    }
  }

  onMounted(laden)

  return { kapitelListe, aktuell, isLoading, error, laden }
}
