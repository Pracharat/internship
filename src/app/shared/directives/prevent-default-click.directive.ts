import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[mwPreventDefaultClick]'
})
export class PreventDefaultClickDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.preventDefault();
  }

}
