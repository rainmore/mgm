import { Routes, RouterModule } from '@angular/router';
import { NgModule }             from '@angular/core';
import { HomeComponent }        from "./modules/home";

const routes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: 'tenants',
        loadChildren: './modules/tenants/tenants.module#TenantsModule'
    },
    {
        path: 'servers',
        loadChildren: './modules/servers/servers.module#ServersModule'
    },
    {
        path: 'clusters',
        loadChildren: './modules/clusters/clusters.module#ClustersModule'
    },
    {
        path: 'regions',
        loadChildren: './modules/regions/regions.module#RegionsModule'
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
