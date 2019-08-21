import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Taxonomy } from "../../../shared/model";

@Component({
    selector: 'vrs-taxon-grid',
    templateUrl: 'taxon-grid.component.html',
    styleUrls: ['taxon-grid.component.scss']
})
export class TaxonGridComponent implements OnInit {
    @Input() taxa:Array<Taxonomy>;
    @Input() total:number;

    @Output() scrolled = new EventEmitter();

    constructor() {}

    ngOnInit() {
        
    }

    onScroll() {
        this.scrolled.emit();
    }
}