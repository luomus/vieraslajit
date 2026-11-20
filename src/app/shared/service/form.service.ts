import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap, switchMap, combineLatest } from 'rxjs/operators';
import { ApiService } from '../api/api.service';

@Injectable()
export class FormService {

  private formCache: { [id: string]: any } = {};

  constructor(private apiService: ApiService) { }

  getFormById(id: string) {
    if (this.formCache[id]) {
      return of(this.formCache[id]);
    }
    return this.apiService.getForm(id).pipe(tap(result => this.formCache[id] = result));
  }

  loadFormWithDocument(formId: string, documentId: string) {
    const form$ = this.formCache[formId] ?
      of(this.formCache[formId]) :
      this.apiService.getForm(formId).pipe(tap(result => this.formCache[formId] = result));

    const data$ = this.apiService.getDocument(documentId);

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
