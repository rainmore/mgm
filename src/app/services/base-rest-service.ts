import { Observable }            from 'rxjs';
import { Resource, RestService } from 'angular4-hal';
import { Pageable }              from "./common";

export abstract class BaseRestService<T extends Resource> extends RestService<T> {

    /**
     * @param {string?} projection
     * @param {Pageable?} pageable
     * @returns {Observable<T>}
     */
    findAll(projection: string = Projection.none, pageable: Pageable = Pageable.build()): Observable<T[]> {
        const params: Array<any> = [
            {key: 'page', value: pageable.page},
            {key: 'size', value: pageable.size},
            ...pageable.sort.map(sort => ({key: 'sort', value: sort}))
        ];

        if (projection) {
            params.push({key: 'projection', value: projection});
        }

        return this.getAll({params: params});
    }

    /**
     * @param {string} id
     * @returns {Observable<T>}
     */
    findOne(id: string): Observable<T> {
        return this.get(id);
    }
}

export const Projection = {
    none: '',
    full: 'withRels'
};
