import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { Observable } from 'rxjs';
import { PagedResult } from '../model/PagedResult';
import { Taxonomy, TaxonomyDescription } from '../model/Taxonomy';

@Injectable()
export class TaxonService {

  constructor(
    private apiService: ApiService
  ) { }

  getAutocompleteInvasive(query: string) {
    return this.apiService.getAutocompleteTaxa(
      {
        query,
        invasiveSpecies: true
      }
    );
  }

  postTaxaFilters(body: LajiApi.PostTaxaBody, query: LajiApi.PostTaxaQuery) {
    return this.apiService.postTaxa(body, query);
  }

  getTaxonById(taxonId: string, query: LajiApi.GetTaxonQuery) {
    return this.apiService.getTaxon(
      taxonId,
      {
        ...query
      }
    );
  }

  getTaxonDescriptionById(taxonId: string): Observable<TaxonomyDescription> {
    return this.apiService.getTaxonDescription(taxonId);
  }

  //check
  getTaxonMediaById(id: string) {
    console.log('Fetching media for taxon ID:', id);
    return this.apiService.getTaxonMedia(id);
  }

  getSpecies(taxonId: string): Observable<PagedResult<Taxonomy>> {
    return this.apiService.getTaxonSpecies(
      taxonId,
      {
        invasiveSpecies: true,
        includeMedia: true
      }
    );
  }
}