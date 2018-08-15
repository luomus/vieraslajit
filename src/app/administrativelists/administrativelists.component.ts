import { Component, ViewChild, OnInit, Input, AfterViewInit } from "../../../node_modules/@angular/core";
import { Location } from '@angular/common';
import { TabsetComponent, TabDirective } from "../../../node_modules/ngx-bootstrap";
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import { findContentID, StaticContent } from "../../assets/i18n/cms-content";
import { ListService } from "../shared/service/list.service";
import { TranslateService } from "../../../node_modules/@ngx-translate/core";
import { Taxonomy } from "../shared/model";

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
    @ViewChild('staticTabs') staticTabs: TabsetComponent;
 
    private euList: Array<Taxonomy> = [];
    private fiList: Array<Taxonomy> = [];

    constructor(private route: ActivatedRoute, private location: Location, private listService:ListService, private translate:TranslateService) {

    }

    ngOnInit() {
        this.route.data.subscribe(d=>{
            this.selectTab(parseInt(tabId[d.tab]));
        });
        this.updateEuList();
    }

    selectTab(tab_id: number) {
      this.staticTabs.tabs[tab_id].active = true;
    }

    private updateEuList() {
        this.listService.getEuList('MX.37600', this.translate.currentLang).subscribe(data => {
            this.euList = data.results;
            console.log(this.euList);
          });
    }

    private getEuId(){
        return this.getStaticId(StaticContent.EUList, "fi");
    }

    private getFiId(){
        return this.getStaticId(StaticContent.FIList, "fi");
    }

    private getStaticId(list: StaticContent, lang: string){
        return findContentID(list, lang);
    }

    private tabSelected(e:TabDirective) {
        if(e.heading) this.location.go('administrativelists/' + e.heading);
    }
}