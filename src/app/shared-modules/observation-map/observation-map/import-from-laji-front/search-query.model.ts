import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { WarehouseQueryInterface } from './WarehouseQueryInterface';
import { SearchQueryInterface } from './search-query.interface';

@Injectable({providedIn: 'root'})
export class SearchQuery implements SearchQueryInterface {
  public queryType = 'observation';
  public queryUpdatedSource = new Subject<any>();
  public queryUpdated$ = this.queryUpdatedSource.asObservable();
  public tack = 0;

  public query: WarehouseQueryInterface = {};
  public page: number;
  public pageSize = 20;
  public includeNonValidTaxa = false;
  public selected: string[];
  public orderBy: string[];
  public aggregateBy: string[];

  separator = {
    'teamMember': ';'
  };

  arrayTypes = [
    'taxonId',
    'target',
    'originalTarget',
    'exactTarget',
    'originalExactTarget',
    'informalTaxonGroupId',
    'informalTaxonGroupIdIncludingReported',
    'administrativeStatusId',
    'redListStatusId',
    'countryId',
    'finnishMunicipalityId',
    'biogeographicalProvinceId',
    'area',
    'time',
    'keyword',
    'collectionId',
    'typeOfOccurrenceId',
    'typeOfOccurrenceIdNot',
    'coordinates',
    'sourceId',
    'secureLevel',
    'superRecordBasis',
    'recordBasis',
    'lifeStage',
    'sex',
    'documentId',
    'unitId',
    'individualId',
    'secureReason',
    'editorId',
    'taxonReliability',
    'annotationType',
    'namedPlaceId',
    'birdAssociationAreaId',
    'yearMonth',
    'reliabilityOfCollection',
    'teamMember',
    'teamMemberId',
    'taxonCensus',
    'recordQuality',
    'reliability'
  ];

  booleanTypes = [
    'includeNonValidTaxa',
    'finnish',
    'invasive',
    'typeSpecimen',
    'hasDocumentMedia',
    'hasGatheringMedia',
    'hasUnitMedia',
    'hasMedia',
    'secured',
    'cache',
    'reliable',
    'unidentified',
    'pairCounts',
    'includeSubCollections',
    'nativeOccurrence',
    'breedingSite',
    'useIdentificationAnnotations',
    'includeSubTaxa',
    'annotated',
    'needsCheck'
  ];

  numericTypes = [
    'dayOfYearBegin',
    'dayOfYearEnd',
    'individualCountMin',
    'individualCountMax',
    'coordinateAccuracyMax'
  ];

  stringTypes = [
    'taxonRankId',
    'xValue',
    'ykj10kmCenter',
    'qualityIssues',
    'annotatedBefore',
    'annotatedLaterThan',
    'firstLoadedSameOrBefore',
    'firstLoadedSameOrAfter',
    'annotatedSameOrBefore',
    'annotatedSameOrAfter',
    'loadedSameOrBefore',
    'loadedSameOrAfter',
    'season',
    'sourceOfCoordinates'
  ];

  obscure = [
    'editorPersonToken',
    'observerPersonToken',
    'editorOrObserverPersonToken'
  ];

  constructor(
    private router: Router
  ) {
  }

  public setQueryFromQueryObject(query) {
    for (const i of this.arrayTypes) {
      if (typeof query[i] !== 'undefined') {
        this.query[i] = decodeURIComponent(query[i])
          .split(this.separator[i] || ',')
          .map(value => value);
      } else {
        this.query[i] = undefined;
      }
    }

    for (const i of this.booleanTypes) {
      if (typeof query[i] !== 'undefined') {
        this.query[i] = query[i] === 'true';
      } else {
        this.query[i] = undefined;
      }
    }

    for (const i of this.numericTypes) {
      if (typeof query[i] !== 'undefined') {
        const value = +query[i];
        if (!isNaN(value)) {
          this.query[i] = value;
        }
      } else {
        this.query[i] = undefined;
      }
    }

    for (const i of [...this.stringTypes, ...this.obscure]) {
      if (typeof query[i] !== 'undefined') {
        this.query[i] = query[i];
      } else {
        this.query[i] = undefined;
      }
    }

    if (this.query.coordinates) {
      this.query.coordinates = this.query.coordinates.map(coordinate => {
        const parts = coordinate.split(':');
        const last = parseFloat(parts[parts.length - 1]);
        if (!isNaN(last)) {
          parts.pop();
          this.query._coordinatesIntersection = Math.floor(last * 100);
        } else {
          this.query._coordinatesIntersection = 100;
        }
        return parts.join(':');
      });
    }

    if (typeof query['page'] !== 'undefined') {
      this.page = +query['page'];
    }
  }

