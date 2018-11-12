import { Component, Input } from "../../../../../node_modules/@angular/core";
import { TranslateService } from "../../../../../node_modules/@ngx-translate/core";
import { Router } from "@angular/router";
import { Taxonomy } from "../../../shared/model";

@Component({
    selector: 'vrs-taxon-browser-list',
    template: `<ngx-datatable class="material"
                [rows]="taxa" [columnMode]="'force'" [columns]="columns"
                [headerHeight]="50" [rowHeight]="50" [reorderable]='true'
                [count]="taxa.length" [limit]="20" [footerHeight]="50"
                [sorts]="[{prop: 'vernacularName', dir: 'asc'}]"
                (activate)="onDatatableActivate($event)">
               </ngx-datatable>`,
    styleUrls: ['taxon-browser-list.component.scss']
})
export class TaxonBrowserListComponent {
    private _taxa: Array<Taxonomy> = [];

    columns:any[] = [];

    constructor(private translate:TranslateService,
                private router: Router) {
        this.columns = [
            { prop: 'vernacularName', name: this.translate.instant('taxonomy.folkname'), canAutoResize: true, draggable: false, resizeable: false, minWidth: 150 },
            { prop: 'scientificName', name: this.translate.instant('taxonomy.scientificname'), canAutoResize: true, draggable: false, resizeable: false, minWidth: 150 },
            { prop: 'stableString', name: this.translate.instant('taxonomy.established'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
            { prop: 'onEUList', name: this.translate.instant('taxonomy.onEuList'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
            { prop: 'onNationalList', name: this.translate.instant('taxonomy.finnishList'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
            { prop: 'isQuarantinePlantPest', name: this.translate.instant('taxonomy.list.quarantinePlantPest'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false }
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
            this.router.navigate(['/taxon', e.row.id]);
        }
    }
}