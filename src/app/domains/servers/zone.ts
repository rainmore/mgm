import { Resource } from "angular4-hal";

/**
 * Model that represents the possible zones a server can reside in.
 */
export class Zone extends Resource {
    static collection: string = 'zones';

    content: string = null;
}
