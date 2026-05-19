import { describe, it, expect, vi, beforeEach } from 'vitest'
import { StaticKapitelService } from '../StaticKapitelService'

const mockMarkdown = {
  '/src/content/01-verdacht.md': `---
nr: 1
titel: Vorgehen bei Verdacht
slug: verdacht
---
# Vorgehen bei Verdacht

Erster Abschnitt.
`,
  '/src/content/02-handlungsmoeglichkeiten.md': `---
nr: 2
titel: Schulische Handlungsmöglichkeiten
slug: handlungsmoeglichkeiten
---
# Handlungsmöglichkeiten
`,
  '/src/content/03-verhaltenskodex.md': `---
nr: 3
titel: Verhaltenskodex
slug: verhaltenskodex
---
# Verhaltenskodex
`,
  '/src/content/04-ansprechpersonen.md': `---
nr: 4
titel: Schulische Ansprechpersonen
slug: ansprechpersonen
kontakte:
  - name: Marie Kremer
    email: marie.kremer@kultus.hessen.de
    telefon: "+49 6151 3682420"
---
# Ansprechpersonen
`,
  '/src/content/05-kooperationspartner.md': `---
nr: 5
titel: Kooperationspartner
slug: kooperationspartner
---
# Kooperationspartner
`,
}

vi.mock('virtual:markdown-files', () => ({ default: mockMarkdown }))

describe('StaticKapitelService', () => {
  let service: StaticKapitelService

  beforeEach(() => {
    service = new StaticKapitelService(mockMarkdown)
  })

  it('gibt alle 5 Kapitel zurück', async () => {
    const kapitel = await service.getAll()
    expect(kapitel).toHaveLength(5)
  })

  it('gibt Kapitel nach Nummer sortiert zurück', async () => {
    const kapitel = await service.getAll()
    const nummern = kapitel.map(k => k.nr)
    expect(nummern).toEqual([1, 2, 3, 4, 5])
  })

  it('gibt Kapitel mit korrektem slug zurück', async () => {
    const kapitel = await service.getAll()
    expect(kapitel[0].slug).toBe('verdacht')
    expect(kapitel[1].slug).toBe('handlungsmoeglichkeiten')
  })

  it('parst Kontaktdaten aus Frontmatter', async () => {
    const kapitel = await service.getAll()
    const ansprechpersonen = kapitel.find(k => k.slug === 'ansprechpersonen')
    expect(ansprechpersonen?.kontakte).toHaveLength(1)
    expect(ansprechpersonen?.kontakte?.[0].name).toBe('Marie Kremer')
    expect(ansprechpersonen?.kontakte?.[0].email).toBe('marie.kremer@kultus.hessen.de')
  })

  it('gibt undefined für unbekannten slug zurück', async () => {
    const result = await service.getBySlug('existiert-nicht')
    expect(result).toBeUndefined()
  })

  it('gibt korrektes Kapitel per slug zurück', async () => {
    const kapitel = await service.getBySlug('verdacht')
    expect(kapitel?.slug).toBe('verdacht')
    expect(kapitel?.nr).toBe(1)
  })

  it('HTML enthält keinen rohen Markdown-Syntax', async () => {
    const kapitel = await service.getBySlug('verdacht')
    expect(kapitel?.html).not.toContain('# Vorgehen')
    expect(kapitel?.html).toContain('<h1>')
  })
})
