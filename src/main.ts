import './polyfills';

import 'jquery/dist/jquery.slim.min';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/app.scss';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

if (process.env.NODE_ENV == 'production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
