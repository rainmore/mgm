import { Component, Input }        from '@angular/core';
import { BaseGridsComponent }      from '../base/grids/base-grids.component';
import { Cluster, Region, Server } from '../../domains';
import { LanguageService }         from '../../services/i18n';
import { ServersService }          from '../../services/servers';
import { sprintf }                 from 'sprintf-js';
import { RouteService }            from '../base/route.service';
import { PaginationService }       from '../core/data/pagination.service';
import { Projection }              from '../../services/base-rest-service';
import { Pageable }                from '../../services/common';

@Component({
    templateUrl: 'list.component.html'
})
export class ListComponent extends BaseGridsComponent<Server> {

    @Input() data: Server[] = [];

    constructor(private serversService: ServersService,
                languageService: LanguageService,
                routeService: RouteService,
                paginationService: PaginationService) {
        super(languageService, routeService, paginationService);

    }

    getBaseUri(): string {
        return '/servers';
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.title = this._('Servers Management');
    }

    edit(server: Server): void {
        this.routeService.navigate([this.getBaseUri(), server.id]);
    }

    delete(server: Server): void {
        if (window.confirm(this._('Are you sure you want to delete this entity?'))) {
            this.serversService.delete(server).subscribe((any) => {
                this.refresh();
            });
        }
    }

    toggleActive(server: Server): void {
        const active = server.active;
        server.active = !active;

        this.serversService.update(server).subscribe((updatedServer: Server) => {
            server = updatedServer;
        });
    }

    getName(server: Server): string {
        return server.name;
    }

    getClusterName(server: Server): string {
        return server.cluster ? server.cluster.name : null;
    }

    getRegionName(server: Server): string {
        if (server.region) {
            return server.region.name;
        }
        else if (server.cluster) {
            return server.cluster.region.name
        }
        else {
            return null;
        }
    }

    toPage(pageable: Pageable): void {
        this.serversService.findAll(Projection.none, pageable).subscribe((data: Server[]) => {
            this.data = data;
            this.page = this.serversService.getPage();

            this.titleTag = sprintf('%s %s', this.page.totalElements, this._('Clusters'));

            this.data.forEach(item => {
                item.getRegion().subscribe((region: Region) => {
                    item.region = region;
                });
                item.getCluster().subscribe((cluster: Cluster) => {
                    item.cluster = cluster;
                    if (item.cluster) {
                        item.cluster.getRegion().subscribe((region: Region) => {
                            item.cluster.region = region;
                        });
                    }
                });
            });
        });
    }
}
