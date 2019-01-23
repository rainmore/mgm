import { EventEmitter, Output } from '@angular/core';
import { Resource }             from 'angular4-hal';
import { BaseComponent }        from "../base.component";
import { Page }                 from "../../../services/common";

export abstract class BaseGridsComponent<Entity extends Resource> extends BaseComponent {

    @Output() onEdit = new EventEmitter<Entity>();
    @Output() onDelete = new EventEmitter<Entity>();
    @Output() onRefresh = new EventEmitter<void>();
    @Output() onFilter = new EventEmitter<string>();

    /**
     * Pagination information.
     */
    page: Page = new Page();

    filter(query: string) {
        this.onFilter.emit(query);
    }

    refresh() {
        this.onRefresh.emit();
    }

    edit(entity: Entity) {
        this.onEdit.emit(entity);
    }

    delete(entity: Entity) {
        this.onDelete.emit(entity);
    }
}
