import { Component, Input } from "../../../../../node_modules/@angular/core";
import { TranslateService } from "../../../../../node_modules/@ngx-translate/core";

@Component({
    selector: 'vrs-taxon-browser-list',
    template: `<ngx-datatable class="material" [rows]="taxa" [columnMode]="'force'" [columns]="columns" [headerHeight]="50"
                [rowHeight]="50" [reorderable]='true' [count]="taxa.length" [limit]="50" [footerHeight]="50"
                [sorts]="[{prop: 'vernacularName', dir: 'asc'}]" (select)="onDatatableSelect($event)" (page)="onDatatablePageChange()">
                </ngx-datatable>`
})
export class TaxonBrowserListComponent {
    @Input() taxa;

    columns:any[] = [];

    constructor(private translate:TranslateService) {
        this.columns = [
            { prop: 'vernacularName', name: this.translate.instant('taxonomy.folkname'), canAutoResize: true, draggable: false, resizeable: false, minWidth: 150 },
            { prop: 'scientificName', name: this.translate.instant('taxonomy.scientificname'), canAutoResize: true, draggable: false, resizeable: false, minWidth: 150 },
            { prop: 'stableString', name: this.translate.instant('taxonomy.established'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
            { prop: 'onEUList', name: this.translate.instant('taxonomy.onEuList'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
            { prop: 'onNationalList', name: this.translate.instant('taxonomy.finnishList'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
            { prop: 'isQuarantinePlantPest', name: this.translate.instant('taxonomy.list.quarantinePlantPest'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false }
        ];
    }

    onDatatableSelect(e) {
        
    }

    onDatatablePageChange() {

    }
}