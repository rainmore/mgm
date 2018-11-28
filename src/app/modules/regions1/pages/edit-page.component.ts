import { Component }              from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionsService }         from '../../../services/regions';
import { Region }                 from '../../../domains';
import { BasePageComponent }      from '../../core/components';
import { LanguageService }        from '../../../services/i18n';
import { ErrorMessageBuilder }    from '../../core/forms';
import { FlashService }           from '../../../services/flash';

@Component({
    selector   : 'region-edit-page',
    templateUrl: './edit-page.component.html',
    providers  : [ RegionsService ]
})
export class EditPageComponent extends BasePageComponent {

    region: Region;

    constructor(
        languageService: LanguageService,
        private router: Router,
        private route: ActivatedRoute,
        private errorBuilder: ErrorMessageBuilder,
        private regionService: RegionsService,
        private flashService: FlashService
    ) {
        super(languageService);

        route.data.subscribe(({region}) => {
            this.region = region;

            this.title = region.id
                ? this._('Edit Region')
                : this._('Add Region');
        });
    }

    goToListPage() {
        this.router.navigate([ '/regions' ]);
    }

    save(region: Region) {
        this.region = region;

        this.flashService.info(this._('Saving...'));

        const obs = !region.id
            ? this.regionService.create(region)
            : this.regionService.patch(region);

        obs.subscribe(errors => {
            this.flashService.success(this._('Successfully saved!'));
            this.goToListPage();
        }, errors => {
            this.errors = errors.errors;
            this.flashService.error(this._('Invalid data!'));
            this.scrollToTop();
        });
    }
}
