import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router }   from "@angular/router";
import { first }                    from 'rxjs/operators';
import { BaseGridsComponent }       from "../base/grids/base-grids.component";
import { Cluster, Region, Server }  from "../../domains";
import { LanguageService }          from "../../services/i18n";
import { ClustersService }          from "../../services/clusters";
import { RegionsService }           from "../../services/regions";
import { sprintf }                  from "sprintf-js";

@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Cluster> implements OnInit {

    @Input() data: Cluster[] = [];

    constructor(private clustersService: ClustersService,
                languageService: LanguageService,
                activatedRoute:   ActivatedRoute,
                router:           Router) {
        super(languageService, activatedRoute, router);

    }

    ngOnInit() {
        this.title = this._('Cluster Management');
        this.refresh();
    }

    refresh() {
        this.load();
    }

    edit(cluster: Cluster) {
        this.redirect(['/clusters', cluster.id]);
    }

    delete(cluster: Cluster) {
        if (window.confirm(this._('Are you sure you want to delete this entity?'))) {
            this.clustersService.delete(cluster).subscribe((any) => {
                this.refresh()
            });
        }
    }

    /**
     * Load the clusters data.
     */
    private load(): void {
        this.clustersService.getAll().subscribe((data: Cluster[]) => {
            this.titleTag = sprintf('%s %s', this.clustersService.totalElement(), this._('Clusters'));
            this.data = data;
            this.data.forEach(item => {
                item.getRegion().subscribe((region: Region) => {
                    item.region = region;
                });
            })
        });
    }
}
