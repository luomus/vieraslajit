import { Component, Input } from "@angular/core";

export type FilterInfoType = 'fiList' | 'euList' | 'plantPest' | 'other';

@Component({
    selector: 'vrs-filter-info',
    styleUrls: ['./filter-info.component.scss'],
    template: `
<div class="filter-info" *ngFor="let type of filters">
    <h2 translate>taxonomy.filterInfo.{{type}}.title</h2>
    <p [innerHTML]="'taxonomy.filterInfo.' + type + '.description' | translate"></p>
</div>
`
})
export class FilterInfoComponent {
    @Input() filters: FilterInfoType[];
    constructor(){}
}