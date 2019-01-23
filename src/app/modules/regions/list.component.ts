import { Component, Input, OnInit }       from '@angular/core';
import { first, map }                     from 'rxjs/operators';
import { BasePageComponent }              from "../core/components";
import { LanguageService }                from "../../services/i18n";
import { RegionsService }                 from "../../services/regions";
import { BaseGridsComponent }             from "../base";
import { Cluster, Region }                from "../../domains";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { SearchService }                  from "../core/data";

const searchFields: Array<string> = [ 'name', 'displayName' ];
const sortFields: Array<string> = [ 'displayName' ];


@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Region> implements OnInit {

    @Input() data: Region[] = [];

    constructor(
        languageService: LanguageService,
        private regionService: RegionsService,
        // private searchService: SearchService,
        private router: Router
        ) {
        super(languageService);
    }

    ngOnInit() {
        this.title = this._('Region Management');
        this.refresh();
    }

    refresh() {
        this.loadRegions(this._('Regions loaded'));
    }

    edit(region: Region) {
        this.router.navigate(['/regions', region.id]);
    }

    delete(region: Region) {
        if (window.confirm(this._('Are you sure you want to delete this region?'))) {
            this.regionService.delete(region).subscribe((any) => {
                this.refresh()
            });
        }
    }

    /**
     * Load the clusters data.
     */
    private loadRegions(successMessage?: string) {
        this.regionService.getAll().subscribe((data: Region[]) => {
            this.data = data;
            this.titleTag =  data.length + ' ' + this._('Regions')
        });
    }
}
