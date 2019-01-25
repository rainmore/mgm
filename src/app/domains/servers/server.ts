import { Resource }        from 'angular4-hal';
import { Observable }      from "rxjs";
import { Cluster, Region } from "..";
import { RegionBuilder }   from "../regions/region-builder";
import { ClusterBuilder }  from "../clusters/cluster-builder";
import { RoleType }        from "./role-type";

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

    getCluster(): Observable<Cluster> {
        return this.getRelation(Cluster, Server.links.cluster, new ClusterBuilder());
    }

    getRegion(): Observable<Region> {
        return this.getRelation(Region, Server.links.region, new RegionBuilder());
    }


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





