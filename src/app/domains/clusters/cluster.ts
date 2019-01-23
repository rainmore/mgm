import { Resource }      from 'angular4-hal';
import { Region }        from '..';
import { Observable }    from "rxjs";
import { RegionBuilder } from "../regions/region-builder";

/**
 * Model to represent a cluster.
 */
export class Cluster extends Resource {
    static collection: string = 'clusters';

    /**
     * Resource link keys
     */
    static links = {
        region: 'region'
    };

    region: Region;
    id: string;
    name: string;
    createdAt: Date;

    getRegion(): Observable<Region> {
        return this.getRelation(Region, Cluster.links.region, new RegionBuilder());
    }
}

