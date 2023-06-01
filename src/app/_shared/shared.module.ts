import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoFilterComponent } from './components/auto-filter/auto-filter.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutoFilterComponent,
  ],
  declarations: [AutoFilterComponent],
  providers: [],
})
export class SharedModule {}
