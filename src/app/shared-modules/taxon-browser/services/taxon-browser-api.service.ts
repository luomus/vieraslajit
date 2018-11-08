import { Injectable } from "../../../../../node_modules/@angular/core";
import { EventEmitter } from "events";

import { TaxonBrowserApiSettingsService } from "./taxon-browser-api-settings.service";
import { TranslateService } from "../../../../../node_modules/@ngx-translate/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Taxonomy } from "../../../shared/model";
import { ApiService, LajiApi } from "../../../shared/api/api.service";

@Injectable()
export class TaxonBrowserApiService {

    taxa:Array<Taxonomy> = [];
    private query;

    eventEmitter:EventEmitter = new EventEmitter();

    constructor(private settingsService:TaxonBrowserApiSettingsService, private apiService:ApiService, private translate:TranslateService) {
        this.query = { page: 1, pageSize: 12,
            invasiveSpeciesFilter: true,onlyFinnish: false, lang: this.settingsService.apiSettings.lang,
            includeMedia: true, includeDescriptions: true , selectedFields: [ 'vernacularName', 'scientificName', 'invasiveSpeciesEstablishment', 'administrativeStatuses', 'id', 'species', 'finnish' ],
            sortOrder: 'finnish_name'
        };
    }

    initialize() {
        this.settingsService.eventEmitter.addListener("change", ()=>{
            this.updateQuery();
            this.updateTaxa();
        });
    }

    updateQuery() {
        let tempAdminStatusFilters:string[] = [];
        if (this.settingsService.apiSettings.EuList) {
            tempAdminStatusFilters.push('MX.euInvasiveSpeciesList');
        }
        if (this.settingsService.apiSettings.FiList) {
            tempAdminStatusFilters.push('MX.nationalInvasiveSpeciesStrategy');
        }
        this.query.adminStatusFilters = tempAdminStatusFilters.toString();

        if (this.settingsService.apiSettings.informalTaxonGroups) {
            this.query.informalGroupFilters = this.settingsService.apiSettings.informalTaxonGroups.toString();
        }

        this.settingsService.apiSettings.page? this.query.page = this.settingsService.apiSettings.page : null;

        this.settingsService.apiSettings.lang? this.query.lang = this.settingsService.apiSettings.lang : null;
    }

    updateTaxa() {
        this.apiService.taxonomyFindById(LajiApi.Endpoints.taxonSpecies, 'MX.37600', this.query).pipe(
            tap((res)=>{this.settingsService.apiSettings.total = res.total}),
            map(res=>res.results)
        ).subscribe(res=>{
            this.taxa = res;
            this.eventEmitter.emit('done');
        });
        this.eventEmitter.emit('change');
    }
}