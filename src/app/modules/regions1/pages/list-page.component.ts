import { Component }              from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionsService }         from '../../../services/regions';
import { Region }                 from '../../../domains';
import { BasePageComponent }      from '../../core/components';
import { LanguageService }        from '../../../services/i18n';
import { FlashService }           from '../../../services/flash';
import { Page }                   from '../../../services/rest.service';


@Component({
    selector   : 'region-list-page',
    templateUrl: './list-page.component.html',
    providers  : [ RegionsService ]
})
export class ListPageComponent extends BasePageComponent {

    /**
     * The region data for the list.
     */
    regions: Array<Region>;

    /**
     * Pagination information.
     */
    page: Page = new Page();

    constructor(
        languageService: LanguageService,
        private router: Router,
        private route: ActivatedRoute,
        private regionService: RegionsService,
        private flashService: FlashService
    ) {
        super(languageService);

        this.title = this._('Region Management');

        route.data.subscribe(({regions}) => {
            this.regions = regions;
        });
    }

    filterRegions(query: string) {
        this.router.navigate([], {queryParamsHandling: 'merge', queryParams: {search: query}});
    }

    /**
     * Refresh the region list.
     */
    refreshRegions() {
        this.flashService.info(this._('Refreshing...'));
        this.router.navigate([], {queryParamsHandling: 'merge', queryParams: {refresh: new Date().getTime()}});
    }

    /**
     * Edit a region.
     *
     * @param region the tenant to edit.
     */
    editRegion(region: Region) {
        this.router.navigate([ '/regions', encodeURI(region.id) ]);
    }

    /**
     * Delete a region.
     *
     * @param region the region to delete.
     */
    deleteRegion(region: Region) {
        if (window.confirm(this._('Are you sure you want to delete this region?'))) {
            this.regionService
                .delete(region)
                .subscribe(_ => {
                    this.refreshRegions();
                    this.flashService.success(this._('Region deleted'));
                }, errors => {
                    this.errors = errors.errors;
                    this.flashService.error(this._('Could not delete region'))
                });
        }
    }
}
