import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from "../base";
import { Cluster }           from "../../domains";
import { LanguageService }   from "../../services/i18n";

@Component({templateUrl: 'form.component.html'})
export class FormComponent extends BaseFormComponent<Cluster> implements OnInit {

    constructor(languageService: LanguageService) {
        super(languageService);

        this.title = this._('Cluster Management');
    }


    ngOnInit() {

    }

    protected getEntity(): Cluster {
        return new Cluster();
    }


}
