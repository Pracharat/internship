import { Directive, ElementRef, HostListener, Input, Renderer, HostBinding } from '@angular/core';

@Directive({
  selector: '[appStrickNumber]'
})
export class StrickNumberDirective {

  private regex: RegExp = new RegExp('^[0-9]*$');
  private speacialKey: Array<string> = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Control', 'a', 'c', 'v', '-'];
  inputValue: any;
  constructor(
    private el: ElementRef,
    private renderer: Renderer ,
  ) { }

  /* Keyboard Actiion */
  // @param event

  @HostBinding('attr.textMask') textMask: any;
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.speacialKey.indexOf(event.key) !== -1) { return; } // index array เริ่มที่ 0  -1 คือไม่มี       
    const inputValue: string = this.el.nativeElement.value.concat(event.key);
    
    console.log(event.key);
    if (inputValue && !String(inputValue).match(this.regex)) {
      event.preventDefault(); // ศึกษา
      
    }
    return;
  }
  /* Copy Paste*/

  @HostListener('paste', ['$event'])
  onPaste(event) {
    const clipboardData = (event.originalEvent || event).clipboardData.getData('text/plain');
    if (clipboardData) {
      const regEx = new RegExp('^[0-9]*$');
      if (!regEx.test(clipboardData)) {
        event.preventDefault();
        alert('cannot paste character');   // test คือ?
      }
    }
    return;
  }
}
