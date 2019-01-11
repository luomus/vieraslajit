import { Component, Input } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";

@Component({
    selector: 'vrs-hamburger-bar',
    templateUrl: './hamburger-bar.component.html',
    styleUrls: ['./hamburger-bar.component.scss']
})
export class HamburgerBarComponent {
    @Input() aboutMenu;

    collapse = true;
    translateLeft = false;
    observations = false;
    about = false;

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((event)=> {
            if (event instanceof NavigationStart) {
                this.collapse = true;
            }
        })
    }

    onCollapse() {
        this.collapse = !this.collapse;
    }

    toggleObservations() {
        if (this.observations) {
            setTimeout(() => {
                this.observations = false;
            }, 500)
        } else {
            this.observations = true;
        }
    }

    toggleAbout() {
        if (this.about) {
            setTimeout(() => {
                this.about = false;
            }, 500)
        } else {
            this.about = true;
        }
    }
}
