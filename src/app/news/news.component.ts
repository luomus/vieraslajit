import { Component, OnInit } from '@angular/core';
import { NewsService } from '../shared/service/news.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { NewsElement } from '../shared/model/NewsElement';
import { PagedResult } from '../shared/model/PagedResult';

@Component({
  selector: 'vrs-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  
  private subTrans: Subscription;
  private data: PagedResult<NewsElement>;
  private news: Array<NewsElement> = [];
  private pages: Array<number> = [];
  private pageSize = 5;
  private imageToDisplay: string;

  constructor(private newsService: NewsService, private translate: TranslateService) { }

  ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.getNews.bind(this));
    this.getNews(1);
  }

  getNews(page) {
    this.newsService.getPage(page,this.pageSize.toString(), this.translate.currentLang, "vieraslajit.fi")
    .subscribe((data) => {
      this.news = data.results;
      this.data = data;
      this.pages = [];
      console.log(data);
      for(let i = 0; i < data.lastPage; i++) {
        this.pages.push(i+1);
      }
    });
  }

  /*setImageToDisplay(){
    if (this.news.)
  }*/

}