import { Injectable, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

export interface NewsQueryParams {
    page: number;
    tags: string;
}

@Injectable()
export class NewsParamsService {
    private page = 1;
    private tags = '';
    queryParams$ = new EventEmitter<NewsQueryParams>();
    constructor(private route: ActivatedRoute,
                private router: Router){}
    init() {
        this.route.queryParams.subscribe(params => {
            this.page = params['page'];
            this.tags = params['tags'];
            this.queryParams$.emit({
                page: this.page,
                tags: this.tags
            });
        });
    }
    setPage(n) {
        this.page = n;
        this.refresh();
    }
    setTags(t) {
        this.tags = t;
        this.refresh();
    }
    refresh() {
        this.router.navigate([], { queryParams: {
            page: this.page,
            tags: this.tags
        }});
    }
}