import { Component, Input, OnInit }           from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

/**
 * This class handles the rendering of form errors.
 */
@Component({
    selector   : 'errors',
    templateUrl: './errors.component.html'
})
export class ErrorsComponent implements OnInit {
    // @Input() errors: { [ key: string ]: string };
    @Input() messages: { [ key: string ]: string };

    @Input() formGroup: FormGroup;
    @Input() controlName: string;

    constructor() {}

    ngOnInit() {
        let control: FormControl = new FormControl('', Validators.required);
        this.formGroup.addControl(this.controlName, control);
    }

    // getErrorCodes(): Array<string> {
        // console.log(this.errors);
        //
        // return this.errors ? Object.keys(this.errors).filter(key => this.errors[ key ]) : [];
    // }

    getMessage(code: string): string {
        return this.messages[ code ];
    }
}
