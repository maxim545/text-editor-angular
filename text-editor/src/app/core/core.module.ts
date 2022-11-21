import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveFilterDirective } from './directives/active-filter.directive';

@NgModule({
  declarations: [
    ActiveFilterDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ActiveFilterDirective,
  ],
})
export class CoreModule { }
