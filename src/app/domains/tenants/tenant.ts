import { Resource }     from 'angular4-hal';
import { Identifiable } from '../identifiable';

export class Database {
    user: string;
    pass: string;
    name: string;
}

/**
 * Model that represents the a tenant (client platform).
 */
export class Tenant extends Resource implements Identifiable<string> {
    static collection: string = 'tenants';

    /**
     * Resource link keys
     */
    static links = {
        cluster: 'cluster'
    };

    id: string;
    cluster: any;
    systemId: number;
    tenantId: string;
    name: string;
    active: boolean;
    contentPath: string;
    platformUrl: string;
    tag: string;
    rolloutGroup: string;
    createdAt: string;
    updatedAt: string;
    syncedAt: string;
    database: Database = new Database();
    t2Settings: T2Settings = new T2Settings();

    /**
     * Check if the tenant is synced.
     */
    isSynced(): Boolean {
        // @todo add proper mapping of object types using json-object-mapper (see https://github.com/masvis/angular4-hal/issues/19)
        return new Date(this.syncedAt).getTime() >= new Date(this.updatedAt).getTime();
    }
}

export class T2Settings {
    active: boolean;
    rto: string;
}

/**
 * Model that represents the possible rollout groups a tenant can belong to.
 */
export class RolloutGroup extends Resource {
    static collection: string = 'rolloutGroups';

    content: string;
}

/**
 * Model that represents an RTO.
 */
export class Rto extends Resource {
    static collection: string = 'rtoes';

    content: string;
}
