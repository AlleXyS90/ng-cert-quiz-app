import { Difficulty } from './types';

export interface CreateQuizParams {
  categoryId: number;
  difficulty: Difficulty;
  amount: number;
}
