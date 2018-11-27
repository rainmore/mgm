import { Inject, Injectable } from '@angular/core';
import { Observable }         from 'rxjs';

/**
 * A simple search service.
 */
@Injectable()
export class SearchService {

    /**
     * Perform a simple contains search for a list of objects.
     *
     * @param searchTerm the search term.
     * @param fields the fields on the object to search.
     * @param objects the data to search.
     * @returns {any[]|T[]} the filtered objects.
     */
    search(searchTerm: string, fields: string[], objects: any[]): any[] {
        if (!searchTerm) return objects;

        return objects.filter(object => fields.find(key => {
            let data = SearchService.getDescendant(object, key);
            if (data == null) return false;
            return data.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        }));
    }

    /**
     * Return a sorter for use in `array.sort(...)`.
     * @param keys an array of fields to sort by.
     * @returns Function a sorting function.
     */
    sorter(keys: string[]): (a: any, b: any) => number {
        return (a, b) => {
            for (var key in keys) {
                if (!keys.hasOwnProperty(key)) continue;

                let o1 = SearchService.getDescendant(a, keys[ key ]);
                let o2 = SearchService.getDescendant(b, keys[ key ]);

                if (o1 == null && o2 == null) continue;
                if (o1 == null) return -1;
                if (o2 == null) return 1;

                if (typeof o1 === 'string') {
                    o1 = o1.toString().toLowerCase();
                    o2 = o2.toString().toLowerCase();
                }

                if (o1 < o2) return -1;
                if (o1 > o2) return 1;
            }

            return 0;
        }
    }

    private static getDescendant(object: any, field: string): any {
        return field
            .split('.')
            .reduce(function (obj, key) {
                return obj ? obj[ key ] : null
            }, object);
    }
}
