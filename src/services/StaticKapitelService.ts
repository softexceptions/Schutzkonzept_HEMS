import yaml from 'js-yaml'
import { marked } from 'marked'
import type { IKapitelService } from './interfaces/IKapitelService'
import type { Kapitel, KapitelMeta } from '../types/kapitel'

type MarkdownFiles = Record<string, string>
type Frontmatter = Record<string, unknown>

export class StaticKapitelService implements IKapitelService {
  private readonly files: MarkdownFiles

  constructor(files?: MarkdownFiles) {
    this.files = files ?? (
      import.meta.glob('../content/*.md', { query: '?raw', import: 'default', eager: true }) as MarkdownFiles
    )
  }

  async getAll(): Promise<KapitelMeta[]> {
    try {
      return Object.values(this.files)
        .map(raw => this.parseMeta(raw))
        .sort((a, b) => a.nr - b.nr)
    } catch (e) {
      throw new Error(`Kapitel konnten nicht geladen werden: ${e}`)
    }
  }

  async getBySlug(slug: string): Promise<Kapitel | undefined> {
    const raw = Object.values(this.files).find(r => {
      const { data } = this.splitFrontmatter(r)
      return data.slug === slug
    })
    if (!raw) return undefined
    return this.parseKapitel(raw)
  }

  private splitFrontmatter(raw: string): { data: Frontmatter; content: string } {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    if (!match) return { data: {}, content: raw }
    try {
      const data = (yaml.load(match[1]) as Frontmatter) ?? {}
      return { data, content: match[2] }
    } catch {
      return { data: {}, content: raw }
    }
  }

  private parseMeta(raw: string): KapitelMeta {
    const { data } = this.splitFrontmatter(raw)
    return {
      slug: data.slug as string,
      titel: data.titel as string,
      nr: data.nr as number,
      beschreibung: data.beschreibung as string | undefined,
      emoji: data.emoji as string | undefined,
      kontakte: data.kontakte as KapitelMeta['kontakte'],
      faelle: data.faelle as KapitelMeta['faelle'],
      abschnittsEmoji: data.abschnittsEmoji as KapitelMeta['abschnittsEmoji'],
    }
  }

  private parseKapitel(raw: string): Kapitel {
    const { data, content } = this.splitFrontmatter(raw)
    const html = marked(content) as string
    return {
      slug: data.slug as string,
      titel: data.titel as string,
      nr: data.nr as number,
      emoji: data.emoji as string | undefined,
      kontakte: data.kontakte as KapitelMeta['kontakte'],
      faelle: data.faelle as KapitelMeta['faelle'],
      abschnittsEmoji: data.abschnittsEmoji as KapitelMeta['abschnittsEmoji'],
      html,
    }
  }
}
