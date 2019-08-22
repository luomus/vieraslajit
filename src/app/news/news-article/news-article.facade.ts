import { Injectable } from "@angular/core";
import { NewsService } from "app/shared/service/news.service";
import { NewsElement } from "app/shared/model";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface State {
    article: NewsElement
}

@Injectable()
export class NewsArticleFacade {
    private store$ = new BehaviorSubject<State>({
        article: undefined
    });

    state$: Observable<State> = this.store$.asObservable();
    article$: Observable<NewsElement> = this.store$.asObservable().pipe(map(state => state.article));

    constructor(private newsService: NewsService) {}
    articleReducer(article: NewsElement) {
        this.store$.next({
            article: article
        })
    }
    loadArticle(id: string) {
        this.newsService.getArticle(id).subscribe(this.articleReducer.bind(this))
    }
}
