import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../service/user.service';


@Injectable()
export class FormApiClient {
  protected basePath = environment.lajiApi.url;
  public defaultHeaders: HttpHeaders = new HttpHeaders();

  constructor(protected http: HttpClient, private translate: TranslateService) {}

  public fetch(resource: string, query: any, options?: any): Promise<any> {
    const path = this.basePath + resource;

    const queryParameters = new HttpParams();

    queryParameters.set('lang', this.translate.currentLang);
    queryParameters.set('personToken', UserService.getToken());

    for (const param in query) {
      if (!query.hasOwnProperty(param)) {
        continue;
      }
      if (query[param] !== undefined) {
        queryParameters.set(param, query[param]);
      }
    }
    if (!options) {
      options = {};
    }

    const requestOptions: any = {
      method: options['method'] || 'GET',
      headers: options['headers'] ? new HttpHeaders(options['headers']) : this.defaultHeaders,
      params: queryParameters,
      body: options['body'] || undefined
    };

    switch (resource) {
      case '/autocomplete/taxon':
        queryParameters.set(
          'excludeNameTypes',
          'MX.misappliedCircumscription,MX.misspelledCircumscription,MX.uncertainCircumscription'
        );
    }

    return this.http.request(path, requestOptions).toPromise(Promise);
  }
}
