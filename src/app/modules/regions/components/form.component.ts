import { Component, Input }  from '@angular/core';
import { BaseFormComponent } from '../../core/components';
import { Region }            from '../../../domains';
import { LanguageService }   from '../../../services/i18n';

@Component({
    selector   : 'region-form',
    templateUrl: './form.component.html'
})
export class FormComponent extends BaseFormComponent<Region> {

    @Input() region: Region = new Region();

    constructor(languageService: LanguageService) {
        super(languageService);
    }

    protected getEntity(): Region {
        return this.region;
    }
}
