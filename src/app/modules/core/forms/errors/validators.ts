import { AbstractControl } from '@angular/forms';

export class Validators {

    static numeric(control: AbstractControl): { [ key: string ]: boolean } {
        let value = control.value;
        return !isNaN(parseFloat(value)) && isFinite(value) ? null : {'numeric': true};
    }
}