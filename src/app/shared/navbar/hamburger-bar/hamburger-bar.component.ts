import { Component } from "@angular/core";

@Component({
    selector: 'vrs-hamburger-bar',
    templateUrl: './hamburger-bar.component.html',
    styleUrls: ['./hamburger-bar.component.scss']
})
export class HamburgerBarComponent {
    collapse = true;
    translateLeft = false;

    onCollapse() {
        this.collapse = !this.collapse;
    }
}
