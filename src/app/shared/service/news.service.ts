import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResult } from '../model/PagedResult';
import { NewsElement } from '../model/NewsElement';
import { ApiService, LajiApi } from '../api/api.service';

@Injectable()
export class NewsService {

  constructor(private apiService: ApiService) { }

  // Get some page of news posts
  getPage(page: string, pageSize: string, lang: string, tag:string):  Observable<PagedResult<NewsElement>> {
    return this.apiService
          .newsFindAll(LajiApi.Endpoints.newsArray, {pageSize: pageSize, page: page, lang: lang, tag: tag});
  }

  getArticle(id: string): Observable<NewsElement> {
    return this.apiService.newsFindById(LajiApi.Endpoints.newsElement, id);
  }

}
