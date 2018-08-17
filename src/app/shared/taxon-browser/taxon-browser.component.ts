import { Component, Input, OnInit, ViewEncapsulation } from "../../../../node_modules/@angular/core";
import { TranslateService, TranslatePipe } from "../../../../node_modules/@ngx-translate/core";
import { NgModel } from "../../../../node_modules/@angular/forms";
import { Informal, Taxonomy } from "../model";
import { TaxonBrowserApiService } from "./services/taxon-browser-api.service";
import { TaxonBrowserApiSettingsService, TaxonBrowserApiSettings } from "./services/taxon-browser-api-settings.service";

import * as $ from 'jquery';

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

    taxa:Array<Taxonomy> = [{vernacularName: "placeholder"}];

    currentPage:number = 1;
    pageData:Array<Taxonomy> = [];

    itemsPerPage:number = 12;

    constructor(private settingsService:TaxonBrowserApiSettingsService, private apiService: TaxonBrowserApiService, private translate: TranslateService) {
        
    }

    ngOnInit() {
        this.apiService.initialize();
        let settings:TaxonBrowserApiSettings = {
            EuList: this.EuList,
            FiList: this.FiList,
            informalTaxonGroup: this.informalTaxonGroup
        }
        this.settingsService.apiSettings = settings;

        this.apiService.eventEmitter.addListener('change', ()=>{
            this.taxa = this.apiService.taxa;
            this.loadGridPage(1);
        });
    }

    onGridPageChanged(event) {
        if(event.page < 1) return;
        this.loadGridPage(event.page);
        $('html, body').animate({ scrollTop: ($('#browser-tabset').offset().top - 80) });
    }

    loadGridPage(pageNo:number) {
        let start = (pageNo - 1) * this.itemsPerPage;
        let end = start + this.itemsPerPage;
        this.pageData = this.taxa.slice(start, end);
    }
}