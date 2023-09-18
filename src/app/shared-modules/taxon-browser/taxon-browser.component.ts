import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, Renderer2, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { Subscription, Observable } from "rxjs";

import { TaxonBrowserApiService } from "./services/taxon-browser-api.service";
import { TaxonBrowserApiSettingsService } from "./services/taxon-browser-api-settings.service";
import { Taxonomy } from "../../shared/model";
import { TaxonBrowserParameterService, TaxonBrowserQuery } from "./services/taxon-browser-parameter.service";
import { FilterInfoType } from "./filter-info/filter-info.component";
import { map } from "rxjs/operators";
import { SpreadSheetService } from "app/shared/service/spread-sheet.service";
import { SortOrder } from "./select-sort-order/select-sort-order.component";

@Component({
    selector: "vrs-taxon-browser",
    styleUrls: ["taxon-browser.component.scss"],
    templateUrl: "taxon-browser.component.html",
    providers: [TaxonBrowserApiService, TaxonBrowserApiSettingsService, TaxonBrowserParameterService]
})
export class TaxonBrowserComponent implements OnInit, AfterViewInit {
    taxa:Taxonomy[] = [];
    total: number = 0;
    filterInfo$: Observable<FilterInfoType[]>;

    private langChangeSub:Subscription;

    viewMode: "list" | "grid" = "grid"

    loading = true;

    maxHeight = 400;
    optionsHeight = 400;

    sidebarActive = true;

    resizeUnlisten = () => {}

    @ViewChild('sidebar', { static: true }) sidebar: ElementRef;
    @ViewChild('sidebarToggle', { static: true }) sidebarToggle: ElementRef;
    @ViewChild('cardscont', { static: true }) cardsContainer: ElementRef;
    @ViewChild('optionsmenu', { static: true }) optionsMenu: ElementRef;

    /* CHECKBOXES */
    @ViewChild('plantsCheckbox', { static: true })          plantsCheckbox: ElementRef;
    @ViewChild('mammalsCheckbox', { static: true })         mammalsCheckbox: ElementRef;
    @ViewChild('freshwaterCheckbox', { static: true })      freshwaterCheckbox: ElementRef;
    @ViewChild('balticCheckbox', { static: true })          balticCheckbox: ElementRef;
    @ViewChild('interiorCheckbox', { static: true })        interiorCheckbox: ElementRef;
    @ViewChild('plantPestsGroupCheckbox', { static: true }) plantPestsGroupCheckbox: ElementRef;
    @ViewChild('fiCheckbox', { static: true })              fiCheckbox: ElementRef;
    @ViewChild('euCheckbox', { static: true })              euCheckbox: ElementRef;
    @ViewChild('plantPestsCheckbox', { static: true })      plantPestsCheckbox: ElementRef;

    constructor(private settingsService:TaxonBrowserApiSettingsService,
                private apiService: TaxonBrowserApiService,
                private translate: TranslateService,
                private parameterService: TaxonBrowserParameterService,
                private cd: ChangeDetectorRef,
                private renderer: Renderer2,
                @Inject(PLATFORM_ID) private platformId: object,
                private spreadSheetService: SpreadSheetService) {}

    ngOnInit() {
        this.settingsService.lang = this.translate.currentLang;

        this.apiService.initialize();

        this.apiService.eventEmitter.addListener('change', ()=>{
        });
        this.apiService.eventEmitter.addListener('done', ()=>{
            // duplicate array to avoid mutability problems
            this.taxa = this.apiService.taxa.slice();
            this.total = this.settingsService.apiSettings.total;
            this.loading=false;
        });

        this.filterInfo$ = this.parameterService.queryEventEmitter
        .pipe(
            map((query: TaxonBrowserQuery) => {
                let infoTypes: FilterInfoType[] = []
                query.FiList ? infoTypes.push('fiList') : null;
                query.EuList ? infoTypes.push('euList') : null;
                query.PlantPests ? infoTypes.push('plantPest') : null;
                return infoTypes;
            })
        )

        this.parameterService.queryEventEmitter
        .subscribe((event: TaxonBrowserQuery) => {
            if (event.hasOwnProperty('invasiveSpeciesMainGroups')) {
                const groups: string[] = event.invasiveSpeciesMainGroups;
                groups.includes("HBE.MG2") ? this.plantsCheckbox.nativeElement.checked = true : this.plantsCheckbox.nativeElement.checked = false;
                groups.includes("HBE.MG8") ? this.mammalsCheckbox.nativeElement.checked = true : this.mammalsCheckbox.nativeElement.checked = false;
                groups.includes("HBE.MG5") ? this.freshwaterCheckbox.nativeElement.checked = true : this.freshwaterCheckbox.nativeElement.checked = false;
                groups.includes("HBE.MG4") ? this.balticCheckbox.nativeElement.checked = true : this.balticCheckbox.nativeElement.checked = false;
                groups.includes("HBE.MG9") ? this.interiorCheckbox.nativeElement.checked = true : this.interiorCheckbox.nativeElement.checked = false;
                groups.includes("HBE.MG13") ? this.plantPestsGroupCheckbox.nativeElement.checked = true : this.plantPestsGroupCheckbox.nativeElement.checked = false;
            }
            event.hasOwnProperty('FiList') ? this.fiCheckbox.nativeElement.checked = event.FiList: this.fiCheckbox.nativeElement.checked = false;
            event.hasOwnProperty('EuList') ? this.euCheckbox.nativeElement.checked = event.EuList: this.euCheckbox.nativeElement.checked = false;
            event.hasOwnProperty('PlantPests') ? this.plantPestsCheckbox.nativeElement.checked = event.PlantPests: this.plantPestsCheckbox.nativeElement.checked = false;
        });

        this.parameterService.init();

        this.langChangeSub = this.translate.onLangChange.subscribe((lang)=> {
            this.settingsService.apiSettings.lang = lang.lang;
        });

        this.viewMode = this.settingsService.apiSettings.mode;
    }

