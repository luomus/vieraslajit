import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Taxonomy, TaxonomyDescription, TaxonomyImage } from '../model/Taxonomy';
import { Observable } from 'rxjs';
import { AuthenticationEvent } from '../model/AuthenticationEvent';
import { Autocomplete } from '../model/Autocomplete';
import { Metadata } from '../model/Metadata';
import { PagedResult } from '../model/PagedResult';
import { Person } from '../model/Person';
import { NewsElement } from '../model/NewsElement';
import { Information } from '../model/Information';
import { Document } from '../model/Document';
import { LanguageService } from '../service/language.service';
import { UserService } from '../service/user.service';

/**
 * Handles creation of API requests
 */

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  private get lajiApiHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Api-Version': '1' });
    const language = LanguageService.getLanguage();
    const token = UserService.getToken();

    headers = headers.set('Accept-Language', language ?? 'fi');

    if (token !== null) {
      headers = headers.set('Person-Token', token);
    }

    return headers;
  }

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

  /**
   * Returns person details from /person/ endpoint:
   * {
   *  "id": "string",
   *  "fullName": "string",
   *  "emailAddress": "string",
   *  "defaultLanguage": "string",
   *  "role": ["string"]
   * }
   *
   */
  getPerson(): Observable<Person> {
    return this.httpGet(LajiApi.Endpoints.person);
  }

  /**
   * Returns login related information from /person-token/ endpoint
   * {
   *  "personId": "string",
   *  "target": "string",
   *  "next": "string"
   * }
   *
   * next = path that is used for redirection after login is complete
   *
   * @param token person-token received from laji-auth on login
   */
  getAuthenticationEvent(): Observable<AuthenticationEvent> {
    return this.httpGet(LajiApi.Endpoints.authenticationEvent);
  }

  deleteAuthenticationEvent(): Observable<void> {
    return this.httpDelete(LajiApi.Endpoints.authenticationEvent);
  }

  /**
   * Used for autocompletion of searchqueries
   *
   * Returns:
   * "results": [
   *   {
   *     "key": "string",
   *     "value": "string"
   *   }
   * ]
   *
   * @param query Query as defined by LajiApi.AutocompleteQuery
   */
  getAutocompleteTaxa(query: LajiApi.AutocompleteQuery): Observable<Autocomplete> {
    return this.httpGet(
      LajiApi.Endpoints.autocompleteTaxa,
      { params: {...query} }
    );
  }

  /**
   * Returns range that is of type select (alt)
   * @param endpoint Target API endpoint
   * @param alt Type of range
   * @param query
  */
  getMetadataAlt(alt: string): Observable<Metadata>{
    return this.httpGet(LajiApi.Endpoints.metadataAlt.replace('%alt%', alt));
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

  getTaxonSpecies(id: string, query: LajiApi.GetTaxonQuery): Observable<PagedResult<Taxonomy>> {
    return this.httpGet(
      LajiApi.Endpoints.taxonSpecies.replace('%id%', id),
      { params: {...query} }
    );
  }

  getTaxonMedia(id: string): Observable<Array<TaxonomyImage>> {
    return this.httpGet(
      LajiApi.Endpoints.taxonMedia.replace('%id%', id)
    )
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

  getInformation(id: string): Observable<Information> {
    return this.httpGet(
      LajiApi.Endpoints.information.replace('%id%', id)
    )
  }

  getForm(id: string): Observable<any> {
    return this.httpGet(
      LajiApi.Endpoints.form.replace('%id%', id)
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

  areas(endpoint: LajiApi.Endpoints.areas, query: object): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`;
    return this.httpClient.get(
      url,
      { params: {...query} }
      );
  }

  getObservations(endpoint: LajiApi.Endpoints.warehousequerylist, query:LajiApi.WarehouseQueryListQuery ):Observable<any>;
  getObservations(endpoint: LajiApi.Endpoints.warehousequerylist, query: object={}):Observable<any>{
    const url = `${environment.lajiApi.url}/${endpoint}`;
    return this.httpClient.get(
      url,
      { params: {...query} }
      );}

  feedbackPost(endpoint: LajiApi.Endpoints.feedback, data: LajiApi.Feedback, personToken?: string): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`;
    return this.httpClient.post(
      url,
      JSON.stringify(data),
      {params: {'personToken': personToken}}
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
    feedback = 'feedback',
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
    warehousequerycount = 'warehouse/query/count',
    warehousequerylist = 'warehouse/query/list'
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

  export interface AutocompleteQuery {
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

  export interface warehousequerycountQuery {
    cache?: boolean;
    taxonId?: string;
    individualCountMin?: number;
  }

  export interface WarehouseQueryListQuery {
    taxonId?: Array<string>;
    pageSize?: string;
    page?: string;
    observerPersonToken?: string;
    invasive?:boolean;
  }

  export interface Feedback {
    subject: string;
    message: string;
    meta: string;
  }

}
