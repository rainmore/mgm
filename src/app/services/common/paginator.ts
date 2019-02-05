import { Page }     from "./page";
import URI = uri.URI;
import { Sort }     from "angular4-hal";
import { Pageable } from "./pageable";

export class Paginator {
    constructor(
        public baseUri: string,
    ) {
    }

    private _pageable: Pageable;
    private _page: Page = Page.build();

    // private baseUri: URI;
    //
    // constructor(baseUri: URI) {
    //     this.baseUri = baseUri;
    // }

    get page(): Page {
        return this._page;
    }

    set page(page: Page) {
        this._page = page;
    }

    get pageable(): Pageable {
        return this._pageable;
    }

    set pageable(value: Pageable) {
        this._pageable = value;
    }
}
