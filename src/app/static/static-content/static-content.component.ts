import { Input, Component } from "@angular/core";
import { Information } from "app/shared/model";

@Component({
    selector: 'vrs-static-content',
    template: `
<vrs-editcms [id]="information?.id.substring(2, information?.id.length)"></vrs-editcms>
<div class="static-content" [innerHTML]="information?.content | parsewp" routeTransformer></div>
    `,
    styleUrls: ['./static-content.component.scss']
})
export class StaticContentComponent {
    @Input() information: Information;
}
