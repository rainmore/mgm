import { HttpClientModule }    from '@angular/common/http';
import { NgModule }            from '@angular/core';
import { FormsModule }         from '@angular/forms';
import { AngularHalModule }    from 'angular4-hal';
import { HalConfiguration }    from '../../../configs';
import { SearchComponent }     from './search.component';
import { SearchService }       from './search.service';
import { PaginationComponent } from "./pagination.component";
import { CommonModule }        from '@angular/common';
import { RouteService }        from "../../base/route.service";
import { BaseModule }          from "../../base";

@NgModule({
    imports     : [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AngularHalModule.forRoot(),
        BaseModule
    ],
    exports     : [
        PaginationComponent,
        SearchComponent
    ],
    declarations: [
        PaginationComponent,
        SearchComponent
    ],
    providers   : [
        PaginationComponent,
        SearchService,
        RouteService,
        {provide: 'ExternalConfigurationService', useClass: HalConfiguration}
    ]
})
export class DataModule {
}
