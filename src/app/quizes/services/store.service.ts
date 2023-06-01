import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Question } from '../models/question';

export interface QuestionsState {
  questions: Question[];
  canChange: boolean;
}

export const initialState: QuestionsState = {
  questions: [],
  canChange: true,
};

@Injectable()
export class StoreService {
  private state = initialState;

  questionsState$: Subject<QuestionsState> = new Subject();
  changeQuestion$: Subject<string> = new Subject();

  set(questions: Question[]): void {
    this.state = {
      questions: questions,
      canChange: true,
    };
    this.questionsState$.next(this.state);
  }

  getQuestions(): Question[] {
    return this.state.questions;
  }

  changeQuestion(title: string, newQuestion: Question): void {
    const indexToReplace = this.state.questions
      .map((x) => x.question)
      .indexOf(title);

    const updatedQuestions = this.state.questions.map((item, index) =>
      index !== indexToReplace ? item : newQuestion
    );
    this.state = {
      questions: [...updatedQuestions],
      canChange: false,
    };
    this.questionsState$.next(this.state);
  }
}
