import { Directive }                                 from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector : '[numerical]',
    providers: [ {provide: NG_VALIDATORS, useExisting: NumericalValidatorDirective, multi: true} ]
})
export class NumericalValidatorDirective implements Validator {

    validate(control: AbstractControl): { [ key: string ]: any } {
        if (isNaN(control.value)) {
            return {numerical: true};
        }
        return null;
    }
}