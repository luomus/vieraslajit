import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from "../../../node_modules/@angular/core";
import { ActivatedRoute, Router } from "../../../node_modules/@angular/router";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { isPlatformBrowser } from "@angular/common";

@Component({
    selector: 'vrs-static-wrapper',
    template:   `<div class="container">
                    <vrs-static [id]='id'></vrs-static>
                <div>`,
    styleUrls: ['static-wrapper.component.scss']
})
export class StaticWrapperComponent implements OnInit, OnDestroy {
    @Input() id: string;

    private onLangChange:Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private translate: TranslateService,
                @Inject(PLATFORM_ID) private platformId: Object
               ) {}

    ngOnInit() {
        if(!this.id){
            this.route.params.subscribe(params => {
                this.id = params['id'];
            });
        }
        this.onLangChange = this.translate.onLangChange.subscribe(this.loadHomePage.bind(this));

        if (!isPlatformBrowser(this.platformId)) {
            this.id = this.route.snapshot.params['id'];
        }
    }

    ngOnDestroy() {
        this.onLangChange ? this.onLangChange.unsubscribe() : null;
    }

    loadHomePage(){
        this.router.navigate(['./home']);
    }
}