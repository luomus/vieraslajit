import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../model/PagedResult';
import { WarehouseQueryList } from '../model/Warehouse';
import { ApiService, LajiApi } from '../api/api.service';

@Injectable()
export class ObservationService {

  constructor(private apiService: ApiService) { }

  
  getObservationsById(taxonId: Array<string>, pageSize: string, page:string):  Observable<PagedResult<WarehouseQueryList>> {
    return this.apiService
          .warehouseQueryListById(LajiApi.Endpoints.warehousequerylist, {taxonId: taxonId, pageSize: pageSize, page: page});
  }

}