import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class MetadataService {

  private metadataCache: { [range: string]: Array<any> } = {};

  constructor(private apiService: ApiService) { }

  getMetadataRange(range: string, lang?: string): Observable<Array<any>> {
    if (this.metadataCache[range]) {
      return Observable.of(this.metadataCache[range]);
    }
    return this.apiService
      .fetchMetadata(LajiApi.Endpoints.metadataRange, range, { lang: lang })
      .do(result => this.metadataCache[range] = result);
  }

}
