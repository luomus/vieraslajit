import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { UserService } from "../../service/user.service";
import { findContentID, StaticContent } from "assets/i18n/cms-content";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'vrs-hamburger-bar',
    templateUrl: './hamburger-bar.component.html',
    styleUrls: ['./hamburger-bar.component.scss']
})
export class HamburgerBarComponent {
    @Input() aboutMenu;
    @Input() loginUrl;
    @Output() onLogout = new EventEmitter<null>();

    collapse = true;
    translateLeft = false;
    observations = false;
    about = false;

    constructor(
        private router: Router,
        private cd: ChangeDetectorRef,
        private translate: TranslateService
    ) {}

    ngOnInit() {
        this.router.events.subscribe((event)=> {
            if (event instanceof NavigationStart) {
                this.collapse = true;
            }
        })
    }

    onCollapse() {
        this.collapse = !this.collapse;
        this.cd.detectChanges();
    }

    toggleObservations() {
        if (this.observations) {
            setTimeout(() => {
                this.observations = false;
            }, 500)
        } else {
            this.observations = true;
        }
    }

    toggleAbout() {
        if (this.about) {
            setTimeout(() => {
                this.about = false;
            }, 500)
        } else {
            this.about = true;
        }
    }

    getUserProps(): any {
        if(this.getLoggedIn()) {
          return UserService.getUserProperties();
        } else {
          return {person: {fullName: ''}};
        }
      }

    getLoggedIn() {
        return UserService.loggedIn();
    }

    getFAQId() {
        return findContentID(StaticContent.FAQ, this.translate.currentLang);
    }

    logout() {
        this.onLogout.emit();
    }
}
