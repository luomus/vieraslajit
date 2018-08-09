import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResult } from '../model/PagedResult';
import {Document} from '../model/Document';
import { WarehouseQueryList } from '../model/Warehouse';
import { ApiService, LajiApi } from '../api/api.service';

@Injectable()
export class ObservationService {

  constructor(private apiService: ApiService) { }

  
  getObservationsById(taxonId: Array<string>, pageSize: string, page:string, observerPersonToken?:string):  Observable<PagedResult<WarehouseQueryList>> {
    let query = {taxonId: taxonId, pageSize: pageSize, page: page, invasive:true}
    if(observerPersonToken) query["observerPersonToken"] = observerPersonToken;
    return this.apiService
          .warehouseQueryListById(LajiApi.Endpoints.warehousequerylist, query);
  }
  /*
  getObservationsbyPersonToken(personToken: string, pageSize: string):  Observable<any> {
    return this.apiService
          .documentsByPersonToken(LajiApi.Endpoints.documents, {personToken: personToken, pageSize: pageSize});
  }
  */

 getObservationsbyPersonToken(pageSize: string, page:string, personToken: string):  Observable<PagedResult<WarehouseQueryList>> {
  return this.apiService
        .getObservations(LajiApi.Endpoints.warehousequerylist, {pageSize: pageSize, invasive:true, page:page, observerPersonToken: personToken});
}

  getAllObservations(pageSize: string, page:string):  Observable<PagedResult<WarehouseQueryList>> {
    return this.apiService
          .getObservations(LajiApi.Endpoints.warehousequerylist, {pageSize: pageSize, invasive:true, page:page});
  }

  getObservations(query):  Observable<PagedResult<WarehouseQueryList>> {
    return this.apiService
          .getObservations(LajiApi.Endpoints.warehousequerylist, query);
  }
}