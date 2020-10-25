import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserService } from './shared/service/user.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { StateService } from './state.service';
import { SwUpdate } from '@angular/service-worker';
import { LoaderService } from './shared/service/loader.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

/**
 * Main component that acts as a container for navigation, content and footer.
 */

@Component({
  selector: 'vrs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vrs';
  translate: TranslateService;
  isPopState = false;
  hideFooter = false;
  displaySwUpdate = false;

  /**
  * Initializes TranslateService
  * 1. Use English if a particular translation element is not found
  * 2. Use either the default language or language stored in localStorage
  */
  constructor(
    state: StateService,
    translate: TranslateService,
    private userService: UserService,
    private router: Router,
    private swUpdate: SwUpdate,
    private loaderService: LoaderService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.reset();
        this.loaderService.register();
      }
      if (event instanceof NavigationEnd) {
        this.loaderService.complete();
        this.hideFooter = !state.footerEnabled;
      }
    });

    this.translate = translate;

    /**
    * Use English if translation is not found
    */
    translate.setDefaultLang('en');

    this.translate.onLangChange.subscribe((e: LangChangeEvent) => {
      if (isPlatformBrowser(this.platformId)) {
        this.document.documentElement.lang = e.lang;
      }
    })

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
          this.displaySwUpdate = true;
      });
    }
  }
  onAcceptUpdate() {
    window.location.reload();
  }
}
