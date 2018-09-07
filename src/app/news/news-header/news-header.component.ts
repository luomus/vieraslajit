import {Component, Input} from '@angular/core';
import { NewsElement } from '../../shared/model';
@Component({
    selector: 'vrs-news-header',
    template: `
    <!-- Feature image header -->
    <div *ngIf='newsElement.featuredImage' class="row news-header {{colorClass}}">
        <div class="col-auto">
        <img class="news-thumbnail rounded" src="{{newsElement.featuredImage}}">
        </div>
        <div class="col row align-items-center">
        <div class="col news-header-text">
            <h2 class="news-title py-2 py-sm-0">{{newsElement.title}}</h2>
            <div class="news-posted p-0 p-sm-2">{{newsElement.posted | date: 'dd.MM.yyyy HH:MM' }} {{newsElement.author}}</div>
        </div>
        </div>
        <div class="col-1">
        <span class="news-tag float-right">{{newsElement.tag}}</span>
        <vrs-editcms class="float-right" id="{{newsElement.id}}"></vrs-editcms>
        </div>
    </div>
    <!-- / header -->

    <!-- No feature image header -->
    <div *ngIf='!newsElement.featuredImage' class="row news-header justify-content-between {{colorClass}}">
        <div class="col-8">
        <h2 class="news-title">{{newsElement.title}}</h2>
        <div class="news-posted">{{newsElement.posted | date: 'dd.MM.yyyy HH:MM' }} {{newsElement.author}}</div>
        </div>
        <div class="col-2"></div>
        <div class="col-2">
        <span class="news-tag float-right">{{newsElement.tag}}</span>
        <vrs-editcms class="float-right" id="{{newsElement.id}}"></vrs-editcms>
        </div>
    </div>
    <!-- / header -->
    `,
    styleUrls:['news-header.component.scss']
})
export class NewsHeaderComponent {
    @Input() newsElement: NewsElement;
    colorClass:string = "";
    constructor() {}
    ngOnInit() {
        this.colorClass = "c"+this.random(6);
    }
    random(int:number) {
        return getRandomInt(int);
        function getRandomInt(max) {
          return Math.floor(Math.random() * Math.floor(max));
        }
      }
}
