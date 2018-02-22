import { Component, OnInit } from '@angular/core';
import { NewsService } from '../shared/service/news.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'vrs-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  data: object;
  news: Array<any> = [];
  private subTrans: Subscription;
  pages: Array<number> = [];

  constructor(private newsService: NewsService, private translate: TranslateService) { }

  ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.getNews.bind(this));

    this.getNews(1);
  }

  getNews(page) {
    this.newsService.getNewsArray(page, '5', this.translate.currentLang).subscribe((data) => {
      this.news = data.results;
      this.data = data;
      this.pages = [];
      console.log(data);
      for (let i = 0; i < data.lastPage; i++) {
        this.pages.push(i + 1);
      }
    });
  }

}
