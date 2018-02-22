import { Component, OnInit } from '@angular/core';
import { NewsService } from '../shared/service/news.service';

@Component({
  selector: 'vrs-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  data: object;
  news: any [] = []; 
  pages: number [] = [];

  pageSize: number= 5; 

  constructor(private newsService: NewsService)/*, private translate: TranslateService)*/{ }

  ngOnInit() {
    this.getNews(1);
  }

  getNews(page) {
    
    this.newsService.getNewsArray(page, this.pageSize.toString()).subscribe((data) => {

     /* 
      laji.fi API:ista ei vielä tule "vieraslajit.fi" tagilla uutisia joissa contentia (vain externalUrl) 
      eli siksi seuraavassa haetaan testausmielessä myös taxonomy-tagilla
      */
      this.news= data.results
        .filter(newsElement => newsElement.tag.includes(("taxonomy")) || newsElement.tag.includes(("vieraslajit.fi")));
 
      this.data = data;

      for(let i = 0; i < data.lastPage; i++) {
        this.pages.push(i+1); 
      } 

    });
  }

}
