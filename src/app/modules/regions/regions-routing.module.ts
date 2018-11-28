import { RouterModule, Routes }              from '@angular/router';
import { NgModule }                          from '@angular/core';
import { ListComponent }                     from "./list.component";
import { FormComponent }                     from "./form.component";
import { BaseModule, PageNotFoundComponent } from "../base";
import { RegionsService }                    from "../../services/regions";

const routes: Routes = [
    {
        path: '',
        component: ListComponent,
        // resolve: {
        //     regions: RegionsResolver
        // },
        // runGuardsAndResolvers: 'paramsOrQueryParamsChange'
    },
    {
        path: 'add',
        component: FormComponent,
        // resolve: {
        //     regions: RegionResolver
        // }
    },
    {
        path: ':id',
        component: FormComponent,
        // resolve: {
        //     regions: RegionResolver
        // }
    },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        BaseModule
    ],
    exports: [RouterModule],
    providers: [
        // RegionsService
        // RegionsResolver,
        // RegionResolver
    ]
})
export class RegionsRoutingModule {
}
