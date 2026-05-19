import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { useKapitel } from '../useKapitel'
import type { IKapitelService } from '../../services/interfaces/IKapitelService'
import type { Kapitel, KapitelMeta } from '../../types/kapitel'

const mockKapitelMeta: KapitelMeta[] = [
  { slug: 'verdacht', titel: 'Vorgehen bei Verdacht', nr: 1 },
  { slug: 'kodex', titel: 'Verhaltenskodex', nr: 3 },
]

const mockKapitel: Kapitel = {
  slug: 'verdacht',
  titel: 'Vorgehen bei Verdacht',
  nr: 1,
  html: '<h1>Vorgehen bei Verdacht</h1>',
}

const mockService: IKapitelService = {
  getAll: vi.fn().mockResolvedValue(mockKapitelMeta),
  getBySlug: vi.fn().mockResolvedValue(mockKapitel),
}

const mockFailingService: IKapitelService = {
  getAll: vi.fn().mockRejectedValue(new Error('Netzwerkfehler')),
  getBySlug: vi.fn().mockRejectedValue(new Error('Netzwerkfehler')),
}

function mountWithComposable(slug?: string, service: IKapitelService = mockService) {
  return mount(defineComponent({
    setup() {
      return useKapitel(slug, service)
    },
    template: '<div />',
  }))
}

describe('useKapitel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockService.getAll = vi.fn().mockResolvedValue(mockKapitelMeta)
    mockService.getBySlug = vi.fn().mockResolvedValue(mockKapitel)
  })

  it('kapitelListe hat nach dem Laden 2 Einträge', async () => {
    const wrapper = mountWithComposable()
    await nextTick()
    await nextTick()
    expect(wrapper.vm.kapitelListe).toHaveLength(2)
  })

  it('aktuell gibt richtiges Kapitel für slug zurück', async () => {
    const wrapper = mountWithComposable('verdacht')
    await nextTick()
    await nextTick()
    expect(wrapper.vm.aktuell?.slug).toBe('verdacht')
  })

  it('aktuell ist undefined wenn kein slug übergeben', async () => {
    const wrapper = mountWithComposable()
    await nextTick()
    await nextTick()
    expect(wrapper.vm.aktuell).toBeUndefined()
  })

  it('isLoading ist false nach dem Laden', async () => {
    const wrapper = mountWithComposable()
    await nextTick()
    await nextTick()
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('setzt error wenn Service fehlschlägt', async () => {
    const wrapper = mountWithComposable(undefined, mockFailingService)
    await nextTick()
    await nextTick()
    expect(wrapper.vm.error?.message).toBe('Netzwerkfehler')
  })

  it('setzt isLoading auf false nach Fehler', async () => {
    const wrapper = mountWithComposable(undefined, mockFailingService)
    await nextTick()
    await nextTick()
    expect(wrapper.vm.isLoading).toBe(false)
  })
})
