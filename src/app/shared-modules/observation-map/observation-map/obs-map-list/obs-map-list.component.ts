import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ObsMapData, VrsObservation, ObsMapDataMeta } from "../services/data/ObsMapData";
import { EventEmitter } from "events";
import { ObsMapOptions } from "../services/data/ObsMapOptions";
import { filter } from "rxjs/operators";

@Component({
    selector: 'vrs-obs-map-list',
    templateUrl: './obs-map-list.component.html',
    styleUrls: ['./obs-map-list.component.scss']
})
export class ObsMapListComponent implements OnInit {
    observations:Array<VrsObservation> = [];
    columns:Array<any>;
    eventEmitter:EventEmitter = new EventEmitter();

    loading:boolean = true;

    constructor(private translate:TranslateService, private obsMapData:ObsMapData,
                private obsMapOptions:ObsMapOptions) {
        this.columns = [
            { prop: 'unit.linkings.taxon.vernacularName.fi', name: this.translate.instant('taxon.name'), draggable: false, resizeable: false },
            { prop: 'gathering.interpretations.municipalityDisplayname', name: this.translate.instant('document.location'), draggable: false, resizeable: false },
            { prop: 'gathering.displayDateTime', name: this.translate.instant('observation.datetime'), draggable: false, resizeable: false }
          ];
        this.obsMapData.eventEmitter.subscribe((data: ObsMapDataMeta)=>{
            // TODO: unsubscribe
            if (data.type == 'observations') {
                this.observations = data.payload;
            }
        });
    }

    ngOnInit() {
        this.obsMapOptions.eventEmitter.pipe(filter(x => x === 'stateChange')).subscribe(()=>{
            this.loading = this.obsMapOptions.loadState;
        })
    }

    onTableActivate(e) {
        this.eventEmitter.emit("change", e);
    }

    getEmptyMessage() {
        return this.translate.instant('datatable.map.empty')
    }
}
