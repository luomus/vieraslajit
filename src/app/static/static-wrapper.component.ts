import { Component, Input, OnInit, OnDestroy } from "../../../node_modules/@angular/core";
import { ActivatedRoute, Router } from "../../../node_modules/@angular/router";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

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

    constructor(private route: ActivatedRoute, private router: Router, private translate: TranslateService) {}

    ngOnInit() {
        if(!this.id){
            this.route.params.subscribe(params => {
                this.id = params['id'];
            });
        }
        this.onLangChange = this.translate.onLangChange.subscribe(this.loadHomePage.bind(this));
    }

    ngOnDestroy() {
        this.onLangChange.unsubscribe();
    }

    loadHomePage(){
        this.router.navigate(['./home']);
    }
}