import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NewsService } from '../shared/service/news.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NewsElement } from '../shared/model/NewsElement';
import { PagedResult } from '../shared/model/PagedResult';


@Component({
  selector: 'vrs-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  
  private subTrans: Subscription;
  data: PagedResult<NewsElement>;
  news: Array<NewsElement> = [];
  pages: Array<number> = [];
  private pageSize: number = 4;
  currentTags: string;
  private imageToDisplay: string;
  private activeNavpill;

  constructor(private newsService: NewsService, private translate: TranslateService) { }

  ngOnInit() {
    this.subTrans= this.translate.onLangChange.subscribe((event) =>{
      this.getNews(1,this.currentTags);
    });
    this.getNews(1,"vieraslajit.fi",);
  }

  getNews(page:number,tags:string, ) {
    this.currentTags=tags;
    this.newsService.getPage(page.toString(),this.pageSize.toString(), this.translate.currentLang, tags)
    .subscribe((data) => {
      this.news = data.results;
      this.data = data;
      this.pages = [];
      for(let i = 0; i < data.lastPage; i++) {
        this.pages.push(i+1);
      }
    });
    window.scrollTo(0,0);
  }

  onClick(tags:string, id){
    Array.from(document.getElementsByClassName("active")).forEach(
      function(element) {
        element.classList.remove("active");
      }
    );

    document.getElementById(id).classList.add('active');
    this.getNews(1,tags);
  }

  getImageToDisplay(newsElement: NewsElement){
    if(newsElement.hasOwnProperty("featuredImage")){
      this.imageToDisplay=newsElement.featuredImage;
    } else {
      this.imageToDisplay= "";
    } 
    return this.imageToDisplay;
  }

  ngOnDestroy(){
    this.subTrans.unsubscribe();
  }

}