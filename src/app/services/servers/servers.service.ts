import { Injectable, Injector } from '@angular/core';
import { RestService }          from '../rest.service';
import { Server }               from '../../domains';

@Injectable()
export class ServersService extends RestService<Server> {

    constructor(injector: Injector) {
        super(Server, Server.collection, injector);
    }
}
