import { Component, Input } from "@angular/core";
import { StaticNavItem } from "../static-model";

@Component({
    selector: 'vrs-static-sidebar',
    templateUrl: 'static-sidebar.component.html',
    styleUrls: ['./static-sidebar.component.scss']
})
export class StaticSidebarComponent {
    @Input() levels: StaticNavItem[][];
    @Input() title: string;
    @Input() activeId: string;
}
