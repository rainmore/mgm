import { Resource }       from 'angular4-hal';
import { Identifiable }   from '../identifiable';
import { Observable }     from "rxjs";
import { Cluster }        from "..";
import { ClusterBuilder } from "../clusters/cluster-builder";
import { T2Settings }     from "./t2-settings";
import { Database }       from "./database";

/**
 * Model that represents the a tenant (client platform).
 */
export class Tenant extends Resource {
    static collection: string = 'tenants';

    /**
     * Resource link keys
     */
    static links = {
        cluster: 'cluster'
    };

    id: string;
    cluster: Cluster;
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

    getCluster(): Observable<Cluster> {
        return this.getRelation(Cluster, Tenant.links.cluster, new ClusterBuilder());
    }
}




