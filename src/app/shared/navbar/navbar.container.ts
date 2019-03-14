import { Component, NgZone, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import * as $ from 'jquery';
import { InformationService } from "../service/information.service";
import { mergeMap, concatMap, tap } from "rxjs/operators";
import { of, Subscription } from "rxjs";
import { findContentID, StaticContent } from "../../../assets/i18n/cms-content";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: `vrs-navbar-wrapper`,
    templateUrl: `./navbar.container.html`,
    styleUrls: [`./navbar.container.scss`]
})
export class NavbarContainer implements OnInit, OnDestroy {
    mobile = false;
    menu = [];
    private rootId = "";
    private translateSub: Subscription;
    constructor(private informationService: InformationService,
                private zone: NgZone,
                private cd: ChangeDetectorRef,
                private translate: TranslateService) {}

    ngOnInit() {
        this.translateSub = this.translate.onLangChange.subscribe((lang) => {
            this.setCMSRootId(this.translate.currentLang);
            this.updateInformation();
        })
        this.updateMobileMode();
        this.zone.runOutsideAngular(() => {
            $(window).resize(() => {
                this.updateMobileMode();
            });
        });
    }

    updateMobileMode(){
        let _mobile = this.mobile;
        if (window.innerWidth < 768) {
            this.mobile = true;
        } else {
            this.mobile = false;
        }
        if (_mobile !== this.mobile) {
            this.cd.detectChanges();
        }
    }

    setCMSRootId(lang: string) {
        this.rootId = findContentID(StaticContent.Root, lang);
    }

    /**
     * Fetches static content from API with rootId to populate navbar menu
     */
    updateInformation(){
        this.menu = [];
        this.informationService.getInformation(this.rootId).pipe(
            mergeMap((base) => {
                return of(...base.children)
            }),
            concatMap((header) => {
                return this.informationService.getInformation(header.id)
            })
        )
        .subscribe((data) => {
            this.menu.push(data)
        });
    }

    logout(){}

    ngOnDestroy() {
        this.translateSub ? this.translateSub.unsubscribe : null;
    }
}