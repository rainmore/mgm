import { Component, OnInit } from '@angular/core';
import { first }             from 'rxjs/operators';
import { BasePageComponent } from "../core/components";
import { LanguageService }   from "../../services/i18n";

@Component({templateUrl: 'home.component.html'})
export class HomeComponent extends BasePageComponent implements OnInit {

    constructor(languageService: LanguageService) {
        super(languageService);

        this.title = this._('Home');
    }

    ngOnInit() {

    }
}
