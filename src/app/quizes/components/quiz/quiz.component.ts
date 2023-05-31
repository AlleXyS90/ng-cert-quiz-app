import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  @Input()
  questions: Question[] | null = [];
  @Input() canChangeQuestion: boolean = true;

  @Output() onChange = new EventEmitter<string>();

  userAnswers: string[] = [];
  quizService = inject(QuizService);
  router = inject(Router);

  onChangeQuestion(event: string): void {
    this.canChangeQuestion = false;
    this.onChange.emit(event);
  }

  submit(): void {
    this.quizService.computeScore(this.questions ?? [], this.userAnswers);
    this.router.navigateByUrl('/result');
  }
}
