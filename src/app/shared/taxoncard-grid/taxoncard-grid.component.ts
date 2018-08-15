import { Component, Input, OnInit } from "../../../../node_modules/@angular/core";
import { Taxonomy } from "../model";

@Component({
    selector: 'vrs-taxoncard-grid',
    templateUrl: 'taxoncard-grid.html',
    styleUrls: ['taxoncard-grid.scss']
})
export class TaxonCardGridComponent implements OnInit {
    @Input() taxa:Array<Taxonomy>;

    constructor() {}

    ngOnInit() {
        
    }
}