import { Injectable, Injector } from '@angular/core';
import { Region }               from '../../domains';
import { RestService }          from '../rest.service';

@Injectable()
export class RegionsService extends RestService<Region> {

    constructor(injector: Injector) {
        super(Region, Region.collection, injector);
    }
}
