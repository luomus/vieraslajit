import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, Renderer2, Inject, PLATFORM_ID, ChangeDetectionStrategy } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { Subscription, combineLatest, BehaviorSubject } from "rxjs";

import { Taxonomy } from "../../shared/model";
import { FilterInfoType } from "./filter-info/filter-info.component";
import { filter, map, tap, switchMap } from "rxjs/operators";
import { SpreadSheetService } from "app/shared/service/spread-sheet.service";
import { SortOrder } from "./select-sort-order/select-sort-order.component";
import { FormBuilder } from "@angular/forms";
import { TaxonService } from "app/shared/service/taxon.service";
import { ActivatedRoute, Router } from "@angular/router";

const initialFilters = {
    plants: false,
    mammalsAndBirds: false,
    fishAndCrayfish: false,
    snails: false,
    insects: false,
    otherInvertebrates: false,
    diseasesAndPathogens: false,
    reptilesAndAmphibians: false,
    otherIasGroup: false,

    fi: false,
    eu: false,
    plantPests: false,
    other: false,
};

type Filters = {
    [key in keyof typeof initialFilters]: boolean;
}

interface SortParams {
    sortOrder: string;
}

type TaxonBrowserQueryParams = Filters & SortParams;

const getTaxaQuery = (params: TaxonBrowserQueryParams, page: number, lang: string): any => {
    const query: any = {
        page,
        pageSize: 12,
        invasiveSpeciesFilter: true,
        lang,
        includeMedia: true,
        selectedFields: [
            'vernacularName',
            'scientificName',
            'cursiveName',
            'invasiveSpeciesEstablishment',
            'administrativeStatuses',
            'id',
            'species',
            'finnish'
        ],
        sortOrder: params.sortOrder ? params.sortOrder : 'observationCountInvasiveFinland DESC'
    };

    const adminStatusFilters = [];
    if (params.eu) { adminStatusFilters.push('MX.euInvasiveSpeciesList'); }
    if (params.fi) { adminStatusFilters.push('MX.controllingRisksOfInvasiveAlienSpecies'); }
    if (params.plantPests) { adminStatusFilters.push('MX.quarantinePlantPest', 'MX.qualityPlantPest'); }
    if (params.other) { adminStatusFilters.push('MX.concernInvasiveSpeciesNotOnOtherLists'); }
    query.adminStatusFilters = adminStatusFilters;

    const invasiveSpeciesMainGroups = [];
    if (params.plants)          { invasiveSpeciesMainGroups.push('HBE.MG2'); }
    if (params.mammalsAndBirds) { invasiveSpeciesMainGroups.push('HBE.MG8'); }
    if (params.fishAndCrayfish)      { invasiveSpeciesMainGroups.push('HBE.MG15'); }
    if (params.snails)          { invasiveSpeciesMainGroups.push('HBE.MG16'); }
    if (params.insects)        { invasiveSpeciesMainGroups.push('HBE.MG17'); }
    if (params.otherInvertebrates) { invasiveSpeciesMainGroups.push('HBE.MG18'); }
    if (params.diseasesAndPathogens) { invasiveSpeciesMainGroups.push('HBE.MG19'); }
    if (params.reptilesAndAmphibians) { invasiveSpeciesMainGroups.push('HBE.MG20'); }
    if (params.otherIasGroup) { invasiveSpeciesMainGroups.push('HBE.MG21'); }

    if (invasiveSpeciesMainGroups.length === 0) { invasiveSpeciesMainGroups.push('HBE.MG14') }
    query.invasiveSpeciesMainGroups = invasiveSpeciesMainGroups;

    return query;
};

const parseFiltersFromQueryParams = (queryParams: Record<string, string>): Partial<Filters> => {
    const filters: Partial<Filters> = {};
    Object.entries(queryParams).filter(([key, val]) => key in initialFilters).forEach(([key, val]) => filters[key] = JSON.parse(val));
    return filters;
};

const filtersToQueryParams = (filters: any): any => {
    const queryParams = {};
    Object.entries(filters).forEach(([key, val]) => queryParams[key] = val ? val : undefined);
    return queryParams;
};

