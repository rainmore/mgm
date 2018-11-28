import { Component, OnInit } from '@angular/core';
import { first }             from 'rxjs/operators';
import { BaseFormComponent } from "../base";
import { Server }            from "../../domains";
import { LanguageService }   from "../../services/i18n";

@Component({templateUrl: 'form.component.html'})
export class FormComponent extends BaseFormComponent<Server> implements OnInit {

    constructor(languageService: LanguageService) {
        super(languageService);

        this.title = this._('Server Management');
    }

    ngOnInit() {

    }

    protected getEntity(): Server {
        return new Server();
    }


}
