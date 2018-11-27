import { NgModule, ValueProvider } from '@angular/core';
import * as toastr                 from 'toastr';
import { FlashService }            from './flash.service';

const toastProvider: ValueProvider = {provide: 'Toastr', useValue: toastr};

@NgModule({
    providers: [ FlashService, toastProvider ]
})
export class FlashModule {
}
