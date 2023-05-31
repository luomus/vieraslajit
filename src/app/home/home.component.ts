import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { InformationService } from 'app/shared/service/information.service';
import { map, concatMap } from 'rxjs/operators';
import { TaxonService } from 'app/shared/service/taxon.service';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { NewsService } from 'app/shared/service/news.service';
import { Subscription } from 'rxjs';
import { environment } from 'environments/environment';
import { Title, Meta } from '@angular/platform-browser';
import { findContentID, StaticContent } from 'assets/i18n/cms-content';

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
export class HomeComponent implements OnInit, AfterViewInit {
  topical: Array<any> = [];
  newsTag: string = environment.newsTag
  private onLangChange: Subscription;
  news: Array<any>= [];

  constructor(
    private informationService: InformationService,
    private taxonService: TaxonService,
    private newsService: NewsService,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: object,
    private translate: TranslateService) {}

  ngOnInit() {
    const title = this.translate.instant('title.home');
    this.title.setTitle(title);
    this.meta.updateTag({
        property: "og:title",
        content: title
    });
    this.meta.updateTag({
        property: "og:description",
        content: this.translate.instant('og.home.description')
    });
    this.meta.updateTag({
        property: "description",
        content: this.translate.instant('og.home.description')
    });
    this.meta.updateTag({
        property: "og:image",
        content: environment.baseUrl + "/assets/images/logos/vieraslajit_logo.png"
    });

    this.onLangChange = this.translate.onLangChange.subscribe((event) => {
      this.getNews(1);
    });
    this.getNews(1);

    this.informationService.getInformation('i-386').pipe(
      map((res) => {
        return res.content.replace(/<.*?>/g, "").split(',');
      }), concatMap((res) => {
        return res;
      }), concatMap(res => {
        return this.taxonService.getTaxon(res, {
          includeMedia: true
        });
      })
      ).subscribe((res) => {
        this.topical.push(res);
        this.topical = this.topical.slice();
    })
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
        // @ts-ignore
        window.FB.init({version: 'v5.0', xfbml: true});
        // @ts-ignore
        window.twttr.widgets.load();
    }
  }

  getNews(page){
    this.newsService.getPage('1', '5', this.translate.currentLang, this.newsTag/* +",technical" */)
    .subscribe((data) => {
      this.news = data.results;
    });
  }

  getReadMoreId() {
    return findContentID(StaticContent.Info, this.translate.currentLang);
  }

  getCampaignId() {
    return findContentID(StaticContent.Campaign, this.translate.currentLang);
  }

  getCampaign2Id() {
    return findContentID(StaticContent.Campaign2, this.translate.currentLang);
  }

  getBarentsUrl() {
    return {
      fi: 'https://barents-ias.info/fi/etusivu/',
      sv: 'https://barents-ias.info/sv/hem/',
      en: 'https://barents-ias.info/'
    }[this.translate.currentLang];
  }
}
