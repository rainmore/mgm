import { Injectable, Injector } from '@angular/core';
import { RestService }          from '../rest.service';
import { Rto }                  from '../../domains';

@Injectable()
export class TenantsRtosService extends RestService<Rto> {

    constructor(injector: Injector,) {
        super(Rto, Rto.collection, injector);
    }
}
