import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageService }                                                 from '../../../services/i18n';
import { BaseComponent }                                                   from '../components';
import { Page }                                                            from '../../../services/common';

@Component({
    selector   : 'pagination',
    templateUrl: './pagination.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent extends BaseComponent {

    @Input() page: Page = Page.build();
    @Input() previousLabel: string = 'Previous';
    @Input() nextLabel: string = 'Next';
    @Input() screenReaderPageLabel: string = 'page';
    @Input() maxSize: number = 7;

    @Output() pageNumber = new EventEmitter<number>();

    constructor(languageService: LanguageService) {
        super(languageService);
    }

    private getPage(): Page {
        return this.page;
    }

    getTotalPages(): number {
        return this.getPage().totalPages;
    }

    display(): boolean {
        return this.getTotalPages() > 1;
    }

    // TODO to improve the logic
    getItems(): number[] {
        if (!this.display()) return [];

        const page = this.getPage();
        const arr: number[] = [];
        const current = this.current();
        const range = (page.totalPages > this.maxSize) ? this.maxSize : page.totalPages;
        const rangeMiddle = Math.floor(range / 2);
        var start = 0;
        var end = range;
        var i = 0;

        if (current - rangeMiddle > start) {
            start = current - rangeMiddle;
            end = start + range;
        }

        if (end > page.totalPages) {
            end = page.totalPages - 1;

            if (end - range < 0) {
                start = 0;
            }
            else if (end - start < range) {
                start = end - range;
            }
        }

        for (i = 0; i < range; i++) {
            arr[i] = start + i;
        }

        return arr;
    }

    current(): number {
        return this.getPage().page;
    }

    isCurrent(page: number): boolean {
        return page == this.current();
    }

    isFirst(): boolean {
        return this.current() == 0;
    }

    isLast(): boolean {
        return this.current() == this.getTotalPages() - 1;
    }

    hasNext(): boolean {
        return !this.isLast();
    }

    hasPrev(): boolean {
        return !this.isFirst();
    }

    goto(pageNumber: number): void {
        this.pageNumber.emit(pageNumber);
    }

    gotoFirst(): void {
        this.goto(0);
    }

    gotoLast(): void {
        this.goto(this.getTotalPages() - 1);
    }

}
