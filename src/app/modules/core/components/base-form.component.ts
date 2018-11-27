import { EventEmitter, Output } from '@angular/core';
import { Resource }             from 'angular4-hal';
import { Identifiable }         from '../../../domains';
import { LanguageService }      from '../../../services/i18n';
import { BaseComponent }        from './base.component';

/**
 * Base form component with generic functionality.
 */
export abstract class BaseFormComponent<Entity extends Identifiable<any> & Resource> extends BaseComponent {

    @Output() onSave = new EventEmitter<Entity>();
    @Output() onCancel = new EventEmitter<Entity>();

    constructor(languageService: LanguageService) {
        super(languageService);
    }

    protected abstract getEntity(): Entity;

    protected compareUsing(key: string): (item1: any, item2: any) => boolean {
        return (item1, item2) => BaseFormComponent.getPropertyByPath(item1, key) === BaseFormComponent.getPropertyByPath(item2, key);
    }

    protected save() {
        this.onSave.emit(this.getEntity());
    }

    protected cancel() {
        this.onCancel.emit();
    }

    private static getPropertyByPath(object: any, key: string) {
        return key.split('.').reduce((object, key) => object && object[ key ], object);
    }
}
