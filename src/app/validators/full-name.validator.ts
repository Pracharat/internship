import { ValidatorFn, AbstractControl } from '@angular/forms';



export function forbiddenName(control: AbstractControl): {[key: string]: any} | null  {
    const forbidden = /[^A-Za-z0-9ก-ฮ] {8,20}/g.test(control.value);
    return forbidden ? {'forbiddenName' : {value : control.value}} : null ;
}
// export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//      const forbidden = forbiddenName.test(control.value);
//      return forbidden ? {"forbiddenName" : {value: control.value}} : null ;
//     };
// }    