@Component({
    selector: "vrs-taxon-browser",
    styleUrls: ["taxon-browser.component.scss"],
    templateUrl: "taxon-browser.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaxonBrowserComponent implements OnInit, AfterViewInit {
    @ViewChild('sidebar', { static: true }) sidebar: ElementRef;
    @ViewChild('sidebarToggle', { static: true }) sidebarToggle: ElementRef;
    @ViewChild('cardscont', { static: true }) cardsContainer: ElementRef;
    @ViewChild('optionsmenu', { static: true }) optionsMenu: ElementRef;

    filtersForm = this.fb.group(<Filters>initialFilters);
    taxa$ = new BehaviorSubject<Taxonomy[]>([]);
    loadNextPage = new BehaviorSubject<void>(undefined);
    total = 0;
    currentPage = 1;
    lastPage = Infinity;
    pageCache: Taxonomy[] = [];
    sortOrder: SortOrder = 'observations';
    filterInfo: FilterInfoType[] = [];
    viewMode: "list" | "grid" = "grid"
    maxHeight = 400;
    optionsHeight = 400;
    sidebarActive = true;
    resizeUnlisten = () => {}
    subscription = new Subscription();

    constructor(
        private taxonService: TaxonService,
        private translate: TranslateService,
        private cd: ChangeDetectorRef,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformId: object,
        private spreadSheetService: SpreadSheetService
    ) {}

    ngOnInit() {
        this.subscription.add(
            this.filtersForm.valueChanges.subscribe(vals => {
                this.router.navigate([], {
                    relativeTo: this.route,
                    queryParamsHandling: 'merge',
                    queryParams: filtersToQueryParams(vals)
                });
            })
        );

        this.subscription.add(
            combineLatest([
                this.loadNextPage.pipe(
                    filter(_ => this.currentPage < this.lastPage),
                    tap(_ => this.currentPage++)
                ),
                this.route.queryParams.pipe(
                    tap(params => {
                        this.filtersForm.setValue({ ...initialFilters, ...parseFiltersFromQueryParams(params) }, { emitEvent: false });
                        this.sortOrder = params['sortOrder'] ?? 'observations';
                        this.currentPage = 1;
                        this.pageCache = [];
                    })
                )
            ]).pipe(
                switchMap(([_, params]) => this.taxonService.getTaxa(getTaxaQuery(<TaxonBrowserQueryParams>params, this.currentPage, this.translate.currentLang)).pipe(
                    tap(res => {
                        this.total = res.total;
                        this.lastPage = res.lastPage;
                        this.filterInfo = [];
                        if (params.fi) { this.filterInfo.push('fiList'); }
                        if (params.eu) { this.filterInfo.push('euList'); }
                        if (params.plantPests) { this.filterInfo.push('plantPest'); }
                        if (params.other) { this.filterInfo.push('other'); }
                    }),
                    map(res => res.results)
                )),
                tap(res => this.pageCache.push(...res)),
                map(_ => this.pageCache)
            ).subscribe(taxa => {
                // create a shallow copy to change the reference for angular inputs
                this.taxa$.next([...taxa]);
                this.cdr.markForCheck();
            })
        );
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
        this.subscription.unsubscribe();
        this.resizeUnlisten();
    }

    onScroll() {
        this.loadNextPage.next();
    }

    onClearSettings() {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { }
        });
    }

    onSwitchViewMode() {
        this.viewMode === 'grid' ? this.viewMode = 'list' : this.viewMode = 'grid';
    }

    onChangeSortOrder(sortOrder: SortOrder) {
        this.sortOrder = sortOrder;
        this.router.navigate([], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
            queryParams: { sortOrder: sortOrder === 'observations' ? undefined : sortOrder }
        });
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
        for (const taxon of this.taxa$.getValue()) {
            const row = []
            for (const column of columns) {
                row.push(taxon[column.prop])
            }
            rows.push(row)
        }
        this.spreadSheetService.export(rows)
    }
}
