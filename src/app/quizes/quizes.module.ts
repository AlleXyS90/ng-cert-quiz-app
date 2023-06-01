import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizesRoutingModule } from './quizes-routing.module';
import { QuizMakerComponent } from './components/quiz-maker/quiz-maker.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './presentation/question/question.component';
import { AnswersComponent } from './presentation/answers/answers.component';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  declarations: [
    QuizMakerComponent,
    QuizComponent,
    QuestionComponent,
    AnswersComponent,
  ],
  imports: [CommonModule, QuizesRoutingModule, HttpClientModule, SharedModule],
  providers: [],
})
export class QuizesModule {}
