import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, LajiApi } from '../api/api.service';

@Injectable()
export class AreaService {

  constructor(private apiService: ApiService) { }

  getMunicipalities(type:string): Observable<any> {
    return this.apiService.areas(LajiApi.Endpoints.areas, {
      type: type,
      pageSize: "1000"
    });
  }
}
