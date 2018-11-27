import { Injectable, Injector } from '@angular/core';
import { RestService }          from '../rest.service';
import { Cluster }              from '../../domains';

@Injectable()
export class ClustersService extends RestService<Cluster> {

    constructor(injector: Injector) {
        super(Cluster, Cluster.collection, injector);
    }
}
