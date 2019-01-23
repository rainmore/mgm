import { RouterModule, Routes }              from '@angular/router';
import { NgModule }                          from '@angular/core';
import { ListComponent }                     from "./list.component";
import { FormComponent }                     from "./form.component";
import { BaseModule, PageNotFoundComponent } from "../base";

const routes: Routes = [
    { path: '', component: ListComponent},
    { path: 'add', component: FormComponent},
    { path: ':id', component: FormComponent},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        BaseModule
    ],
    exports: [RouterModule]
})
export class ClustersRoutingModule { }
