import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../model/PagedResult';
import {Document} from '../model/Document';
import { WarehouseQueryList } from '../model/Warehouse';
import { ApiService, LajiApi } from '../api/api.service';

@Injectable()
export class ObservationService {

  constructor(private apiService: ApiService) { }

  
  getObservationsById(taxonId: Array<string>, pageSize: string, page:string, observerPersonToken?:string):  Observable<PagedResult<WarehouseQueryList>> {
    let query = {taxonId: taxonId, pageSize: pageSize, page: page}
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

 getObservationsbyPersonToken(personToken: string, pageSize: string):  Observable<any> {
  return this.apiService
        .warehouseQueryListById(LajiApi.Endpoints.warehousequerylist, {observerPersonToken: personToken, pageSize: pageSize});
}

  getAllObservations(pageSize: string, page:string):  Observable<PagedResult<WarehouseQueryList>> {
    return this.apiService
          .getObservations(LajiApi.Endpoints.warehousequerylist, {pageSize: pageSize, invasive:true, page:page});
  }


}