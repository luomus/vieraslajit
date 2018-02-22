import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../shared/googlesearch/search/search.component';
import { NewsService } from '../shared/service/news.service';

@Component({
  selector: 'vrs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  alerts: Array<any> = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNewsArray('1', '10').subscribe((data) => {
      let technical: Array<any> = [0];
      for(let d of data.results) {
        if (d.tag.includes("technical")) {
          technical.push(d);
        }
      }
      let i: number = 0;
      for (let d of technical) {
        let date: Date = new Date(0);
        date.setUTCMilliseconds(Number(d.posted));
        let now: Date = new Date();
        if (Math.ceil(Math.abs(now.getTime() - date.getTime()) / (1000 * 3600 * 24)) <= 3) {
          this.alerts[i] = d;
          i++;
        }
      }
    });
  }

}
