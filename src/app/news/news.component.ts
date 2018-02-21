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

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getNews(1);
  }

  getNews(page) {
    this.newsService.getNewsArray(page, '100').subscribe((data) => {

      /*
      data.results.forEach(newsElement=>console.log(newsElement.tag)); 
      laji.fi API:ista ei vielä tule "vieraslajit.fi" tagilla mitään uutisia eli siksi seuraavassa
      haetaan testausmielessä taxonomy-tagilla
      */
      this.news= data.results
        .filter(newsElement => newsElement.tag.includes("taxonomy"));
 
      this.data = data;

      for(let i = 0; i < data.lastPage; i++) {
        this.pages.push(i+1); 
      } 

    });
  }

}
