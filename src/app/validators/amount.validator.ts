import { ValidatorFn, AbstractControl } from '@angular/forms';
import { isError } from 'util';
import { NullTemplateVisitor } from '@angular/compiler';



export function amountValid(control: AbstractControl): { [key: string]: number } | null {
    const money = control.value;
    const isValid = money > 10000000 ;
    if (isValid) {
        return { value : control.value };
    } else {
        return null;
    }
}








