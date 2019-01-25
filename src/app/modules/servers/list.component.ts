import { Component, Input, OnInit }        from '@angular/core';
import { first }                           from 'rxjs/operators';
import { BaseGridsComponent }              from "../base/grids/base-grids.component";
import { Cluster, Region, Server, Tenant } from "../../domains";
import { LanguageService }                 from "../../services/i18n";
import { ActivatedRoute, Router }          from "@angular/router";
import { ServersService }                  from "../../services/servers";
import { sprintf }                         from "sprintf-js";

@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Server> implements OnInit {

    @Input() data: Server[] = [];

    constructor(private serversService: ServersService,
                languageService: LanguageService,
                activatedRoute:   ActivatedRoute,
                router:           Router) {
        super(languageService, activatedRoute, router);

    }

    ngOnInit() {
        this.title = this._('Servers Management');
        this.refresh();
    }

    refresh() {
        this.load();
    }

    edit(server: Server) {
        this.redirect(['/servers', server.id]);
    }

    delete(server: Server) {
        if (window.confirm(this._('Are you sure you want to delete this entity?'))) {
            this.serversService.delete(server).subscribe((any) => {
                this.refresh();
            });
        }
    }

    toggleActive(server: Server) {
        const active = server.active;
        server.active = !active;

        this.serversService.update(server).subscribe((updatedServer: Server) => {
            server = updatedServer;
        });
    }

    /**
     * Load the clusters data.
     */
    private load(): void {
        this.serversService.getAll().subscribe((data: Server[]) => {
            this.titleTag = sprintf('%s %s', this.serversService.totalElement(), this._('Clusters'));
            this.data = data;
            this.data.forEach(item => {
                item.getRegion().subscribe((region: Region) => {
                    item.region = region;
                });
                item.getCluster().subscribe((cluster: Cluster) => {
                    item.cluster = cluster;
                });
            });
        });
    }
}
