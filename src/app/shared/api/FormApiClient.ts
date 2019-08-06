import { Headers, Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../service/user.service';


@Injectable()
export class FormApiClient {
  protected basePath = environment.lajiApi.url;
  public defaultHeaders: Headers = new Headers();

  constructor(protected http: Http, private translate: TranslateService) {}

  public fetch(resource: string, query: any, options?: RequestOptionsArgs): Promise<any> {
    const path = this.basePath + resource;

    const queryParameters = new URLSearchParams();

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

    const requestOptions: RequestOptionsArgs = {
      method: options['method'] || 'GET',
      headers: options['headers'] ? new Headers(options['headers']) : this.defaultHeaders,
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
