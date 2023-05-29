import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { QuizesRoutingModule } from './quizes-routing.module';
import { QuizMakerComponent } from './components/quiz-maker/quiz-maker.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './presentation/question/question.component';
import { AnswersComponent } from './presentation/answers/answers.component';
import { AutoFilterComponent } from './presentation/auto-filter/auto-filter.component';

@NgModule({
  declarations: [
    QuizMakerComponent,
    QuizComponent,
    QuestionComponent,
    AnswersComponent,
    AutoFilterComponent
  ],
  imports: [CommonModule, QuizesRoutingModule, HttpClientModule, FormsModule],
  providers: [],
})
export class QuizesModule {}
