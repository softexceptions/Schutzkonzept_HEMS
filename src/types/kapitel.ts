export interface KontaktInfo {
  name: string
  angebote?: string
  email?: string
  telefon?: string
  mobil?: string
  website?: string
}

export interface PodcastInfo {
  datei: string
  triggerwarnung: string
  transkriptDatei?: string
}

export interface InterventionsFall {
  titel: string
  schritte: string[]
  podcast?: PodcastInfo
}

export interface KapitelMeta {
  slug: string
  titel: string
  nr: number
  beschreibung?: string
  emoji?: string
  kontakte?: KontaktInfo[]
  faelle?: InterventionsFall[]
  abschnittsEmoji?: string[]
}

export interface Kapitel extends KapitelMeta {
  html: string
}
