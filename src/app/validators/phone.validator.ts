import { ValidatorFn, AbstractControl } from '@angular/forms';

export function PhoneNumber(control: AbstractControl): {[key: string]: any} | null  {
    const forbidden = /[A-Za-z]+/g.test(control.value);
    return forbidden ? {'PhoneNumber' : {value : control.value}} : null ;
   
}