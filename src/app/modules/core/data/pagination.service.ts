/**
 * A simple search service.
 */
import { Injectable }   from "@angular/core";
import { Params }       from "@angular/router";
import { Sort }         from "angular4-hal";
import { RouteService } from "../../base/route.service";
import { Pageable }     from "../../../services/common";

@Injectable()
export class PaginationService {

    constructor(private routeService: RouteService) {}

    getPageable(): Pageable {
        const _page = this.routeService.getRequestParam("_page");
        const _size = this.routeService.getRequestParam("_size");
        const _sort = this.routeService.getRequestParam("_sort");

        const page = _page ? +_page : 0;
        const size = _size ? +_size : 20;
        const sort: Sort[] = [];

        if (_sort) {
            _sort.split(',').forEach((item: string) => {
                if (item) {
                    const s = item.split(':');
                    if (s.length == 2) sort.push(<Sort>{path: s[0], order: s[1]});
                    else return sort.push(<Sort>{path: item, order: 'ASC'});
                }
            });
        }

        return new Pageable(page, size, sort);
    }

    toParams(pageable: Pageable): Params {
        return <Params> {
            '_page': pageable.page,
            '_size': pageable.size,
            '_sort': pageable.sort.map((sort: Sort) => [sort.path, sort.order].join(':')).join(','),
        }

    }

}
