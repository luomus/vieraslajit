import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { WarehouseApi } from '@observation-map/observation-map/import-from-laji-front/WarehouseApi';

export const observationBaseQuery = {
  invasive: true,
  reliability: ['RELIABLE','UNDEFINED'],
  needsCheck: false,
  countryId: ['ML.206'],
  recordQuality: ['EXPERT_VERIFIED','COMMUNITY_VERIFIED','NEUTRAL']
}

@Injectable()
export class ObservationService {

  constructor(private apiService: ApiService, private warehouse: WarehouseApi) { }

  getObservationCount(query: any) {
    const _query = {
      ...observationBaseQuery,
      individualCountMin: 1,
      ...query
    };
    return this.warehouse.warehouseQueryCountGet(_query);
  }

  getObservations(query: any) {
    const _query = {
      ...observationBaseQuery,
      page: 1,
      pageSize: 10000,
      ...query
    }
    return this.warehouse.warehouseQueryListGet(_query);
  }
}
