import { Component, OnInit }                               from '@angular/core';
import { Location }                                        from '@angular/common';
import { BaseFormComponent }                               from "../base";
import { LanguageService }                                 from "../../services/i18n";
import { Region }                                          from "../../domains";
import { ActivatedRoute, Router }                          from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({templateUrl: 'form.component.html'})
export class FormComponent extends BaseFormComponent<Region> implements OnInit {

    form: FormGroup;
    region: Region;

    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        languageService: LanguageService,
        // private regionService: RegionsService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {
        super(languageService);
    }

    ngOnInit() {
        this.title = this.getId()
            ? this._('Edit Region')
            : this._('Add Region');

        this.region = this.getEntity();

        this.form = new FormGroup({
            'name': new FormControl(this.region.name, [
                Validators.required,
                Validators.maxLength(100)
            ]),
            'displayName': new FormControl(this.region.displayName, [
                Validators.required,
                Validators.maxLength(100)
            ]),
            'createdAt': new FormControl(this.region.createdAt)
        });
    }

    onSubmit() {
        this.loading = true;
        if (this.form.valid) {
            const id = this.getId();
            this.region = {...this.region, ...this.form.value};

            if (this.region.id) {
                // this.roleService.update(this.role).subscribe((response) => {
                //     this.loading = false;
                // });
            }
            else {
                // this.roleService.save(this.role).subscribe((response) => {
                //     this.loading = false;
                // });
            }
        }
        else {
            this.loading = false;
        }
    }

    private getId() {
        return this.route.snapshot.paramMap.get('id');
    }

    protected getEntity(): Region {
        const id = this.getId();

        var region = new Region;

        if (id) {
            region.id = id
        }

        return region;
    }

    goBack(): void {
        this.location.back();
    }

}
