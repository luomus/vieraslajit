import { Injectable } from "../../../../../node_modules/@angular/core";
import { EventEmitter } from "events";
import { Informal } from "../../../shared/model";

export interface TaxonBrowserApiSettings {
    EuList?:boolean;
    FiList?:boolean;

    informalTaxonGroup?:Informal;

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
    set informalTaxonGroup(s:Informal) {
        this._apiSettings.informalTaxonGroup = s;
        this.eventEmitter.emit('change');
    }
    set lang(s:string) {
        this._apiSettings.lang = s;
        this.eventEmitter.emit('change');
    }
}