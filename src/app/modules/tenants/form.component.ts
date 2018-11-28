import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from "../base";
import { Tenant }            from "../../domains";
import { LanguageService }   from "../../services/i18n";

@Component({templateUrl: 'form.component.html'})
export class FormComponent extends BaseFormComponent<Tenant> implements OnInit {

    constructor(languageService: LanguageService) {
        super(languageService);

        this.title = this._('Tenant Management');
    }

    ngOnInit() {

    }

    protected getEntity(): Tenant {
        return new Tenant();
    }


}
