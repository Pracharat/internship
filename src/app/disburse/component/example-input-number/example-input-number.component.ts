import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilityService } from '@app-services/common/utility.service';

@Component({
  selector: 'app-example-input-number',
  templateUrl: './example-input-number.component.html',
  styleUrls: ['./example-input-number.component.scss']
})
export class ExampleInputNumberComponent implements OnInit {

  form: FormGroup;
  get inputNumber() {
    return this.form.get('inputNumber');
  }
  get formatNumber() {
    return this.form.get('formatNumber');
  }
  get locale() {
    return this.form.get('locale');
  }
  get integerDigits() {
    return this.form.get('integerDigits');
  }
  get minFraction() {
    return this.form.get('minFraction');
  }
  get maxFraction() {
    return this.form.get('maxFraction');
  }
  get allowNegative() {
    return this.form.get('allowNegative');
  }
  get allowDecimalPoint() {
    return this.form.get('allowDecimalPoint');
  }
  get allowComma() {
    return this.form.get('allowComma');
  }

  get digitsInfo(): string {
    const isValidNumber = (value: any): boolean => {
      return !UtilityService.isNullOrUndefined(value) && value !== '' && !isNaN(+value) && +value >= 0;
    };
    const { integerDigits, minFraction, maxFraction } = this.form.value;
    const hasIntegerDigits = isValidNumber(integerDigits);
    const hasMinFraction =  isValidNumber(minFraction);
    const hasMaxFraction = isValidNumber(maxFraction);

    if (!hasIntegerDigits || !hasMinFraction || !hasMaxFraction || minFraction > maxFraction) {
      return null;
    }

    return `${integerDigits}.${minFraction}-${maxFraction}`;
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
    this.initFormatNumberChange();
  }

  private initForm() {
    this.form = this.fb.group({
      inputNumber: 12345.67890,
      formatNumber: true,
      locale: { value: 'en', disabled: true },
      integerDigits: null,
      minFraction: null,
      maxFraction: null,
      allowNegative: true,
      allowDecimalPoint: true,
      allowComma: true,
    });
  }

  private initFormatNumberChange() {
    this.formatNumber.valueChanges.pipe().subscribe(
      isFormatNumber => {
        if (!isFormatNumber) {
          this.integerDigits.disable();
          this.minFraction.disable();
          this.maxFraction.disable();
        } else {
          this.integerDigits.enable();
          this.minFraction.enable();
          this.maxFraction.enable();
        }
      }
    );
  }

}
