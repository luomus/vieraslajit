import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { WarehouseQueryInterface } from '@observation-map/observation-map/import-from-laji-front/WarehouseQueryInterface';

const baseQuery = {
  invasive: true,
  countryId: "ML.206",
  reliability: "RELIABLE,UNDEFINED",
  needsCheck: false,
}

@Injectable()
export class ObservationService {

  constructor(private apiService: ApiService) { }

  getObservationCount(query: WarehouseQueryInterface) {
    const _query = {
      ...baseQuery,
      cache: false,
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
