import { Observable }                                  from 'rxjs';
import { HalOptions, HalParam, Resource, RestService } from 'angular4-hal';
import { Page, Pageable }                              from "./common";

export abstract class BaseRestService<T extends Resource> extends RestService<T> {

    /**
     * @param {string?} projection
     * @param {Pageable?} pageable
     * @returns {Observable<T>}
     */
    findAll(projection: string = Projection.none, pageable: Pageable = Pageable.build()): Observable<T[]> {
        const halOptions = this.buildHalOptions(pageable);

        if (projection) {
            halOptions.params.push({key: 'projection', value: projection});
        }

        return this.getAll(halOptions);
    }

    /**
     * @param {string} id
     * @returns {Observable<T>}
     */
    findOne(id: string): Observable<T> {
        return this.get(id);
    }

    getPage(): Page {
        const page = Page.build();
        if (this.resourceArray.pageNumber)    page.page          = this.resourceArray.pageNumber;
        if (this.resourceArray.pageSize)      page.size          = this.resourceArray.pageSize;
        if (this.resourceArray.totalElements) page.totalElements = this.resourceArray.totalElements;
        if (this.resourceArray.totalPages)    page.totalPages    = this.resourceArray.totalPages;

        return page;
    }

    private buildHalOptions(pageable: Pageable): HalOptions {
        const notPaged = false;
        const params: HalParam[] = [];
        params.push(<HalParam>{key: 'page', value: pageable.page});
        return <HalOptions> {
            notPaged: notPaged,
            size: pageable.size,
            sort: pageable.sort,
            params: params
        };
    }

}

export const Projection = {
    none: '',
    full: 'withRels'
};
