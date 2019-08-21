import { Component, Input } from "@angular/core";

export type FilterInfoType = 'fiList' | 'euList' | 'plantPest'

@Component({
    selector: 'vrs-filter-info',
    styleUrls: ['./filter-info.component.scss'],
    template: `
<div class="filter-info" *ngFor="let type of filters">
    <h2 translate>taxonomy.filterInfo.{{type}}.title</h2>
    <p translate>taxonomy.filterInfo.{{type}}.description</p>
</div>
`
})
export class FilterInfoComponent {
    @Input() filters: FilterInfoType[];
    constructor(){}
}