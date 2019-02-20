import { Component, Input, OnInit, Output, EventEmitter } from "../../../../../node_modules/@angular/core";
import { Taxonomy } from "../../../shared/model";

@Component({
    selector: 'vrs-taxon-mosaic',
    templateUrl: 'taxon-mosaic.component.html',
    styleUrls: ['taxon-mosaic.component.scss']
})
export class TaxonMosaicComponent implements OnInit {
    @Input() taxa:Array<Taxonomy>;
    @Input() total:number;

    @Output() scrolled = new EventEmitter();

    constructor() {}

    ngOnInit() {
        
    }

    onScroll() {
        console.log(this.taxa);
        this.scrolled.emit();
    }
}