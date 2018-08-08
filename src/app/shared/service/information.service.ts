import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Information } from '../model/Information';
import { ApiService, LajiApi } from '../api/api.service';
import { tap } from '../../../../node_modules/rxjs/operators';



@Injectable()
export class InformationService {

  private informationCache: { [id: string]: any } = {};

  constructor(private apiService: ApiService) { }

  // Get static page information
  getInformation(id: string): Observable<Information> {
    if (this.informationCache[id]) {
      return of(this.informationCache[id]);
    }
    return this.apiService.informationFindById(LajiApi.Endpoints.information, id).pipe(
      tap(result => this.informationCache[id] = result)
    );
  }
}