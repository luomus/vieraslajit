import { Informal } from "../../model";
import { Injectable } from "../../../../../node_modules/@angular/core";
import { EventEmitter } from "events";

export interface TaxonBrowserApiSettings {
    EuList?:boolean;
    FiList?:boolean;

    informalTaxonGroup?:Informal;
}

@Injectable()
export class TaxonBrowserApiSettingsService {
    private _apiSettings:TaxonBrowserApiSettings = {};

    eventEmitter:EventEmitter = new EventEmitter();

    constructor(){}
    get apiSettings() {
        return this._apiSettings;
    }
    set apiSettings(s:TaxonBrowserApiSettings){
        this._apiSettings = s;
        this.eventEmitter.emit('change');
    }
}