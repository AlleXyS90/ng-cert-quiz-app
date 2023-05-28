import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizMakerComponent } from './quizes/components/quiz-maker/quiz-maker.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./quizes/quizes.module').then((m) => m.QuizesModule),
  },
  {
    path: '**',
    component: QuizMakerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
