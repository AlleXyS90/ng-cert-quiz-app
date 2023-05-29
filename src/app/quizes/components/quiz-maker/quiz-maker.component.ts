import { Component } from '@angular/core';
import { Observable, interval, map, tap } from 'rxjs';

import { QuizService } from '../../services/quiz.service';
import { Category } from '../../models/category';
import { Question } from '../../models/question';
import { Difficulty } from '../../models/types';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css'],
})
export class QuizMakerComponent {
  categories$: Observable<Category[]>;
  questions$!: Observable<Question[]>;
  subcategories: Category[] = [];
  filteredSubcategories: Category[] = [];
  selectedCategory: Category | undefined = undefined;
  selectedSubCategoryId: number | undefined = undefined;

  subcategoriesPrefixes = ['Entertainment', 'Science'];

  itemsWithSubcategories = [
    { id: -1, name: 'Entertainment' },
    { id: -2, name: 'Science' },
  ];

  loading: boolean = true;
  loadingCount: number = 0;
  interval: any;

  constructor(protected quizService: QuizService) {
    this.setLoading();

    this.categories$ = quizService.getAllCategories().pipe(
      map((categories) => {
        this.subcategories = categories.filter(
          (x: Category) =>
            x.name.startsWith('Entertainment') || x.name.startsWith('Science')
        );

        this.clear();
        return [
          ...this.itemsWithSubcategories,
          ...categories.filter(
            (x) =>
              !x.name.startsWith('Entertainment') &&
              !x.name.startsWith('Science')
          ),
        ];
      })
    );
  }

  onCategoryChanged(event: any): void {
    this.selectedCategory = event;
    const haveSubcategories = this.checkForSubcategories(event?.name);

    if (haveSubcategories) {
      this.filteredSubcategories = this.subcategories.filter((x) =>
        x.name.startsWith(event.name)
      );
      this.selectedSubCategoryId = undefined;
    }
  }

  createQuiz(difficulty: string): void {
    const catId = (
      this.selectedCategory && this.selectedCategory.id > 0
        ? this.selectedCategory.id
        : this.selectedSubCategoryId
    ) as number;
    if (typeof this.selectedCategory === 'undefined') {
      window.alert('Select a category');
      return;
    }
    if (
      this.selectedCategory.id < 0 &&
      typeof this.selectedSubCategoryId === 'undefined'
    ) {
      window.alert('Select a subcategory');
      return;
    }

    if (difficulty === '') {
      window.alert('Select difficulty');
      return;
    }

    this.setLoading();
    this.questions$ = this.quizService
      .createQuiz(catId, difficulty as Difficulty)
      .pipe(tap(() => this.clear()));
  }

  checkForSubcategories(category: string): boolean {
    return this.subcategoriesPrefixes.includes(category);
  }

  private setLoading(): void {
    this.loading = true;
    this.interval = setInterval(() => {
      this.loadingCount += 1;
    }, 500);
  }

  private clear(): void {
    this.loading = false;
    this.loadingCount = 0;
    clearInterval(this.interval);
  }
}
