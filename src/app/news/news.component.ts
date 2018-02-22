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
  pageSize = 5;

  constructor(private newsService: NewsService, private translate: TranslateService) { }

  ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.getNews.bind(this));

    this.getNews(1);
  }

  getNews(page) {
    
    this.newsService.getNewsArray(page, this.pageSize.toString(), this.translate.currentLang).subscribe((data) => {

     /* 
      laji.fi API:ista ei vielä tule "vieraslajit.fi" tagilla uutisia joissa contentia (vain externalUrl) 
      tarviiko välttämättä näyttää vanhoja teknisiä tiedotteita mutta nyt vielä tässä jotta on testattavana
      newsElementtejä joissa on contentia.
      */
      this.news= data.results
        .filter(newsElement => newsElement.tag.includes(("technical")) || newsElement.tag.includes(("vieraslajit.fi")));
 
      this.data = data;

      for(let i = 0; i < data.lastPage; i++) {
        this.pages.push(i+1); 
      } 

    });
  }

}
