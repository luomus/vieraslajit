import { Component, ViewChild, OnInit, Input, AfterViewInit } from "../../../node_modules/@angular/core";
import { Location } from '@angular/common';
import { TabsetComponent, TabDirective } from "../../../node_modules/ngx-bootstrap";
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import { findContentID, StaticContent } from "../../assets/i18n/cms-content";
import { ListService } from "../shared/service/list.service";
import { TranslateService } from "../../../node_modules/@ngx-translate/core";
import { Taxonomy } from "../shared/model";
import { Subscription } from "rxjs";

export enum tabId {
    eu = 0,
    fi = 1
}

@Component({
    selector: 'vrs-administrativelists',
    templateUrl: './administrativelists.html',
    styleUrls: ['./administrativelists.scss']
})
export class AdministrativelistsComponent implements OnInit {

    private euList: Array<Taxonomy> = [];
    private fiList: Array<Taxonomy> = [];

    mode:tabId=0;

    constructor(private route: ActivatedRoute, private location: Location, private listService:ListService, private translate:TranslateService) {
        
    }

    ngOnInit() {
        this.route.data.subscribe(d=>{
            if(d.tab == "fi") {
                this.mode=1;
                this.updateFiList();
            } else {
                this.mode=0;
                this.updateEuList();
            }
        });
    }

    private updateEuList() {
        this.listService.getEuList('MX.37600', this.translate.currentLang).subscribe(data => {
            this.euList = data.results;
          });
    }

    private updateFiList() {
        this.listService.getNationalList('MX.37600', this.translate.currentLang).subscribe(data => {
            this.euList = data.results;
          });
    }

    getEuId(){
        return this.getStaticId(StaticContent.EUList, this.translate.currentLang);
    }

    getFiId(){
        return this.getStaticId(StaticContent.FIList, this.translate.currentLang);
    }
    
    getEuObligationsId(){
        return this.getStaticId(StaticContent.EuListObligations, this.translate.currentLang);
    }

    getFiObligationsId(){
        return this.getStaticId(StaticContent.FIListObligations, this.translate.currentLang);
    }

    private getStaticId(content: StaticContent, lang: string){
        return findContentID(content, lang);
    }
}