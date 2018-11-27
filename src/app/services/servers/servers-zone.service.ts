import { Injectable, Injector } from '@angular/core';
import { RestService }          from '../rest.service';
import { Zone }                 from '../../domains';

@Injectable()
export class ServersZoneService extends RestService<Zone> {

    constructor(injector: Injector,) {
        super(Zone, Zone.collection, injector);
    }
}
