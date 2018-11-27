import { NgModule }                       from '@angular/core';
import { RouterModule as NgRouterModule } from '@angular/router';
import { NavigatorComponent }             from './navigator.component';
import { I18nModule }                     from '../../../services/i18n';

@NgModule({
    exports     : [ NgRouterModule, NavigatorComponent ],
    imports     : [ NgRouterModule, I18nModule ],
    declarations: [ NavigatorComponent ]
})
export class NavigatorModule {
}
