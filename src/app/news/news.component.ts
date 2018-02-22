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

  news: Array<any> = [];
  private subTrans: Subscription;

  constructor(private newsService: NewsService, private translate: TranslateService) { }

  ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.update.bind(this));
    this.update();
  }

  private update() {
    this.newsService.getNewsArray('1', '10', this.translate.currentLang).subscribe((data) => {
      this.news = data.results;
    });
  }

}
