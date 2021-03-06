import { Injectable, Injector } from '@angular/core';
import { Observable }           from 'rxjs';
import * as URI                 from 'urijs';
import { BaseRestService }      from '../base-rest-service';
import { Tenant }               from '../../domains';
import { projectConfiguration } from '../../configs';

export const Uri = {
    synchronize: 'synchronize'
};

@Injectable()
export class TenantsService extends BaseRestService<Tenant> {

    constructor(injector: Injector) {
        super(Tenant, Tenant.collection, injector);
    }

    // constructor(
    //     injector: Injector,
    //     private httpClient: HttpClient
    // ) {
    //     super(Tenant, Tenant.collection, injector);
    // }

    /**
     * @returns {Observable<*>}
     */
    synchronizeAll(): Observable<any> {
        const uri = URI(projectConfiguration.apiUrl).segment(Tenant.collection).segment(Uri.synchronize);
        return null;
        // return this.httpClient.post(uri.toString(), null);
    }

    /**
     * @returns {Observable<*>}
     */
    synchronizeTenant(tenant: Tenant): Observable<any> {
        const uri = URI(projectConfiguration.apiUrl).segment(Tenant.collection).segment(tenant.id).segment(Uri.synchronize);
        return null;
        // return this.httpClient.post(uri.toString(), null);
    }

    /**
     * Synchronize a specific tenants, or all tenants.
     */
    synchronize(tenant?: Tenant) {
        if (tenant) {
            this.synchronizeTenant(tenant);
        }
        else {
            this.synchronizeAll();
        }
    }

}
