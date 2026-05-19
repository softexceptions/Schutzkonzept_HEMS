import type { IQuizService } from './interfaces/IQuizService'
import type { QuizFrage } from '../types/quiz'
import fragenJson from '../content/quiz.json'

export class StaticQuizService implements IQuizService {
  private readonly alleFragen: QuizFrage[]

  constructor(fragen?: QuizFrage[]) {
    this.alleFragen = fragen ?? (fragenJson as QuizFrage[])
  }

  async getFragenSet(anzahl: number): Promise<QuizFrage[]> {
    const gemischt = this.mischen([...this.alleFragen])
    return gemischt
      .slice(0, Math.min(anzahl, gemischt.length))
      .map(f => this.mischenOptionen(f))
  }

  private mischen<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  // Shuffles answer options and updates the correct-answer index accordingly.
  // Skips richtig-falsch since "Richtig / Falsch" order is meaningful.
  private mischenOptionen(frage: QuizFrage): QuizFrage {
    const richtigeAntwort = frage.optionen[frage.richtig]
    const gemischteOptionen = this.mischen([...frage.optionen])
    return {
      ...frage,
      optionen: gemischteOptionen,
      richtig: gemischteOptionen.indexOf(richtigeAntwort),
    }
  }
}
