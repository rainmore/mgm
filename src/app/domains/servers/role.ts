import { Resource } from "angular4-hal";

/**
 * Model that represents the possible roles a server can have.
 */
export class Role extends Resource {
    static collection: string = 'roles';

    content: string = null;
}
