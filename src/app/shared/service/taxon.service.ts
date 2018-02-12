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
  getTaxonomy(taxonId: string, group?: string): Observable<PagedResult<Taxonomy>> {
    return this.apiService
      .taxonomyFindById(LajiApi.Endpoints.taxonSpecies, taxonId,
        { invasiveSpeciesFilter: true, informalGroupFilters: group, onlyFinnish: false, lang: 'fi' });
  }
  // Get root groups.
  getInformalGroups(lang: string): Observable<PagedResult<Informal>> {
    return this.apiService
      .informalTaxonGroups(LajiApi.Endpoints.informalRoots, { lang: lang });
  }
  // Get taxon description.
  getTaxonDescription(taxonId: string, lang: string): Observable<Array<any>> {
    return this.apiService
      .taxonomyFindById(LajiApi.Endpoints.description, taxonId, { lang: lang, blacklist: 'eol:api' });
  }
  // Get taxon media. (Images).
  getTaxonMedia(taxonId: string, lang: string): Observable<Array<TaxonomyImage>> {
    return this.apiService
      .taxonomyFindById(LajiApi.Endpoints.media, taxonId, { lang: lang, blacklist: 'eol:api' });
  }
  //Get autocomplete for taxon search.
  getAutocomplete(field:string, lang:string):Observable<Array<Autocomplete>>{
    return this.apiService
    .autocompleteFindByField(LajiApi.Endpoints.autocomplete, field, {includeSelf:true,onlyFinnish:true,onlyInvasive:true,onlySpecies:true})
  }
  //Get warehouse query count for taxon search.
  getWareHouseQueryCount(count:number, lang:string):Observable<Array<any>>{
    return this.apiService
    .warehouseQueryCountFindByCount(LajiApi.Endpoints.warehousequerycount,count,{lang:lang});
  }

}
