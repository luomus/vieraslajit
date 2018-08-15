import { Component, ViewChild, OnInit, Input, AfterViewInit } from "../../../node_modules/@angular/core";
import { Location } from '@angular/common';
import { TabsetComponent, TabDirective } from "../../../node_modules/ngx-bootstrap";
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import { findContentID, StaticContent } from "../../assets/i18n/cms-content";

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
 
    constructor(private route: ActivatedRoute, private location: Location) {

    }

    ngOnInit() {
        this.route.data.subscribe(d=>{
            this.selectTab(parseInt(tabId[d.tab]));
        });
    }

    selectTab(tab_id: number) {
      this.staticTabs.tabs[tab_id].active = true;
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

    tabSelected(e:TabDirective) {
        if(e.heading) this.location.go('administrativelists/' + e.heading);
    }
}