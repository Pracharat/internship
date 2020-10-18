import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class AppValidators {

  static inputNumber(
    params: InputNumberValidatorParamss = {
      isAllowNegative: true,
      isAllowDecimalPoint: true,
      isAllowComma: true,
    }
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;

      if (value === undefined || value === null || `${value}`.trim().length === 0) {
        return null;
      }

      const commaRegEx: RegExp = /,/g;
      const isNumber = !isNaN(+`${value}`.replace(commaRegEx, ''));
      const isExceedMin = isNumber && value < Number.MIN_SAFE_INTEGER;
      const isExceedMax = isNumber && value > Number.MAX_SAFE_INTEGER;

      const { isAllowNegative, isAllowDecimalPoint, isAllowComma } = params;

      const isIncludeDash = `${value}`.includes('-');
      const isValidNegative = isAllowNegative || !(isIncludeDash && !isAllowNegative);

      const isIncludeDot = `${value}`.includes('.');
      const isValidDecimalPoint = isAllowDecimalPoint || !(isIncludeDot && !isAllowDecimalPoint);

      const isIncludeComma = `${value}`.includes(',');
      const isValidComma = isAllowComma || !(isIncludeComma && !isAllowComma);

      let errors: ValidationErrors = null;

      if (!isNumber) {
        errors = { ...errors, isNaN: true };
      }
      if (isExceedMin) {
        errors = { ...errors, exceedMin: true };
      }
      if (isExceedMax) {
        errors = { ...errors, exceedMax: true };
      }
      if (isNumber && !isValidNegative) {
        errors = { ...errors, negative: true };
      }
      if (isNumber && !isValidDecimalPoint) {
        errors = { ...errors, decimalPoint: true };
      }
      if (isNumber && !isValidComma) {
        errors = { ...errors, comma: true };
      }

      return errors ? { inputNumber: errors } : null;
    };
  }

}

export interface InputNumberValidatorParamss {
  isAllowNegative?: boolean;
  isAllowDecimalPoint?: boolean;
  isAllowComma?: boolean;
}
