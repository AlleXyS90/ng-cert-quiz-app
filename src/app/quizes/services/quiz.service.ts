import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Results } from '../models/results';
import { Category } from '../models/category';
import { ApiQuestion } from '../models/api-question';
import { Question } from '../models/question';
import { CreateQuizParams } from '../models/create-quiz-params';

@Injectable()
export class QuizService {
  private API_URL = 'https://opentdb.com/';
  private latestResults!: Results;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<{ trivia_categories: Category[] }>(this.API_URL + 'api_category.php')
      .pipe(map((res) => res.trivia_categories));
  }

  createQuiz(params: CreateQuizParams): Observable<Question[]> {
    return this.http
      .get<{ results: ApiQuestion[] }>(
        `${this.API_URL}/api.php?amount=${params.amount}&category=${
          params.categoryId
        }&difficulty=${params.difficulty.toLowerCase()}&type=multiple`
      )
      .pipe(
        map((res) => {
          const quiz: Question[] = res.results.map((q) => ({
            ...q,
            all_answers: [...q.incorrect_answers, q.correct_answer].sort(() =>
              Math.random() > 0.5 ? 1 : -1
            ),
          }));
          return quiz;
        })
      );
  }

  computeScore(questions: Question[], answers: string[]): void {
    let score = 0;
    questions.forEach((q, index) => {
      if (q.correct_answer == answers[index]) score++;
    });
    this.latestResults = { questions, answers, score };
  }

  getLatestResults(): Results {
    return this.latestResults;
  }
}
