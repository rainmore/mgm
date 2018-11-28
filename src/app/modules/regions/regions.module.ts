import { RouterModule }         from '@angular/router';
import { NgModule }             from '@angular/core';
import { CommonModule }         from "@angular/common";
import { ReactiveFormsModule }  from "@angular/forms";
import { RegionsRoutingModule } from "./regions-routing.module";
import { FormComponent }        from "./form.component";
import { ListComponent }        from "./list.component";
import { BaseModule }           from "../base";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RegionsRoutingModule,
        BaseModule
    ],
    declarations: [
        FormComponent,
        ListComponent
    ],
    exports: [RouterModule],
    providers: [
        // RegionsService
    ]
})
export class RegionsModule {
}
