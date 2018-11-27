import { Resource } from 'angular4-hal';

/**
 * Model that represents a server.
 */
export class Server extends Resource {
    static collection: string = 'servers';

    /**
     * Resource link keys
     */
    static links = {
        cluster: 'cluster',
        region : 'region'
    };

    region: any;
    cluster: any;
    id: string;
    name: string;
    active: boolean;
    role: string;
    host: string;
    type: string;
    zone: string;
    createdAt: Date;

    isChancellor(): boolean {
        return this.role && this.role === RoleType[ RoleType.chancellor ];
    }

    isDatabase(): boolean {
        return this.role && this.role === RoleType[ RoleType.database ];
    }

    isRegular(): boolean {
        return !this.isChancellor() && !this.isDatabase();
    }
}

/**
 * Model that represents the possible roles a server can have.
 */
export class Role extends Resource {
    static collection: string = 'roles';

    content: string = null;
}

export enum RoleType {
    chancellor, database
}

/**
 * Model that represents the possible zones a server can reside in.
 */
export class Zone extends Resource {
    static collection: string = 'zones';

    content: string = null;
}