import { Injectable } from "../../../../../node_modules/@angular/core";
import { EventEmitter } from "events";

import { TaxonBrowserApiSettingsService } from "./taxon-browser-api-settings.service";
import { Taxonomy } from "../../model";
import { ApiService, LajiApi } from "../../api/api.service";
import { TranslateService } from "../../../../../node_modules/@ngx-translate/core";

@Injectable()
export class TaxonBrowserApiService {

    taxa:Array<Taxonomy> = [];
    private query;

    eventEmitter:EventEmitter = new EventEmitter();

    constructor(private settingsService:TaxonBrowserApiSettingsService, private apiService:ApiService, private translate:TranslateService) {
        this.query = {
            invasiveSpeciesFilter: true,onlyFinnish: false, lang: this.translate.currentLang,
            includeMedia: true, includeDescriptions: true , selectedFields: [ 'vernacularName', 'scientificName', 'invasiveSpeciesEstablishment', 'administrativeStatuses', 'id' ]
        };
    }

    initialize() {
        this.settingsService.eventEmitter.addListener("change", ()=>{
            this.updateQuery();
            this.updateTaxa();
        });
    }

    updateQuery() {
        this.settingsService.apiSettings.EuList ? this.query.adminStatusFilters = 'MX.euInvasiveSpeciesList' : null;
        this.settingsService.apiSettings.FiList ? this.query.adminStatusFilters = 'MX.fiInvasiveSpeciesList' : null;
        this.settingsService.apiSettings.informalTaxonGroup ? this.query.informalGroupFilters = this.settingsService.apiSettings.informalTaxonGroup.id : null;
    }

    updateTaxa() {
        this.apiService.taxonomyFindById(LajiApi.Endpoints.taxonSpecies, 'MX.37600', this.query).subscribe((r)=>{
            this.taxa = r.results;
            this.eventEmitter.emit('change');
        })
    }
}