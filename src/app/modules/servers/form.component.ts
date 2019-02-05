import { Component, OnInit }      from '@angular/core';
import { first }                  from 'rxjs/operators';
import { BaseFormComponent }      from "../base";
import { Cluster, Server }        from "../../domains";
import { LanguageService }        from "../../services/i18n";
import { ActivatedRoute, Router } from "@angular/router";
import { RouteService }           from "../base/route.service";

@Component({templateUrl: 'form.component.html'})
export class FormComponent extends BaseFormComponent<Server> implements OnInit {

    private entity: Server = new Server();

    constructor(languageService: LanguageService,
                routeService: RouteService) {
        super(languageService, routeService);

    }


    protected getBaseUri(): string {
        return '/servers';
    }

    protected getEntity(): Server {
        return this.entity;
    }

    ngOnInit() {
        this.title = this._('Servers Management');
        this.titleTag = null;

        this.formTitle = this.getId()
            ? this._('Edit Server')
            : this._('Add Server');

        this.load();
    }

    protected initForm(entity: Server): void {
    }

    protected load(): void {
    }

    save(): void {
    }

}
