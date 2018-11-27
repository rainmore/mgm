import { Injectable } from '@angular/core';
import { vsprintf }   from 'sprintf-js';

@Injectable()
export class LanguageService {

    phrases: { [ key: string ]: string };

    constructor() {
        this.loadPhrases();
    }

    loadPhrases() {
        // don't need to load anything
        this.phrases = {};
    }

    /**
     * Get the phrase for the given tag or return the tag itself.
     *
     * @param tag the tag to get the phrase for.
     * @param placeholders a list of placeholders to replace.
     * @returns {string} the matching phrase or the tag itself.
     */
    getPhrase(tag: string, placeholders: string[]): string {
        let phrase = this.phrases[ tag ] == null ? tag : this.phrases[ tag ];
        return vsprintf(phrase, placeholders);
    }
}
