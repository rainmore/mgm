import { Component, Input, OnInit } from '@angular/core';
import { BaseGridsComponent }       from "../base/grids/base-grids.component";
import { Cluster, Region, Server }  from "../../domains";
import { LanguageService }          from "../../services/i18n";
import { ActivatedRoute, Router }   from "@angular/router";
import { ServersService }           from "../../services/servers";
import { sprintf }                  from "sprintf-js";

@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Server> implements OnInit {

    @Input() data: Server[] = [];

    constructor(private serversService: ServersService,
                languageService: LanguageService,
                activatedRoute:   ActivatedRoute,
                router:           Router) {
        super(languageService, activatedRoute, router);

    }

    ngOnInit(): void {
        this.title = this._('Servers Management');
        this.refresh();
    }

    refresh(): void {
        this.load();
    }

    edit(server: Server): void {
        this.redirect(['/servers', server.id]);
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
