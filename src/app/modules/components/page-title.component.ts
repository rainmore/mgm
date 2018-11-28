import { Component, Input, OnInit } from '@angular/core';
import { first }                    from 'rxjs/operators';

@Component({
    selector: 'page-title',
    templateUrl: 'page-title.component.html'
})
export class PageTitleComponent {

    @Input() title: String;

}
