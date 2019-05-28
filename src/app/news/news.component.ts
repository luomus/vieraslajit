import { Component, OnInit, OnDestroy, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { NewsService } from '../shared/service/news.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { NewsParamsService } from './news-params.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from 'environments/environment';

@Component({
  selector: 'vrs-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  newsTag: string = environment.newsTag
  
  /* ngx pagination */
  currentPage:number=1;
  totalItems:number=0;
  asyncNews:any;

  pageSize: number = 4;
  
  currentTags: string = this.newsTag;

  // Translate
  private onLangChange: Subscription;

  // Spinner
  newsLoading:boolean = true;

  constructor(private newsService: NewsService,
              private translate: TranslateService,
              private paramsService: NewsParamsService,
              @Inject(DOCUMENT) private document: Document,
              @Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit() {
    this.paramsService.queryParams$.subscribe(params => {
      params.page ? this.currentPage = params.page : this.currentPage = 1;
      params.tags ? this.currentTags = params.tags : this.currentTags = this.newsTag;
      this.getPage(this.currentPage);
    });
    this.paramsService.init();
    this.onLangChange= this.translate.onLangChange.subscribe((event) =>{
      this.getPage(this.currentPage);
    });
  }

  getPage(page:number) {
    this.newsLoading = true;
    this.asyncNews = this.newsService.getPage(page.toString(),this.pageSize.toString(), this.translate.currentLang, this.currentTags)
    .pipe(tap(res=>{this.totalItems = res.total;
                    this.currentPage = page;
                    this.newsLoading = false; }),
          map(res=>res.results));
    if(isPlatformBrowser(this.platformId)) {
      this.document.body.scrollTop = 0;
    }
  }

  onPageChange(page:number) {
    this.paramsService.setPage(page);
  }

  onClick(tags:string, id){
    Array.from(document.getElementsByClassName("active-navpill")).forEach(
      function(element) {
        element.classList.remove("active-navpill");
      }
    );

    document.getElementById(id).classList.add('active-navpill');
    this.paramsService.setTags(tags);
    this.getPage(1);
  }

  ngOnDestroy(){
    this.onLangChange ? this.onLangChange.unsubscribe() : null;
  }
}