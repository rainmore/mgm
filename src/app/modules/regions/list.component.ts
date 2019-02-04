import { Component, Input, OnInit } from '@angular/core';
import { LanguageService }          from "../../services/i18n";
import { RegionsService }           from "../../services/regions";
import { BaseGridsComponent }       from "../base";
import { Region }                   from "../../domains";
import { ActivatedRoute, Router }   from "@angular/router";
import { sprintf }                  from "sprintf-js";

const searchFields: Array<string> = [ 'name', 'displayName' ];
const sortFields: Array<string> = [ 'displayName' ];


@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Region> implements OnInit {

    @Input() data: Region[] = [];

    constructor(
        private regionService: RegionsService,
                languageService: LanguageService,
                activatedRoute:   ActivatedRoute,
                router:           Router
        ) {
        super(languageService, activatedRoute, router);
    }

    ngOnInit(): void {
        this.title = this._('Regions Management');
        this.refresh();
    }

    refresh(): void {
        this.load();
    }

    edit(region: Region): void {
        this.router.navigate(['/regions', region.id]);
    }

    delete(region: Region): void {
        if (window.confirm(this._('Are you sure you want to delete this entity?'))) {
            this.regionService.delete(region).subscribe((any) => {
                this.refresh()
            });
        }
    }

    /**
     * Load the clusters data.
     */
    private load(): void {
        this.regionService.getAll().subscribe((data: Region[]) => {
            this.titleTag = sprintf('%s %s', this.regionService.totalElement(), this._('Regions'));
            this.data = data;
        });
    }
}