    ngAfterViewInit() {
        if(!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (window.innerWidth < 768) {
            this.sidebarActive = false;
            this.renderer.setStyle(this.sidebar.nativeElement, "width", "16px");
            this.renderer.removeClass(this.sidebarToggle.nativeElement, "oi-arrow-thick-left");
            this.renderer.addClass(this.sidebarToggle.nativeElement, "oi-arrow-thick-right");
        }
        this.resizeUnlisten = this.renderer.listen(window, 'resize', () => {
            this.maxHeight = window.innerHeight - this.cardsContainer.nativeElement.offsetTop;
            const viewportOffset = this.optionsMenu.nativeElement.getBoundingClientRect();
            this.optionsHeight = window.innerHeight - viewportOffset.top
            this.cd.detectChanges();
        });
        setTimeout(() => {
            this.maxHeight = window.innerHeight - this.cardsContainer.nativeElement.offsetTop;
            const viewportOffset = this.optionsMenu.nativeElement.getBoundingClientRect();
            this.optionsHeight = window.innerHeight - viewportOffset.top
            this.cd.detectChanges();
        }, 100);
    }

    ngOnDestroy() {
        this.langChangeSub ? this.langChangeSub.unsubscribe() : null;
        this.resizeUnlisten();
    }

    getTotalItems() {
        return this.settingsService.apiSettings.total;
    }

    onInformalGroupSelection(event) {
        this.parameterService.updateQuery({informalTaxonGroups: event});
    }

    onInvasiveGroupCheckbox(event, groupId:string) {
        let invasiveSpeciesMainGroups: string[];
        if (typeof this.settingsService.apiSettings.invasiveSpeciesMainGroups === 'string') {
            invasiveSpeciesMainGroups = [this.settingsService.apiSettings.invasiveSpeciesMainGroups];
        } else {
            invasiveSpeciesMainGroups = this.settingsService.apiSettings.invasiveSpeciesMainGroups;
        }
        if (event.target.checked) {
            if (invasiveSpeciesMainGroups) invasiveSpeciesMainGroups.push(groupId);
            else invasiveSpeciesMainGroups = [groupId];
        } else if(invasiveSpeciesMainGroups) {
            invasiveSpeciesMainGroups = invasiveSpeciesMainGroups.filter((group: string) => group !== groupId);
        }
        this.parameterService.updateQuery({invasiveSpeciesMainGroups: invasiveSpeciesMainGroups});
    }

    onCheckboxChange(event, target) {
        this.parameterService.updateQuery({[target]: event.target.checked});
    }

    onScroll() {
        this.apiService.loadMore();
    }

    onGroupSelected(event) {
        this.parameterService.updateQuery({informalTaxonGroups: Array.from(event)});
    }

    onClearSettings() {
        this.parameterService.clearQuery();
    }

    onSwitchViewMode() {
        this.viewMode === 'grid' ? this.viewMode = 'list' : this.viewMode = 'grid';
        this.parameterService.updateQuery({mode: this.viewMode});
    }

    getSortOrder() {
        return this.settingsService.apiSettings.sortOrder;
    }

    onChangeSortOrder(sortOrder: SortOrder) {
        this.parameterService.updateQuery({ sortOrder });
    }

    onToggleSidebar() {
        this.sidebarActive = !this.sidebarActive;
        if (!this.sidebarActive) {
            this.renderer.setStyle(this.sidebar.nativeElement, "width", "16px");
            this.renderer.removeClass(this.sidebarToggle.nativeElement, "oi-arrow-thick-left");
            this.renderer.addClass(this.sidebarToggle.nativeElement, "oi-arrow-thick-right");
        } else {
            this.renderer.removeStyle(this.sidebar.nativeElement, "width");
            this.renderer.removeClass(this.sidebarToggle.nativeElement, "oi-arrow-thick-right");
            this.renderer.addClass(this.sidebarToggle.nativeElement, "oi-arrow-thick-left");
        }
    }

    onExport() {
        // create 2d array from data
        const columns = [
            { prop: 'vernacularName', name: this.translate.instant('taxonomy.folkname')},
            { prop: 'scientificName', name: this.translate.instant('taxonomy.scientificname')},
            { prop: 'stableString', name: this.translate.instant('taxonomy.established')},
            { prop: 'onEUList', name: this.translate.instant('taxonomy.onEuList')},
            { prop: 'onNationalList', name: this.translate.instant('taxonomy.finnishList')},
            { prop: 'isQuarantinePlantPest', name: this.translate.instant('taxonomy.list.quarantinePlantPest')}
        ]
        const rows = []
        // first row: column names
        rows.push(columns.map(obj => obj["name"]))
        // rows
        for (const taxon of this.taxa) {
            const row = []
            for (const column of columns) {
                row.push(taxon[column.prop])
            }
            rows.push(row)
        }
        this.spreadSheetService.export(rows)
    }
}
