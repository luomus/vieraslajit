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

    lastPage = 1;

    eventEmitter:EventEmitter = new EventEmitter();

    constructor(private settingsService:TaxonBrowserApiSettingsService, private apiService:ApiService, private translate:TranslateService) {
        this.query = {
            page: 1,
            pageSize: 12,
            invasiveSpeciesFilter: true,
            lang: this.settingsService.apiSettings.lang,
            includeMedia: true,
            selectedFields: [
                                'vernacularName',
                                'scientificName',
                                'cursiveName',
                                'invasiveSpeciesEstablishment',
                                'administrativeStatuses',
                                'id',
                                'species',
                                'finnish'
                            ],
            sortOrder: 'finnish_name'
        };
    }

    initialize() {
        this.settingsService.eventEmitter.addListener("change", ()=>{
            this.query.page = 1;
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
            tempAdminStatusFilters.push('MX.nationallySignificantInvasiveSpecies');
        }
        if (this.settingsService.apiSettings.PlantPest) {
            tempAdminStatusFilters.push('MX.quarantinePlantPest');
        }
        this.query.adminStatusFilters = tempAdminStatusFilters.toString();

        if (this.settingsService.apiSettings.informalTaxonGroups) {
            this.query.informalGroupFilters = this.settingsService.apiSettings.informalTaxonGroups.toString();
        }

        if (this.settingsService.apiSettings.invasiveSpeciesMainGroups) {
            this.query.invasiveSpeciesMainGroups = this.settingsService.apiSettings.invasiveSpeciesMainGroups.toString();
        }

        this.settingsService.apiSettings.lang? this.query.lang = this.settingsService.apiSettings.lang : null;

        this.settingsService.apiSettings.mode === 'list' ? this.query.pageSize = 2000 : this.query.pageSize = 12;
    }

    updateTaxa(append = false) {
        this.apiService.taxonomyFindById(LajiApi.Endpoints.taxonSpecies, 'MX.37600', this.query).pipe(
            tap((res)=>{this.settingsService.apiSettings.total = res.total; this.lastPage = res.lastPage;}),
            map(res=>res.results)
        ).subscribe(res=>{
            if (append) {
                this.taxa.push(...res);
            } else {
                this.taxa = res;
            }
            this.eventEmitter.emit('done');
        });
        this.eventEmitter.emit('change');
    }

    loadMore() {
        if (this.query.page < this.lastPage) {
            this.query.page++;
            this.updateTaxa(true);
        }
    }
}