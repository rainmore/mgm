﻿import { RouterModule }          from '@angular/router';
import { NgModule }              from '@angular/core';
import { CommonModule }          from "@angular/common";
import { ReactiveFormsModule }   from "@angular/forms";
import { ClustersRoutingModule } from "./clusters-routing.module";
import { FormComponent }         from "./form.component";
import { ListComponent }         from "./list.component";
import { BaseModule }            from "../base";
import { ClustersService }       from "../../services/clusters";
import { DataModule }            from "../core/data";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ClustersRoutingModule,
        DataModule,
        BaseModule
    ],
    declarations: [
        FormComponent,
        ListComponent
    ],
    exports: [RouterModule],
    providers: [
        ClustersService
    ]
})
export class ClustersModule {
}
