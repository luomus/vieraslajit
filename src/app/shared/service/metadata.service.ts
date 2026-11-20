import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { getLanguageFromLocalStorage } from '../../local-storage';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Metadata } from '../model/Metadata';
import { PagedResult } from '../model/PagedResult';

@Injectable()
export class MetadataService {

  private metadataCache: { [langAndRange: string]: NonNullable<PagedResult<Metadata>['results']> } = {};

  constructor(private apiService: ApiService) { }

  getMetadataRange(range: string): Observable<NonNullable<PagedResult<Metadata>['results']>> {
    const cacheKey = `${getLanguageFromLocalStorage() ?? 'fi'}:${range}`;
    if (this.metadataCache[cacheKey]) {
      return of(this.metadataCache[cacheKey]);
    }
    return this.apiService
      .getMetadataAlt(range).pipe(
        map((response) => {
          if (!response.results) {
            throw new Error(`Missing results for metadata range: ${range}`);
          }
          return response.results;
        }),
        tap((results) => this.metadataCache[cacheKey] = results)
      );
  }
}
