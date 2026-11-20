import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResult } from '../model/PagedResult';
import { NewsElement } from '../model/NewsElement';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class NewsService {

  constructor(private apiService: ApiService) { }

  getPage(page: string, pageSize: string, tag: string):  Observable<PagedResult<NewsElement>> {
    return this.apiService.getNews({ pageSize: pageSize, page: page, tag: tag });
  }

  getArticle(id: string): Observable<NewsElement> {
    return this.apiService.getNewsId(id);
  }

  getTechnical(): Observable<NewsElement[]> {
    return this.apiService.getNews({ pageSize: '5', tag: 'technical' }).pipe(
      map(res => res.results)
    );
  }
}
