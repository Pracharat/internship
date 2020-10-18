import { ValidatorFn, AbstractControl } from '@angular/forms';
import { isError } from 'util';
import { forbiddenName } from './forbiddenName';



export function startNum(control: AbstractControl): { [key: string]: any } | null {
    const forbidden = /[^a-zA-Z0-9]/.test(control.value);
    return forbidden  ? { 'startNum': { value: control.value } } : null;
    
}




