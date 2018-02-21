import { Component, OnInit } from '@angular/core';
import { NewsService } from '../shared/service/news.service';

@Component({
  selector: 'vrs-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  data: object;
  news: Array<any> = [];
  pages: Array<number> = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getNews(1);
  }

  getNews(page) {
    this.newsService.getNewsArray(page, '5').subscribe((data) => {
      this.news = data.results;
      this.data = data;
      this.pages = [];
      console.log(data);
      for(let i = 0; i < data.lastPage; i++) {
        this.pages.push(i+1);
      }
    });
  }

}
