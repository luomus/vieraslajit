import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observation } from "../observation-map.component";

@Component({
    selector: 'vrs-obs-map-list',
    templateUrl: './obs-map-list.component.html',
    styleUrls: ['./obs-map-list.component.scss']
})
export class ObsMapListComponent implements OnInit {
    @Input() observations: Observation[] = [];
    columns: any[];

    @Output() onTableActivate = new EventEmitter();

    constructor(private translate: TranslateService) {
        this.columns = [
            { prop: 'unit.linkings.taxon.vernacularName.fi', name: this.translate.instant('taxon.name'), draggable: false, resizeable: false },
            { prop: 'gathering.interpretations.municipalityDisplayname', name: this.translate.instant('document.location'), draggable: false, resizeable: false },
            { prop: 'gathering.displayDateTime', name: this.translate.instant('observation.datetime'), draggable: false, resizeable: false }
          ];
    }

    ngOnInit() {
    }

    getEmptyMessage() {
        return this.translate.instant('datatable.map.empty')
    }
}
