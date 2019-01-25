import { Resource } from "angular4-hal";

/**
 * Model that represents an RTO.
 */
export class Rto extends Resource {
    static collection: string = 'rtoes';

    content: string;
}
