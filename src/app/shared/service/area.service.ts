import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Area } from '../model/Area';
import { PagedResult } from '../model';

@Injectable()
export class AreaService {

  constructor(private apiService: ApiService) { }

  getMunicipalities(type: string): Observable<PagedResult<Area>> {
    return this.apiService.getAreas({
      areaType: type,
      pageSize: "1000"
    });
  }
}
