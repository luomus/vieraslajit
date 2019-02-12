import { Injectable } from "../../../../../node_modules/@angular/core";
import { EventEmitter } from "events";
import { Informal } from "../../../shared/model";

export interface TaxonBrowserApiSettings {
    EuList?:boolean;
    FiList?:boolean;

    informalTaxonGroups?:Informal[];

    page?:number;
    total?:number;

    lang?:string;
}

@Injectable()
export class TaxonBrowserApiSettingsService {
    private _apiSettings:TaxonBrowserApiSettings = {page: 1, total: 0};

    eventEmitter:EventEmitter = new EventEmitter();

    constructor(){}
    get apiSettings() {
        return this._apiSettings;
    }
    set apiSettings(s:TaxonBrowserApiSettings){
        Object.keys(s).forEach((key)=>{
            this._apiSettings[key] = s[key];
        })
        this.eventEmitter.emit('change');
    }
    setPage(page: number) {
        this._apiSettings.page = page;
        this.eventEmitter.emit('change');
    }
    set lang(s:string) {
        this._apiSettings.lang = s;
    }
}