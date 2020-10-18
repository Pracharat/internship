import { AbstractControl } from '@angular/forms';

export function fileValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const maxSize = 3145728;
        const receiptFile = control.root.get('receiptFile');

        if (receiptFile) {
            const fileValue = receiptFile.value ;
            if (fileValue > maxSize ) {

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






