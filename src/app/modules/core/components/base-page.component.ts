import { AbstractControl }     from '@angular/forms';
import { BaseComponent }       from './base.component';
import { LanguageService }     from '../../../services/i18n';
import { Error, ErrorMessage } from '../../../domains';

/**
 * Base page component with generic functionality.
 */
export abstract class BasePageComponent extends BaseComponent {

    /**
     * The title of the page the controller handles.
     */
    title: string;

    /**
     * Holder for errors (deletion errors, etc).
     */
    errors: Error[] = [];

    constructor(languageService: LanguageService) {
        super(languageService);
    }

    /**
     * Get errors for a particular control.
     *
     * @param name the name of the control.
     * @param control the control to retrieve errors for.
     * @param errorMessages a list of error messages to apply to a control.
     * @returns {Array} an array containing errors.
     */
    getErrors(name: string, control: AbstractControl, errorMessages: ErrorMessage[]): Error[] {
        let errors: Error[] = [];

        Object.keys(control.errors).forEach(key => {
            errorMessages
                .filter(message => name == message.field && key == message.validation)
                .forEach(message => errors.push({property: message.field, message: message.message}));
        });

        return errors;
    }

    /**
     * Check if a control is validation, optionally for a particular validation.
     * This will only return `true` when a control is made dirty.
     *
     * @param control the control to check for validation errors.
     * @param validation the validation to check (e.g. 'required').
     * @returns {boolean} a boolean indicating if the control has an error.
     */
    hasError(control: AbstractControl, validation?: string): Boolean {
        let hasError = validation
            ? control.hasError(validation)
            : !control.valid;

        return hasError && control.dirty;
    }

    /**
     * Scroll to the top of the window.
     */
    scrollToTop() {
        window.scrollTo(0, 0);
    }
}
