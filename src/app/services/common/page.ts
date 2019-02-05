/**
 * An object that represents the HAL page response for {GET} list requests.
 */
export class Page {
    constructor(
        public page: number,
        public size: number,
        public totalElements: number,
        public totalPages: number
    ) {
    }

    static build(page: number = 0, size: number = 20, totalElements: number = 0, totalPages: number = 0): Page {
        return new Page(page, size, totalElements, totalPages);
    }
}
