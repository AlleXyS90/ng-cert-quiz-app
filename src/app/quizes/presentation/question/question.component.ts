import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  @Input({ required: true })
  question!: Question;
  @Input()
  correctAnswer?: string;
  @Input()
  userAnswer?: string;
  @Input() canChangeQuestion: boolean = true;

  @Output()
  changeAnswer = new EventEmitter<string>();
  @Output()
  onChangeQuestion = new EventEmitter<string>();

  getButtonClass(answer: string): string {
    if (!this.userAnswer) {
      if (this.currentSelection == answer) return 'tertiary';
    } else {
      if (this.userAnswer == this.correctAnswer && this.userAnswer == answer)
        return 'tertiary';
      if (answer == this.correctAnswer) return 'secondary';
    }
    return 'primary';
  }

  currentSelection!: string;

  buttonClicked(answer: string): void {
    this.currentSelection = answer;
    this.changeAnswer.emit(answer);
  }

  changeQuestion(question: string): void {
    this.onChangeQuestion.emit(question);
  }
}
