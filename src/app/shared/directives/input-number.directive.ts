import {
  Directive,
  OnInit, OnChanges,
  Input,
  Self, ElementRef, HostListener, Optional, SimpleChanges,
} from '@angular/core';
import { NgControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { UtilityService } from '@app-services/common/utility.service';
import { AppValidators } from 'src/app/validators/app-validators';

@Directive({
  selector: 'input[appInputNumber]'
})
export class InputNumberDirective implements OnInit, OnChanges {

  @Input() formatNumber = true;
  @Input('locale') formatLocale: string;
  @Input('digitsInfo') formatDigitsInfo: string;
  private defaultDigitsInfo = '0.0-999';

  @Input() allowPaste = true;
  @Input('negative') isAllowNegative = true;
  @Input('decimalPoint') isAllowDecimalPoint = true;
  @Input('comma') isAllowComma = true;

  private numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  private specialKeys = [
    'Backspace', 'Delete', 'Control', 'Tab', 'Home', 'End',
    'ArrowLeft', 'ArrowRight',
  ];
  private get allowedKeys(): string[] {
    let allowedKeys: string[] = [...this.numberKeys, ...this.specialKeys];
    if (this.isAllowNegative) {
      allowedKeys = [...allowedKeys, '-'];
    }
    if (this.isAllowDecimalPoint) {
      allowedKeys = [...allowedKeys, '.'];
    }
    if (this.isAllowComma) {
      allowedKeys = [...allowedKeys, ','];
    }
    return allowedKeys;
  }

  get allowedClipboardEvents(): string[] {
    const events = ['copy', 'cut'];
    return this.allowPaste ? ['paste', ...events] : events;
  }

  private digitRegEx: RegExp = /[^-?0-9]+\\.?[0-9]*/g;
  private commaRegEx: RegExp = /,/g;

  get inputElement(): HTMLInputElement {
    return this.el.nativeElement;
  }
  private get control(): AbstractControl {
    return this.ngControl ? this.ngControl.control : null;
  }
  private get isFormControl(): boolean {
    return this.control instanceof AbstractControl;
  }
  get value() {
    return this.isFormControl ? this.control.value : this.inputElement.value;
  }
  get rawNumberValue(): number {
    return this.isValidNumber ? +`${this.value}`.replace(this.commaRegEx, '').replace(this.digitRegEx, '') : null;
  }
  private get isValidNumber(): boolean {
    const value = this.value;
    const hasValue: boolean = value !== '' && value !== undefined && value !== null;
    const validNegative: boolean = this.isAllowNegative || !(`${value}`.includes('-') && !this.isAllowNegative);
    const validComma: boolean = this.isAllowComma || !(`${value}`.includes(',') && !this.isAllowComma);
    const decimalPointCount: number = (`${value}`.match(/\./g) || []).length;
    const validDot: boolean = (this.isAllowDecimalPoint && decimalPointCount <= 1) || (!this.isAllowDecimalPoint && decimalPointCount < 1);

    return hasValue && validNegative && validComma && validDot;
  }

  private originalValidators: ValidatorFn[] = [];

  constructor(
    @Optional() @Self() private ngControl: NgControl,
    private el: ElementRef,
  ) { }

  // tslint:disable-next-line: no-input-rename
  @Input('allowKey') isAllowKey = false;

  ngOnInit() {
    if (!this.isFormControl) {
      return;
    }

    // this.setValidators();

    if (this.value) {
      this.onChangeValue();
      this.control.markAsTouched();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes || !this.isFormControl) {
      return;
    }

    // this.setValidators();

    if (this.value) {
      this.onChangeValue();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyboardEvent(event: KeyboardEvent) {
    return this.isAllowedKeyboardEvent(event);

  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.isAllowKey) {
      event.preventDefault();
    }
  }


  @HostListener('paste', ['$event'])
  @HostListener('copy', ['$event'])
  @HostListener('cut', ['$event'])
  onClipboardEvent(event: ClipboardEvent) {
    return this.isAllowedClipboardEvent(event);
  }



  @HostListener('blur')
  @HostListener('change')
  onChangeValue() {
    this.updateValue();
  }

  @HostListener('focus')
  onFocus() {
    if (!this.isFormControl) {
      this.updateDisplayValue();
    } else {
      this.updateDisplayRawValue();
    }
  }

  // private setValidators() {
  //   if (!this.control || !this.control.validator) {
  //     return;
  //   }
  //   const hasOriginalValidators: boolean = this.originalValidators instanceof Array && this.originalValidators.length > 0;
  //   if (!hasOriginalValidators) {
  //     this.originalValidators = [this.control.validator];
  //   }

  //   const inputNumberValidatorFn: ValidatorFn = AppValidators.inputNumber({
  //     isAllowNegative: this.isAllowNegative,
  //     isAllowDecimalPoint: this.isAllowDecimalPoint,
  //     isAllowComma: this.isAllowComma,
  //   });

  //   const updatedValidators = hasOriginalValidators ? [...this.originalValidators, inputNumberValidatorFn] : [inputNumberValidatorFn];
  //   this.control.setValidators(updatedValidators);
  //   this.control.updateValueAndValidity();
  // }


  private isAllowedKeyboardEvent(event: KeyboardEvent) {
    const { key, ctrlKey } = event;
    const isInAllowedKeys: boolean = !!this.allowedKeys.find(allowedKey => allowedKey === key);
    return isInAllowedKeys || ctrlKey;
  }

  private isAllowedClipboardEvent(event: ClipboardEvent) {
    const { type } = event;
    const isAllowedEvent = this.allowedClipboardEvents.find(e => e === type);
    if (!isAllowedEvent) {
      event.preventDefault();
      return;
    }

    switch (type) {
      case 'paste':
        this.pasteText(event);
        break;

      case 'copy':
      case 'cut':
      default:
        return;
    }
  }

  private updateValue() {
    if (this.isFormControl && this.isValidNumber) {
      this.control.setValue(this.rawNumberValue);
    }

    if (this.isFormControl) {
      this.control.updateValueAndValidity();
    }

    if (this.isValidNumber && this.formatNumber) {
      const formatDigitsInfo = this.formatDigitsInfo || this.defaultDigitsInfo;
      this.inputElement.value = UtilityService.formatNumber(this.rawNumberValue, this.formatLocale, formatDigitsInfo);
    }
  }

  private updateDisplayValue() {
    if (!this.isValidNumber || !this.formatNumber || typeof (this.value) !== 'number') {
      return;
    }

    this.inputElement.value = UtilityService.formatNumber(this.rawNumberValue, this.formatLocale);
  }

  private updateDisplayRawValue() {
    this.inputElement.value = this.value;
  }

  private pasteText(event: ClipboardEvent) {
    event.preventDefault();
    const { clipboardData } = event;
    const value = clipboardData.getData('text/plain').replace(this.digitRegEx, '');

    if (!this.isValidNumber) {
      return;
    }

    const isSuccess = document.execCommand('insertText', false, value);

    // Workaround to support paste on Firefox
    if (!isSuccess) {
      const input = this.inputElement;
      const start = input.selectionStart;
      input.setRangeText(value);
      input.selectionStart = input.selectionEnd = start + value.length;
      const e = document.createEvent('UIEvent');
      e.initEvent('input', true, false);
      input.dispatchEvent(e);
    }
  }

}
