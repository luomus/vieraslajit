import { Informal } from "../../model";
import { Injectable } from "../../../../../node_modules/@angular/core";
import { EventEmitter } from "events";

export interface TaxonBrowserApiSettings {
    EuList?:boolean;
    FiList?:boolean;

    informalTaxonGroup?:Informal;

    page?:number;
    total?:number;
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
        /* this._apiSettings = s; */
        Object.keys(s).forEach((key)=>{
            this._apiSettings[key] = s[key];
        })
        this.eventEmitter.emit('change');
    }
}