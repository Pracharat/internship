import { Directive, Input, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';


@Directive({
  selector: '[appRecieptNumber]'
})
export class RecieptNumberDirective {

  private _remark: AbstractControl;
  private _preValue: string;
  private sub: Subscription;
  private speacialKey: Array<string> = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Control'];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.speacialKey.indexOf(event.key) !== -1) { return; };
    const inputValue: string = this.el.nativeElement.value.concat(event.key);
    console.log( inputValue.length);
    
    if (inputValue.length === 12) {
      event.preventDefault();
    }

  }


}
