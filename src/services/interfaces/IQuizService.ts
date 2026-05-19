import type { QuizFrage } from '../../types/quiz'

export interface IQuizService {
  getFragenSet(anzahl: number): Promise<QuizFrage[]>
}
