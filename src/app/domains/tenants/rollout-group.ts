import { Resource } from "angular4-hal";

/**
 * Model that represents the possible rollout groups a tenant can belong to.
 */
export class RolloutGroup extends Resource {
    static collection: string = 'rolloutGroups';

    content: string;
}
