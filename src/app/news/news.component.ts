import { Component, OnInit } from '@angular/core';
import { NewsService } from '../shared/service/news.service';

@Component({
  selector: 'vrs-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(private newsService: NewsService) { }

  ngOnInit() {
  }

}
