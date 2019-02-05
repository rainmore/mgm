import { RouterModule }                                                    from '@angular/router';
import { NgModule }                                                        from '@angular/core';
import { CommonModule }                                                    from "@angular/common";
import { ReactiveFormsModule }                                             from "@angular/forms";
import { FormComponent }                                                   from "./form.component";
import { ListComponent }                                                   from "./list.component";
import { TenantsRoutingModule }                                            from "./tenants-routing.module";
import { BaseModule }                                                      from "../base";
import { TenantsRolloutGroupsService, TenantsRtosService, TenantsService } from "../../services/tenants";
import { FlashModule }                                                     from "../../services/flash";
import { DataModule }                                                      from "../core/data";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TenantsRoutingModule,
        FlashModule,
        DataModule,
        BaseModule
    ],
    declarations: [
        FormComponent,
        ListComponent
    ],
    exports: [RouterModule],
    providers: [
        // RegionsService
        TenantsService,
        TenantsRolloutGroupsService,
        TenantsRtosService
    ]
})
export class TenantsModule {
}
