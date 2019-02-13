import { Component, Input, OnInit, Output, EventEmitter } from "../../../../../node_modules/@angular/core";
import { Taxonomy } from "../../../shared/model";

/** 
 *  Takes Array<Taxonomy> as input and renders a group of mini taxon-cards in a grid
 */

@Component({
    selector: 'vrs-taxoncard-grid',
    templateUrl: 'taxoncard-grid.component.html',
    styleUrls: ['taxoncard-grid.component.scss']
})
export class TaxonCardGridComponent implements OnInit {
    @Input() taxa:Array<Taxonomy>;

    @Output() scrolled = new EventEmitter();

    constructor() {}

    ngOnInit() {
        
    }

    onScroll() {
        this.scrolled.emit();
    }
}