import { Component, OnInit, OnDestroy } from "@angular/core";
import { NewsArticleFacade } from "./news-article.facade";
import { NewsElement } from "app/shared/model";
import { Observable, Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { switchMap, takeUntil } from "rxjs/operators";

@Component({
    selector: 'vrs-news-article',
    templateUrl: `./news-article.component.html`,
    styleUrls: [`./news-article.component.scss`],
})
export class NewsArticleComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>()

    article$: Observable<NewsElement>
    constructor(private facade: NewsArticleFacade, private route: ActivatedRoute) {}
    ngOnInit() {
        this.article$ = this.facade.article$;

        this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            this.facade.loadArticle(params['id'])
        })
    }
    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }
}
