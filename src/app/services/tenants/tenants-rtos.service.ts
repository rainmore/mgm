import { Injectable, Injector } from '@angular/core';
import { BaseRestService }      from '../base-rest-service';
import { Rto }                  from "../../domains/tenants/rto";

@Injectable()
export class TenantsRtosService extends BaseRestService<Rto> {

    constructor(injector: Injector,) {
        super(Rto, Rto.collection, injector);
    }
}
