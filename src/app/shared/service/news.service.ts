import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../model/PagedResult';
import { NewsElement } from '../model/NewsElement';
import { ApiService, LajiApi } from '../api/api.service';

@Injectable()
export class NewsService {

  constructor(private apiService: ApiService) { }

  // Get some page of news posts
  getNewsArray(page: string, pageSize: string):  Observable<PagedResult<NewsElement>> {
    return this.apiService
          .newsArray(LajiApi.Endpoints.newsArray, {pageSize: pageSize, page: page});
  }

}
