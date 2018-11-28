import { Component, OnInit }  from '@angular/core';
import { first }              from 'rxjs/operators';
import { BasePageComponent }  from "../core/components";
import { LanguageService }    from "../../services/i18n";
import { RegionsService }     from "../../services/regions";
import { BaseGridsComponent } from "../base";
import { Region }             from "../../domains";

@Component({
    templateUrl: 'list.component.html',
    providers  : [ RegionsService ]
})
export class ListComponent extends BaseGridsComponent<Region> implements OnInit {

    constructor(languageService: LanguageService) {
        super(languageService);

        this.title = this._('Region Management');
    }

    ngOnInit() {

    }
}
