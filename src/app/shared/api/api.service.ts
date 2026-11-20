import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Taxonomy, TaxonomyDescription, TaxonomyImage } from '../model/Taxonomy';
import { Observable } from 'rxjs';
import { Area } from '../model/Area';
import { AuthenticationEvent } from '../model/AuthenticationEvent';
import { AutocompleteResult } from '../model/Autocomplete';
import { Metadata } from '../model/Metadata';
import { PagedResult } from '../model/PagedResult';
import { Person } from '../model/Person';
import { NewsElement } from '../model/NewsElement';
import { Information } from '../model/Information';
import { Document } from '../model/Document';
import { UserService } from '../service/user.service';
import { getLanguageFromLocalStorage } from '../../local-storage';
import { WarehouseQueryInterface } from '../../shared-modules/observation-map/observation-map/import-from-laji-front/WarehouseQueryInterface';

/**
 * Handles creation of API requests
 */

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  private get lajiApiHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Api-Version': '1' });
    const language = getLanguageFromLocalStorage();
    const personToken = UserService.getPersonToken();

    headers = headers.set('Accept-Language', language ?? 'fi');

    if (personToken !== null) {
      headers = headers.set('Person-Token', personToken);
    }

    return headers;
  }

  // HTTP methods

  httpGet(endpoint: LajiApi.Endpoints | string, options: any = {}): Observable<any> {
    return this.httpClient.get(
      `${environment.lajiApi.url}/${endpoint}`,
      { ...options, headers: this.lajiApiHeaders }
    );
  }

  httpPost(endpoint: LajiApi.Endpoints | string, body: any, options: any = {}): Observable<any> {
    return this.httpClient.post(
      `${environment.lajiApi.url}/${endpoint}`,
      body,
      { ...options, headers: this.lajiApiHeaders }
    );
  }

  httpPut(endpoint: LajiApi.Endpoints | string, body: any, options: any = {}): Observable<any> {
    return this.httpClient.put(
      `${environment.lajiApi.url}/${endpoint}`,
      body,
      { ...options, headers: this.lajiApiHeaders });
  }

  httpDelete(endpoint: LajiApi.Endpoints | string, options: any = {}): Observable<any> {
    return this.httpClient.delete(
      `${environment.lajiApi.url}/${endpoint}`,
      { ...options, headers: this.lajiApiHeaders }
    );
  }

  // API methods

  getAreas(query: LajiApi.GetAreasQuery): Observable<PagedResult<Area>> {
    return this.httpGet(
      LajiApi.Endpoints.areas,
      { params: {...query} }
    );
  }

  getAuthenticationEvent(): Observable<AuthenticationEvent> {
    return this.httpGet(LajiApi.Endpoints.authenticationEvent);
  }

  deleteAuthenticationEvent(): Observable<void> {
    return this.httpDelete(LajiApi.Endpoints.authenticationEvent);
  }

  getAutocompleteTaxa(query: LajiApi.GetAutocompleteQuery): Observable<PagedResult<AutocompleteResult>> {
    return this.httpGet(
      LajiApi.Endpoints.autocompleteTaxa,
      { params: {...query} }
    );
  }

  getDocuments(query: LajiApi.GetDocumentsQuery): Observable<PagedResult<Document>> {
    return this.httpGet(
      LajiApi.Endpoints.documents,
      { params: {...query} }
    );
  }

  postDocument(body: Document): Observable<Document> {
    return this.httpPost(
      LajiApi.Endpoints.documents,
      body
    );
  }

  getDocument(id: string): Observable<Document> {
    return this.httpGet(
      LajiApi.Endpoints.document.replace('%id%', id)
    );
  }

  putDocument(id: string, body: Document): Observable<Document> {
    return this.httpPut(
      LajiApi.Endpoints.document.replace('%id%', id),
      body
    );
  }

  getForm(id: string): Observable<any> {
    return this.httpGet(
      LajiApi.Endpoints.form.replace('%id%', id)
    );
  }

  getInformation(id: string): Observable<Information> {
    return this.httpGet(
      LajiApi.Endpoints.information.replace('%id%', id)
    )
  }

  getMetadataAlt(alt: string): Observable<PagedResult<Metadata>>{
    return this.httpGet(LajiApi.Endpoints.metadataAlt.replace('%alt%', alt));
  }

  getNews(query: LajiApi.Query): Observable<PagedResult<NewsElement>> {
    return this.httpGet(
      LajiApi.Endpoints.news,
      { params: {...query} }
    );
  }

  getNewsId(id: string): Observable<NewsElement> {
    return this.httpGet(
      LajiApi.Endpoints.newsId.replace('%id%', id),
    )
  }

  getPerson(): Observable<Person> {
    return this.httpGet(LajiApi.Endpoints.person);
  }

  postTaxa(body: LajiApi.PostTaxaBody, query: LajiApi.PostTaxaQuery): Observable<PagedResult<Taxonomy>>{
    return this.httpPost(
      LajiApi.Endpoints.taxa,
      body,
      { params: {...query} }
    )
  }

  getTaxon(id: string, query?: LajiApi.GetTaxonQuery): Observable<Taxonomy> {
    return this.httpGet(
      LajiApi.Endpoints.taxon.replace('%id%', id),
      { params: {...query} }
    );
  }

  getTaxonDescription(id: string): Observable<TaxonomyDescription> {
    return this.httpGet(
      LajiApi.Endpoints.description.replace('%id%', id),
      { params: {} }
    );
  }

  getTaxonMedia(id: string): Observable<Array<TaxonomyImage>> {
    return this.httpGet(
      LajiApi.Endpoints.taxonMedia.replace('%id%', id)
    )
  }

  getTaxonSpecies(id: string, query: LajiApi.GetTaxonQuery): Observable<PagedResult<Taxonomy>> {
    return this.httpGet(
      LajiApi.Endpoints.taxonSpecies.replace('%id%', id),
      { params: {...query} }
    );
  }

  getWarehouseQueryCount(query: WarehouseQueryInterface): Observable<PagedResult<any>|any> {
    return this.httpGet(
      LajiApi.Endpoints.warehouseQueryCount,
      { params: {...query} }
    );
  }

  getWarehouseQueryList(query: WarehouseQueryInterface): Observable<PagedResult<any>|any> {
    return this.httpGet(
      LajiApi.Endpoints.warehouseQueryList,
      { params: {...query} }
    );
  }

  getWarehouseQueryUnitAggregate(query: WarehouseQueryInterface): Observable<PagedResult<any>|any> {
    return this.httpGet(
      LajiApi.Endpoints.warehouseQueryUnitAggregate,
      { params: {...query} }
    );
  }
}

