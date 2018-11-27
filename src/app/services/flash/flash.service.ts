import { Inject, Injectable } from '@angular/core';
import * as Toastr            from 'toastr';

/**
 * A service to create flash messages (pop-up messages).
 */
@Injectable()
export class FlashService {

    constructor(@Inject('Toastr') private toastr: Toastr) {
    }

    /**
     * Create a success toast message.
     *
     * @param message the message to display.
     * @param title the title to display.
     */
    success(message: string, title?: string) {
        this.toastr.success(message, title);
    }

    /**
     * Create an info toast message.
     *
     * @param message the message to display.
     * @param title the title to display.
     */
    info(message: string, title?: string) {
        this.toastr.info(message, title);
    }

    /**
     * Create a warning toast message.
     *
     * @param message the message to display.
     * @param title the title to display.
     */
    warning(message: string, title?: string) {
        this.toastr.warning(message, title);
    }

    /**
     * Create an error toast message.
     *
     * @param message the message to display.
     * @param title the title to display.
     */
    error(message: string, title?: string) {
        this.toastr.error(message, title);
    }
}
