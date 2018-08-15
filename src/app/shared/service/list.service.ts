import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { Observable } from 'rxjs';
import { Taxonomy} from '../model/Taxonomy';
import { PagedResult } from '../model';



@Injectable()
export class ListService {

  /* Retrieves a list of species in EU Invasive species list */ 
  constructor(private apiService : ApiService) { }
  getEuList(taxonId: string,lang?: string): Observable<PagedResult<Taxonomy>> {
    return this.apiService
      .taxonomyFindById(LajiApi.Endpoints.taxonSpecies, taxonId,
        {invasiveSpeciesFilter: true,onlyFinnish: false, lang: lang, langFallback: true, adminStatusFilters:'MX.euInvasiveSpeciesList',
        selectedFields: 'vernacularName, descriptions', includeMedia: true, includeDescriptions: true});
  }
  /* Retrieves a list of species in National invasive species list */ 
  getNationalList(taxonId: string,lang?: string): Observable<any> {
    return this.apiService
      .taxonomyFindById(LajiApi.Endpoints.taxonSpecies, taxonId,
        {invasiveSpeciesFilter: true,onlyFinnish: false, lang: lang, langFallback: true, adminStatusFilters:'MX.nationallySignificantInvasiveSpecies'});
  }

}
