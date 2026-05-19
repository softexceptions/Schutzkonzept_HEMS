import type { Kapitel, KapitelMeta } from '../../types/kapitel'

export interface IKapitelService {
  getAll(): Promise<KapitelMeta[]>
  getBySlug(slug: string): Promise<Kapitel | undefined>
}
