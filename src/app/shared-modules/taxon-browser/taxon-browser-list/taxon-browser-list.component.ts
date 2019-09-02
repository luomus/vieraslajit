import { Component, Input, Output, EventEmitter } from "../../../../../node_modules/@angular/core";
import { TranslateService } from "../../../../../node_modules/@ngx-translate/core";
import { Router } from "@angular/router";
import { Taxonomy } from "../../../shared/model";

@Component({
    selector: 'vrs-taxon-browser-list',
    template: `<ngx-datatable class="material"
                [rows]="taxa" [columnMode]="'force'" [columns]="columns"
                [headerHeight]="50" [rowHeight]="50" [reorderable]='true'
                [count]="taxa.length"
                [sorts]="[{prop: 'vernacularName', dir: 'asc'}]"
                [scrollbarV]="true"
                (activate)="onDatatableActivate($event)"
                infiniteScroll
                [infiniteScrollDistance]="0.1"
                [infiniteScrollThrottle]="1000"
                [infiniteScrollContainer]="'datatable-body'"
                [fromRoot]="true"
                (scrolled)="onScroll()"
                [messages]="{
                    emptyMessage: getEmptyMessage()
                }"
                >
               </ngx-datatable>`,
    styleUrls: ['taxon-browser-list.component.scss']
})
export class TaxonBrowserListComponent {
    private _taxa: Array<Taxonomy> = [];

    columns:any[] = [];

    @Output() scrolled = new EventEmitter();

    onScroll() {
        this.scrolled.emit();
    }

    constructor(private translate:TranslateService,
                private router: Router) {
        this.columns = [
            { prop: 'vernacularName', name: this.translate.instant('taxonomy.folkname'), comparator: this.comparator},
            { prop: 'scientificName', name: this.translate.instant('taxonomy.scientificname'), comparator: this.comparator },
            { prop: 'stableString', name: this.translate.instant('taxonomy.established'), comparator: this.comparator },
            { prop: 'onEUList', name: this.translate.instant('taxonomy.onEuList'), comparator: this.comparatorReverse },
            { prop: 'onNationalList', name: this.translate.instant('taxonomy.finnishList'), comparator: this.comparatorReverse },
            { prop: 'isQuarantinePlantPest', name: this.translate.instant('taxonomy.list.quarantinePlantPest'), comparator: this.comparatorReverse }
        ];
    }

    @Input()
    set taxa(t:Array<Taxonomy>) {
        if(t) {
            this._taxa = t;
            this.updateRows(this.taxa);
        }
    }
    get taxa() {
        return this._taxa;
    }

    updateRows(taxa) {
        taxa.forEach((taxon)=>{
            if(taxon.vernacularName) {
                taxon.vernacularName = taxon.vernacularName.charAt(0).toUpperCase() + taxon.vernacularName.substring(1);
            }
            taxon.onEUList = false;
            taxon.onNationalList = false;
            taxon.isQuarantinePlantPest = false;
            if(taxon.administrativeStatuses){
                taxon.onEUList = this.translate.instant(String(taxon.administrativeStatuses.some(value => value === 'MX.euInvasiveSpeciesList')));
                taxon.onNationalList = this.translate.instant(String(taxon.administrativeStatuses.some(value => value === 'MX.nationalInvasiveSpeciesStrategy')));
                taxon.isQuarantinePlantPest = this.translate.instant(String(taxon.administrativeStatuses.some(value => value === 'MX.quarantinePlantPest')));
            }
            switch(taxon.invasiveSpeciesEstablishment) {
                case 'MX.invasiveNotYetInFinland':
                    taxon.stableString = this.translate.instant(String('stableString.notyet'));
                    break;

                case 'MX.invasiveEstablishmentUnknown':
                    taxon.stableString = this.translate.instant(String('stableString.unknown'));
                    break;

                case 'MX.invasiveEstablished':
                    taxon.stableString = this.translate.instant(String('stableString.established'));
                    break;

                case 'MX.invasiveSporadic':
                    taxon.stableString = this.translate.instant(String('stableString.sporadic'));
                    break;

                case 'MX.invasiveAccidental':
                    taxon.stableString = this.translate.instant(String('stableString.accidental'));
                    break;

                default:
                    taxon.stableString = "";
                    break;
            }
        });
    }

    onDatatableActivate(e) {
        if(e.type=="click") {
            this.router.navigate(['/lajit', e.row.id]);
        }
    }

    comparator(valueA, valueB, rowA, rowB, sortDirection) {
        if (!valueA && !valueB) return 0;
        if (!valueA) return 1;
        if (!valueB) return -1;
        if (valueA > valueB) return 1;
        if (valueA < valueB) return -1;
        return 0;
    }

    comparatorReverse(valueA, valueB, rowA, rowB, sortDirection) {
        if (!valueA && !valueB) return 0;
        if (!valueA) return 1;
        if (!valueB) return -1;
        if (valueA > valueB) return -1;
        if (valueA < valueB) return 1;
        return 0;
    }

    getEmptyMessage() {
        return this.translate.instant('datatable.species.empty')
    }
}