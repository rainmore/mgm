import { Component, EventEmitter, Input, OnInit, Output }                  from '@angular/core';
import { BaseGridsComponent }                                              from "../base/grids/base-grids.component";
import { Cluster, Tenant }                                                 from "../../domains";
import { LanguageService }                                                 from "../../services/i18n";
import { TenantsRolloutGroupsService, TenantsRtosService, TenantsService } from "../../services/tenants";
import { ActivatedRoute, Router }                                          from "@angular/router";
import { sprintf }                                                         from "sprintf-js";

@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Tenant> implements OnInit {

    @Input() data: Tenant[] = [];

    @Output() onSynchronize  = new EventEmitter<Tenant>();

    constructor(
        private tenantsService:       TenantsService,
        private rolloutGroupsService: TenantsRolloutGroupsService,
        private rtoService:           TenantsRtosService,
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

    sync(tenant: Tenant) {

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
            this.titleTag = sprintf('%s %s', this.tenantsService.totalElement(), this._('Tenants'));
            this.data = data;
            this.data.forEach(item => {
                item.getCluster().subscribe((cluster: Cluster) => {
                    item.cluster = cluster;
                });
            });
        });
    }
}
