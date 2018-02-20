import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MetadataService {

  constructor(private apiService: ApiService) { }

  getMetadataRange(range: string, lang?: string): Observable<Array<any>> {
    return this.apiService
      .fetchMetadata(LajiApi.Endpoints.metadataRange, range, { lang: lang });
  }

}
