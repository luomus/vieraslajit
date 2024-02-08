import { Component } from '@angular/core';
import { NewsService } from 'app/shared/service/news.service';
import { Observable } from 'rxjs';
import { NewsElement } from '../../shared/model';
import { filter, map, tap } from 'rxjs/operators';

@Component({
    selector: 'vrs-technical-news',
    template: `
<div *ngFor="let item of (news$ | async)" class="mb-3">
    <a [routerLink]="['/news', item.id]">{{ item.title }} <span class="oi oi-external-link"></span></a>
</div>`,
    styleUrls: ['technical-news.component.scss']
})
export class TechnicalNewsComponent {
    news$: Observable<NewsElement[]> = this.newsService.getTechnical().pipe(
        map(items => items.filter(item => {
            const days = 1;
            const isNew = Date.now() - parseInt(item.posted, 10) < (days * 86400000); // number of milliseconds in a day
            const isTechnical = item.tag === 'technical';
            return isTechnical && isNew;
        }))
    );

    constructor(private newsService: NewsService) {}
}

