import { Component, Input } from "@angular/core";
import { StaticNavItem } from "../static.container";

@Component({
    selector: 'vrs-static-sidebar',
    templateUrl: 'static-sidebar.component.html',
    styleUrls: ['./static-sidebar.component.scss']
})
export class StaticSidebarComponent {
    @Input() levels: StaticNavItem[][];
}