export namespace LajiApi {
  /** Endpoints in api.laji.fi */
  export enum Endpoints {
    areas = 'areas',
    authenticationEvent = 'authentication-event',
    autocompleteTaxa = 'autocomplete/taxa',
    description = 'taxa/%id%/descriptions',
    document = 'documents/%id%',
    documents = 'documents',
    form = 'forms/%id%',
    informalChildren = 'informal-taxon-groups/%id%/children',
    informalRoots = 'informal-taxon-groups/roots',
    information = 'information/%id%',
    metadataAlt = 'metadata/alts/%alt%',
    news = 'news',
    newsId = 'news/%id%',
    person = 'person',
    taxa = 'taxa',
    taxon = 'taxa/%id%',
    taxonMedia = 'taxa/%id%/media',
    taxonParents = 'taxa/%id%/parents',
    taxonSpecies = 'taxa/%id%/species',
    updateDocument = 'documents/%id%',
    warehouseQueryCount = 'warehouse/query/count',
    warehouseQueryList = 'warehouse/query/list',
    warehouseQueryUnitAggregate = 'warehouse/query/unit/aggregate'
  }
  /** Possible query parameters. */
  export interface Query {
    lang?: string;
    informalGroupFilters?: string;
    invasiveSpeciesFilter?: boolean;
    pageSize?: string;
    page?: string;
    tag?: string;
    onlyFinnish?: boolean;
    blacklist?: string;
    selectedFields?: string;
    langFallback?: boolean;
    hasMediaFilter?: boolean;
    includeMedia?: boolean;
    administrativeStatuses?: string;
    personToken?: string;
    invasive?:boolean;
  }

  export interface GetAreasQuery {
    page?: string;
    pageSize?: string;
    areaType: string;
  }

  export interface GetAutocompleteQuery {
    query?: string;
    invasiveSpecies?: boolean;
    species?: boolean;
    finnish?: boolean;
  }

  export interface GetDocumentsQuery {
    page?: number;
    pageSize?: number;
    collectionID: string;
    selectedFields?: string;
  }

  export interface PostTaxaQuery {
    page?: number;
    pageSize?: number;
    includeMedia?: boolean;
    selectedFields?: string;
    sortOrder?: string;
  }

  export interface PostTaxaBody {
    administrativeStatuses?: string[];
    invasiveSpecies?: boolean;
    invasiveSpeciesMainGroups?: string[];
  }

  export interface GetTaxonQuery {
    includeMedia?: boolean;
    invasiveSpecies?: boolean;
    selectedFields?: string;
  }
}
