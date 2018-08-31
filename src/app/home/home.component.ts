import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchComponent } from '../shared/googlesearch/search/search.component';
import { NewsService } from '../shared/service/news.service';
import { TranslateService } from '@ngx-translate/core';
import {OmnisearchComponent} from '../shared/omnisearch/omnisearch.component'
import { NewsComponent } from '../news/news.component';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { findContentID, StaticContent } from '../../assets/i18n/cms-content';

/**
 * Renders the home-/frontpage ie. /home/ route
 * 
 * NewsService is used for loading news and alerts from laji.fi API
 */

@Component({
  selector: 'vrs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private onLangChange: Subscription;
  alerts: Array<any> = [];
  news: Array<any>= [];
  staticPetsID:string;

  constructor(private newsService: NewsService, private translate: TranslateService) { }

  /**
   * 1. Create subscription for news
   * 2. Update alerts and news arrays when API-request finishes
   * 3. Filter only alerts from past 3 days (20 in testing)
   */
  ngOnInit() {
    this.setStaticID(this.translate.currentLang);
    this.onLangChange = this.translate.onLangChange.subscribe((event) => {
      this.setStaticID(event.lang);
      this.getNews(1);
    });
    this.getNews(1);
  }

  ngOnDestroy() {
    this.onLangChange ? this.onLangChange.unsubscribe() : null;
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
        if (d.tag.includes("vieraslajit.fi")&&this.news.length<5) {
            this.news.push(d);
        }  
      } 
      this.filterTechnicalNews(technical);
    });
    
  }

  private setStaticID(lang: string) {
    this.staticPetsID = findContentID(StaticContent.Pets, lang);
  }

  filterTechnicalNews(technical: Array<any>){
    let i:number = 0;
      for (let d of technical) {
        let date: Date = new Date(0);
        date.setUTCMilliseconds(Number(d.posted));
        let now: Date = new Date();
        // TODO: muuta tuotannossa että 3 viimeiseltä päivältä!
        let cutoff = 30;
        if (environment.production) cutoff = 20;
        if (Math.ceil(Math.abs(now.getTime() - date.getTime()) / (1000 * 3600 * 24)) <= cutoff) {
          this.alerts[i] = d;
          i++;
        }
      }
  }

}
