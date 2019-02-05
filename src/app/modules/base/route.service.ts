import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { Injectable }                               from "@angular/core";
import URI = uri.URI;

@Injectable()
export class RouteService {
    constructor(private activatedRoute: ActivatedRoute,
                private router:         Router) {

    }

    getRequestParam(param: string) {
        return this.activatedRoute.snapshot.queryParamMap.get(param);
    }

    redirect(commands: any[], extras?: NavigationExtras): void {
        this.navigate(commands, extras);
    }

    navigate(commands: any[], extras?: NavigationExtras): void {
        this.router.navigate(commands, extras);
    }

}
