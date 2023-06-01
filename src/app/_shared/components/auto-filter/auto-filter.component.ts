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
export class AutoFilterComponent<T> implements OnInit {
  @Input({ required: true })
  label!: string;
  @Input()
  displayedField: keyof T | undefined;
  @Input()
  items: Array<T> = [];

  /** return item type or undefined */
  @Output()
  onChange: EventEmitter<any> = new EventEmitter<any>();

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

  /** 
    -- emit 'undefined' value if the user input doesn't match the value 
     eq: when type is string, the user input should match, 
         if the type is object user input should match the object displayed label
    -- in the end, hide dropdown element
  */
  onInputBlur(event: any): void {
    if (typeof this.selectedItem === 'object' && this.selectedItem) {
      const selectedItemLabel =
        this.displayedField && this.selectedItem[this.displayedField];
      if (selectedItemLabel !== event.target.value) {
        this.selectedItem = undefined;
        this.onChange.emit(this.selectedItem);
      }
    } else if (this.selectedItem && this.selectedItem !== event.target.value) {
      this.selectedItem = undefined;
      this.onChange.emit(this.selectedItem);
    }

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
    this.onChange.emit(this.selectedItem);
  }

  filterItems(input: string): void {
    this.filteredItems = this.items.filter((item) => {
      const label = ((this.displayedField && item[this.displayedField]) ||
        item) as string;
      return label.toLowerCase().includes(input);
    });

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
