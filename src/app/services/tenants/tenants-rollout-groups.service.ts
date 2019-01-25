import { Injectable, Injector } from '@angular/core';
import { BaseRestService }      from '../base-rest-service';
import { RolloutGroup }         from "../../domains/tenants/rollout-group";

@Injectable()
export class TenantsRolloutGroupsService extends BaseRestService<RolloutGroup> {

    constructor(injector: Injector) {
        super(RolloutGroup, RolloutGroup.collection, injector);
    }
}
