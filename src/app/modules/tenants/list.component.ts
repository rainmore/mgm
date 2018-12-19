import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first }                                          from 'rxjs/operators';
import { BaseGridsComponent }                             from "../base/grids/base-grids.component";
import { Region, Tenant }                                 from "../../domains";
import { LanguageService }                                from "../../services/i18n";
import { TenantsService }                                 from "../../services/tenants";

@Component({templateUrl: 'list.component.html'})
export class ListComponent extends BaseGridsComponent<Tenant> implements OnInit {

    @Input() tenants: Array<Tenant> = [];

    @Output() onSynchronize  = new EventEmitter<Tenant>();

    constructor(
        languageService: LanguageService,
        private tenants1Service: TenantsService
        ) {
        super(languageService);

        this.title = this._('Tenant Management');
    }

    ngOnInit() {
        console.log('111');
        this.synchronizeAll();
    }

    refresh(): void {
        this.synchronizeAll();
    }

    synchronizeAll(): void {
        this.tenants1Service.getAll().subscribe(tenants => {
            console.log(tenants);
            this.tenants = tenants
        });
    }
}
