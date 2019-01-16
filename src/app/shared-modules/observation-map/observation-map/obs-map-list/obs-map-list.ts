import { Component, Input, OnInit } from "../../../../../../node_modules/@angular/core";
import { TranslateService } from "../../../../../../node_modules/@ngx-translate/core";
import { ObsMapData, VrsObservation } from "../services/data/ObsMapData";
import { EventEmitter } from "events";
import { ObsMapOptions } from "../services/data/ObsMapOptions";

@Component({
    selector: 'vrs-obs-map-list',
    template: `
    <laji-spinner [ngClass]="{'list-spinner': loading}" [spinning]="loading" [fullViewport]="false"></laji-spinner>
    <ngx-datatable class="material" [ngStyle]="{'height': height+'px'}"
    [rows]="observations"
    [columnMode]="'force'"
    [columns]="columns"
    [headerHeight]="50"
    [rowHeight]="50"
    [reorderable]='false'
    scrollbarV="true"
    (activate)="onTableActivate($event)"
    >
    </ngx-datatable>`,
    styleUrls: [`obs-map-list.component.scss`]
})
export class ObsMapListComponent implements OnInit {
    @Input() height = 500;
    observations:Array<VrsObservation> = [];
    columns:Array<any>;
    eventEmitter:EventEmitter = new EventEmitter();

    loading:boolean = true;

    constructor(private translate:TranslateService, private obsMapObservations:ObsMapData,
                private obsMapOptions:ObsMapOptions) {
        this.columns = [
            { prop: 'unit.taxonVerbatim', name: this.translate.instant('taxon.name'), draggable: false, resizeable: false },
            { prop: 'gathering.interpretations.municipalityDisplayname', name: this.translate.instant('document.location'), draggable: false, resizeable: false },
            { prop: 'gathering.displayDateTime', name: this.translate.instant('observation.datetime'), draggable: false, resizeable: false }
          ];
        this.obsMapObservations.eventEmitter.subscribe(()=>{
            // TODO: unsubscribe
            this.observations = this.obsMapObservations.getObservations();
        });
    }

    ngOnInit() {
        this.obsMapOptions.eventEmitter.addListener('stateChange',()=>{
            this.loading = this.obsMapOptions.loadState;
        })
    }

    onTableActivate(e) {
        this.eventEmitter.emit("change", e);
    }
}
