import {
  Directive, Input, ElementRef, Renderer2, AfterViewInit, HostListener,
} from '@angular/core';
import { NoteService } from 'src/app/main/services/note/note.service';

@Directive({
  selector: '[appActiveFilter]',
})
export class ActiveFilterDirective {
  @Input() appActiveFilter: string = '';

  color: string = '';

  constructor(
    private element: ElementRef,
    private render: Renderer2,
  ) {
    this.render.setStyle(this.element.nativeElement, 'background-color', this.color);
    element.nativeElement.style.backgroundColor = this.color;
  }

  @HostListener('click') onMouseEnter() {
    this.changeColor();
  }

  changeColor() {
    const currentStyles = [...this.element.nativeElement.classList];
    if (!currentStyles.includes('btn_primary_active')) {
      this.render.addClass(this.element.nativeElement, 'btn_primary_active');
    } else {
      this.render.removeClass(this.element.nativeElement, 'btn_primary_active');
    }
  }
}
