import { Component, OnInit }  from '@angular/core';
import { first }              from 'rxjs/operators';
import { BaseGridsComponent } from "../base/grids/base-grids.component";
import { Region, Tenant }     from "../../domains";
import { LanguageService }    from "../../services/i18n";

@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Tenant> implements OnInit {

    constructor(languageService: LanguageService) {
        super(languageService);

        this.title = this._('Tenant Management');
    }

    ngOnInit() {

    }
}
