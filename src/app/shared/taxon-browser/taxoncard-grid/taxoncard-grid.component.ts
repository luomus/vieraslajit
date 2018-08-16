import { Component, Input, OnInit } from "../../../../../node_modules/@angular/core";
import { Taxonomy } from "../../model";

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

    constructor() {}

    ngOnInit() {
        
    }
}