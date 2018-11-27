import { Component, Input }     from '@angular/core';

/**
 * This class handles the rendering of form errors.
 */
@Component({
    selector   : 'errors',
    templateUrl: './errors.component.html'
})
export class ErrorsComponent {
    @Input() errors: { [ key: string ]: string };
    @Input() messages: { [ key: string ]: string };

    getErrorCodes(): Array<string> {
        return this.errors ? Object.keys(this.errors).filter(key => this.errors[ key ]) : [];
    }

    getMessage(code: string): string {
        return this.messages[ code ];
    }
}
