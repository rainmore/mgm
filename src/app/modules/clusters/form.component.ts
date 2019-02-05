import { Component, Input, OnInit }                        from '@angular/core';
import { BaseFormComponent }                               from "../base";
import { Cluster, Region }                                 from "../../domains";
import { LanguageService }                                 from "../../services/i18n";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RegionsService }                                  from "../../services/regions";
import { ActivatedRoute, Router }                          from "@angular/router";
import { ClustersService }                                 from "../../services/clusters";
import { RouteService }                                    from "../base/route.service";

@Component({templateUrl: 'form.component.html'})
export class FormComponent extends BaseFormComponent<Cluster> implements OnInit {

    @Input() entity: Cluster = new Cluster();
    @Input() regions: Region[] = [];

    constructor(
        private clustersService: ClustersService,
        private regionService:   RegionsService,
        private formBuilder:     FormBuilder,
                languageService: LanguageService,
                routeService: RouteService,) {
        super(languageService, routeService);

        this.initForm(this.entity)
    }

    protected getBaseUri(): string {
        return '/clusters';
    }

    protected getEntity(): Cluster {
        return this.entity;
    }

    ngOnInit() {
        this.title = this._('Clusters Management');
        this.titleTag = null;

        this.formTitle = this.getId()
            ? this._('Edit Cluster')
            : this._('Add Cluster');

        this.load();
    }

    save(): void {
        this.loading = true;
        if (this.form.valid) {
            const id = this.getId();
            this.entity = {...this.getEntity(), ...this.form.value};

            if (this.entity.id) {
                this.clustersService.update(this.entity).subscribe((entity: Cluster) => {
                    this.loading = false;
                    this.entity = entity;
                });
            }
            else {
                this.clustersService.create(this.entity).subscribe((entity: Cluster) => {
                    this.loading = false;
                    this.routeService.navigate([this.getBaseUri(), entity.id]);
                });
            }
        }
        else {
            this.loading = false;
        }
    }

    protected load(): void {
        this.id = this.getId();
        if (this.id) {
            this.clustersService.findOne(this.id).subscribe( (entity: Cluster) => {
                this.entity = entity;
                entity.getRegion().subscribe((region: Region) => {
                    this.entity.region = region;
                    this.initForm(this.getEntity());
                });
            });
        }
        else {
            this.entity = new Cluster();
            this.initForm(this.getEntity());
        }

        this.regionService.findAll().subscribe((regions: Region[]) => {
            this.regions = regions;
            console.log(this.regions);
        })
    }

    protected initForm(entity: Cluster): void {
        this.form = new FormGroup({
            'name': new FormControl(entity.name, [
                Validators.required,
                Validators.maxLength(100)
            ]),
            'region': new FormControl(entity.region, [
                Validators.required
            ]),
        });
    }

}
