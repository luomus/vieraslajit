import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Taxonomy, TaxonomyDescription, TaxonomyImage } from '../model/Taxonomy';
import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../model/PagedResult';
import { Informal } from '../model/Informal';
import { NewsElement } from '../model/NewsElement';
import { Autocomplete } from '../model/Autocomplete';
import { WarehouseQueryCount } from '../model/Warehouse';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  //Autocomplete
  autocompleteFindByField(endpoint:LajiApi.Endpoints.autocomplete, field: string, query:LajiApi.AutocompleteQuery):Observable<Autocomplete>;
  autocompleteFindByField(endpoint:LajiApi.Endpoints.autocomplete, field: string, query: object = {}):Observable<any>{
    const url = `${environment.lajiApi.url}/${endpoint}`;
    return this.httpClient.get(
     url,
       { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
        );
  }

  //Warehouse query count
  warehouseQueryCountGet(endpoint:LajiApi.Endpoints.warehousequerycount, count:string,query: LajiApi.warehousequerycountQuery):Observable<WarehouseQueryCount>;
  warehouseQueryCountGet(endpoint:LajiApi.Endpoints.warehousequerycount, count:string,query: object = {}):Observable<any>{
    const url = `${environment.lajiApi.url}${endpoint}`;
    return this.httpClient.get(
     url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
      );
  }

  // InformalTaxonGroup
  informalTaxonGroups(endpoint: LajiApi.Endpoints.informalRoots, query: LajiApi.Query): Observable<PagedResult<Informal>>;
  informalTaxonGroups(endpoint: LajiApi.Endpoints, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`;
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  // Taxa
  taxonomyFindById(endpoint: LajiApi.Endpoints.taxon, id: string, query: LajiApi.Query): Observable<Taxonomy>;
  taxonomyFindById(endpoint: LajiApi.Endpoints.media, id: string, query: LajiApi.Query): Observable<Array<TaxonomyImage>>;
  taxonomyFindById(endpoint: LajiApi.Endpoints.description, id: string, query: LajiApi.Query): Observable<Array<any>>;
  taxonomyFindById(endpoint: LajiApi.Endpoints.taxonSpecies, id: string, query: LajiApi.Query): Observable<PagedResult<Taxonomy>>;
  taxonomyFindById(endpoint: LajiApi.Endpoints, id: string, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`.replace('%id%', id);
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  // News
  newsArray(endpoint: LajiApi.Endpoints.newsArray, query: LajiApi.Query): Observable<PagedResult<NewsElement>>;
  newsArray(endpoint: LajiApi.Endpoints, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`;
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }
}

export namespace LajiApi {
  export enum Endpoints {
    informalRoots = 'informal-taxon-groups/roots',
    taxon = 'taxa/%id%',
    taxonSpecies = 'taxa/%id%/species',
    document = 'document',
    description = 'taxa/%id%/descriptions',
    media = 'taxa/%id%/media',
    newsArray = 'news',
    newsElement = 'news/%id%',
    autocomplete ='autocomplete/taxon',
    warehousequerycount='warehouse/query/count'
  }

  export interface Query {
    lang?: string;
    informalGroupFilters?: string;
    invasiveSpeciesFilter?: boolean;
    pageSize?: string;
    page?: string;
    onlyFinnish?: boolean;
    blacklist?: string;
    
    

  }
  export interface AutocompleteQuery{
    q?:string;
    includePayload?:boolean;
    onlyInvasive?:boolean;

  }

  export interface warehousequerycountQuery{
    cache?:boolean;
    taxonId?:string;
    individualCountMin?:number;


  }

}
