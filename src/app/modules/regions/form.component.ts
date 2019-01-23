import { Component, Input, OnInit }                        from '@angular/core';
import { BaseFormComponent }                               from "../base";
import { LanguageService }                                 from "../../services/i18n";
import { Region }                                          from "../../domains";
import { ActivatedRoute, Router }                          from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RegionsService }                                  from "../../services/regions";

@Component({templateUrl: 'form.component.html'})
export class FormComponent extends BaseFormComponent<Region> implements OnInit {

    @Input() entity: Region = new Region();

    constructor(
        private regionService:    RegionsService,
        private formBuilder:      FormBuilder,
        languageService:  LanguageService,
        activatedRoute:   ActivatedRoute,
        router:           Router,
    ) {
        super(languageService, activatedRoute, router);
        this.initForm(this.entity);
    }

    protected getBaseUri(): string {
        return '/regions';
    }

    protected getEntity(): Region {
        return this.entity;
    }

    ngOnInit() {
        this.title = this._('Regions Management');
        this.titleTag = null;

        this.formTitle = this.getId()
            ? this._('Edit Region')
            : this._('Add Region');

        this.load();
    }

    save() {
        this.loading = true;
        if (this.form.valid) {
            const id = this.getId();
            this.entity = {...this.entity, ...this.form.value};

            if (this.entity.id) {
                this.regionService.update(this.entity).subscribe((region: Region) => {
                    this.loading = false;
                });
            }
            else {
                this.regionService.create(this.entity).subscribe((region: Region) => {
                    this.loading = false;
                    this.redirect([this.getBaseUri(), region.id]);
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
            this.regionService.findOne(this.id).subscribe( (region: Region) => {
                this.entity = region;
                this.initForm(this.entity);
            });
        }
        else {
            this.entity = new Region();
            this.initForm(this.entity);
        }
    }

    protected initForm(entity: Region): void {
        this.form = new FormGroup({
            'name': new FormControl(entity.name, [
                Validators.required,
                Validators.maxLength(100)
            ]),
            'displayName': new FormControl(entity.displayName, [
                Validators.required,
                Validators.maxLength(100)
            ])
        });
    }


}
