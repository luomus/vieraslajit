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
import { Information } from '../model/Information';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  // Autocomplete
  autocompleteFindByField(endpoint: LajiApi.Endpoints.autocomplete, field: string, query: LajiApi.AutocompleteQuery): Observable<Autocomplete>;
  autocompleteFindByField(endpoint: LajiApi.Endpoints.autocomplete, field: string, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`;
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  // Warehouse query count
  warehouseQueryCountGet(endpoint: LajiApi.Endpoints.warehousequerycount, count: string, query: LajiApi.warehousequerycountQuery): Observable<WarehouseQueryCount>;
  warehouseQueryCountGet(endpoint: LajiApi.Endpoints.warehousequerycount, count: string, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}${endpoint}`;
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /* Get root informal taxon groups */
  informalTaxonGroups(endpoint: LajiApi.Endpoints.informalRoots, query: LajiApi.Query): Observable<PagedResult<Informal>>;
  /*
  * @param endpoint,
  * @param query
  * */
  informalTaxonGroups(endpoint: LajiApi.Endpoints, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`;
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /* Returns range that is of type select (alt) */
  fetchMetadata(endpoint: LajiApi.Endpoints.metadataRange, range: string, query: LajiApi.Query): Observable<Array<any>>;
  /*
  * @param endpoint
  * @param range
  * @param query
  * */
  fetchMetadata(endpoint: LajiApi.Endpoints, range?: string, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`.replace('%range%', range);
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /* Return taxon data with the given query */
  taxonomyFindById(endpoint: LajiApi.Endpoints.taxon, id: string, query: LajiApi.Query): Observable<Taxonomy>;
  /* Return media object of the given taxon */
  taxonomyFindById(endpoint: LajiApi.Endpoints.media, id: string, query: LajiApi.Query): Observable<Array<TaxonomyImage>>;
  /* Return  description texts from Laji.fi taxonomy database */
  taxonomyFindById(endpoint: LajiApi.Endpoints.description, id: string, query: LajiApi.Query): Observable<Array<any>>;
  /* Return species belonging to the given taxon */
  taxonomyFindById(endpoint: LajiApi.Endpoints.taxonSpecies, id: string, query: LajiApi.Query): Observable<PagedResult<Taxonomy>>;
  /* Return taxons parents all the way up to biota */
  taxonomyFindById(endpoint: LajiApi.Endpoints.taxonParents, id: string, query: LajiApi.Query): Observable<Array<Taxonomy>>;
  /*
  * @param endpoint
  * @param id
  * @param query
  * */
  taxonomyFindById(endpoint: LajiApi.Endpoints, id: string, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`.replace('%id%', id);
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /* Return news */
  newsFindAll(endpoint: LajiApi.Endpoints.newsArray, query: LajiApi.Query): Observable<PagedResult<NewsElement>>;
  /*
  * @param endpoint
  * @param query
  * */
  newsFindAll(endpoint: LajiApi.Endpoints, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`;
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /* Return information with the given id */
  informationFindById(endpoint: LajiApi.Endpoints.information, id: string): Observable<Information>;
  /*
  * @param endpoint
  * @param id
  * */
  informationFindById(endpoint: LajiApi.Endpoints, id: string): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`.replace('%id%', id);
    return this.httpClient.get(
      url,
      { params: { 'access_token': environment.lajiApi.accessToken } }
    );
  }
}

export namespace LajiApi {
  /* Endpoints in api.laji.fi */
  export enum Endpoints {
    informalRoots = 'informal-taxon-groups/roots',
    taxonParents = 'taxa/%id%/parents',
    taxon = 'taxa/%id%',
    taxonSpecies = 'taxa/%id%/species',
    document = 'document',
    description = 'taxa/%id%/descriptions',
    media = 'taxa/%id%/media',
    metadataRange = 'metadata/ranges/%range%',
    newsArray = 'news',
    newsElement = 'news/%id%',
    autocomplete = 'autocomplete/taxon',
    warehousequerycount = 'warehouse/query/count',
    information = 'information/%id%'
  }
  /* Possible query parameters. */
  export interface Query {
    lang?: string;
    informalGroupFilters?: string;
    invasiveSpeciesFilter?: boolean;
    pageSize?: string;
    page?: string;
    onlyFinnish?: boolean;
    blacklist?: string;
    selectedFields?: string;
    langFallback?: boolean;
    hasMediaFilter?: boolean;
    includeMedia?: boolean;
  }
  export interface AutocompleteQuery {
    q?: string;
    includePayload?: boolean;
    onlyInvasive?: boolean;
  }

  export interface warehousequerycountQuery {
    cache?: boolean;
    taxonId?: string;
    individualCountMin?: number;


  }

}
