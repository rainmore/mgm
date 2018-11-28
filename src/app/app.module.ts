import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }                 from '@angular/common/http';
import { AppComponent }                     from './app.component';
import { AppRoutingModule }                 from './app-routing.module';
import { HomeComponent }                    from "./modules/home";
import { NavComponent }                     from "./modules/components/nav";

// used to create fake backend


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
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
