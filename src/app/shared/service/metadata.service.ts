import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { LanguageService } from './language.service';
import { Observable, of } from 'rxjs';
import { map, tap } from '../../../../node_modules/rxjs/operators';
import { Metadata } from '../model/Metadata';

@Injectable()
export class MetadataService {

  private metadataCache: { [langAndRange: string]: NonNullable<Metadata['results']> } = {};

  constructor(private apiService: ApiService) { }

  getMetadataRange(range: string): Observable<NonNullable<Metadata['results']>> {
    const cacheKey = `${LanguageService.getLanguage() ?? 'fi'}:${range}`;
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
