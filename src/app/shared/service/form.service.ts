import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FormService {

  private formCache: { [id: string]: any } = {};

  constructor(private apiService: ApiService) { }

  getFormById(id: string, lang: string) {
    if (this.formCache[id]) {
      return Observable.of(this.formCache[id]);
    }
    return this.apiService.formById(LajiApi.Endpoints.form, id, { lang: lang });
  }

}
