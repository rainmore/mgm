import { LanguageService } from '../../../services/i18n';

/**
 * Base component with generic functionality.
 */
export abstract class BaseComponent {

    constructor(public languageService: LanguageService) {
    }

    /**
     * i18n gettext method.
     *
     * @param tag the tag to find the phrase for.
     * @param placeholders a list of placeholder replacements.
     * @returns {string} the phrase matching the tag or the tag itself if none found.
     */
    _(tag: string, ...placeholders: string[]): string {
        return this.languageService.getPhrase(tag, placeholders);
    }
}
