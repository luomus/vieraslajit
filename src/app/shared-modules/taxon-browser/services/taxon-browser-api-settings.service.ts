import { Injectable } from "../../../../../node_modules/@angular/core";
import { EventEmitter } from "events";
import { Informal } from "../../../shared/model";

export interface TaxonBrowserApiSettings {
    EuList?:boolean;
    FiList?:boolean;
    PlantPest?:boolean;

    informalTaxonGroups?:Informal[];

    total?:number;

    lang?:string;
}

@Injectable()
export class TaxonBrowserApiSettingsService {
    private _apiSettings:TaxonBrowserApiSettings = {total: 0};

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
    set lang(s:string) {
        this._apiSettings.lang = s;
    }
    clear() {
        this._apiSettings = {total:0};
        this.eventEmitter.emit('change');
    }
}