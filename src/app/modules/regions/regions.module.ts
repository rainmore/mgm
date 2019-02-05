import { RouterModule }              from '@angular/router';
import { NgModule }                  from '@angular/core';
import { CommonModule }              from "@angular/common";
import { ReactiveFormsModule }       from "@angular/forms";
import { RegionsRoutingModule }      from "./regions-routing.module";
import { FormComponent }             from "./form.component";
import { ListComponent }             from "./list.component";
import { BaseModule }                from "../base";
import { RegionsService }            from "../../services/regions";
import { DataModule, SearchService } from "../core/data";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RegionsRoutingModule,
        DataModule,
        BaseModule
    ],
    declarations: [
        FormComponent,
        ListComponent
    ],
    exports: [RouterModule],
    providers: [
        RegionsService,
        SearchService
    ]
})
export class RegionsModule {
}
