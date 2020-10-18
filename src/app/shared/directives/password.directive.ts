import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';
import { isError } from 'util';

@Directive({
  selector: '[appPassword]'
})
export class PasswordDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) { }

  @HostListener('paste', ['$event'])
  onPaste(event) {
    const clipboardData = (event.originalEvent || event).clipboardData.getData('text/plain');
    if (clipboardData) {
      if (clipboardData) {
        event.preventDefault();
        alert('Cannot paste Must be type');   // test คือ?
      }
    }
    return;



  }

}
