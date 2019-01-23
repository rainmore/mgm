/**
 * Object that represents a basic pageable.
 */
export class Pageable {
    constructor(
        public page: number,
        public size: number,
        public sort: Array<string>
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

    withSort(sort: string[]): Pageable {
        this.sort = sort;
        return this;
    }
}
