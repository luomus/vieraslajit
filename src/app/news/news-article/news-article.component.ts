import { Component, OnInit, OnDestroy } from "@angular/core";
import { NewsArticleFacade } from "./news-article.facade";
import { NewsElement } from "app/shared/model";
import { Observable, Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { switchMap, takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { Meta, Title } from "@angular/platform-browser";
import { environment } from "environments/environment";
import { removeHTMLTagFragments } from "app/utils";

@Component({
    selector: 'vrs-news-article',
    templateUrl: `./news-article.component.html`,
    styleUrls: [`./news-article.component.scss`],
})
export class NewsArticleComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>()

    article: NewsElement

    constructor(
        private facade: NewsArticleFacade,
        private route: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        private translate: TranslateService
    ) {}

    ngOnInit() {
        this.facade.article$.subscribe(article => {
            if (!article) return;
            this.article = article;
            const title = article.title + this.translate.instant('title.post');
            this.title.setTitle(title);
            this.meta.updateTag({
                property: "og:title",
                content: title
            });
            const desc = removeHTMLTagFragments(article.content).substr(0, 70);
            this.meta.updateTag({
                property: "og:description",
                content: desc
            });
            this.meta.updateTag({
                property: "description",
                content: desc
            });
            this.meta.updateTag({
                property: "og:image",
                content: article.featuredImage
                         ? article.featuredImage.url
                         : environment.baseUrl + "/assets/images/logos/vieraslajit_logo.png"
            });
        });

        this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            this.facade.loadArticle(params['id'])
        })
    }
    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }
}
