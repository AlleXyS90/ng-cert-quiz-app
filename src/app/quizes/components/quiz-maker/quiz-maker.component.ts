import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';

import { StoreService } from '../../services/store.service';
import { QuizService } from '../../services/quiz.service';
import { Category } from '../../models/category';
import { Difficulty } from '../../models/types';
import { CreateQuizParams } from '../../models/create-quiz-params';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css'],
})
export class QuizMakerComponent implements OnDestroy {
  subcategories: Category[] = [];
  filteredSubcategories: Category[] = [];
  selectedCategory: Category | undefined = undefined;
  selectedSubCategoryId: number | undefined = undefined;
  difficulty: string | undefined = undefined;

  categories$: Observable<Category[]>;
  changeQuestionSubscription$: Subscription;

  questionsSubscription$: Subscription | undefined;

  subcategoriesPrefixes = ['Entertainment', 'Science'];
  itemsWithSubcategories = [
    { id: -1, name: 'Entertainment' },
    { id: -2, name: 'Science' },
  ];

  loading: boolean = true;
  loadingCount: number = 0;
  interval: any;

  constructor(
    protected quizService: QuizService,
    private storeService: StoreService
  ) {
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

    this.changeQuestionSubscription$ =
      this.storeService.changeQuestion$.subscribe((title) =>
        this.onQuestionChange(title)
      );
  }

  ngOnDestroy(): void {
    if (typeof this.questionsSubscription$ !== 'undefined') {
      this.questionsSubscription$.unsubscribe();
    }

    if (typeof this.changeQuestionSubscription$ !== 'undefined') {
      this.changeQuestionSubscription$.unsubscribe();
    }
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

  onSubcategoryChanged(event: any): void {
    this.selectedSubCategoryId = event?.id;
  }

  onDifficultyChanged(event: any): void {
    this.difficulty = event;
  }

  createQuiz(): void {
    const params = this.getParams(5);

    if (typeof params === 'undefined') {
      return;
    }

    this.setLoading();
    this.questionsSubscription$ = this.quizService
      .createQuiz(params)
      .subscribe((questions) => {
        this.storeService.set(questions);
        this.clear();
      });
  }

  onQuestionChange(questionTitle: string): void {
    const params = this.getParams(1);

    if (typeof params === 'undefined') {
      return;
    }

    this.setLoading();
    this.questionsSubscription$ = this.quizService
      .createQuiz(params)
      .subscribe((newQuestions) => {
        this.storeService.changeQuestion(questionTitle, newQuestions[0]);
        this.clear();
      });
  }

  private getParams(amount: number): CreateQuizParams | undefined {
    const categoryId = (
      this.selectedCategory && this.selectedCategory.id > 0
        ? this.selectedCategory.id
        : this.selectedSubCategoryId
    ) as number;
    if (typeof this.selectedCategory === 'undefined') {
      window.alert('Select a category');
      return undefined;
    }
    if (
      this.selectedCategory?.id < 0 &&
      typeof this.selectedSubCategoryId === 'undefined'
    ) {
      window.alert('Select a subcategory');
      return undefined;
    }

    if (!this.difficulty) {
      window.alert('Select difficulty');
      return undefined;
    }

    return { categoryId, difficulty: this.difficulty as Difficulty, amount };
  }

  private checkForSubcategories(category: string): boolean {
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
