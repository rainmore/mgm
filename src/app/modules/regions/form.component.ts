import { Component, OnInit }                               from '@angular/core';
import { Location }                                        from '@angular/common';
import { BaseFormComponent }                               from "../base";
import { LanguageService }                                 from "../../services/i18n";
import { Region }                                          from "../../domains";
import { ActivatedRoute, Router }                          from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RegionsService }                                  from "../../services/regions";

@Component({templateUrl: 'form.component.html'})
export class FormComponent extends BaseFormComponent<Region> implements OnInit {

    form: FormGroup;
    region: Region = new Region();
    id: string;

    loading = false;
    submitted = false;
    returnUrl: string;
    formTitle: string;

    constructor(
                languageService:  LanguageService,
        private regionService:    RegionsService,
        private formBuilder:      FormBuilder,
        private route:            ActivatedRoute,
        private router:           Router
    ) {
        super(languageService);


        this.formTitle = this.getId()
            ? this._('Edit Region')
            : this._('Add Region');
    }

    ngOnInit() {
        this.title = this._('Region Management');
        this.titleTag = null;

        this.load();
        this.initForm(this.region);

    }

    save() {
        this.loading = true;
        if (this.form.valid) {
            console.log('asdfasdf');
            const id = this.getId();
            this.region = {...this.region, ...this.form.value};

            if (this.region.id) {
                this.regionService.update(this.region).subscribe((region: Region) => {
                    this.loading = false;
                });
            }
            else {
                this.regionService.create(this.region).subscribe((region: Region) => {
                    this.loading = false;
                    this.router.navigate(['/regions', region.id])
                });
            }
        }
        else {
            this.loading = false;
        }
    }

    private getId() {
        return this.route.snapshot.paramMap.get('id');
    }

    private load(): void {
        this.id = this.getId();
        if (this.id) {
            this.regionService.findOne(this.id).subscribe( (region: Region) => {
                this.region = region;
                this.initForm(this.region);
            });
        }
        else {
            this.region = new Region();
            this.initForm(this.region);
        }
    }

    private initForm(region: Region): void {
        this.form = new FormGroup({
            'name': new FormControl(region.name, [
                Validators.required,
                Validators.maxLength(100)
            ]),
            'displayName': new FormControl(region.displayName, [
                Validators.required,
                Validators.maxLength(100)
            ])
        });
    }

    protected getEntity(): Region {
        return new Region();
    }

    goBack(): void {
        this.router.navigate(['/regions']);
    }

}
