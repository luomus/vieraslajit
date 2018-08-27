import { Component, Input } from "../../../../../../node_modules/@angular/core";
import { TranslateService } from "../../../../../../node_modules/@ngx-translate/core";
import { ObsMapObservations, VrsObservation } from "../structures/data/ObsMapObservations";
import { EventEmitter } from "events";

@Component({
    selector: 'vrs-obs-map-list',
    template: `<ngx-datatable class="material" [ngStyle]="{'height': height+'px'}"
    [rows]="observations" 
    [columnMode]="'force'" 
    [columns]="columns" 
    [headerHeight]="50"
    [rowHeight]="50" 
    [reorderable]='false' 
    scrollbarV="true"
    (activate)="onTableActivate($event)"
    >
    </ngx-datatable>`
})
export class ObsMapListComponent {
    @Input() height = 500;
    observations:Array<VrsObservation> = [];
    columns:Array<any>;
    eventEmitter:EventEmitter = new EventEmitter();
    constructor(private translate:TranslateService, private obsMapObservations:ObsMapObservations) {
        this.columns = [
            { prop: 'unit.taxonVerbatim', name: this.translate.instant('taxon.name'), draggable: false, resizeable: false },
            { prop: 'gathering.interpretations.municipalityDisplayname', name: this.translate.instant('document.location'), draggable: false, resizeable: false },
            { prop: 'gathering.displayDateTime', name: this.translate.instant('observation.datetime'), draggable: false, resizeable: false }
          ];
        this.obsMapObservations.eventEmitter.addListener("change", ()=>{
            this.observations = this.obsMapObservations.getObservations();
        });
    }
    onTableActivate(e) {
        this.eventEmitter.emit("change", e);
    }
}