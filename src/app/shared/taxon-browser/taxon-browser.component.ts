import { Component, Input, OnInit } from "../../../../node_modules/@angular/core";
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
    providers: [TaxonBrowserApiService, TaxonBrowserApiSettingsService]
})
export class TaxonBrowserComponent implements OnInit{
    @Input() EuList?:boolean;
    @Input() FiList?:boolean;
    @Input() EuListSelector?:boolean;
    @Input() FiListSelector?:boolean;

    taxa:Array<Taxonomy> = [{vernacularName: "placeholder"}];

    currentPage:number = 1;
    pageData:Array<Taxonomy> = [];

    itemsPerPage:number = 12;

    /* List */
    columns: Array<any> = [];

    constructor(private settingsService:TaxonBrowserApiSettingsService, private apiService: TaxonBrowserApiService, private translate: TranslateService) {
        this.columns = [
            { prop: 'vernacularName', name: this.translate.instant('taxonomy.folkname'), canAutoResize: true, draggable: false, resizeable: false, minWidth: 150 },
            { prop: 'scientificName', name: this.translate.instant('taxonomy.scientificname'), canAutoResize: true, draggable: false, resizeable: false, minWidth: 150 },
            { prop: 'stableString', name: this.translate.instant('taxonomy.established'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
            { prop: 'onEUList', name: this.translate.instant('taxonomy.onEuList'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
            { prop: 'onNationalList', name: this.translate.instant('taxonomy.finnishList'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
            { prop: 'isQuarantinePlantPest', name: this.translate.instant('taxonomy.list.quarantinePlantPest'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false }
        ];
    }

    ngOnInit() {
        this.apiService.initialize();
        let settings:TaxonBrowserApiSettings = {
            EuList: this.EuList,
            FiList: this.FiList
        }
        this.settingsService.apiSettings = settings;

        this.apiService.eventEmitter.addListener('change', ()=>{
            this.taxa = this.apiService.taxa;
            this.loadGridPage(1);
        });
    }

    onDatatableSelect(e) {
        
    }

    onDatatablePageChange() {

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