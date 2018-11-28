import { NgModule }              from '@angular/core';
import { CommonModule }          from "@angular/common";
import { PageNotFoundComponent } from "./errors/page-not-found.component";
import { LanguageService }       from "../../services/i18n";
import { PageTitleComponent }    from "../components/page-title.component";

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
    providers: [LanguageService]
})
export class BaseModule {
}
