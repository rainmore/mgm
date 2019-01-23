import { Resource } from 'angular4-hal';
import { sprintf }  from "sprintf-js";

/**
 * Model to represent an AWS entity.
 */
export class Region extends Resource {
    static collection: string = 'regions';

    id: string;
    name: string;
    createdAt: Date;
    displayName: string;

    getName(): string {
        return sprintf('%s (%s)', this.displayName, this.name);
    }
}
