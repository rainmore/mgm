import { Component, EventEmitter, Output } from '@angular/core';
import { LanguageService }                 from '../../../services/i18n';
import { BaseComponent }                   from '../components';

@Component({
    selector   : 'search',
    templateUrl: './search.component.html'
})
export class SearchComponent extends BaseComponent {

    @Output() onSearch = new EventEmitter<string>();

    searchTerm: string;

    constructor(languageService: LanguageService) {
        super(languageService);
    }

    search() {
        this.onSearch.emit(this.searchTerm);
    }
}
