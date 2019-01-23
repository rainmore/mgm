import { Injectable, Injector } from '@angular/core';
import { BaseRestService }      from '../base-rest-service';
import { Zone }                 from '../../domains';

@Injectable()
export class ServersZoneService extends BaseRestService<Zone> {

    constructor(injector: Injector,) {
        super(Zone, Zone.collection, injector);
    }
}
