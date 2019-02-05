import { Component, Input }   from '@angular/core';
import { BaseGridsComponent } from '../base/grids/base-grids.component';
import { Cluster, Region }    from '../../domains';
import { LanguageService }    from '../../services/i18n';
import { ClustersService }    from '../../services/clusters';
import { sprintf }            from 'sprintf-js';
import { RouteService }       from '../base/route.service';
import { PaginationService }  from '../core/data/pagination.service';
import { Pageable }           from '../../services/common';
import { Projection }         from '../../services/base-rest-service';

@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Cluster> {

    @Input() data: Cluster[] = [];

    constructor(private clustersService: ClustersService,
                languageService: LanguageService,
                routeService: RouteService,
                paginationService: PaginationService) {
        super(languageService, routeService, paginationService);

    }

    getBaseUri(): string {
        return '/clusters';
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.title = this._('Cluster Management');
    }

    edit(cluster: Cluster): void {
        this.routeService.navigate([this.getBaseUri(), cluster.id]);
    }

    delete(cluster: Cluster): void {
        if (window.confirm(this._('Are you sure you want to delete this entity?'))) {
            this.clustersService.delete(cluster).subscribe((any) => {
                this.refresh()
            });
        }
    }

    toPage(pageable: Pageable): void {
        this.clustersService.findAll(Projection.none, pageable).subscribe((data: Cluster[]) => {
            this.data = data;
            this.page = this.clustersService.getPage();
            this.titleTag = sprintf('%s %s', this.page.totalElements, this._('Clusters'));
            this.data.forEach(item => {
                item.getRegion().subscribe((region: Region) => {
                    item.region = region;
                });
            })
        });
    }

}
