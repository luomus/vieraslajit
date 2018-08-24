import { Component, Input, OnInit, ViewEncapsulation } from "../../../../node_modules/@angular/core";
import { TranslateService, TranslatePipe } from "../../../../node_modules/@ngx-translate/core";
import { NgModel } from "../../../../node_modules/@angular/forms";
import { Informal, Taxonomy } from "../model";
import { TaxonBrowserApiService } from "./services/taxon-browser-api.service";
import { TaxonBrowserApiSettingsService, TaxonBrowserApiSettings } from "./services/taxon-browser-api-settings.service";

import * as $ from 'jquery';
import { Observable } from "rxjs";

@Component({
    selector: "vrs-taxon-browser",
    styleUrls: ["taxon-browser.component.scss"],
    templateUrl: "taxon-browser.component.html",
    providers: [TaxonBrowserApiService, TaxonBrowserApiSettingsService],
    encapsulation: ViewEncapsulation.None
})
export class TaxonBrowserComponent implements OnInit{
    @Input() EuList?:boolean = false;
    @Input() FiList?:boolean = false;
    @Input() informalTaxonGroup?:Informal;

    @Input() EuListSelector?:boolean;
    @Input() FiListSelector?:boolean;

    asyncTaxa:Observable<Taxonomy[]>;

    currentPage:number = 1;
    pageData:Array<Taxonomy> = [];
    total = 0;

    itemsPerPage:number = 12;

    constructor(private settingsService:TaxonBrowserApiSettingsService, private apiService: TaxonBrowserApiService, private translate: TranslateService) {
        
    }

    ngOnInit() {
        this.apiService.initialize();

        this.apiService.eventEmitter.addListener('change', ()=>{
            this.asyncTaxa = this.apiService.asyncTaxa;
        });

        let settings:TaxonBrowserApiSettings = {
            EuList: this.EuList,
            FiList: this.FiList,
            informalTaxonGroup: this.informalTaxonGroup
        }
        this.settingsService.apiSettings = settings;
    }

    getPage(page:number) {
        let settings:TaxonBrowserApiSettings = {page: page};
        this.settingsService.apiSettings = settings;
        this.currentPage = page;
    }
}