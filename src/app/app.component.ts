import { Component }            from '@angular/core';
import { projectConfiguration } from "./configs";

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    projectName = projectConfiguration.projectName
}
