import { HttpClientModule } from '@angular/common/http';
import { NgModule }         from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { AngularHalModule } from 'angular4-hal';
import { HalConfiguration } from '../../../configs';
import { SearchComponent }  from './search.component';
import { SearchService }    from './search.service';

@NgModule({
    imports     : [ FormsModule, HttpClientModule, AngularHalModule.forRoot() ],
    exports     : [ SearchComponent ],
    declarations: [ SearchComponent ],
    providers   : [
        SearchService,
        {provide: 'ExternalConfigurationService', useClass: HalConfiguration}
    ]
})
export class DataModule {
}
