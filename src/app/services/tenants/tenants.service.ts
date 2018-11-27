import { HttpClient }           from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable }           from 'rxjs';
import * as URI                 from 'urijs';
import { RestService }          from '../rest.service';
import { Tenant }               from '../../domains';
import { projectConfiguration } from '../../configs';

export const Uri = {
    synchronize: 'synchronize'
};

@Injectable()
export class TenantsService extends RestService<Tenant> {

    constructor(
        injector: Injector,
        private httpClient: HttpClient
    ) {
        super(Tenant, Tenant.collection, injector);
    }

    /**
     * @returns {Observable<*>}
     */
    synchronizeAll(): Observable<any> {
        const uri = URI(projectConfiguration.apiUrl).segment(Tenant.collection).segment(Uri.synchronize);
        return this.httpClient.post(uri.toString(), null);
    }

    /**
     * @returns {Observable<*>}
     */
    synchronize(tenant: Tenant): Observable<any> {
        const uri = URI(projectConfiguration.apiUrl).segment(Tenant.collection).segment(tenant.id).segment(Uri.synchronize);
        return this.httpClient.post(uri.toString(), null);
    }
}
