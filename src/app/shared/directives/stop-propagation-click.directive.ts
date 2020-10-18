import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopPropagationClick]'
})
export class StopPropagationClickDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation();
  }

}
