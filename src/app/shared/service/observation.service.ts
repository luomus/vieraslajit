import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';

const baseQuery = {
  invasive: true,
  countryId: "ML.206",
  reliability: "RELIABLE,UNDEFINED",
  needsCheck: false,
}

@Injectable()
export class ObservationService {

  constructor(private apiService: ApiService) { }

  getObservationCount(query: any) {
    const _query = {
      ...baseQuery,
      individualCountMin: 1,
      ...query
    };
    return this.apiService.warehouseQueryCountGet(LajiApi.Endpoints.warehousequerycount, "count", _query);
  }

  getObservations(query: any) {
    const _query = {
      ...baseQuery,
      page: 1,
      pageSize: 10000,
      ...query
    }
    return this.apiService.getObservations(LajiApi.Endpoints.warehousequerylist, _query);
  }
}
