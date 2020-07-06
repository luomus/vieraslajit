import { Injectable } from "../../../../../node_modules/@angular/core";
import { EventEmitter } from "events";
import { Informal } from "../../../shared/model";
import { SortOrder } from "../select-sort-order/select-sort-order.component";

export interface TaxonBrowserApiSettings {
    EuList?:boolean;
    FiList?:boolean;
    QuarantinePests?:boolean;
    QualityPests?:boolean;

    mode?:'grid'|'list';

    informalTaxonGroups?:Informal[];
    invasiveSpeciesMainGroups?:string[];

    total?:number;

    lang?:string;

    sortOrder?:SortOrder;
}

@Injectable()
export class TaxonBrowserApiSettingsService {
    private _apiSettings:TaxonBrowserApiSettings = {total: 0, mode: 'grid', sortOrder: 'observations'};

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
        this._apiSettings = {total:0, 'mode': 'grid'};
        this.eventEmitter.emit('change');
    }
}
