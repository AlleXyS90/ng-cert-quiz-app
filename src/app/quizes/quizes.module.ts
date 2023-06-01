import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../_shared/shared.module';
import { StoreService } from './services/store.service';
import { QuizService } from './services/quiz.service';
import { QuizMakerComponent } from './components/quiz-maker/quiz-maker.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './presentation/question/question.component';
import { AnswersComponent } from './presentation/answers/answers.component';
import { QuizesRoutingModule } from './quizes-routing.module';

@NgModule({
  declarations: [
    QuizMakerComponent,
    QuizComponent,
    QuestionComponent,
    AnswersComponent,
  ],
  imports: [CommonModule, QuizesRoutingModule, HttpClientModule, SharedModule],
  providers: [StoreService, QuizService],
})
export class QuizesModule {}
