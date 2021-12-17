import {Component, Input} from '@angular/core';
import { NewsElement } from '../../shared/model';
@Component({
    selector: 'vrs-news-header',
    template: `
    <!-- Feature image header -->
    <div *ngIf='newsElement.featuredImage' class="news-header">
        <img class="news-thumbnail mr-0 mr-md-2" [src]="newsElement.featuredImage.url" [alt]="newsElement.featuredImage.alt" [title]="newsElement.featuredImage.caption">
        <div>
            <h2 class="py-2 py-sm-0 news-title-container"><a class="news-title" [routerLink]="['./', newsElement.id]">{{newsElement.title}}</a></h2>
            <div class="news-posted">{{newsElement.posted | date: 'dd.MM.yyyy HH:MM' }} <span class="news-tag">{{newsElement.tag | translate}}</span></div>
        </div>
    </div>
    <!-- / header -->

    <!-- No feature image header -->
    <div *ngIf='!newsElement.featuredImage' class="news-header justify-content-between">
        <div>
            <h2><a class="news-title" [routerLink]="['./', newsElement.id]">{{newsElement.title}}</a></h2>
            <div class="news-posted">{{newsElement.posted | date: 'dd.MM.yyyy HH:MM' }} <span class="news-tag">{{newsElement.tag | translate}}</span></div>
        </div>
    </div>
    <!-- / header -->
    `,
    styleUrls:['news-header.component.scss']
})
export class NewsHeaderComponent {
    @Input() newsElement: NewsElement;
    constructor() {}
}
