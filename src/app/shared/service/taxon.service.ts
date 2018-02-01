import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../model/PagedResult';
import { Taxonomy } from '../model/Taxonomy';
import { Informal } from '../model/Informal';
import { query } from '@angular/core/src/render3/instructions';

@Injectable()
export class TaxonService {

  constructor(private apiService: ApiService) { }


  getTaxonomy(taxonId: string): Observable<PagedResult<Taxonomy>> {
    return this.apiService
      .taxonomyFindById(LajiApi.Endpoints.taxonSpecies, taxonId, {invasiveSpeciesFilter: true});
  }

  getInformalGroups(lang: string): Observable<PagedResult<Informal>> {
    return this.apiService
    .informalTaxonGroups(LajiApi.Endpoints.informalRoots, {lang: lang});
  }
}
