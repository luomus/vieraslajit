import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService, userProperty } from './shared/service/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { StateService } from './state.service';
import { SwUpdate } from '@angular/service-worker';
import { isPlatformBrowser } from '@angular/common';

/**
 * Main component that acts as a container for navigation, content and footer.
 */

@Component({
  selector: 'vrs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'vrs';
  translate: TranslateService;
  isPopState = false;
  hideFooter = false;

  /**
  * Initializes TranslateService
  * 1. Use English if a particular translation element is not found
  * 2. Use either the default language or language stored in localStorage
  */
  constructor(state: StateService, translate: TranslateService, private userService: UserService,
              private router: Router, private swUpdate: SwUpdate, @Inject(PLATFORM_ID) private platformId) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideFooter = !state.footerEnabled;
      }
    });

    this.translate = translate;

    /**
    * Use English if translation is not found
    */
    translate.setDefaultLang('en');

    /**
    * User's language choice is stored in localStorage, if language is not found
    * then use Finnish
    */
    if (window.localStorage.getItem("vrs-lang")) {
      translate.use(window.localStorage.getItem("vrs-lang"));
    } else {
      translate.use('fi');
    }

    if (UserService.getToken()) {
      userService.updateUserProperties(UserService.getToken());
    }
  }
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm(this.translate.instant('swupdate'))) {
          window.location.reload();
        }
      });
    }
  }
  ngAfterViewInit(): void {
    //document.getElementById('vrs-body').className += ' safari';
    if (isPlatformBrowser(this.platformId)) {
      if (navigator.userAgent.match(/OS X.*Safari/) && ! navigator.userAgent.match(/Chrome/)) {
        document.body.className += ' safari';
      }
    }
  }
}
