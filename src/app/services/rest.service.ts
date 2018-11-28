import { Observable } from 'rxjs';

import { Injectable }                              from '@angular/core';
import { Resource, RestService as HalRestService } from 'angular4-hal';

@Injectable()
export abstract class RestService<T extends Resource> extends HalRestService<T> {

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

/**
 * An object that represents the HAL page response for {GET} list requests.
 */
export class Page {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

/**
 * Object that represents a basic pageable.
 */
export class Pageable {
    constructor(
        public page: number,
        public size: number,
        public sort: Array<string>
    ) {
    }

    /**
     * Build a new pageable that defaults page to 0 and size to 1000.
     * @param page the page number.
     * @param size the size of the page.
     * @returns {Pageable}
     */
    static build(page: number = 0, size: number = 1000): Pageable {
        return new Pageable(page, size, []);
    }

    withSort(sort: string[]): Pageable {
        this.sort = sort;
        return this;
    }
}
