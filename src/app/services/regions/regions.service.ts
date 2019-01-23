import { Injectable, Injector } from '@angular/core';
import { Region }               from '../../domains';
import { BaseRestService }      from '../base-rest-service';

@Injectable()
export class RegionsService extends BaseRestService<Region> {

    constructor(injector: Injector) {
        super(Region, Region.collection, injector);
    }
}
