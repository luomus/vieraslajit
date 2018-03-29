import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Information } from '../model/Information';
import { ApiService, LajiApi } from '../api/api.service';

@Injectable()
export class InformationService {

  constructor(private apiService: ApiService) { }

  //get static page information
  getInformation(id: string): Observable<Information> {
    return this.apiService.informationFindById(LajiApi.Endpoints.information, id);
  }
}