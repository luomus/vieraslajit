import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, AfterViewInit, ChangeDetectionStrategy, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Taxonomy } from "../../../shared/model";
import { TableColumn } from "@swimlane/ngx-datatable";
import { BehaviorSubject, combineLatest, Subject} from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { SpreadSheetService } from "app/shared/service/spread-sheet.service";

const comparator = (valueA, valueB, rowA, rowB, sortDirection) => {
    if (!valueA && !valueB) return 0;
    if (!valueA) return 1;
    if (!valueB) return -1;
    if (valueA > valueB) return 1;
    if (valueA < valueB) return -1;
    return 0;
}

const comparatorReverse = (valueA, valueB, rowA, rowB, sortDirection) => {
    if (!valueA && !valueB) return 0;
    if (!valueA) return 1;
    if (!valueB) return -1;
    if (valueA > valueB) return -1;
    if (valueA < valueB) return 1;
    return 0;
}

const mapTaxonToRow = (t: Taxonomy, translate: TranslateService): Taxonomy => {
    const taxon = { ...t };

    if(taxon.vernacularName) {
        taxon.vernacularName = taxon.vernacularName.charAt(0).toUpperCase() + taxon.vernacularName.substring(1);
    }
    taxon.onEUList = false;
    taxon.onNationalList = false;
    taxon.isQuarantinePlantPest = false;
    if(taxon.administrativeStatuses){
        taxon.onEUList = translate.instant(String(taxon.administrativeStatuses.some(value => value === 'MX.euInvasiveSpeciesList')));
        taxon.onNationalList = translate.instant(String(taxon.administrativeStatuses.some(value => value === 'MX.controllingRisksOfInvasiveAlienSpecies')));
        taxon.isQuarantinePlantPest = translate.instant(String(taxon.administrativeStatuses.some(value => value === 'MX.quarantinePlantPest')));
    }
    switch(taxon.invasiveSpeciesEstablishment) {
        case 'MX.invasiveNotYetInFinland':
            taxon.stableString = translate.instant(String('stableString.notyet'));
            break;

        case 'MX.invasiveEstablishmentUnknown':
            taxon.stableString = translate.instant(String('stableString.unknown'));
            break;

        case 'MX.invasiveEstablished':
            taxon.stableString = translate.instant(String('stableString.established'));
            break;

        case 'MX.invasiveSporadic':
            taxon.stableString = translate.instant(String('stableString.sporadic'));
            break;

        case 'MX.invasiveAccidental':
            taxon.stableString = translate.instant(String('stableString.accidental'));
            break;

        default:
            taxon.stableString = "";
            break;
    }

    return taxon;
}

@Component({
    selector: 'vrs-taxon-browser-list',
    templateUrl: './taxon-browser-list.component.html',
    styleUrls: ['./taxon-browser-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaxonBrowserListComponent implements AfterViewInit {
    private unsubscribe$ = new Subject();

    @ViewChild('invasiveSpeciesEstablishment', {static: true}) establishmentCellTemplate: TemplateRef<any>;

    columns: TableColumn[] = [];
    rows$ = new BehaviorSubject<Taxonomy[]>([]);
    ROW_COL_HEIGHT = 50;

    checkHeight$ = new Subject();
    afterViewInit$ = new Subject();

    @Output() scrolled = new EventEmitter();

    onScroll() {
        this.scrolled.emit();
    }

    constructor(
        private translate: TranslateService,
        private router: Router,
        private elementRef: ElementRef,
        private spreadSheetService: SpreadSheetService
    ) {
        combineLatest(this.checkHeight$, this.afterViewInit$).pipe(takeUntil(this.unsubscribe$)).subscribe(([height, _]) => {
            if (height <= this.elementRef.nativeElement.offsetHeight) {
                this.onScroll();
            }
        });
    }

    ngAfterViewInit() {
        this.columns = [
            { prop: 'vernacularName', name: this.translate.instant('taxonomy.folkname'), comparator: comparator},
            { prop: 'scientificName', name: this.translate.instant('taxonomy.scientificname'), comparator: comparator },
            { prop: 'invasiveSpeciesEstablishment', name: this.translate.instant('taxonomy.established'), comparator: comparator, maxWidth: 180, cellTemplate: this.establishmentCellTemplate },
            { prop: 'onEUList', name: this.translate.instant('taxonomy.onEuList'), comparator: comparatorReverse, maxWidth: 180 },
            { prop: 'onNationalList', name: this.translate.instant('taxonomy.finnishList'), comparator: comparatorReverse, maxWidth: 180 },
            { prop: 'isQuarantinePlantPest', name: this.translate.instant('taxonomy.list.quarantinePlantPest'), comparator: comparatorReverse, maxWidth: 180 }
        ];

        this.afterViewInit$.next();
    }

    @Input()
    set taxa(taxa: Array<Taxonomy> | undefined) {
        const totalRowColHeight = (1 + (taxa ? taxa.length : 0)) * this.ROW_COL_HEIGHT;
        this.checkHeight$.next(totalRowColHeight);
        this.rows$.next(
            !taxa
                ? []
                : taxa.map(t => mapTaxonToRow(t, this.translate))
        );
    }

    onDatatableActivate(e) {
        if(e.type=="click") {
            this.router.navigate(['/lajit', e.row.id]);
        }
    }

    getEmptyMessage() {
        return this.translate.instant('datatable.species.empty')
    }

    export(taxa: Taxonomy[]) {
        const tableRows = taxa.map(taxon => mapTaxonToRow(taxon, this.translate));
        const spreadsheet = [];
        spreadsheet.push(this.columns.map(obj => obj["name"]));
        for (const row of tableRows) {
            const spreadsheetRow = [];
            for (const column of this.columns) {
                spreadsheetRow.push(row[column.prop]);
            }
            spreadsheet.push(spreadsheetRow);
        }
        this.spreadSheetService.export(spreadsheet);
    }
}
