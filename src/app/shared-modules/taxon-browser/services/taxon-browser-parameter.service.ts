import { Injectable, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TaxonBrowserApiSettingsService, TaxonBrowserApiSettings } from "./taxon-browser-api-settings.service";

export interface TaxonBrowserQuery extends TaxonBrowserApiSettings {
    tab?: "grid" | "list";
}

@Injectable()
export class TaxonBrowserParameterService {

    private query: TaxonBrowserQuery = {};
    queryEventEmitter: EventEmitter<any> = new EventEmitter<any>();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private settings: TaxonBrowserApiSettingsService) {}
    
    init() {
        this.route.queryParams.subscribe((params) => {
            // Translate strings to booleans (queryparams are always string)
            const mutated: TaxonBrowserQuery = {...params};
            Object.keys(mutated).forEach((key) => {
                if(mutated[key] === "true") {
                    mutated[key] = true;
                }
                if(mutated[key] === "false") {
                    mutated[key] = false;
                }
            })
            this.query = mutated;
            this.settings.apiSettings = mutated;
            this.queryEventEmitter.emit(mutated);
       })
    }

    updateQuery(s: TaxonBrowserApiSettings) {
        Object.keys(s).forEach((key)=>{
            this.query[key] = s[key];
        });
        this.router.navigate([], { queryParams: this.query });
    }

    clearQuery() {
        let q = {
            invasiveSpeciesMainGroups: [],
            FiList: false,
            EuList: false,
            PlantPest: false
        }
        this.router.navigate([], { queryParams: q });
    }
}