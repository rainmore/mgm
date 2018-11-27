import { Component }       from '@angular/core';
import { BaseComponent }   from '../components';
import { LanguageService } from '../../../services/i18n';

@Component({
    selector   : 'navigator',
    templateUrl: 'app/modules/core/navigator/navigator.component.html'
})
export class NavigatorComponent extends BaseComponent {

    constructor(languageService: LanguageService) {
        super(languageService);
    }
}
