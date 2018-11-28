import { RouterModule }         from '@angular/router';
import { NgModule }             from '@angular/core';
import { CommonModule }         from "@angular/common";
import { ReactiveFormsModule }  from "@angular/forms";
import { FormComponent }        from "./form.component";
import { ListComponent }        from "./list.component";
import { TenantsRoutingModule } from "./tenants-routing.module";
import { BaseModule }           from "../base";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TenantsRoutingModule,
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
export class TenantsModule {
}
