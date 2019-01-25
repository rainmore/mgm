import { Injectable, Injector } from '@angular/core';
import { BaseRestService }      from '../base-rest-service';
import { Role }                 from "../../domains/servers/role";

@Injectable()
export class ServersRoleService extends BaseRestService<Role> {

    constructor(injector: Injector) {
        super(Role, Role.collection, injector);
    }
}
