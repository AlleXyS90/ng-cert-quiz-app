import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizMakerComponent } from './components/quiz-maker/quiz-maker.component';
import { AnswersComponent } from './presentation/answers/answers.component';
import { QuizService } from './services/quiz.service';

const routes: Routes = [
  {
    path: '',
    component: QuizMakerComponent,
  },
  {
    path: 'result',
    component: AnswersComponent,
    resolve: { data: () => inject(QuizService).getLatestResults() },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizesRoutingModule {}
