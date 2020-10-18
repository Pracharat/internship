import { ValidatorFn, AbstractControl } from '@angular/forms';



export function emailValidator(control: AbstractControl): { [key: string]: any } | null {
    const forbidden = /^[^A-Z-a-z0-9]/g.test(control.value);
    const speacialChar = /[!#$%^&*+=*/"',`~;:<>?]+/g.test(control.value);
    return forbidden || speacialChar ? { 'emailValidator': { value: control.value } } : null;


}