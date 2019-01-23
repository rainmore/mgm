import { Injectable, Injector } from '@angular/core';
import { BaseRestService }      from '../base-rest-service';
import { RolloutGroup }         from '../../domains';

@Injectable()
export class TenantsRolloutGroupsService extends BaseRestService<RolloutGroup> {

    constructor(injector: Injector) {
        super(RolloutGroup, RolloutGroup.collection, injector);
    }
}
