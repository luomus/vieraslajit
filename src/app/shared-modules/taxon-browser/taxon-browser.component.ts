import { Component, OnInit } from "../../../../node_modules/@angular/core";
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
export class TaxonBrowserComponent implements OnInit{
    taxa:Taxonomy[];

    currentPage:number = 1;

    private langChangeSub:Subscription;

    loading = true;

    constructor(private settingsService:TaxonBrowserApiSettingsService,
        private apiService: TaxonBrowserApiService,
        private translate: TranslateService,
        private parameterService: TaxonBrowserParameterService) {
        
    }

    ngOnInit() {
        this.settingsService.lang = this.translate.currentLang;
        
        this.apiService.initialize();

        this.apiService.eventEmitter.addListener('change', ()=>{
            this.loading=true;
        });
        this.apiService.eventEmitter.addListener('done', ()=>{
            this.taxa = this.apiService.taxa;
            this.loading=false;
        });

        this.parameterService.queryEventEmitter.subscribe((event) => {
            if (event.page) this.currentPage = event.page;
        });
        this.parameterService.init();

        this.langChangeSub = this.translate.onLangChange.subscribe((lang)=> {
            this.settingsService.apiSettings.lang = lang;
        })
    }

    ngOnDestroy() {
        this.langChangeSub ? this.langChangeSub.unsubscribe() : null;
    }

    getPage(page:number) {
        this.parameterService.updateQuery({page: page});
        this.currentPage = page;
    }

    getTotalItems() {
        return this.settingsService.apiSettings.total;
    }

    onInformalGroupSelection(event) {
        this.parameterService.updateQuery({informalTaxonGroups: event, page: 1});
    }

    onFiListCheckbox(event) {
        this.parameterService.updateQuery({FiList: event.target.checked});
    }

    onEuListCheckbox(event) {
        this.parameterService.updateQuery({EuList: event.target.checked});
    }
}