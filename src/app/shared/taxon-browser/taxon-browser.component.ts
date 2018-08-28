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

    @Input() EuListSelector?:boolean;
    @Input() FiListSelector?:boolean;

    /* Dirty hack that makes sure settings service isn't accessed until ngOnInit has been executed */
    afterInit:boolean = false;
    tempInformal:Informal;
    @Input() set informalTaxonGroup(i:Informal) {
        if(this.afterInit) {
            this.settingsService.informalTaxonGroup = i;
        } else {
            this.tempInformal = i;
        }
    }
    get informalTaxonGroup():Informal {return this.settingsService.apiSettings.informalTaxonGroup}

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
            informalTaxonGroup: this.tempInformal
        }
        this.settingsService.apiSettings = settings;

        this.afterInit = true;
    }

    getPage(page:number) {
        let settings:TaxonBrowserApiSettings = {page: page};
        this.settingsService.apiSettings = settings;
        this.currentPage = page;
    }

    getTotalItems() {
        return this.settingsService.apiSettings.total;
    }
}