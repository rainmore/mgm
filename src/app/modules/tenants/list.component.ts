import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first }                                          from 'rxjs/operators';
import { BaseGridsComponent }                             from "../base/grids/base-grids.component";
import { Region, Server, Tenant }                         from "../../domains";
import { LanguageService }                                from "../../services/i18n";
import { TenantsService }                                 from "../../services/tenants";
import { ActivatedRoute, Router }                         from "@angular/router";

@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Tenant> implements OnInit {

    @Input() tenants: Tenant[] = [];

    @Output() onSynchronize  = new EventEmitter<Tenant>();

    constructor(
        private tenants1Service: TenantsService,
    languageService: LanguageService,
    activatedRoute:   ActivatedRoute,
    router:           Router) {
    super(languageService, activatedRoute, router);

    }

    ngOnInit() {
        this.title = this._('Tenants Management');
        this.refresh();
    }

    refresh() {
        this.load();
    }

    edit(tenant: Tenant) {
        this.redirect(['/tenants', tenant.id]);
    }

    delete(tenant: Tenant) {
        if (window.confirm(this._('Are you sure you want to delete this entity?'))) {
            this.tenants1Service.delete(tenant).subscribe((any) => {
                this.refresh()
            });
        }
    }

    private load(): void {
        this.tenants1Service.getAll().subscribe(tenants => {
            this.tenants = tenants
        });
    }
}
