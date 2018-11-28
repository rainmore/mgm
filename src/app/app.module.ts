import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }                 from '@angular/common/http';
import { AppComponent }                     from './app.component';
import { AppRoutingModule }                 from './app-routing.module';
import { HomeComponent }                    from "./modules/home";
import { NavComponent }                     from "./modules/components";
import { BaseModule }                       from "./modules/base";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BaseModule
    ],
    declarations: [
        NavComponent,
        HomeComponent,
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
