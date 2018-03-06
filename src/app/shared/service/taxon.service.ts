import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../model/PagedResult';
import { Taxonomy, TaxonomyDescription, TaxonomyImage } from '../model/Taxonomy';
import { Informal } from '../model/Informal';
import { query } from '@angular/core/src/render3/instructions';
import { Autocomplete } from '../model/Autocomplete';

@Injectable()
export class TaxonService {

  constructor(private apiService: ApiService) { }

  // Get all species in the group.
  getTaxonomy(taxonId: string, group?: string, lang?: string, pageNumber?: number): Observable<PagedResult<Taxonomy>> {
    return this.apiService
      .taxonomyFindById(LajiApi.Endpoints.taxonSpecies, taxonId,
        { invasiveSpeciesFilter: true, informalGroupFilters: group, onlyFinnish: false, lang: lang, langFallback: false, pageSize: 50, page: pageNumber });
  }

  // Get one taxon
  getTaxon(taxonId: string, lang?: string): Observable<Taxonomy> {
    return this.apiService
      .taxonomyFindById(LajiApi.Endpoints.taxon, taxonId, { lang: lang , langFallback: false});
  }
  // Get root groups.
  getInformalGroups(lang: string): Observable<PagedResult<Informal>> {
    return this.apiService
      .informalTaxonGroups(LajiApi.Endpoints.informalRoots, { lang: lang });
  }
  // Get taxon description.
  getTaxonDescription(taxonId: string, lang: string): Observable<Array<any>> {
    return this.apiService
      .taxonomyFindById(LajiApi.Endpoints.description, taxonId, { lang: lang, langFallback: false });
  }
  // Get taxon media. (Images).
  getTaxonMedia(taxonId: string, lang: string): Observable<Array<TaxonomyImage>> {
    return this.apiService
      .taxonomyFindById(LajiApi.Endpoints.media, taxonId, { lang: lang, blacklist: 'eol:api' });
  }
  // Get taxon parents up to Biota
  getTaxonParents(taxonId: string, lang: string): Observable<Array<Taxonomy>> {
    return this.apiService
      .taxonomyFindById(LajiApi.Endpoints.taxonParents, taxonId,
        { lang: lang, selectedFields: 'id, vernacularName, scientificName, taxonRank' });
  }
  // Get autocomplete for taxon search.
  getAutocomplete(field: string, q: string): Observable<any> {
    return this.apiService
      .autocompleteFindByField(LajiApi.Endpoints.autocomplete, field, { q, includePayload: true, onlyInvasive: true });
  }
  // Get warehouse query count for taxon search.
  getWareHouseQueryCount(count: string, lang: string, taxonId): Observable<any> {
    return this.apiService
      .warehouseQueryCountGet(LajiApi.Endpoints.warehousequerycount, count, { cache: false, taxonId, individualCountMin: 1 });
  }
}
