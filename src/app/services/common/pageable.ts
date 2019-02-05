/**
 * Object that represents a basic pageable.
 */
import { Sort }   from "angular4-hal";


export class Pageable {
    constructor(
        public page: number,
        public size: number,
        public sort: Sort[]
    ) {
    }

    /**
     * Build a new pageable that defaults page to 0 and size to 1000.
     * @param page the page number.
     * @param size the size of the page.
     * @returns {Pageable}
     */
    static build(page: number = 0, size: number = 1000): Pageable {
        return new Pageable(page, size, []);
    }

    clone(): Pageable {
        return new Pageable(this.page, this.size, this.sort);
    }

    withSort(sort: Sort[]): Pageable {
        const pageable = this.clone();
        this.sort = sort;
        return this;
    }

    withPage(page: number): Pageable {
        this.page = page;
        return this;
    }

    withSize(size: number): Pageable {
        this.size = size;
        return this;
    }

    ofSort(sort: Sort[]): Pageable {
        const pageable = this.clone();
        pageable.sort = sort;
        return pageable;
    }

    ofPage(page: number): Pageable {
        const pageable = this.clone();
        pageable.page = page;
        return pageable;
    }

    ofSize(size: number): Pageable {
        const pageable = this.clone();
        pageable.size = size;
        return pageable;
    }

}
