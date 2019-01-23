import { Component, OnInit }       from '@angular/core';
import { Router }                  from "@angular/router";
import { first }                   from 'rxjs/operators';
import { BaseGridsComponent }      from "../base/grids/base-grids.component";
import { Cluster, Region, Server } from "../../domains";
import { LanguageService }         from "../../services/i18n";
import { ClustersService }         from "../../services/clusters";
import { RegionsService }          from "../../services/regions";

@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Cluster> implements OnInit {

    data: Cluster[] = [];

    constructor(languageService: LanguageService,
                private router: Router,
                private clustersService: ClustersService) {
        super(languageService);

        this.title = this._('Cluster Management');
    }

    ngOnInit() {
        this.loadClusters(this._('Clusters loaded'));
    }

    /**
     * Refresh the cluster list.
     */
    refresh() {
        this.loadClusters(this._('Clusters loaded'));
    }

    /**
     * Edit a cluster.
     *
     * @param cluster the region to edit.
     */
    edit(cluster: Cluster) {
        this.router.navigate(['/clusters', cluster.id]);
    }

    /**
     * Load the clusters data.
     */
    private loadClusters(successMessage?: string) {
        this.clustersService.getAll().subscribe((data: Cluster[]) => {
            this.data = data;
            this.data.forEach(item => {
                item.getRegion().subscribe((region: Region) => {
                    item.region = region;
                });
            })
        });
    }
}
