import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, Renderer2 } from "../../../../node_modules/@angular/core";
import { TranslateService } from "../../../../node_modules/@ngx-translate/core";
import { Subscription } from "rxjs";

import { TaxonBrowserApiService } from "./services/taxon-browser-api.service";
import { TaxonBrowserApiSettingsService } from "./services/taxon-browser-api-settings.service";
import { Taxonomy } from "../../shared/model";
import { TaxonBrowserParameterService, TaxonBrowserQuery } from "./services/taxon-browser-parameter.service";

@Component({
    selector: "vrs-taxon-browser",
    styleUrls: ["taxon-browser.component.scss"],
    templateUrl: "taxon-browser.component.html",
    providers: [TaxonBrowserApiService, TaxonBrowserApiSettingsService, TaxonBrowserParameterService]
})
export class TaxonBrowserComponent implements OnInit, AfterViewInit {
    taxa:Taxonomy[] = [];
    total: number = 0;

    private langChangeSub:Subscription;

    viewMode: "list" | "grid" = "grid"

    loading = true;

    maxHeight = 400;
    optionsHeight = 400;

    sidebarActive = true;

    @ViewChild('sidebar') sidebar: ElementRef;
    @ViewChild('sidebarToggle') sidebarToggle: ElementRef;
    @ViewChild('cardscont') cardsContainer: ElementRef;
    @ViewChild('optionsmenu') optionsMenu: ElementRef;

    /* CHECKBOXES */
    @ViewChild('plantsCheckbox')        plantsCheckbox: ElementRef;
    @ViewChild('mammalsCheckbox')       mammalsCheckbox: ElementRef;
    @ViewChild('freshwaterCheckbox')    freshwaterCheckbox: ElementRef;
    @ViewChild('balticCheckbox')        balticCheckbox: ElementRef;
    @ViewChild('interiorCheckbox')      interiorCheckbox: ElementRef;
    @ViewChild('forestryCheckbox')      forestryCheckbox: ElementRef;
    @ViewChild('agriculturalCheckbox')  agriculturalCheckbox: ElementRef;
    @ViewChild('fiCheckbox')            fiCheckbox: ElementRef;
    @ViewChild('euCheckbox')            euCheckbox: ElementRef;
    @ViewChild('plantPestCheckbox')     plantPestCheckbox: ElementRef;

    constructor(private settingsService:TaxonBrowserApiSettingsService,
        private apiService: TaxonBrowserApiService,
        private translate: TranslateService,
        private parameterService: TaxonBrowserParameterService,
        private cd: ChangeDetectorRef,
        private renderer: Renderer2) {}

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

        this.parameterService.queryEventEmitter.subscribe((event: TaxonBrowserQuery) => {
            if (event.hasOwnProperty('invasiveSpeciesMainGroups')) {
                const groups: string[] = event.invasiveSpeciesMainGroups;
                groups.includes("HBE.MG2") ? this.plantsCheckbox.nativeElement.checked = true : this.plantsCheckbox.nativeElement.checked = false;
                groups.includes("HBE.MG8") ? this.mammalsCheckbox.nativeElement.checked = true : this.mammalsCheckbox.nativeElement.checked = false;
                groups.includes("HBE.MG5") ? this.freshwaterCheckbox.nativeElement.checked = true : this.freshwaterCheckbox.nativeElement.checked = false;
                groups.includes("HBE.MG4") ? this.balticCheckbox.nativeElement.checked = true : this.balticCheckbox.nativeElement.checked = false;
                groups.includes("HBE.MG9") ? this.interiorCheckbox.nativeElement.checked = true : this.interiorCheckbox.nativeElement.checked = false;
                groups.includes("HBE.MG6") ? this.forestryCheckbox.nativeElement.checked = true : this.forestryCheckbox.nativeElement.checked = false;
                groups.includes("HBE.MG7") ? this.agriculturalCheckbox.nativeElement.checked = true : this.agriculturalCheckbox.nativeElement.checked = false;
            }
            if (event.hasOwnProperty('FiList')) this.fiCheckbox.nativeElement.checked = event.FiList;
            if (event.hasOwnProperty('EuList')) this.euCheckbox.nativeElement.checked = event.EuList;
            if (event.hasOwnProperty('PlantPest')) this.plantPestCheckbox.nativeElement.checked = event.PlantPest;
        });

        this.parameterService.init();

        this.langChangeSub = this.translate.onLangChange.subscribe((lang)=> {
            this.settingsService.apiSettings.lang = lang;
        })

        this.viewMode = this.settingsService.apiSettings.mode;
    }

    ngAfterViewInit() {
        if (window.innerWidth < 768) {
            this.sidebarActive = false;
            this.renderer.setStyle(this.sidebar.nativeElement, "width", "16px");
            this.renderer.removeClass(this.sidebarToggle.nativeElement, "oi-arrow-thick-left");
            this.renderer.addClass(this.sidebarToggle.nativeElement, "oi-arrow-thick-right");
        }
        this.maxHeight = window.innerHeight - this.cardsContainer.nativeElement.offsetTop;
        const viewportOffset = this.optionsMenu.nativeElement.getBoundingClientRect();
        this.optionsHeight = window.innerHeight - viewportOffset.top
        this.cd.detectChanges();
    }

    ngOnDestroy() {
        this.langChangeSub ? this.langChangeSub.unsubscribe() : null;
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

    onFiListCheckbox(event) {
        this.parameterService.updateQuery({FiList: event.target.checked});
    }

    onEuListCheckbox(event) {
        this.parameterService.updateQuery({EuList: event.target.checked});
    }

    onPlantPestCheckbox(event) {
        this.parameterService.updateQuery({PlantPest: event.target.checked});
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
}