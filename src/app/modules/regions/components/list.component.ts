import { Component, Input }  from '@angular/core';
import { BaseListComponent } from '../../core/components';
import { Region }            from '../../../domains';
import { LanguageService }   from '../../../services/i18n';


@Component({
    selector   : 'region-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends BaseListComponent<Region> {

    @Input() regions: Array<Region> = [];

    constructor(languageService: LanguageService) {
        super(languageService);
    }
}
