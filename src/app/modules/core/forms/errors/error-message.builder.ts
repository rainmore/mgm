import { Injectable }   from '@angular/core';
import { ErrorMessage } from '../../../../domains';

/**
 * Builder to build ErrorMessage's.
 */
@Injectable()
export class ErrorMessageBuilder {

    /**
     * Convenience method to build error messages.
     *
     * @param data the list of fields and their validation and corresponding error messages. The
     *        second parameter for the data is an object of [key: string], the key being the name
     *        of the validation (e.g. 'required'), and the value being the actual error message
     *        to display when the validation error occurs.
     *
     * @returns {Array} an array of error messages.
     */
    build(data: { [ key: string ]: any }): ErrorMessage[] {
        let result: ErrorMessage[] = [];

        // iterate through the fields
        Object.keys(data).forEach(key => {
            let messages: any[] = data[key];

            // now iterate through each validation error
            messages.forEach(error => {
                // and finally convert each validation error to a message
                Object.keys(error).forEach(validation => {
                    let message = error[ validation ];
                    result.push(new ErrorMessage(key, validation, message));
                });
            });
        });

        return result;
    }
}
