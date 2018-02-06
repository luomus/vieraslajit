import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../model/PagedResult';
import { Taxonomy, TaxonomyDescription } from '../model/Taxonomy';
import { Informal } from '../model/Informal';
import { query } from '@angular/core/src/render3/instructions';

@Injectable()
export class TaxonService {

  constructor(private apiService: ApiService) { }


  getTaxonomy(taxonId: string, group: string): Observable<PagedResult<Taxonomy>> {
    return this.apiService
      .taxonomyFindById(LajiApi.Endpoints.taxonSpecies, taxonId,
      { invasiveSpeciesFilter: true, informalGroupFilters: group, onlyFinnish: true, lang: 'fi' });
  }

  getInformalGroups(lang: string): Observable<PagedResult<Informal>> {
    return this.apiService
      .informalTaxonGroups(LajiApi.Endpoints.informalRoots, { lang: lang });
  }

  getTaxonDescription(taxonId: string, lang: string): Observable<Array<any>> {
    return this.apiService
      .taxonomyFindById(LajiApi.Endpoints.description, taxonId, {lang: lang, blacklist: 'eol:api'});
  }
}
