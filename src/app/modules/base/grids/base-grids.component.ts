import { EventEmitter, OnInit, Output } from '@angular/core';
import { Resource }                     from 'angular4-hal';
import { BaseComponent }                from '../base.component';
import { Page, Pageable }               from '../../../services/common';
import { LanguageService }              from '../../../services/i18n';
import { RouteService }                 from '../route.service';
import { PaginationService }            from '../../core/data/pagination.service';

export abstract class BaseGridsComponent<Entity extends Resource> extends BaseComponent implements OnInit {

    @Output() onEdit = new EventEmitter<Entity>();
    @Output() onDelete = new EventEmitter<Entity>();
    @Output() onRefresh = new EventEmitter<void>();
    @Output() onFilter = new EventEmitter<string>();

    constructor(languageService: LanguageService,
                routeService: RouteService,
                protected paginationService: PaginationService) {
        super(languageService, routeService);
    }

    abstract getBaseUri(): string;

    abstract toPage(pageable: Pageable): void

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
       this.toPage(this.paginationService.getPageable().ofPage(0));
    }

    edit(entity: Entity): void {
        this.onEdit.emit(entity);
    }

    delete(entity: Entity): void {
        this.onDelete.emit(entity);
    }

}
