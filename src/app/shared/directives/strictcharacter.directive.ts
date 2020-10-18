import { Directive, ElementRef, Renderer, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appStrictcharacter]'
})
export class StrictcharacterDirective {

  private regex: RegExp = new RegExp('[^A-Z0-9-\^/]');
  private speacialKey: Array<string> = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Control',];
  constructor(
    private el: ElementRef,
    // tslint:disable-next-line: deprecation
    private renderer: Renderer
  ) { }

  /* Keyboard Actiion */
  // @param event
  @HostBinding('attr.maxlength') maxlength: any;
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.speacialKey.indexOf(event.key) !== -1) { return; } // index array เริ่มที่ 0  -1 คือไม่มี       
    const inputValue: string = this.el.nativeElement.value.concat(event.key);
    console.log(event.key);
    if (inputValue.match(this.regex)) { // ศึกษา
      event.preventDefault();
    }
    return;
  }

}
