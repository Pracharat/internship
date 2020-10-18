import {
  Directive,
  OnInit, OnChanges,
  Input, HostBinding, SimpleChanges,
} from '@angular/core';

import { AppSettings } from 'src/app/app-settings';

@Directive({
  selector: 'input[appInputMaxLength], textarea[appInputMaxLength]'
})
export class InputMaxLengthDirective implements OnInit, OnChanges {

  @HostBinding('attr.maxlength') maxLength: number;

  private currentInputMaxLength: number;
  @Input('appInputMaxLength')
  set inputMaxLength(value: number | string) {
    try {
      this.currentInputMaxLength = parseInt(`${value}`, 10);
    } catch (error) {
      this.currentInputMaxLength = AppSettings.inputMaxLength;
    }
  }

  constructor() { }

  ngOnInit() {
    if (!this.maxLength || !this.currentInputMaxLength) {
      this.maxLength = this.currentInputMaxLength = AppSettings.inputMaxLength;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const isValidChange = changes && changes.inputMaxLength;
    if (isValidChange) {
      this.maxLength = this.currentInputMaxLength;
    }
  }

}
