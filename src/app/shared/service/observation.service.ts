import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../model/PagedResult';
import {Document} from '../model/Document';
import { WarehouseQueryList } from '../model/Warehouse';
import { ApiService, LajiApi } from '../api/api.service';

@Injectable()
export class ObservationService {

  constructor(private apiService: ApiService) { }

  
  getObservationsById(taxonId: Array<string>, pageSize: string, page:string):  Observable<PagedResult<WarehouseQueryList>> {
    return this.apiService
          .warehouseQueryListById(LajiApi.Endpoints.warehousequerylist, {taxonId: taxonId, pageSize: pageSize, page: page});
  }
  getObservationsbyPersonToken(personToken: string, pageSize: string):  Observable<any> {
    return this.apiService
          .documentsByPersonToken(LajiApi.Endpoints.documents, {personToken: personToken, pageSize: pageSize});
  }

  getAllObservations(pageSize: string, page:string):  Observable<PagedResult<WarehouseQueryList>> {
    return this.apiService
          .getObservations(LajiApi.Endpoints.warehousequerylist, {pageSize: pageSize, invasive:true, page:page});
  }


}