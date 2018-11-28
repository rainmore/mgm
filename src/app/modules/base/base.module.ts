import { NgModule }              from '@angular/core';
import { CommonModule }          from "@angular/common";
import { PageNotFoundComponent } from "./errors/page-not-found.component";
import { LanguageService }       from "../../services/i18n";
import { PageTitleComponent }    from "../components/page-title.component";
import { RegionsService }        from "../../services/regions";

@NgModule({
    imports: [
        CommonModule
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
        LanguageService,
        RegionsService
    ]
})
export class BaseModule {
}
