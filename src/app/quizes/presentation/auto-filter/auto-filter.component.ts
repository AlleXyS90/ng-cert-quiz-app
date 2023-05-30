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
  // changeDetection: ChangeDetectionStrategy.OnPush,
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

  @ViewChild('inputField') inputField!: ElementRef<HTMLInputElement>;
  @ViewChild('options') options!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {}

  onUserInputChanged(event: any): void {
    this.filterItems(event.toLowerCase());
  }

  onInputBlur(): void {
    setTimeout(() => {
      if (this.options.nativeElement.style.display !== 'none') {
        this.options.nativeElement.style.display = 'none';
      }
    }, 500);
  }

  onInputFocus(): void {
    this.options.nativeElement.style.display = 'block';
    this.filterItems('');
  }

  filterItems(input: string): void {
    this.options.nativeElement.style.display = 'block';

    if (typeof this.displayedField !== 'undefined') {
      this.filteredItems = this.items.filter((item) =>
        item[this.displayedField].toLowerCase().includes(input)
      );
    } else {
      this.filteredItems = [
        ...this.items.filter((item) => item.toLowerCase().includes(input)),
      ];
    }
  }

  onItemSelected(item: any): void {
    this.options.nativeElement.style.display = 'none';

    this.selectedItem = item;
    this.userInput = (this.displayedField && item[this.displayedField]) || item;
    this.onChange.emit(item);
  }

  // onInput(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const val = input.value;
  //   this.closeAllLists();

  //   if (!val) {
  //     return;
  //   }

  //   const div = document.createElement('div');
  //   div.setAttribute('id', this.label + 'autocomplete-list');
  //   div.setAttribute('class', 'autocomplete-items');
  //   input.parentNode?.appendChild(div);

  //   for (let i = 0; i < this.items.length; i++) {
  //     const item = this.displayedField
  //       ? this.items[i][this.displayedField]
  //       : this.items[i];

  //     if (item.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
  //       const itemDiv = document.createElement('div');
  //       itemDiv.innerHTML =
  //         '<strong>' + item.substr(0, val.length) + '</strong>';
  //       itemDiv.innerHTML += item.substr(val.length);
  //       itemDiv.innerHTML +=
  //         "<input type='hidden' value='" + this.items[i] + "'>";

  //       itemDiv.setAttribute('class', 'autocomplete-item');

  //       itemDiv.addEventListener('click', () => {
  //         this.inputField.nativeElement.value =
  //           itemDiv.getElementsByTagName('input')[0].value;
  //         this.closeAllLists();
  //       });

  //       div.appendChild(itemDiv);
  //     }
  //   }
  // }

  // closeAllLists() {
  //   const lists = document.getElementsByClassName('autocomplete-items');
  //   while (lists.length) {
  //     lists[0].parentNode?.removeChild(lists[0]);
  //   }
  // }
}
