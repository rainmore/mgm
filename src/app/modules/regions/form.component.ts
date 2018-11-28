import { Component, OnInit } from '@angular/core';
import { first }             from 'rxjs/operators';
import { BaseFormComponent } from "../base";
import { LanguageService }   from "../../services/i18n";
import { Region }            from "../../domains";

@Component({templateUrl: 'form.component.html'})
export class FormComponent extends BaseFormComponent<Region> implements OnInit {

    constructor(languageService: LanguageService) {
        super(languageService);

        this.title = this._('Region Management');
    }

    ngOnInit() {

    }

    protected getEntity(): Region {
        return new Region();
    }

}
