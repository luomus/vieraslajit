/* tslint:disable */
/**
 * API documentation
 * To use this api you need an access token. To getList the token, send a post request with your email address to api-users resource and one will be send to your. See below for information on how to use this api and if you have any questions you can contact us at helpdesk@laji.fi.  Place refer to [schema.laji.fi](http://schema.laji.fi/) for more information about the used vocabulary
 *
 * OpenAPI spec version: 0.0.1
 *
 *
 * NOTE: TEST This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WarehouseQueryInterface } from './WarehouseQueryInterface';
import { PagedResult } from '../../../../shared/model';
import { SearchQuery } from './search-query.model';
import { WarehouseCountResultInterface } from './WarehouseCountResultInterface';
import { environment } from '../../../../../environments/environment';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable({providedIn: 'root'})
export class WarehouseApi {
  public static readonly longTimeout = 10000;
  protected basePath = environment.lajiApi.url;

  constructor(protected http: HttpClient, private queryService: SearchQuery) {
    this.warehouseQueryAggregateGet = this.warehouseQueryAggregateGet.bind(this);
    this.warehouseQueryStatisticsGet = this.warehouseQueryStatisticsGet.bind(this);
  }

  public static isEmptyQuery(query: WarehouseQueryInterface = {}) {
    const keys = Object.keys(query);
    for (const key of keys) {
      if (typeof query[key] === 'undefined') {
        continue;
      } else if (key === 'countryId') {
        if (query.countryId.length === 0 || (query.countryId.length === 1 && query.countryId.indexOf('ML.206') > -1)) {
          continue;
        }
        return false;
      } else if (['includeNonValidTaxa', 'cache'].indexOf(key) > -1) {
        continue;
      }
      return false;
    }
    return true;
  }

  /**
   * Perform aggregation query using given filter and aggregation
   * Aggregates the results of the query based on given \&quot;aggregateBy\&quot; parameter or parameters. Returns count of units, individual count sum and maximum and min and max date.
   * @param query to make to the warehouse
   * @param aggregateBy Define fields to aggregate by. Multiple values are seperated by a comma (,) or by giving the HTTP parameter multiple times.
   * @param orderBy Define order of fields. Defaults to count of units (desc). Give number of the column, first is 1. aggregateBy -fields are first, followed by count of units, individual count sum and maximum and min and max date. Multiple values are seperated by a comma (,) or by giving the HTTP parameter multiple times.
   * @param pageSize Set number of results in one page.
   * @param page Set current page.
   * @param geoJSON returns data as geojson.
   * @param onlyCount return only count in result items (default true).
   * @oaram onlyCount return only counts of items default true
   */
  public warehouseQueryAggregateGetCsv(query: WarehouseQueryInterface, aggregateBy?: Array<string>, orderBy?: Array<string>, pageSize?: number, page?: number, onlyCount?: boolean): Observable<HttpResponse<any>> {
    const path = this.basePath + '/warehouse/query/aggregate';

    let queryParameters = {};

    this.addMetaToQuery(aggregateBy, orderBy, pageSize, page);
    this.addQueryToQueryParams(query, queryParameters);

    if (onlyCount !== undefined) {
      queryParameters['onlyCount'] = onlyCount
    }
    queryParameters['format'] = 'csv';

    return this.http.get<HttpResponse<any>>(path, {params: queryParameters, observe: 'response'});
  }


  /**
   * Fetch warehouse team member
   * @param id
   * @param extraHttpRequestParams
   */
  public warehouseTeamMemberGet(id: string, extraHttpRequestParams?: any): Observable<any> {
    const path = this.basePath + `/warehouse/teamMember/${id}`;

    const queryParameters = {...Util.removeUndefinedFromObject(extraHttpRequestParams)};
    // verify required parameter 'documentId' is not null or undefined
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling warehouseTeamMemberGet.');
    }

    return this.http.get(path, {params: queryParameters});
  }

  /**
   * Fetch warehouse team member
   * @param query
   * @param extraHttpRequestParams
   */
  public warehouseTeamMemberFind(query: string, extraHttpRequestParams?: any): Observable<any> {
    const path = this.basePath + `/warehouse/teamMember`;

    const queryParameters = {...Util.removeUndefinedFromObject(extraHttpRequestParams)};
    // verify required parameter 'documentId' is not null or undefined
    if (query === null || query === undefined) {
      throw new Error('Required parameter query was null or undefined when calling warehouseTeamMemberFind.');
    }
    queryParameters['q'] = query;

    return this.http.get(path, {params: queryParameters});
  }

  private warehouseQueryGet(target: string, query: WarehouseQueryInterface, aggregateBy?: Array<string>, orderBy?: Array<string>, pageSize?: number, page?: number, geoJSON?: boolean, onlyCount?: boolean): Observable<PagedResult<any>|any> {
    const path = this.basePath + `/warehouse/query/${target}`;

    let queryParameters = {};

    this.addMetaToQuery(aggregateBy, orderBy, pageSize, page);
    this.addQueryToQueryParams(query, queryParameters);

    if (geoJSON !== undefined) {
      queryParameters['geoJSON'] = geoJSON
    }

    if (onlyCount !== undefined) {
      queryParameters['onlyCount'] = onlyCount
    }

    return this.http.get<PagedResult<any>|any>(path, {params: queryParameters});
  }

  /**
   * Perform aggregation query using given filter and aggregation
   * Aggregates the results of the query based on given \&quot;aggregateBy\&quot; parameter or parameters. Returns count of units, individual count sum and maximum and min and max date.
   * @param query to make to the warehouse
   * @param aggregateBy Define fields to aggregate by. Multiple values are seperated by a comma (,) or by giving the HTTP parameter multiple times.
   * @param orderBy Define order of fields. Defaults to count of units (desc). Give number of the column, first is 1. aggregateBy -fields are first, followed by count of units, individual count sum and maximum and min and max date. Multiple values are seperated by a comma (,) or by giving the HTTP parameter multiple times.
   * @param pageSize Set number of results in one page.
   * @param page Set current page.
   * @param geoJSON returns data as geojson.
   * @param onlyCount return only count in result items (default true).
   */
  public warehouseQueryAggregateGet(query: WarehouseQueryInterface, aggregateBy?: Array<string>, orderBy?: Array<string>, pageSize?: number, page?: number, geoJSON?: boolean, onlyCount?: boolean): Observable<PagedResult<any>|any> {
    return this.warehouseQueryGet('unit/aggregate', query, aggregateBy, orderBy, pageSize, page, geoJSON, onlyCount);
  }

  /**
   * Aggregates based on annotation
   *
   * @see warehouseQueryAggregateGet
   */
  public warehouseQueryAnnotationAggregateGet(query: WarehouseQueryInterface, aggregateBy?: Array<string>, orderBy?: Array<string>, pageSize?: number, page?: number, geoJSON?: boolean, onlyCount?: boolean): Observable<PagedResult<any>|any> {
    return this.warehouseQueryGet('annotation/aggregate', query, aggregateBy, orderBy, pageSize, page, geoJSON, onlyCount);
  }

  /**
   * Same as aggrate query, but performs the query on private data also.
   */
  public warehouseQueryStatisticsGet(query: WarehouseQueryInterface, aggregateBy?: Array<string>, orderBy?: Array<string>, pageSize?: number, page?: number, geoJSON?: boolean, onlyCount?: boolean): Observable<PagedResult<any>|any> {
    return this.warehouseQueryGet('statistics', query, aggregateBy, orderBy, pageSize, page, geoJSON, onlyCount);
  }

  /**
   * Same as aggrate query, but performs the query on private data also.
   */
  public warehouseQueryGatheringStatisticsGet(query: WarehouseQueryInterface, aggregateBy?: Array<string>, orderBy?: Array<string>, pageSize?: number, page?: number, geoJSON?: boolean, onlyCount?: boolean): Observable<PagedResult<any>|any> {
    return this.warehouseQueryGet('gathering/statistics', query, aggregateBy, orderBy, pageSize, page, geoJSON, onlyCount);
  }

  public downloadApprovalRequest(userToken: string, downloadFormat: string, includes: string, query: WarehouseQueryInterface, locale: string, description: string, extraHttpRequestParams?: any): Observable<string> {
    const path = this.basePath + '/warehouse/private-query/downloadApprovalRequest';

    const queryParameters = {};

    if (userToken === null || userToken === undefined) {
      throw new Error('Required parameter personToken was null or undefined when calling warehouse download.');
    }

    if (downloadFormat === null || downloadFormat === undefined) {
      throw new Error('Required parameter downloadFormat was null or undefined when calling warehouse download.');
    }

    if (includes === null || includes === undefined) {
      throw new Error('Required parameter includes was null or undefined when calling warehouse download.');
    }

    queryParameters['personToken'] = userToken;
    queryParameters['downloadFormat'] = downloadFormat;
    queryParameters['downloadIncludes'] = includes;

    if (locale !== undefined) {
      queryParameters['locale'] = locale;
    }

    if (description !== undefined) {
      queryParameters['description'] = description;
    }

    this.addQueryToQueryParams(query, queryParameters);

    return this.http.post<string>(path, undefined, {params: queryParameters});
  }

  public download(userToken: string, downloadFormat: string, includes: string, query: WarehouseQueryInterface, locale: string, description: string, extraHttpRequestParams?: any): Observable<string> {
    const path = this.basePath + '/warehouse/query/download';

    const queryParameters = {...Util.removeUndefinedFromObject(extraHttpRequestParams)};

    if (userToken === null || userToken === undefined) {
      throw new Error('Required parameter personToken was null or undefined when calling warehouse download.');
    }

    if (downloadFormat === null || downloadFormat === undefined) {
      throw new Error('Required parameter downloadFormat was null or undefined when calling warehouse download.');
    }

    if (includes === null || includes === undefined) {
      throw new Error('Required parameter includes was null or undefined when calling warehouse download.');
    }

    queryParameters['personToken'] = userToken;
    queryParameters['downloadFormat'] = downloadFormat;
    queryParameters['downloadIncludes'] = includes;

    if (locale !== undefined) {
      queryParameters['locale'] = locale;
    }

    if (description !== undefined) {
      queryParameters['description'] = description;
    }


    this.addQueryToQueryParams(query, queryParameters);

    return this.http.post<string>(path, undefined, {params: queryParameters});
  }

  /**
   * Get count of results using given filter
   * Use this API to test how many results your query would return and then proceed with list query. Also returns max result count allowed for list queries.
   * @param query to make to the warehouse
   */
  public warehouseQueryCountGet(query: WarehouseQueryInterface, extraHttpRequestParams?: any): Observable<WarehouseCountResultInterface> {
    const path = this.basePath + '/warehouse/query/count';

    const queryParameters = {...Util.removeUndefinedFromObject(extraHttpRequestParams)};

    this.addQueryToQueryParams(query, queryParameters);

    return this.http.get<WarehouseCountResultInterface>(path, {params: queryParameters});
  }

  /**
   * Get list of results using given filter
   * Get list of results. Maximum number of results is 10000. Before making a list query, you should check with /count how many results the query yields. Application/json and application/xml responses respect the \&quot;selected\&quot; parameter, but application/dwc+xml does not support all fields.
   * @param query to make to the warehouse
   * @param selected Define what fields to include to the result. Defaults to [document.documentId, gathering.gatheringId, unit.unitId, document.sourceId, document.collectionId, document.namedPlaceId, document.secureLevel, document.secureReason, document.keywords, gathering.team, gathering.eventDate.begin, gathering.eventDate.end, gathering.timeBegin, gathering.timeEnd, gathering.higherGeography, gathering.country, gathering.province, gathering.municipality, gathering.locality, gathering.conversions.wgs84CenterPoint.lat, gathering.conversions.wgs84CenterPoint.lon, gathering.interpretations.coordinateAccuracy, gathering.interpretations.sourceOfCoordinates, unit.linkings.taxon.qname, unit.linkings.taxon.species, unit.linkings.taxon.scientificName, unit.linkings.taxon.vernacularName, unit.taxonVerbatim, unit.abundanceString, unit.recordBasis, unit.mediaCount, unit.notes] Multiple values are seperated by a comma (,) or by giving the HTTP parameter multiple times.
   * @param orderBy Define what fields to use when sorting results. If using default select, defaults to [gathering.eventDate.begin DESC, document.loadDate DESC, unit.taxonVerbatim ASC]. If using custom select there is no default order. Each fieldname given as parameter defaults to ASC - if you want to sort using descending order, add \&quot; DESC\&quot; to the end of the field name. Multiple values are seperated by a comma (,) or by giving the HTTP parameter multiple times.
   * @param pageSize Set number of results in one page.
   * @param page Set current page.
   */
  public warehouseQueryListGet(query: WarehouseQueryInterface, selected?: Array<string>, orderBy?: Array<string>, pageSize?: number, page?: number, extraHttpRequestParams?: any): Observable<PagedResult<any>> {
    const path = this.basePath + '/warehouse/query/list';

    const queryParameters = {...Util.removeUndefinedFromObject(extraHttpRequestParams)};

    this.addMetaToQuery(selected, orderBy, pageSize, page);
    this.addQueryToQueryParams(query, queryParameters);

    return this.http.get<PagedResult<any>>(path, {params: queryParameters});
  }

  /**
   * Get single full document.
   * Get single full document by document URI. Contains the document, gatherings and units, including facts, media etc
   * @param documentId Full document ID (URI identifier)
   */
  public warehouseQuerySingleGet(documentId: string, extraHttpRequestParams?: any): Observable<any> {
    const path = this.basePath + '/warehouse/query/single';

    const queryParameters = {...Util.removeUndefinedFromObject(extraHttpRequestParams)};
    // verify required parameter 'documentId' is not null or undefined
    if (documentId === null || documentId === undefined) {
      throw new Error('Required parameter documentId was null or undefined when calling warehouseQuerySingleGet.');
    }

    queryParameters['documentId'] = documentId;

    return this.http.get(path, {params: queryParameters});
  }
  /**
   * Get list of annotations using given filters
   * Get list of results as a 'flat row'. Application/json and application/xml responses respect the "selected" parameter, but application/dwc+xml (unfinished) does not support all fields.
   * @param query to make to the warehouse
   * @param selected Define what fields to include to the result. Defaults to [document.documentId, gathering.gatheringId, unit.unitId, document.sourceId, document.collectionId, document.namedPlaceId, document.secureLevel, document.secureReason, document.keywords, gathering.team, gathering.eventDate.begin, gathering.eventDate.end, gathering.timeBegin, gathering.timeEnd, gathering.higherGeography, gathering.country, gathering.province, gathering.municipality, gathering.locality, gathering.conversions.wgs84CenterPoint.lat, gathering.conversions.wgs84CenterPoint.lon, gathering.interpretations.coordinateAccuracy, gathering.interpretations.sourceOfCoordinates, unit.linkings.taxon.qname, unit.linkings.taxon.species, unit.linkings.taxon.scientificName, unit.linkings.taxon.vernacularName, unit.taxonVerbatim, unit.abundanceString, unit.recordBasis, unit.mediaCount, unit.notes] Multiple values are seperated by a comma (,) or by giving the HTTP parameter multiple times.
   * @param orderBy Define what fields to use when sorting results. If using default select, defaults to [gathering.eventDate.begin DESC, document.loadDate DESC, unit.taxonVerbatim ASC]. If using custom select there is no default order. Each fieldname given as parameter defaults to ASC - if you want to sort using descending order, add \&quot; DESC\&quot; to the end of the field name. Multiple values are seperated by a comma (,) or by giving the HTTP parameter multiple times.
   * @param pageSize Set number of results in one page.
   * @param page Set current page.
   */
  public warehouseQueryAnnotationListGet(query: WarehouseQueryInterface, selected?: Array<string>, orderBy?: Array<string>, pageSize?: number, page?: number, extraHttpRequestParams?: any): Observable<any> {
    const path = this.basePath + '/warehouse/query/annotation/list';

    const queryParameters = {...Util.removeUndefinedFromObject(extraHttpRequestParams)};

    this.addMetaToQuery(selected, orderBy, pageSize, page);
    this.addQueryToQueryParams(query, queryParameters);

    return this.http.get<any>(path, {params: queryParameters});
  }

  /**
   * Enumeration labels.
   * Get descriptions of enumerations that are used in query parameters and responses.
   */
  public warehouseEnumerationLabels(extraHttpRequestParams?: any): Observable<any> {
    const path = this.basePath + '/warehouse/enumeration-labels';

    const queryParameters = {...Util.removeUndefinedFromObject(extraHttpRequestParams)};

    return this.http.get(path, {params: queryParameters});
  }

  private addMetaToQuery(selectedOrAggregatedBy?: Array<string>, orderBy?: Array<string>, pageSize?: number, page?: number): void {
    this.queryService.aggregateBy = selectedOrAggregatedBy;
    this.queryService.selected = selectedOrAggregatedBy;
    this.queryService.orderBy = orderBy;
    this.queryService.pageSize = pageSize;
    this.queryService.page = page;
  }

  private addQueryToQueryParams(query: WarehouseQueryInterface, queryParameters: object): void {
    this.queryService.query = query;
    this.queryService.getURLSearchParams(queryParameters);
  }

}

class Util {
    public static removeUndefinedFromObject(obj: object) {
        if (typeof obj !== 'object') {
          return obj;
        }
        return Object.keys(obj).reduce((cumulative, current) => {
          if (typeof obj[current] !== 'undefined') {
            cumulative[current] = obj[current];
          }
          return cumulative;
        }, {});
      }
}
