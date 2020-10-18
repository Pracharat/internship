import { Directive, ElementRef, Renderer, HostBinding, HostListener, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSearch]'
})
export class SearchDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
  ) { }

  @HostBinding('class.clear') clear: any ;
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    console.log('all : ', event);
   
 
  }
}
