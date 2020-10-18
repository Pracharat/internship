import { AbstractControl } from '@angular/forms';

export function passwordValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const confirmPassword = control.value;
        const password = control.root.get('password');

        if (password) {
            const passwordValue = password.value ;
            if (passwordValue !== confirmPassword ) {

                return {
                    isError: true
                };
            }
        }
        return null ;
    }

    // const password = control.get('password');
    // const confirmPassword = control.get('confirmPassword');
    // if (password.pristine || confirmPassword.pristine ) {
    //     return null ;
    // }{ [key: string]: boolean } | null
    // return  confirmPassword && password && password.value !== confirmPassword.value ? { ' misMatch ': true } : null;
}

export function safePassword(control: AbstractControl): {[key: string]: any} | null  {
// const specialChar: RegExp = new RegExp(' []<>?{}()-_=&^%$#@!~`;:""/\/ ,+-*/');
const specialChar = /\W+/.test(control.value);
const charUppercase = /[A-Z]+/.test(control.value);
const charLowercase = /[a-z]+/.test(control.value);
return !specialChar || !charUppercase || !charLowercase ? {'safePassword' : {value : control.value}} : null ;
   
}





