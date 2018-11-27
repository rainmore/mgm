/**
 * A data structure for an error. This will be used to render
 * error messages for forms.
 */
export class Error {
    constructor(
        public message: string,
        public property: string
    ) {
    }
}

/**
 * Data structure to hold error messages. Currently Angular2 does
 * not provide the ability to attach an error message to a particular
 * validation, so we will have to handroll this.
 */
export class ErrorMessage {
    constructor(
        public field: string,
        public validation: string,
        public message: string
    ) {
    }
}