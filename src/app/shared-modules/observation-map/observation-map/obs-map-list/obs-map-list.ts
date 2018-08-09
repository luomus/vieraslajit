import { Component, Input } from "../../../../../../node_modules/@angular/core";
import { TranslateService } from "../../../../../../node_modules/@ngx-translate/core";
import { ObsMapObservations } from "../ObsMapObservations";

@Component({
    selector: 'vrs-obs-map-list',
    template: `<ngx-datatable class="material" [ngStyle]="{'height': mapHeight+'px'}"
    [rows]="filteredObservations" 
    [columnMode]="'force'" 
    [columns]="columns" 
    [headerHeight]="50"
    [rowHeight]="50" 
    [reorderable]='false' 
    scrollbarV="true"
    [footerHeight]="50"
    (activate)="onTableActivate($event)"
    >
    </ngx-datatable>`
})
export class ObsMapList {
    @Input() obsMapObservations:ObsMapObservations;
    observations:Array<any> = [];
    columns:Array<any>;
    constructor(private translate:TranslateService) {
        this.columns = [
            { prop: 'taxonVerbatim', name: this.translate.instant('taxon.name'), draggable: false, resizeable: false },
            { prop: 'municipalityDisplayname', name: this.translate.instant('document.location'), draggable: false, resizeable: false },
            { prop: 'displayDateTime', name: this.translate.instant('observation.datetime'), draggable: false, resizeable: false }
          ];
          this.obsMapObservations.eventEmitter.addListener("change", ()=>{
            this.observations = this.obsMapObservations.getObservations();
          });
    }
}