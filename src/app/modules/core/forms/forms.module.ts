import { CommonModule }                from '@angular/common';
import { NgModule }                    from '@angular/core';
import { NumericalValidatorDirective } from './errors/numerical-validator.directive';
import { ErrorMessageBuilder }         from './errors/error-message.builder';
import { ErrorsComponent }             from './errors/errors.component';

@NgModule({
    imports     : [ CommonModule ],
    declarations: [ ErrorsComponent, NumericalValidatorDirective ],
    exports     : [ ErrorsComponent, NumericalValidatorDirective ],
    providers   : [ ErrorMessageBuilder ]
})
export class FormsModule {
}
