import { Routes, RouterModule }  from '@angular/router';
import { NgModule }              from '@angular/core';
import { ListComponent }         from "./list.component";
import { FormComponent }         from "./form.component";
import { PageNotFoundComponent } from "../errors";
import { ErrorsModule }          from "../errors/errors.module";

const routes: Routes = [
    { path: '', component: ListComponent},
    { path: 'add', component: FormComponent},
    { path: ':id', component: FormComponent},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
      ErrorsModule
  ],
  exports: [RouterModule]
})
export class ClustersRoutingModule { }
