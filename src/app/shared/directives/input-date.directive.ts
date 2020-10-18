import { Directive, Self, ElementRef, Input, HostListener, Optional } from '@angular/core';
import { NgControl, AbstractControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material';
import { take } from 'rxjs/operators';

@Directive({
  selector: 'input[appInputDate]'
})
export class InputDateDirective {

  // tslint:disable-next-line: no-input-rename
  @Input('appInputDate') datePicker: MatDatepicker<Date>;
  // tslint:disable-next-line: no-input-rename
  @Input('allowKey') isAllowKey = false;

  get inputElement(): HTMLInputElement {
    return this.el.nativeElement;
  }
  get control(): AbstractControl {
    return this.ngControl ? this.ngControl.control : null;
  }
  get value() {
    return this.inputElement.value;
  }

  private dateRegEx = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

  constructor(
    @Optional() @Self() private ngControl: NgControl,
    private el: ElementRef,
  ) { }

  @HostListener('mousedown', ['$event'])
  openCalendar(event: MouseEvent) {
    if (!this.isAllowKey) {
      event.preventDefault();
    }
    this.datePicker.open();
    this.markAsTouchedOnCloseDatepicker();
  }

  @HostListener('keydown', ['$event'])
  @HostListener('keypress', ['$event'])
  @HostListener('change', ['$event'])
  onKeyboardEvent(event: KeyboardEvent | Event) {
    switch (event.type) {
      case 'keydown':
        if (!this.isAllowKey) {
          event.preventDefault();
          this.datePicker.open();
          return false;
        }
        break;

      case 'keypress':
      case 'change':
        this.selectDate();
        break;
    }
  }

  private selectDate() {
    const isCorrectFormat: boolean = !!this.value.match(this.dateRegEx);
    if (!isCorrectFormat) {
      return;
    }

    const [day, month, year] = this.value.split('/');
    const dateValue = new Date(+year, +month - 1, +day);
    this.datePicker.select(dateValue);
  }

  private markAsTouchedOnCloseDatepicker() {
    this.datePicker.closedStream.pipe(
      take(1),
    ).subscribe(() => {
      if (this.control) {
        this.control.markAsTouched();
      }
    });
  }

}
