import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appProhibitingCopying]'
})
export class ProhibitingCopyingDirective {

  constructor() { }
  /* Copy Paste*/

  @HostListener('paste', ['$event'])
  onPaste(event) {
    const clipboardData = (event.originalEvent || event).clipboardData.getData('text/plain');
    if (clipboardData) {
        event.preventDefault();
        alert('cannot paste character');   // test คือ?
    }
    return;
  }
}
