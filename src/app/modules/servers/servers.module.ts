import { RouterModule }         from '@angular/router';
import { NgModule }             from '@angular/core';
import { CommonModule }         from "@angular/common";
import { ReactiveFormsModule }  from "@angular/forms";
import { FormComponent }        from "./form.component";
import { ListComponent }        from "./list.component";
import { ServersRoutingModule } from "./servers-routing.module";
import { BaseModule }           from "../base";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ServersRoutingModule,
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
export class ServersModule {
}
