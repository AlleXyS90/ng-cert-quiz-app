import { Question } from "./question";

export interface Results {
  questions: Question[];
  answers: string[];
  score: number;
}
