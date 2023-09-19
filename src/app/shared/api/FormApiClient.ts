import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../service/user.service';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class FormApiClient {
  protected basePath = environment.lajiApi.url;

  constructor(protected http: HttpClient, private translate: TranslateService) {}

  public fetch<T>(resource: string, query: any, options = {}): Promise<T> {
    const path = this.basePath + resource;
    const queryParameters = new HttpParams({
      fromObject: {
        ...query,
        lang: this.translate.currentLang,
        personToken: UserService.getToken(),
        excludeNameTypes: resource === '/autocomplete/taxon' ? 'MX.misappliedCircumscription,MX.misspelledCircumscription,MX.uncertainCircumscription' : undefined
      }
    });

    const method = options['method'] || 'GET';
    const requestOptions: any = {
      headers: {...options['headers'], timeout: '120000'},
      params: queryParameters,
      body: options['body'] || undefined,
      observe: 'response'
    };

    return this.http.request(
      method, path, requestOptions
    ).pipe(
      map((response: any) => ({...response, json: () => response.body})),
      catchError(err => of({...err, json: () => err.error})),
    ).toPromise(Promise);
  }
}
