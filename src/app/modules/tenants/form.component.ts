import { Component, Input, OnInit }                        from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators }          from '@angular/forms';
import { ActivatedRoute, Router }                                          from "@angular/router";
import { Cluster, Tenant }                                                 from "../../domains";
import { LanguageService }                                                 from "../../services/i18n";
import { FlashService }                                                    from "../../services/flash";
import { ErrorMessageBuilder }                                             from "../core/forms";
import { TenantsRolloutGroupsService, TenantsRtosService, TenantsService } from "../../services/tenants";
import { BaseFormComponent }                                               from "../base";
import { RolloutGroup }                                                    from "../../domains/tenants/rollout-group";
import { Rto }                                                             from "../../domains/tenants/rto";
import { RouteService }                                                    from "../base/route.service";

@Component({templateUrl: 'form.component.html'})
export class FormComponent extends BaseFormComponent<Tenant> implements OnInit {

    @Input() tenant: Tenant = new Tenant();
    @Input() clusters: Cluster[] = [];
    @Input() rolloutGroups: RolloutGroup[] = [];
    @Input() rtos: Rto[] = [];

    constructor(
                private formBuilder:          FormBuilder,
                private errorBuilder:         ErrorMessageBuilder,
                private tenantsService:       TenantsService,
                private rolloutGroupsService: TenantsRolloutGroupsService,
                private rtoService:           TenantsRtosService,
                private flashService:         FlashService,
                    languageService: LanguageService,
                    routeService: RouteService) {
    super(languageService, routeService);

    }

    protected getBaseUri(): string {
        return '/tenants';
    }

    protected getEntity(): Tenant {
        return undefined;
    }

    protected load(): void {
    }

    ngOnInit() {
        this.title = this._('Tenants Management');

        this.formTitle = this.getId()
            ? this._('Edit Tenant')
            : this._('Add Tenant');

    }

    // convenience getter for easy access to form fields
    get formControl() { return this.form.controls; }

    protected initForm(entity: Tenant): void {

        this.form = new FormGroup({
            'cluster': new FormControl(this.tenant.cluster, [
                Validators.required
            ]),
            'systemId': new FormControl(this.tenant.systemId, [
                Validators.required,
                Validators.maxLength(100)
            ]),
            'tenantId': new FormControl(this.tenant.tenantId, [
                Validators.required,
                Validators.maxLength(100)
            ]),
            'name': new FormControl(this.tenant.tag, [
                Validators.required,
                Validators.maxLength(100)
            ]),
            'contentPath': new FormControl(this.tenant.tag, [
                Validators.maxLength(100)
            ]),
            'tag': new FormControl(this.tenant.tag, [
                Validators.required,
                Validators.maxLength(100)
            ]),
            'rolloutGroup': new FormControl(this.tenant.rolloutGroup, [
                Validators.required
            ]),
            'active': new FormControl(this.tenant.active),
            'database': new FormGroup({
                'name': new FormControl(this.tenant.database.name, [
                    Validators.required,
                    Validators.maxLength(100)
                ]),
                'user': new FormControl(this.tenant.database.user, [
                    Validators.required,
                    Validators.maxLength(100)
                ]),
                'pass': new FormControl(this.tenant.database.pass, [
                    Validators.required,
                    Validators.maxLength(100)
                ])
            }),
            't2Settings': new FormGroup({
                'active': new FormControl(this.tenant.t2Settings.active),
                'rto': new FormControl(this.tenant.t2Settings.rto, [
                    Validators.required
                ])
            })
        });
    }

    goToListPage() {
        this.routeService.navigate(['/tenants']);
    }

    save(): void {
        this.submitted = true;
        if (this.form.valid) {
            const id = this.getId();
            this.tenant = {...this.tenant, ...this.form.value};

            if (this.tenant.id) {
                // this.tenantsService.update(this.tenant).subscribe((response) => {
                //     this.submitted = false;
                // });
            }
            else {
                // this.tenantsService.add(this.tenant).subscribe((response) => {
                //     this.submitted = false;
                // });
            }
        }
        else {
            // this.submitted = false;
        }
    }

}
