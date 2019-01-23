import { EventEmitter, Input, Output } from '@angular/core';
import { Resource }                    from 'angular4-hal';
import { Identifiable }                from '../../../domains';
import { LanguageService }             from '../../../services/i18n';
import { BaseComponent }               from '../base.component';
import { FormGroup }                   from "@angular/forms";

/**
 * Base form component with generic functionality.
 */
export abstract class BaseFormComponent<Entity extends Identifiable<any> & Resource> extends BaseComponent {

    @Output() onSave = new EventEmitter<Entity>();
    @Output() onCancel = new EventEmitter<Entity>();

    @Input() id: string;
    form: FormGroup;
    formTitle: string;

    loading: boolean = false;
    submitted: boolean = false;

    // protected compareUsing(key: string): (item1: any, item2: any) => boolean {
    //     return (item1, item2) => BaseFormComponent.getPropertyByPath(item1, key) === BaseFormComponent.getPropertyByPath(item2, key);
    // }
    //
    // protected save() {
    //     this.onSave.emit(this.getEntity());
    // }
    //
    // protected cancel() {
    //     this.onCancel.emit();
    // }
    //
    // private static getPropertyByPath(object: any, key: string) {
    //     return key.split('.').reduce((object, key) => object && object[ key ], object);
    // }

    protected abstract getEntity(): Entity;

    protected abstract getBaseUri(): string;

    protected abstract load(): void;

    abstract save(): void;

    protected abstract initForm(entity: Entity): void;

    protected getId() {
        return this.getRequestParam('id');
    }

    goBack(): void {
        this.redirect([this.getBaseUri()]);
    }

    // see https://angular.io/api/forms/SelectControlValueAccessor#customizing-option-selection
    compareId(left: Entity, right: Entity): boolean {
        return left && right ? left.id === right.id : left === right;
    }
}
