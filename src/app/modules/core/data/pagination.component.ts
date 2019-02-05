import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageService }                                                 from '../../../services/i18n';
import { BaseComponent }                                                   from '../components';
import { Page, Pageable }                                                  from '../../../services/common';
import { RouteService }                                                    from '../../base/route.service';
import { PaginationService }                                               from './pagination.service';

function coerceToBoolean(input: string | boolean): boolean {
    return !!input && input !== 'false';
}

@Component({
    selector   : 'pagination',
    templateUrl: './pagination.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent extends BaseComponent {

    @Input() page: Page = Page.build();
    @Input() baseUri: string;
    @Input() previousLabel: string = 'Previous';
    @Input() nextLabel: string = 'Next';
    @Input() screenReaderPaginationLabel: string = 'Pagination';
    @Input() screenReaderPageLabel: string = 'page';
    @Input() screenReaderCurrentLabel: string = `You're on page`;
    @Input() maxSize: number = 7;

    @Output() pageable = new EventEmitter<Pageable>();

    constructor(languageService: LanguageService,
                private paginationService: PaginationService,
                private routeService: RouteService) {
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
        const rangeMiddle = Math.ceil(range / 2);
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

    goto(page: number): void {
        const pageable = this.paginationService.getPageable().ofPage(page);
        this.routeService.navigate([this.baseUri], {
            queryParams: this.paginationService.toParams(pageable)
        });
        this.pageable.emit(pageable);
    }

    gotoFirst(): void {
        this.goto(0);
    }

    gotoLast(): void {
        this.goto(this.getTotalPages() - 1);
    }

}
