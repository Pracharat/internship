import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appNumberMask]'
})
export class NumberMaskDirective {

  @Input()
  set phoneControl(control: AbstractControl) {
    this._phoneControl = control;
  }
  @Input()
  set preValue(value: string) {
    this._preValue = value;
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }


  private _phoneControl: AbstractControl;
  private _preValue: string;
  private speacialKey: Array<string> = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Control'];

  private sub: Subscription;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.speacialKey.indexOf(event.key) !== -1) { return; };
    if (this._phoneControl.value.length > 9 ) {
      event.preventDefault();
    }

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.phoneValidate();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  phoneValidate() {


    this.sub = this._phoneControl.valueChanges.subscribe(data => {

      const preInputValue: string = this._preValue;
      const lastChar: string = preInputValue.substr(preInputValue.length - 1);
      // remove all mask characters (keep only numeric)
      let newVal = data.replace(/\D/g, '');

      let start = this.renderer.selectRootElement('#tel').selectionStart;
      let end = this.renderer.selectRootElement('#tel').selectionEnd;

      if (data.length < preInputValue.length) {
        if (preInputValue.length < start) {
          if (lastChar === ')') {
            newVal = newVal.substr(0, newVal.length - 1);
          }
        }
        if (newVal.length === 0 || null) {
          newVal = '';
        } else if (newVal.length <= 3) {
          newVal = newVal.replace(/(\d{0,1})(\d{0,2})/, '$1');
        } else if (newVal.length <= 4) {
          newVal = newVal.replace(/(\d{0,2})(\d{0,2})/, '$1.$2');
        } else if (newVal.length <= 5) {
          newVal = newVal.replace(/^(\d{0,1})(\d{0,2})(\d{0,2})/, '$1$2.$3');
        } else if (newVal.length <= 6) {
          newVal = newVal.replace(/^(\d{0,1})(\d{0,3})(\d{0,2})/, '$1,$2.$3');
        } else if (newVal.length <= 7) {
          newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,2})/, '$1,$2.$3');
        } else if (newVal.length <= 8) {
          newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,2})/, '$1,$2.$3');
        }

        this._phoneControl.setValue(newVal, { emitEvent: false });
        this.renderer.selectRootElement('#tel').setSelectionRange(start, end);
      } else {
        // this.message = 'Typing...'; //Just console
        const removedD = data.charAt(start);
        // don't show braces for empty value
        if (newVal.length === 0 || null) {
          newVal = '';
        } else if (newVal.length <= 3) {
          newVal = newVal.replace(/(\d{0,1})(\d{0,2})/, '$1.$2');
        } else if (newVal.length <= 4) {
          newVal = newVal.replace(/(\d{0,2})(\d{0,2})/, '$1.$2');
        } else if (newVal.length <= 5) {
          newVal = newVal.replace(/^(\d{0,1})(\d{0,2})(\d{0,2})/, '$1$2.$3');
        } else if (newVal.length <= 6) {
          newVal = newVal.replace(/^(\d{0,1})(\d{0,3})(\d{0,2})/, '$1,$2.$3');
        } else if (newVal.length <= 7) {
          newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,2})/, '$1,$2.$3');
        } else if (newVal.length <= 8) {
          newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,2})/, '$1,$2.$3');
        }

        if (preInputValue.length >= start) {

          if (removedD === '(') {
            start = start + 1;
            end = end + 1;
          }
          if (removedD === ')') {
            start = start + 2; // +2 so there is also space char after ')'.
            end = end + 2;
          }
          if (removedD === '-') {
            start = start + 1;
            end = end + 1;
          }
          if (removedD === ' ') {
            start = start + 1;
            end = end + 1;
          }
          this._phoneControl.setValue(newVal, { emitEvent: false });
          this.renderer.selectRootElement('#tel').setSelectionRange(start, end);
        } else {
          this._phoneControl.setValue(newVal, { emitEvent: false });
          this.renderer.selectRootElement('#tel').setSelectionRange(start + 2, end + 2); // +2 because of wanting standard typing
        }
      }
    });

  }

}
