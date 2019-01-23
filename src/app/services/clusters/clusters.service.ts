import { Injectable, Injector } from '@angular/core';
import { BaseRestService }      from '../base-rest-service';
import { Cluster }              from '../../domains';

@Injectable()
export class ClustersService extends BaseRestService<Cluster> {

    constructor(injector: Injector) {
        super(Cluster, Cluster.collection, injector);
    }
}
