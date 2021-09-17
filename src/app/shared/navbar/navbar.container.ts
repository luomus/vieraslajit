import { Component, NgZone, OnInit, ChangeDetectorRef, OnDestroy, Renderer2 } from "@angular/core";
import { InformationService } from "../service/information.service";
import { mergeMap, concatMap, tap, startWith } from "rxjs/operators";
import { of, Subscription, BehaviorSubject } from "rxjs";
import { findContentID, StaticContent } from "../../../assets/i18n/cms-content";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "../service/user.service";
import { Router } from "@angular/router";

@Component({
    selector: `vrs-navbar-wrapper`,
    templateUrl: `./navbar.container.html`,
    styleUrls: [`./navbar.container.scss`]
})
export class NavbarContainer implements OnInit, OnDestroy {
    mobile = false;
    menu = [];
    loginUrl = "#";
    private rootId = "";
    private translateSub: Subscription;
    constructor(private informationService: InformationService,
                private zone: NgZone,
                private cd: ChangeDetectorRef,
                private translate: TranslateService,
                private renderer: Renderer2,
                private userService: UserService,
                private router: Router) {}

    ngOnInit() {
        this.translateSub = this.translate.onLangChange.pipe(
            startWith(() => this.translate.currentLang)
        ).subscribe((lang) => {
            this.setCMSRootId(this.translate.currentLang);
            this.updateInformation();
        })

        this.updateMobileMode();
        this.zone.runOutsideAngular(() => {
            this.renderer.listen(window, "resize", () => {
                this.updateMobileMode();
            });
        });
        /**
         * Update login url next parameter every time active route changes
         */
        this.router.events.subscribe((val) => {
            this.loginUrl = UserService.getLoginUrl(encodeURI(window.location.pathname));
            this.cd.detectChanges();
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
        this.informationService.getInformation(this.rootId)
        .subscribe((data) => {
            this.menu = data.children;
        });
    }

    logout(){
        this.userService.logout();
    }

    ngOnDestroy() {
        this.translateSub ? this.translateSub.unsubscribe : null;
    }
}
