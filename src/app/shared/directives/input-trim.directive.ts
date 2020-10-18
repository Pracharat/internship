import { Directive, Optional, Self, HostListener, ElementRef } from '@angular/core';
import { NgControl, AbstractControl } from '@angular/forms';

@Directive({
  selector: 'input[appInputTrim], textarea[appInputTrim]'
})
export class InputTrimDirective {

  get control(): AbstractControl {
    return this.ngControl ? this.ngControl.control : null;
  }
  get inputElement(): HTMLInputElement | HTMLTextAreaElement {
    return this.el.nativeElement;
  }

  constructor(
    @Optional() @Self() private ngControl: NgControl,
    private el: ElementRef,
  ) { }

  @HostListener('blur')
  @HostListener('change')
  @HostListener('paste')
  onChangeValue() {
    if (this.control) {
      const trimValue = `${this.control.value}`.trim();
      this.control.setValue(trimValue);
    } else {
      const trimValue = `${this.inputElement.value}`.trim();
      this.inputElement.value = trimValue;
    }
  }

}
