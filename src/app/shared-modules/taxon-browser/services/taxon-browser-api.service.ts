import { Injectable } from "@angular/core";
import { TaxonBrowserApiSettingsService } from "./taxon-browser-api-settings.service";
import { filter, map, tap } from "rxjs/operators";
import { Taxonomy } from "../../../shared/model";
import { TaxonService } from "app/shared/service/taxon.service";
import { Subject } from "rxjs";

@Injectable()
export class TaxonBrowserApiService {
    taxa:Array<Taxonomy> = [];
    lastPage = 1;
    eventEmitter = new Subject<'done' | 'change'>();
    private query;

    constructor(
        private settingsService: TaxonBrowserApiSettingsService,
        private taxonService: TaxonService
    ) {
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
            sortOrder: 'observationCountInvasiveFinland DESC'
        };
    }

    initialize() {
        this.settingsService.eventEmitter.subscribe(()=>{
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
            tempAdminStatusFilters.push('MX.controllingRisksOfInvasiveAlienSpecies');
        }
        if (this.settingsService.apiSettings.PlantPests) {
            tempAdminStatusFilters.push('MX.quarantinePlantPest');
            tempAdminStatusFilters.push('MX.qualityPlantPest');
        }
        this.query.adminStatusFilters = tempAdminStatusFilters.toString();

        if (this.settingsService.apiSettings.sortOrder) {
            const s = this.settingsService.apiSettings.sortOrder;
            this.query.sortOrder = s === 'observations' ? 'observationCountInvasiveFinland DESC' : s;
        }

        if (this.settingsService.apiSettings.informalTaxonGroups) {
            this.query.informalGroupFilters = this.settingsService.apiSettings.informalTaxonGroups.toString();
        }

        if (this.settingsService.apiSettings.invasiveSpeciesMainGroups && this.settingsService.apiSettings.invasiveSpeciesMainGroups.length > 0) {
            this.query.invasiveSpeciesMainGroups = this.settingsService.apiSettings.invasiveSpeciesMainGroups.toString();
        } else {
            this.query.invasiveSpeciesMainGroups = 'HBE.MG14';
        }

        this.settingsService.apiSettings.lang? this.query.lang = this.settingsService.apiSettings.lang : null;

        if (this.settingsService.apiSettings.mode === 'list') {
            this.query.pageSize = 2000;
            this.query.sortOrder = 'taxonomic';
        } else this.query.pageSize = 12;
    }

    updateTaxa(append = false) {
        this.taxonService.getTaxa(this.query).pipe(
            tap((res)=>{this.settingsService.apiSettings.total = res.total; this.lastPage = res.lastPage;}),
            map(res=>res.results)
        ).subscribe(res=>{
            if (append) {
                this.taxa.push(...res);
            } else {
                this.taxa = res;
            }
            this.eventEmitter.next('done');
        });
        this.eventEmitter.next('change');
    }

    loadMore() {
        if (this.query.page < this.lastPage) {
            this.query.page++;
            this.updateTaxa(true);
        }
    }
}
