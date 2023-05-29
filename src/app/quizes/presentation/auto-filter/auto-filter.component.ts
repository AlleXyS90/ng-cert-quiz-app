import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../models/category';

@Component({
  selector: 'app-auto-filter',
  templateUrl: './auto-filter.component.html',
  styleUrls: ['./auto-filter.component.css'],
})
export class AutoFilterComponent implements OnInit {
  @Input() label: string = 'Select';
  @Input() displayedField!: string;
  @Input() items: any[] = [];

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  selectedItem: any | undefined = undefined;

  ngOnInit(): void {
  }

  onItemSelected(event: any): void {
    this.onChange.emit(event);
  }
}
