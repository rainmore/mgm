import { CommonModule as NgCommonModule } from '@angular/common';
import { NgModule }                       from '@angular/core';
import { FormsModule as NgFormsModule }   from '@angular/forms';
import { RouterModule as NgRouterModule } from '@angular/router';
import { RegionsRoutingModule }           from './regions-routing.module';
import { DataModule }                     from '../core/data';
import { FlashModule }                    from '../../services/flash';
import { FormsModule }                    from '../core/forms';
import { ListComponent }                  from './components/list.component';
import { FormComponent }                  from './components/form.component';
import { RegionsService }                 from '../../services/regions';
import { EditPageComponent }              from './pages/edit-page.component';
import { ListPageComponent }              from './pages/list-page.component';
import { I18nModule }                     from '../../services/i18n';

@NgModule({
    exports     : [ NgRouterModule ],
    imports     : [
        NgCommonModule, NgFormsModule, NgRouterModule,
        RegionsRoutingModule, DataModule, FlashModule, FormsModule, I18nModule
    ],
    declarations: [ FormComponent, ListComponent, EditPageComponent, ListPageComponent ],
    providers   : [ RegionsService ]
})
export class RegionsModule {
}
