/**
 * An object that represents the HAL page response for {GET} list requests.
 */
export class Page {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
