import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { UserService } from './shared/service/user.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { StateService } from './state.service';
import { SwUpdate } from '@angular/service-worker';
import { LoaderService } from './shared/service/loader.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'environments/environment';

/**
 * Main component that acts as a container for navigation, content and footer.
 */

declare const ga: Function;

@Component({
  selector: 'vrs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  prefix = 'vrs';
  isPopState = false;
  hideFooter = false;
  displaySwUpdate = false;
  useAnalytics = false;

  /**
  * Initializes TranslateService
  * 1. Use English if a particular translation element is not found
  * 2. Use either the default language or language stored in localStorage
  */
  constructor(
    state: StateService,
    private translate: TranslateService,
    private userService: UserService,
    private location: Location,
    private router: Router,
    private swUpdate: SwUpdate,
    private loaderService: LoaderService,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.useAnalytics = environment.useAnalytics;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.reset();
        this.loaderService.register();
      }
      if (event instanceof NavigationEnd) {
        this.loaderService.complete();
        this.hideFooter = !state.footerEnabled;

        const path = location.path() || '/';
        // Use analytics
        if (this.useAnalytics && path.indexOf('/user') !== 0) {
          try {
            ga('send', 'pageview', path);
          } catch (e) {}
        }
      }
    });

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

    this.meta.addTags([
/*       {
        name: "og:url",
        content: ""
      }, */
/*       {
        name: "og:type",
        content: ""
      }, */
      {
        name: "og:title",
        content: this.title.getTitle()
      },
      {
        name: "og:description",
        content: this.translate.instant('home.description')
      },
      {
        name: "og:image",
        content: environment.baseUrl + "/assets/images/logos/vieraslajit_logo.png"
      }
    ])
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
