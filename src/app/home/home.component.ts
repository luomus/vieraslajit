import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../shared/googlesearch/search/search.component';
import { NewsService } from '../shared/service/news.service';
import { TranslateService } from '@ngx-translate/core';
import {OmnisearchComponent} from '../shared/omnisearch/omnisearch.component'
import { NewsComponent } from '../news/news.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'vrs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private subTrans: Subscription;
  alerts: Array<any> = [];
  news: Array<any>= [];

  constructor(private newsService: NewsService, private translate: TranslateService) { }

  ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.getNews.bind(this));
    this.getNews(1);
  }

  getNews(page){
    this.newsService.getPage('1', '20', this.translate.currentLang, "vieraslajit.fi,technical")
    .subscribe((data) => {
      let technical: Array<any> = [0];
      this.news=[];
      for(let d of data.results) {
        if (d.tag.includes("technical")) {
          technical.push(d);
        }
        if (d.tag.includes("vieraslajit.fi")&&this.news.length<6) {
            this.news.push(d);
        }  
      } 
      this.filterTechnicalNews(technical);
    });
    
  }

  filterTechnicalNews(technical: Array<any>){
    let i:number = 0;
      for (let d of technical) {
        let date: Date = new Date(0);
        date.setUTCMilliseconds(Number(d.posted));
        let now: Date = new Date();
        // muuta tuotannossa että 3 viimeiseltä päivältä!
        if (Math.ceil(Math.abs(now.getTime() - date.getTime()) / (1000 * 3600 * 24)) <= 10) {
          this.alerts[i] = d;
          i++;
        }
      }
  }

}
