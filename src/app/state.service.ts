import { Injectable } from "@angular/core";
import { Router, NavigationEnd, ResolveEnd } from "@angular/router";

@Injectable()
export class StateService {
    footerEnabled = true;
    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof ResolveEnd) {
                this.footerEnabled = true;
            }
        });
    }
}