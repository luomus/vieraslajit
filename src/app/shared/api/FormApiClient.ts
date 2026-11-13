import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const AUTOCOMPLETE_TAXON_RESOURCE = '/autocomplete/taxa';
const MEDIA_RESOURCES = ['/images', '/audio'];

@Injectable()
export class FormApiClient {
  protected basePath = environment.lajiApi.url;
  private _lang?: string | null;
  private _personToken?: string | null;

  constructor(protected http: HttpClient) {}

  public set lang(lang) {
    this._lang = lang;
  }

  public get lang() {
    return this._lang;
  }

  public set personToken(token) {
    this._personToken = token;
  }

  public get personToken() {
    return this._personToken;
  }

  // drop undefined properties
  private removeFromObject = <T extends {[prop: string]: any}>(obj: T, keys?: string[]): Partial<T> => {
    if (typeof obj !== 'object') {
      return obj;
    }
    return Object.keys(obj).reduce<Partial<T>>((cumulative, current: keyof T) => {
      if (typeof obj[current] !== 'undefined' && (!keys || keys.indexOf(current as string) === -1)) {
        cumulative[current] = obj[current];
      }
      return cumulative;
    }, {} as Partial<T>);
  };

  public fetch<T>(
    resource: string,
    query: any,
    options: {method?: string; body?: any; headers?: {[header: string]: string | string[]}}
  ): Promise<T> {
    const path = this.basePath + resource;

    const queryParameters: Record<string, string> = this.removeFromObject({
      ...query
    });

    if (!options) {
      options = {};
    }

    switch (resource) {
      case AUTOCOMPLETE_TAXON_RESOURCE:
        queryParameters['nameTypes'] = '!MX.hasMisappliedName';
    }

    let timeout = '120000';
    if (MEDIA_RESOURCES.includes(resource) && options['method'] === 'POST') {
      timeout = '3600000';
    }

    let headers: HttpHeaders = new HttpHeaders({
      ...options['headers'],
      timeout,
      'Accept-language': this.lang!,
      'API-Version': '1'
    });
    if (this.personToken) {
      headers = headers.set('Person-Token', this.personToken!);
    }

    return this.http.request(
      options['method'] || 'GET',
      path,
      {
        headers,
        params: queryParameters,
        body: options['body'] || undefined,
        observe: 'response'
      }
    ).pipe(
      map((response: any) => ({...response, json: () => response.body})),
      catchError(err => of({...err, json: () => err.error})),
    ).toPromise(Promise);
  }
}
