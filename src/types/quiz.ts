export type QuizTyp = 'multiple-choice' | 'szenario' | 'richtig-falsch' | 'zuordnung'

export interface QuizFrage {
  id: string
  typ: QuizTyp
  frage?: string
  aussage?: string
  szenario?: string
  optionen: string[]
  richtig: number
  erklaerung: string
}

export interface QuizAntwort {
  frageId: string
  gewaehlt: number
  korrekt: boolean
}
