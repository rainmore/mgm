import { EventEmitter, OnInit, Output } from '@angular/core';
import { Resource, Sort }               from 'angular4-hal';
import { BaseComponent }                from '../base.component';
import { Page, Pageable }               from '../../../services/common';
import { LanguageService }              from '../../../services/i18n';
import { RouteService }                 from '../route.service';
import { Params }                       from '@angular/router';

export abstract class BaseGridsComponent<Entity extends Resource> extends BaseComponent implements OnInit {

    @Output() onEdit = new EventEmitter<Entity>();
    @Output() onDelete = new EventEmitter<Entity>();
    @Output() onRefresh = new EventEmitter<void>();
    @Output() onFilter = new EventEmitter<string>();

    constructor(languageService: LanguageService,
                routeService: RouteService) {
        super(languageService, routeService);
    }

    abstract getBaseUri(): string;

    abstract loadData(pageable: Pageable): void

    /**
     * Pagination information.
     */
    page: Page = Page.build();

    ngOnInit(): void {
        this.refresh();
    }

    filter(query: string): void {
        this.onFilter.emit(query);
    }

    refresh(): void {
       this.gotoPage(0);
    }

    gotoPage(pageNumber: number): void {
        const pageable = this.getPageable().ofPage(pageNumber);
        this.routeService.navigate([this.getBaseUri()], {
            queryParams: this.toParams(pageable)
        });

        this.loadData(pageable);
    }

    edit(entity: Entity): void {
        this.onEdit.emit(entity);
    }

    delete(entity: Entity): void {
        this.onDelete.emit(entity);
    }

    protected getPageable(): Pageable {
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

    protected toParams(pageable: Pageable): Params {
        return <Params> {
            '_page': pageable.page,
            '_size': pageable.size,
            '_sort': pageable.sort.map((sort: Sort) => [sort.path, sort.order].join(':')).join(','),
        }
    }

}
