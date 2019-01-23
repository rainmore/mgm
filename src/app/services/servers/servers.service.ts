import { Injectable, Injector } from '@angular/core';
import { BaseRestService }      from '../base-rest-service';
import { Server }               from '../../domains';

@Injectable()
export class ServersService extends BaseRestService<Server> {

    constructor(injector: Injector) {
        super(Server, Server.collection, injector);
    }
}
