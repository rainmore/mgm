import { Injectable, Injector } from '@angular/core';
import { RestService }          from '../rest.service';
import { RolloutGroup }         from '../../domains';

@Injectable()
export class TenantsRolloutGroupsService extends RestService<RolloutGroup> {

    constructor(injector: Injector) {
        super(RolloutGroup, RolloutGroup.collection, injector);
    }
}