  public getQueryObject(skipParams: string[] = [], obscure = true) {
    const result: {[field: string]: string | string[]}  = {};
    if (this.query) {
      for (const i of this.arrayTypes) {
        if (skipParams.indexOf(i) > -1) {
          continue;
        }
        if (this.query[i] !== undefined) {
          if (this.query[i].length < 1 || this.query[0] === '') {
            continue;
          }
          if (typeof this.query[i] === 'string') {
            this.query[i] = [this.query[i]];
          }
          const query = this.query[i]
            .filter(val => typeof val === 'string' && val.trim().length > 0)
            .join(this.separator[i] || ',');
          if (query.length > 0) {
            result[i] = query;
          }
        }
      }

      for (const i of this.booleanTypes) {
        if (skipParams.indexOf(i) > -1) {
          continue;
        }
        if (this.query[i] !== undefined) {
          result[i] = this.query[i] ? 'true' : 'false';
        }
      }

      for (const i of this.numericTypes) {
        if (skipParams.indexOf(i) > -1) {
          continue;
        }
        const type = typeof this.query[i];
        if (type === 'number' || type === 'string') {
          result[i] = String(this.query[i]);
        }
      }

      for (const i of this.stringTypes) {
        if (skipParams.indexOf(i) > -1) {
          continue;
        }
        if (this.query[i] !== undefined && this.query[i] !== '') {
          result[i] =  this.query[i];
        }
      }

      for (const i of this.obscure) {
        if (skipParams.indexOf(i) > -1) {
          continue;
        }
        if (this.query[i] !== undefined) {
          result[i] = obscure ? 'true' : this.query[i];
        }
      }
    }

    if (result.coordinates && typeof this.query._coordinatesIntersection !== 'undefined') {
      result.coordinates += ':' + this.query._coordinatesIntersection / 100;
    }

    if (result['target'] && Array.isArray(result['target'])) {
      result['target'] = (result['target'] as string[]).map(target => target.replace(/http:\/\/tun\.fi\//g, ''));
    }

    // Non query parameters (these will not have effect on result count)
    if (this.selected !== undefined && skipParams.indexOf('selected') === -1) {
      result['selected'] = this.selected.join(',');
    }

    if (this.aggregateBy !== undefined && skipParams.indexOf('aggregateBy') === -1) {
      result['aggregateBy'] = this.aggregateBy.join(',');
    }

    if (this.orderBy !== undefined && skipParams.indexOf('orderBy') === -1) {
      result['orderBy'] = this.orderBy.join(',');
    }

    if (this.pageSize !== undefined && skipParams.indexOf('pageSize') === -1) {
      result['pageSize'] = String(this.pageSize);
    }

    if (this.page !== undefined && skipParams.indexOf('page') === -1) {
      result['page'] = String(this.page);
    }

    if (result.editorPersonToken && result.observerPersonToken && result.observerPersonToken === result.editorPersonToken) {
      result.editorOrObserverPersonToken = result.observerPersonToken;
      delete result.editorPersonToken;
      delete result.observerPersonToken;
    }

    return result;
  }

  public getURLSearchParams(queryParameters?: object, skipParams: string[] = []): object {
    if (!queryParameters) {
      queryParameters = {};
    }
    const query = this.getQueryObject(skipParams, false);
    Object.keys(query).map((key) => {
      queryParameters[key] = query[key];
    });

    return queryParameters;
  }

  public updateUrl(skipParams: string[], skipHistory: boolean = true): void {
    const query = this.getQueryObject(skipParams);
    const extra = {skipLocationChange: skipHistory};
    if (Object.keys(query).length > 0) {
      extra['queryParams'] = this.getQueryObject(skipParams);
    }
    this.router.navigate(
      [],
      extra
    );
  }

  public queryUpdate(data = {}): void {
    this.queryUpdatedSource.next(data);
  }
}
