import { Injectable } from "../../../../../node_modules/@angular/core";
import { EventEmitter } from "events";

import { TaxonBrowserApiSettingsService } from "./taxon-browser-api-settings.service";
import { Taxonomy } from "../../model";
import { ApiService, LajiApi } from "../../api/api.service";
import { TranslateService } from "../../../../../node_modules/@ngx-translate/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class TaxonBrowserApiService {

    taxa:Array<Taxonomy> = [];
    asyncTaxa:Observable<Array<Taxonomy>>;
    private query;

    eventEmitter:EventEmitter = new EventEmitter();

    constructor(private settingsService:TaxonBrowserApiSettingsService, private apiService:ApiService, private translate:TranslateService) {
        this.query = { page: 1, pageSize: 12,
            invasiveSpeciesFilter: true,onlyFinnish: false, lang: this.settingsService.apiSettings.lang,
            includeMedia: true, includeDescriptions: true , selectedFields: [ 'vernacularName', 'scientificName', 'invasiveSpeciesEstablishment', 'administrativeStatuses', 'id' ]
        };
    }

    initialize() {
        this.settingsService.eventEmitter.addListener("change", ()=>{
            console.log("change in settings");
            this.updateQuery();
            this.updateTaxa();
        });
    }

    updateQuery() {
        this.settingsService.apiSettings.EuList ? this.query.adminStatusFilters = 'MX.euInvasiveSpeciesList' : null;
        this.settingsService.apiSettings.FiList ? this.query.adminStatusFilters = 'MX.fiInvasiveSpeciesList' : null;
        this.settingsService.apiSettings.informalTaxonGroup ? this.query.informalGroupFilters = this.settingsService.apiSettings.informalTaxonGroup.id : null;
        this.settingsService.apiSettings.page? this.query.page = this.settingsService.apiSettings.page : null;
        this.settingsService.apiSettings.lang? this.query.lang = this.settingsService.apiSettings.lang : null;
    }

    updateTaxa() {
        this.asyncTaxa = this.apiService.taxonomyFindById(LajiApi.Endpoints.taxonSpecies, 'MX.37600', this.query).pipe(
            tap((res)=>{this.settingsService.apiSettings.total = res.total;
                        this.eventEmitter.emit('done');}),
            map(res=>res.results)
        );
        this.eventEmitter.emit('change');
    }
}