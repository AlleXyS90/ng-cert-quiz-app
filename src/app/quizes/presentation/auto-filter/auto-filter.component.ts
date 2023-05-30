import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-auto-filter',
  templateUrl: './auto-filter.component.html',
  styleUrls: ['./auto-filter.component.css'],
})
export class AutoFilterComponent implements OnInit {
  // @Input() request: AutoFilterRequest<any> = {
  //   label: '',
  //   displayedField: '',
  //   items: [],
  // };
  @Input() label!: string;
  @Input() displayedField!: string;
  @Input() items: any[] = [];

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  selectedItem: any | undefined = undefined;

  filteredItems: any[] = [...this.items];
  userInput: string | undefined = undefined;
  innerOptions: Map<string, string> = new Map();

  @ViewChild('inputField') inputField!: ElementRef<HTMLInputElement>;
  @ViewChild('options') options!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {}

  onUserInputChanged(event: any): void {
    this.filterItems(event.toLowerCase());

    this.userInput = event;
  }

  onInputBlur(): void {
    setTimeout(() => {
      if (this.options.nativeElement.style.display !== 'none') {
        this.options.nativeElement.style.display = 'none';
      }
    }, 300);
  }

  onInputFocus(): void {
    if (!this.userInput) {
      this.filterItems('');
    } else {
      this.filterItems(this.userInput.toLowerCase());
    }

    if (this.options.nativeElement.style.display !== 'block') {
      this.options.nativeElement.style.display = 'block';
    }
  }

  onItemSelected(item: any): void {
    this.options.nativeElement.style.display = 'none';

    this.selectedItem = item;
    this.userInput = (this.displayedField && item[this.displayedField]) || item;
    this.onChange.emit(item);
  }

  filterItems(input: string): void {
    if (typeof this.displayedField !== 'undefined') {
      this.filteredItems = this.items.filter((item) =>
        item[this.displayedField].toLowerCase().includes(input)
      );
    } else {
      this.filteredItems = [
        ...this.items.filter((item) => item.toLowerCase().includes(input)),
      ];
    }

    this.innerOptions.clear();
    this.filteredItems.forEach((item) => {
      const key = (this.displayedField && item[this.displayedField]) || item;
      this.innerOptions.set(key, this.setLabelWithStyle('', key, input));
    });

    if (this.options.nativeElement.style.display !== 'block') {
      this.options.nativeElement.style.display = 'block';
    }
  }

  setLabelWithStyle(
    innerLabel: string,
    str: string,
    input: string,
    acc: boolean = false
  ): string {
    if (!input) {
      return str;
    }

    const index = str.toLowerCase().indexOf(input);

    // return previous + rest label
    if (acc && index === -1) {
      return innerLabel + str;
    }

    if (acc) {
      innerLabel += str.substr(0, index);
    } else {
      innerLabel = str.substr(0, index);
    }

    innerLabel += `<strong>${str.substr(index, input.length)}</strong>`;

    const rest = str.substr(index + input.length);

    return (
      (rest && this.setLabelWithStyle(innerLabel, rest, input, true)) ||
      innerLabel
    );
  }
}
