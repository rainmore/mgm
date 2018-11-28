import { Injectable }                                           from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable }                                           from 'rxjs';
import { map }                                                  from 'rxjs/operators';
import { Region }                                               from '../../domains';
import { RegionsService }                                       from '../../services/regions';
import { SearchService }                                        from '../core/data';
import { Pageable, Projection }                                 from '../../services/rest.service';


const searchFields: Array<string> = [ 'name', 'displayName' ];
const sortFields: Array<string> = [ 'displayName' ];

@Injectable()
export class RegionsResolver implements Resolve<Region[]> {

    constructor(
        private regionService: RegionsService,
        private searchService: SearchService
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Region[]> {
        const {search, sort = sortFields} = route.queryParams;

        return this.regionService.findAll(Projection.full, Pageable.build().withSort(sort))
            .pipe(map(regions => this.searchService.search(search, searchFields, regions)));
    }
}


@Injectable()
export class RegionResolver implements Resolve<Region> {

    constructor(private regionService: RegionsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Region> {
        const id = route.paramMap.get('id');

        if (!id) return Observable.create(new Region());

        return this.regionService.findOne(id);
    }
}
