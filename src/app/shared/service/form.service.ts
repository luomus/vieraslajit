import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { Observable, of } from 'rxjs';
import { tap, switchMap, combineLatest } from '../../../../node_modules/rxjs/operators';


@Injectable()
export class FormService {

  private formCache: { [id: string]: any } = {};

  constructor(private apiService: ApiService) { }

  getFormById(id: string, lang: string) {
    if (this.formCache[id]) {
      return of(this.formCache[id]);
    }
    return this.apiService.formById(LajiApi.Endpoints.form, id, lang).pipe(tap(result => this.formCache[id] = result));
  }

  loadFormWithDocument(formId: string, lang: string, documentId: string, personToken: string) {
    const form$ = this.formCache[formId] ?
      of(this.formCache[formId]) :
      this.apiService.formById(LajiApi.Endpoints.form, formId, lang).pipe(tap(result => this.formCache[formId] = result));

    const data$ = this.apiService.documentGet(LajiApi.Endpoints.getDocument, personToken, documentId);

    return data$
      .pipe(switchMap(data => {
        return form$.pipe(
          combineLatest(data$, (form, data) => {
            form.formData = data;
            return form;
          }));
      }));
  }
}
