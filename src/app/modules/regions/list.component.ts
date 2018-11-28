import { Component, Input, OnInit }       from '@angular/core';
import { first, map }                     from 'rxjs/operators';
import { BasePageComponent }              from "../core/components";
import { LanguageService }                from "../../services/i18n";
import { RegionsService }                 from "../../services/regions";
import { BaseGridsComponent }             from "../base";
import { Region }                         from "../../domains";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { Page, Pageable, Projection }     from "../../services/rest.service";
import { SearchService }                  from "../core/data";

const searchFields: Array<string> = [ 'name', 'displayName' ];
const sortFields: Array<string> = [ 'displayName' ];


@Component({
    templateUrl: 'list.component.html',
    providers  : [ RegionsService ]
})
export class ListComponent extends BaseGridsComponent<Region> implements OnInit {

    @Input() data: Region[] = [];

    selectedItem: Region;

    constructor(
        languageService: LanguageService,
        // private regionService: RegionsService,
        // private searchService: SearchService,
        private router: Router
        ) {
        super(languageService);
    }

    ngOnInit() {
        this.title = this._('Region Management');
        this.titleTag =  '0' + ' ' + this._('Regions')
    }

    onSelect(item: Region): void {
        this.selectedItem = item;
        this.router.navigate([item.id])
    }

    private load() {

        // const {search, sort = sortFields} = this.route.queryParams;

        // return this.regionService.findAll(Projection.full, Pageable.build().withSort(sort))
        //     .pipe(map(regions => this.searchService.search(search, searchFields, regions)))
        //     .subscribe((data: Region[]) => {
        //         this.data = data;
        //     })
        //     ;

    }

}
