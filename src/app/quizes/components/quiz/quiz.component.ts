import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { QuizService } from '../../services/quiz.service';
import { QuestionsState, StoreService } from '../../services/store.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  questionsState$: Observable<QuestionsState>;

  userAnswers: string[] = [];
  quizService = inject(QuizService);
  router = inject(Router);

  constructor(private storeService: StoreService) {
    this.questionsState$ = this.storeService.questionsState$;
  }

  onChangeQuestion(title: string): void {
    this.storeService.changeQuestion$.next(title);
  }

  submit(): void {
    this.quizService.computeScore(
      this.storeService.getQuestions() ?? [],
      this.userAnswers
    );
    this.router.navigateByUrl('/result');
  }
}
