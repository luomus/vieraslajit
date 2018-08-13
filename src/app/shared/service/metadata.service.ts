import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { Observable, of } from 'rxjs';
import { tap } from '../../../../node_modules/rxjs/operators';

@Injectable()
export class MetadataService {

  private metadataCache: { [range: string]: Array<any> } = {};

  constructor(private apiService: ApiService) { }

  getMetadataRange(range: string, lang?: string): Observable<Array<any>> {
    if (this.metadataCache[range]) {
      return of(this.metadataCache[range]);
    }
    return this.apiService
      .fetchMetadata(LajiApi.Endpoints.metadataRange, range, { lang: lang }).pipe(
        tap(result => this.metadataCache[range] = result)
      );
  }

}
