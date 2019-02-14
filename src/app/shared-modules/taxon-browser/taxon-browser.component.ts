import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from "../../../../node_modules/@angular/core";
import { TranslateService } from "../../../../node_modules/@ngx-translate/core";
import { Subscription } from "rxjs";

import { TaxonBrowserApiService } from "./services/taxon-browser-api.service";
import { TaxonBrowserApiSettingsService } from "./services/taxon-browser-api-settings.service";
import { Taxonomy } from "../../shared/model";
import { TaxonBrowserParameterService } from "./services/taxon-browser-parameter.service";

@Component({
    selector: "vrs-taxon-browser",
    styleUrls: ["taxon-browser.component.scss"],
    templateUrl: "taxon-browser.component.html",
    providers: [TaxonBrowserApiService, TaxonBrowserApiSettingsService, TaxonBrowserParameterService]
})
export class TaxonBrowserComponent implements OnInit, AfterViewInit {
    taxa:Taxonomy[] = [];

    private langChangeSub:Subscription;

    viewMode: "list" | "grid" = "grid"

    loading = true;

    maxHeight = 400;

    @ViewChild('cardscont') cardsContainer: ElementRef;

    constructor(private settingsService:TaxonBrowserApiSettingsService,
        private apiService: TaxonBrowserApiService,
        private translate: TranslateService,
        private parameterService: TaxonBrowserParameterService,
        private cd: ChangeDetectorRef) {
        
    }

    ngOnInit() {
        this.settingsService.lang = this.translate.currentLang;
        
        this.apiService.initialize();

        this.apiService.eventEmitter.addListener('change', ()=>{
        });
        this.apiService.eventEmitter.addListener('done', ()=>{
            // duplicate array to avoid mutability problems
            this.taxa = this.apiService.taxa.slice();
            this.loading=false;
        });

        this.parameterService.init();

        this.langChangeSub = this.translate.onLangChange.subscribe((lang)=> {
            this.settingsService.apiSettings.lang = lang;
        })
    }

    ngAfterViewInit() {
        this.maxHeight = window.innerHeight - this.cardsContainer.nativeElement.offsetTop - 13;
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

    onFiListCheckbox(event) {
        this.parameterService.updateQuery({FiList: event.target.checked});
    }

    onEuListCheckbox(event) {
        this.parameterService.updateQuery({EuList: event.target.checked});
    }
    
    onScroll() {
        this.apiService.loadMore();
    }
}