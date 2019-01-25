import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first }                                          from 'rxjs/operators';
import { BaseGridsComponent }                             from "../base/grids/base-grids.component";
import { Cluster, Region, Server, Tenant }                from "../../domains";
import { LanguageService }                                from "../../services/i18n";
import { TenantsService }                                 from "../../services/tenants";
import { ActivatedRoute, Router }                         from "@angular/router";

@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Tenant> implements OnInit {

    @Input() data: Tenant[] = [];

    @Output() onSynchronize  = new EventEmitter<Tenant>();

    constructor(
        private tenantsService: TenantsService,
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
            this.tenantsService.delete(tenant).subscribe((any) => {
                this.refresh();
            });
        }
    }

    toggleActive(tenant: Tenant) {
        const active = tenant.active;
        tenant.active = !active;

        this.tenantsService.update(tenant).subscribe((updatedTenant: Tenant) => {
            tenant = updatedTenant;
        });
    }

    private load(): void {
        this.tenantsService.getAll().subscribe((data: Tenant[]) => {
            this.data = data;
        });
    }
}
