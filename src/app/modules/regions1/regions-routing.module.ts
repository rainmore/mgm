import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent }    from './pages/list-page.component';
import { RegionsResolver }      from './regions.resolvers';
import { EditPageComponent }    from './pages/edit-page.component';

const routes: Routes = [
    {
        path                 : 'regions',
        component            : ListPageComponent,
        resolve              : {
            regions: RegionsResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
    }, {
        path     : 'regions/add',
        component: EditPageComponent,
        resolve  : {
            region: RegionsResolver
        }
    }, {
        path     : 'regions/:id',
        component: EditPageComponent,
        resolve  : {
            region: RegionsResolver
        }
    }
];

@NgModule({
    exports  : [ RouterModule ],
    imports  : [ RouterModule.forRoot(routes) ],
    providers: [ RegionsResolver, RegionsResolver ]
})
export class RegionsRoutingModule {
}
