import { Component, EventEmitter, Input, Output }                          from '@angular/core';
import { BaseGridsComponent }                                              from '../base/grids/base-grids.component';
import { Cluster, Tenant }                                                 from '../../domains';
import { LanguageService }                                                 from '../../services/i18n';
import { TenantsRolloutGroupsService, TenantsRtosService, TenantsService } from '../../services/tenants';
import { sprintf }                                                         from 'sprintf-js';
import { Pageable }                                                        from '../../services/common';
import { RouteService }                                                    from '../base/route.service';
import { Projection }                                                      from '../../services/base-rest-service';

@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Tenant> {

    @Input() data: Tenant[] = [];

    @Output() onSynchronize  = new EventEmitter<Tenant>();

    constructor(
        private tenantsService:       TenantsService,
        private rolloutGroupsService: TenantsRolloutGroupsService,
        private rtoService:           TenantsRtosService,
                languageService:      LanguageService,
                routeService:         RouteService) {
        super(languageService, routeService);

    }

    getBaseUri(): string {
        return '/tenants';
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.title = this._('Tenants Management');
    }

    edit(tenant: Tenant): void {
        this.routeService.navigate([this.getBaseUri(), tenant.id]);
    }

    delete(tenant: Tenant): void {
        if (window.confirm(this._('Are you sure you want to delete this entity?'))) {
            this.tenantsService.delete(tenant).subscribe((any) => {
                this.refresh();
            });
        }
    }

    sync(tenant: Tenant): void {

    }

    getClusterName(tenant: Tenant): string {
        return tenant.cluster ? tenant.cluster.name : null;
    }

    toggleActive(tenant: Tenant): void {
        const active = tenant.active;
        tenant.active = !active;

        this.tenantsService.update(tenant).subscribe((updatedTenant: Tenant) => {
            tenant = updatedTenant;
        });
    }

    loadData(pageable: Pageable): void {
        this.tenantsService.findAll(Projection.none, pageable).subscribe((data: Tenant[]) => {
            this.data = data;
            this.page = this.tenantsService.getPage();
            this.titleTag = sprintf('%s %s', this.page.totalElements, this._('Tenants'));

            this.data.forEach(item => {
                item.getCluster().subscribe((cluster: Cluster) => {
                    item.cluster = cluster;
                });
            });
        });
    }



}
