import {Component} from '@angular/core';
import {Observable} from 'rxjs';

import {QuizService} from '../../services/quiz.service';
import { Category } from '../../models/category';
import { Question } from '../../models/question';
import { Difficulty } from '../../models/types';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent {

  categories$: Observable<Category[]>;
  questions$!: Observable<Question[]>;

  constructor(protected quizService: QuizService) {
    this.categories$ = quizService.getAllCategories()
  }

  createQuiz(cat: string, difficulty: string): void {
    this.questions$ = this.quizService.createQuiz(cat, difficulty as Difficulty);
  }
}
