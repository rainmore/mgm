import { Injectable, Injector } from '@angular/core';
import { RestService }          from '../rest.service';
import { Role }                 from '../../domains';

@Injectable()
export class ServersRoleService extends RestService<Role> {

    constructor(injector: Injector) {
        super(Role, Role.collection, injector);
    }
}
