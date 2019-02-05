import { NgModule }              from '@angular/core';
import { CommonModule }          from "@angular/common";
import { PageNotFoundComponent } from "./errors/page-not-found.component";
import { LanguageService }       from "../../services/i18n";
import { PageTitleComponent }    from "../components/page-title.component";
import { RegionsService }        from "../../services/regions";
import { HalConfiguration }      from "../../configs";
import { AngularHalModule }      from "angular4-hal";
import { ErrorMessageBuilder }   from "../core/forms";
import { RouteService }          from "./route.service";

@NgModule({
    imports: [
        CommonModule,
        AngularHalModule.forRoot()
    ],
    declarations: [
        PageNotFoundComponent,
        PageTitleComponent
    ],
    exports: [
        PageNotFoundComponent,
        PageTitleComponent
    ],
    providers: [
        {provide: 'ExternalConfigurationService', useClass: HalConfiguration},
        ErrorMessageBuilder,
        LanguageService,
        RegionsService,
        RouteService
    ]
})
export class BaseModule {
}
