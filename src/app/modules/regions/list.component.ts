import { Component, Input }   from '@angular/core';
import { LanguageService }    from '../../services/i18n';
import { RegionsService }     from '../../services/regions';
import { BaseGridsComponent } from '../base';
import { Region }             from '../../domains';
import { sprintf }            from 'sprintf-js';
import { RouteService }       from '../base/route.service';
import { PaginationService }  from '../core/data/pagination.service';
import { Projection }         from '../../services/base-rest-service';
import { Pageable }           from '../../services/common';

const searchFields: Array<string> = [ 'name', 'displayName' ];
const sortFields: Array<string> = [ 'displayName' ];


@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Region> {

    @Input() data: Region[] = [];

    constructor(
        private regionService:   RegionsService,
                languageService: LanguageService,
                routeService:    RouteService,
                paginationService: PaginationService) {
        super(languageService, routeService, paginationService);
    }

    getBaseUri(): string {
        return '/regions';
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.title = this._('Regions Management');
    }

    edit(region: Region): void {
        this.routeService.navigate([this.getBaseUri(), region.id]);
    }

    delete(region: Region): void {
        if (window.confirm(this._('Are you sure you want to delete this entity?'))) {
            this.regionService.delete(region).subscribe((any) => {
                this.refresh()
            });
        }
    }

    toPage(pageable: Pageable): void {
        this.regionService.findAll(Projection.none, pageable)
            .subscribe((data: Region[]) => {
                this.data = data;
                this.page = this.regionService.getPage();
                this.titleTag = sprintf('%s %s', this.page.totalElements, this._('Regions'));
            });
    }
}
